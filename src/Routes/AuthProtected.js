import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useProfile } from "../Components/Hooks/UserHooks";
import { useEthers } from "@usedapp/core";

const AuthProtected = (props) => {
  const { userProfile, loading } = useProfile();
  const { account } = useEthers()
  const isConnected = account !== undefined

  /*
    redirect is un-auth access protected routes via url
    */

  if (!isConnected) {
    return (
      <Redirect to={{ pathname: "/landing", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
