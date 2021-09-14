import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
