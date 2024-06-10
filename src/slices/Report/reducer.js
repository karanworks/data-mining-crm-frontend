import { createSlice } from "@reduxjs/toolkit";
import { getReportData, getReportDataForms } from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  reportData: [],
  reportDataForms: [],
  error: "",
};

const eventSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReportData.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.reportData = action.payload?.data.reportData;
        state.error = "";
      }
    });
    builder.addCase(getReportDataForms.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.reportDataForms = action.payload?.data.reportDataForms;
        state.error = "";
      }
    });
  },
});

export const { getLeadEvents } = eventSlice.actions;
export default eventSlice.reducer;
