import React from "react";
import Layout from "./Hoc/Layout.jsx";
import { Switch, Route } from "react-router-dom";
import PriveteRoute from "./Components/authRouths/privateRoutes";
import PublicRoute from "./Components/authRouths/publicRoutes";
import Home from "./Components/home";
import SignIn from "./Components/signin";
import Dashboard from "./Components/admin/Dashboard";
import AdminMatches from "./Components/admin/matches";
import AddEditMatch from "./Components/admin/matches/addEditMatches"


const Routes = props => {
  return (
    <Layout>
      <Switch>
      <PriveteRoute
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />
      <PriveteRoute
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />
        <PriveteRoute
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <PublicRoute {...props} restricted={false} path="/sign_in" exact component={SignIn} />
        <PublicRoute {...props} restricted={false} path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
