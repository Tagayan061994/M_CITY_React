import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoutes = ({
  user,
  component: Comp, //renameing component to => Comp,while we cant call <component/> with lawercase
  // rest of components (exact,path)
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        //if user loged out => redirect sign_in
        user ? <Comp {...props} user={user} /> : <Redirect to="/sign_in" />
      }
    />
  );
};

export default PrivateRoutes;
