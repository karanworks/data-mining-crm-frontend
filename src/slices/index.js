import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import UsersReducer from "./Users/reducer";
import MappingReducer from "./Mapping/reducer";
import ReportReducer from "./Report/reducer";
import AddClientReducer from "./AddClient/reducer";
import AddUsersReducer from "./AddUsers/reducer";
import AddDataReducer from "./AddData/reducer";
import AddWorkDataReducer from "./AddWorkData/reducer";
import CompletedDataReducer from "./CompletedData/reducer";
import CountReportReducer from "./CountReport/reducer";

// SEPARATER
import AccountReducer from "./auth/register/reducer";
import ProfileReducer from "./auth/profile/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  Users: UsersReducer,
  Mapping: MappingReducer,
  Report: ReportReducer,
  Client: AddClientReducer,
  AddUsers: AddUsersReducer,
  AddData: AddDataReducer,
  AddWorkData: AddWorkDataReducer,
  CompletedData: CompletedDataReducer,
  CountReport: CountReportReducer,
  Profile: ProfileReducer,
});

export default rootReducer;
