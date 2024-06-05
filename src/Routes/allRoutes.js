import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

//APi Key
import AddUsers from "../pages/AddUsers";
import Mapping from "../pages/Mapping";
import Home from "../pages/Home";
import ReportUpload from "../pages/ReportUpload";
import TermsAndConditions from "../pages/TermsAndConditions";
import AddWorkData from "../pages/AddWorkData";
import AddClient from "../pages/AddClient";
import CompletedData from "../pages/CompletedData";
import ViewFilledData from "../pages/CompletedData/ViewFilledData";
import AddData from "../pages/AddData";
import CompletedDataEdit from "../pages/CompletedData/CompletedDataEdit";

const authProtectedRoutes = [
  // { path: "/users", component: <Users /> },
  { path: "/home", component: <Home /> },
  { path: "/roles", component: <Mapping /> },
  { path: "/add-users", component: <AddUsers /> },
  { path: "/report-upload", component: <ReportUpload /> },

  // SEPARATOR FOR DATA MINING PROJECT

  { path: "/terms-and-conditions", component: <TermsAndConditions /> },
  { path: "/add-work-data", component: <AddWorkData /> },
  { path: "/add-client", component: <AddClient /> },
  { path: "/completed-data", component: <CompletedData /> },
  { path: "/completed-data/edit", component: <CompletedDataEdit /> },
  { path: "/completed-data/view-data", component: <ViewFilledData /> },
  { path: "/add-data", component: <AddData /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/home" />,
  },
  { path: "*", component: <Navigate to="/home" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
