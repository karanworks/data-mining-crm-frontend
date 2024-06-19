import { createSlice } from "@reduxjs/toolkit";
import { formCheck, formRecheck } from "./thunk";

export const initialState = {
  checkedFormsIds: [],
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
        console.log("RECHECK FORM DATA ->", action.payload?.data);
        state.recheckFields = action.payload?.data?.recheckFormData;
        state.error = "";
      }
    });
  },
});

export const { checkedForm, resetRecheckFields } = checkFormSlice.actions;
export default checkFormSlice.reducer;
