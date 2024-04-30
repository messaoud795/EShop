import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props) => {
  const { isAdmin, children } = props;
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  const isAuthorized = isAdmin ? user.role === "admin" : true;

  console.log({ isAuthenticated, loading });

  return (
    <Fragment>
      {!loading &&
        (isAuthenticated ? (
          isAuthorized ? (
            children
          ) : (
            <Navigate to="/" />
          )
        ) : (
          <Navigate to="/login" />
        ))}
    </Fragment>
  );
};
