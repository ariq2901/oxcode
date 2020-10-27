import React from "react";
import { useSelector } from 'react-redux';
import { Redirect, Route, useParams, useRouteMatch } from "react-router-dom";

const AuthGuarder = ({ children, ...rest }) => {
   const isLogin = sessionStorage.getItem("isLogin");


  React.useMemo(() => {
    console.log(isLogin);
  }, [isLogin]);

  return (
    <div>
      <Route {...rest}>{isLogin ? <Redirect to="/" /> : children}</Route>
    </div>
  );
};

export default AuthGuarder;
