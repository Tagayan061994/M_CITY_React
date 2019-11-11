import React from "react";

//Api in firabase wasnt updated > date undefined
const MatchesBlock = ({ ...props }) => {
  console.log(props);

  return (
    <div className="match_block">
      <div className="match_date">
        {props.match.final
          ? props.match.date
          : `Match not played yet: ${props.match.date}`}
      </div>
      <div className="match_wrapper">
        <div className="match_top">
          <div className="left">
            {/* for adding the logo from database you should whrtie background:`url(/images/team_icons/${props.match.localThmb}.png */}
            <div
              className="icon"
              style={{
                background: `url(/images/team_icons/manchester_city.png)`
              }}
            ></div>
            <div className="team_name">{props.match.name}</div>
          </div>
          <div className="right">
            {props.match.final ? props.match.resultAway : "-"}
          </div>
        </div>
        <div className="match_bottom">
          <div className="left">
            {/* for adding the logo from database you should whrtie background:`url(/images/team_icons/${props.match.localThmb}.png */}
            <div
              className="icon"
              style={{ background: `url(/images/team_icons/arsenal.png)` }}
            ></div>
            <div className="team_name">{props.match.name}</div>
          </div>
          <div className="right">
            {props.match.final ? props.match.resultAway : "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesBlock;
