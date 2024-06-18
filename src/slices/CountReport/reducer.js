import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCountReportData, filterReportData } from "./thunk";

export const initialState = {
  userData: null,
  countReportData: null,
  searchedData: null,
};

const countReportSlice = createSlice({
  name: "countReport",
  initialState,
  reducers: {
    searchData(state, action) {
      const inputValue = action.payload.toLowerCase();

      if (inputValue === "") {
        state.searchedData = [];
      } else {
        state.searchedData = state.countReportData.filter((data) => {
          return Object.values(data).some((dataVal) => {
            return String(dataVal).toLowerCase().includes(inputValue);
          });
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountReportData.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.userData = action.payload.data;
        state.countReportData = action.payload.data.clients;
        state.error = "";
      }
    });

    builder.addCase(filterReportData.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.searchedData = [...action.payload.data.filteredData];
        state.alreadyRegisteredError = null;
        state.error = "";
      }
    });
  },
});

export const { searchData } = countReportSlice.actions;
export default countReportSlice.reducer;
