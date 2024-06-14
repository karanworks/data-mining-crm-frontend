import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getReportData as getReportDataApi,
  getReportDataForms as getReportDataFormsApi,
} from "../../helpers/fakebackend_helper";

export const getReportData = createAsyncThunk(
  "report/getReportData",
  async () => {
    try {
      const response = await getReportDataApi();

      return response;
    } catch (error) {
      console.log("error inside get report data thunk", error);
    }
  }
);
export const getReportDataForms = createAsyncThunk(
  "report/getReportDataForms",
  async (token) => {
    try {
      const response = await getReportDataFormsApi(token);

      return response;
    } catch (error) {
      console.log("error inside get report data forms thunk", error);
    }
  }
);
