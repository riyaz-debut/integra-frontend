import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import LocalStorageService from "services/LocalStorageService";
import jwt_decode from "jwt-decode";
import moment from "moment";

const Private = ({ component: Component, roles, ...rest }) => {
  const AccessToken = LocalStorageService.getAccessToken();
  const userRole = LocalStorageService.getUserRole();

  let isvalidToken = false;
  if (AccessToken) {
    try {
      const decode = jwt_decode(AccessToken);
      const date = moment(new Date()).format("X");
      isvalidToken = decode.exp >= date;
    } catch (error) {
      isvalidToken = false;
    }
  }

  return (
    <>
      {!!AccessToken && isvalidToken ? (
        <>
          {roles.includes(userRole) ? (
            <Component />
          ) : (
            <Navigate to="/dashboard" />
          )}
        </>
      ) : (
        <>
          <Navigate to="/authentication/sign-in" />
        </>
      )}
    </>
  );
};

export default Private;
