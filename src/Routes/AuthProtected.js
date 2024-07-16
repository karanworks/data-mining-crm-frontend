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

  // these routes are not present in the database hence pushing them manually
  if (allowedRoutesPaths.includes("/count-report")) {
    allowedRoutesPaths.push(
      "/count-report/working-users",
      "/count-report/assigned-data",
      "/count-report/for-checking",
      "/count-report/verified-data"
    );
  }

  if (allowedRoutesPaths.includes("/completed-data")) {
    allowedRoutesPaths.push(
      "/completed-data/edit",
      "/completed-data/view-data"
    );
  }
  if (allowedRoutesPaths.includes("/report")) {
    allowedRoutesPaths.push(
      "/report/check-form-data",
      "/report/view-form-data"
    );
  }

  // adding the home and profile route manually
  allowedRoutesPaths.push("/");
  allowedRoutesPaths.push("/profile");

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
