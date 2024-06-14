import { createSlice } from "@reduxjs/toolkit";
import { getReportData, getReportDataForms } from "./thunk";
import { formCheck, formRecheck } from "./thunk";

export const initialState = {
  checkedFormsIds: [],
  // recheckFormData: [],
  isEditingAform: false,
  recheckFields: [],
};

const checkFormSlice = createSlice({
  name: "checkForm",
  initialState,
  reducers: {
    checkedForm(state, action) {
      state.checkedFormsIds = [...state.checkedFormsIds, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(formCheck.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.error = "";
      }
    });
    builder.addCase(formRecheck.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.recheckFields = action.payload?.data?.recheckFormData;
        state.isEditingAform = true;
        state.error = "";
      }
    });
  },
});

export const { checkedForm } = checkFormSlice.actions;
export default checkFormSlice.reducer;
