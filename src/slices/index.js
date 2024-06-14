import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import UsersReducer from "./Users/reducer";
import MappingReducer from "./Mapping/reducer";
import ReportReducer from "./Report/reducer";
import AddClientReducer from "./AddClient/reducer";
import AddDataReducer from "./AddData/reducer";
import AddWorkDataReducer from "./AddWorkData/reducer";
import CompletedDataReducer from "./CompletedData/reducer";
import CountReportReducer from "./CountReport/reducer";
import ProfileReducer from "./Profile/reducer";

// SEPARATER
import AccountReducer from "./auth/register/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  Users: UsersReducer,
  Mapping: MappingReducer,
  Report: ReportReducer,
  Client: AddClientReducer,
  AddData: AddDataReducer,
  AddWorkData: AddWorkDataReducer,
  CompletedData: CompletedDataReducer,
  CountReport: CountReportReducer,
  Profile: ProfileReducer,
});

export default rootReducer;
