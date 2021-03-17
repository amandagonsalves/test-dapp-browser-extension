import React from "react";
import { Route, Redirect } from "react-router-dom";

//AUTH related methods
const AppRoute = ({
  component: Component,
  isAuthProtected,
  ...rest
}) => (
  <Route {...rest}
    render={props => {
      // Storage.getItem instead sessionStorage 
      // async function to get item from Storage

      const isLogged = true /* || (await Storage.getItem("UserLogged") == 'true');*/

      if (isAuthProtected && !isLogged) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      return (
        <Component {...props} />
      );
    }}
  />
);

export default AppRoute;