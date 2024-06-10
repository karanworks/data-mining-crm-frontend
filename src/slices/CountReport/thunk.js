import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCountReportData as getCountReportDataApi,
  filterReportData as filterReportDataApi,
} from "../../helpers/fakebackend_helper";

export const getCountReportData = createAsyncThunk(
  "countReport/getCountReportData",
  async () => {
    try {
      const response = await getCountReportDataApi();
      console.log("COUNT REPORT DATA IN THUNK ->", response);
      return response;
    } catch (error) {
      console.log("error inside get count report data thunk", error);
    }
  }
);
export const filterReportData = createAsyncThunk(
  "countReport/filterReportData",
  async (data) => {
    try {
      const response = await filterReportDataApi(data);
      return response;
    } catch (error) {
      console.log("error inside get count report data thunk", error);
    }
  }
);
