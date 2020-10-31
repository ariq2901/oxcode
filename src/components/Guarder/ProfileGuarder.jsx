import React from "react";
import { Redirect, Route, useParams, useRouteMatch } from "react-router-dom";

const ProfilerGuarder = ({ children, ...rest }) => {
  const isLogin = sessionStorage.getItem("isLogin");

  return (
    <div>
      <Route {...rest}>{!isLogin ? <Redirect to="/" /> : children}</Route>
    </div>
  );
};

export default ProfilerGuarder;
