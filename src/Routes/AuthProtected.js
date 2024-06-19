import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { getLoggedinUser } from "../helpers/api_helper";
import { useDispatch } from "react-redux";
import { useProfile } from "../Components/Hooks/UserHooks";

const AuthProtected = (props) => {
  const { userProfile, loading, token } = useProfile();

  const location = useLocation();

  const loggedInUser = getLoggedinUser();

  if (!userProfile && loading && !token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  const allAllowedRoutes = loggedInUser?.data.menus
    .map((menu) => {
      return menu?.subItems.map((submenu) => {
        return submenu;
      });
    })
    .flat();

  const allowedRoutesPaths = allAllowedRoutes?.map((route) => {
    return route.link;
  });

  const currentPath = location.pathname;

  if (!allowedRoutesPaths.includes(currentPath)) {
    return (
      <Navigate
        to={{ pathname: "/not-authorized", state: { from: props.location } }}
      />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
