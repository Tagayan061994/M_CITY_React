import React, { Component } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import FormField from "../../ui/formFields";
import { validate } from "../../ui/tag";
import { firebaseTeams, firebaseMatches, firebaseDB } from "../../../firebase";
import { firebaseLooper } from "../../ui/tag";

class AddEditMAtch extends Component {
  state = {
    matchId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formdate: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event Date",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      local: {
        element: "select",
        value: "",
        config: {
          label: "Select a local team",
          name: "select_local",
          type: "select",
          options: [{ key: "Yes", value: "yes" }, { key: "No", value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      resultLocal: {
        element: "resultLocal",
        value: "",
        config: {
          label: "Result local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      away: {
        element: "select",
        value: "",
        config: {
          label: "Select a local team",
          name: "select_local",
          type: "select",
          options: [{ key: "Yes", value: "yes" }, { key: "No", value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      resultAway: {
        element: "resultLocal",
        value: "",
        config: {
          label: "Result local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: false
      },
      referee: {
        element: "input",
        value: "",
        config: {
          label: "referee",
          name: "referee_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "Team result",
          name: "select_result",
          type: "select",
          options: [
            { key: "Win", value: "Win" },
            { key: "Lose", value: "Lose" },
            { key: "Draw", value: "Draw" },
            { key: "None avaliable", value: "None avaliabl" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      final: {
        element: "select",
        value: "",
        config: {
          label: "Game played",
          name: "select_played",
          type: "select",
          options: [{ key: "Yes", value: "Yes" }, { key: "No", value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      }
    }
  };
  updateForm(element) {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    newElement.value = element.event.target.value;

    let valiData = validate(newElement);

    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];

    newFormdata[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  updateFields(match, teamOptions, teams, type, matchId) {
    const newFormdata = {
      ...this.state.formdate
    };

    for (let key in newFormdata) {
      if (match) {
        newFormdata[key].value = match[key];
        newFormdata[key].valid = true;
      }
      if (key === "local" || key === "away") {
        newFormdata[key].config.options = teamOptions;
      }
    }

    this.setState({
      matchId,
      formType: type,
      formdate: newFormdata,
      teams
    });
  }

  componentDidMount() {
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) => {
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseLooper(snapshot);
        const teamOptions = [];

        snapshot.forEach(childSnapshot => {
          teamOptions.push({
            key: childSnapshot.val().shortname,
            value: childSnapshot.val().shortname
          });
        });

        this.updateFields(match, teamOptions, teams, type, matchId);
      });
    };
    if (!matchId) {
      //add match
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once("value")
        .then(snapshot => {
          const match = snapshot.val();

          getTeams(match, "Edit match");
        });
    }
  }

  successForm(message) {
    this.setState({
      formSuccess: message
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    this.state.teams.forEach(team => {
      if (team.shortname === dataToSubmit.local) {
        dataToSubmit["localThmb"] = team.thmb;
      }
      if (team.shortname === dataToSubmit.away) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });
    if (formIsValid) {
      if (this.state.formType === "Edit MAtch") {
        firebaseDB
          .ref(`matches/${this.state.matchId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Updated correctly");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        //add match
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"date"}
                formdata={this.state.formdate.date}
                change={element => this.updateForm(element)}
              />

              <div className="select_team_layout">
                <div classNam="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"local"}
                      formdata={this.state.formdate.local}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div>
                    <FormField
                      id={"resultLocal"}
                      formdata={this.state.formdate.resultLocal}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>
              <div className="select_team_layout">
                <div classNam="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={"away"}
                      formdata={this.state.formdate.away}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div>
                    <FormField
                      id={"resultAway"}
                      formdata={this.state.formdate.resultAway}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="split_fields">
                <FormField
                  id={"referee"}
                  formdata={this.state.formdate.referee}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"stadium"}
                  formdata={this.state.formdate.stadium}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="split_fields">
                <FormField
                  id={"result"}
                  formdata={this.state.formdate.result}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"final"}
                  formdata={this.state.formdate.final}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Somthing is wrong</div>
              ) : (
                ""
              )}

              <div className="admin_submit">
                <button oncklick={event => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMAtch;
