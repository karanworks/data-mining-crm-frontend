import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addDataUpload } from "./thunk";

export const initialState = {
  data: [],
};

const addDataSlice = createSlice({
  name: "addData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDataUpload.fulfilled, (state, action) => {
      console.log("CLIENT payload ->", action?.payload);
    });
  },
});

export default addDataSlice.reducer;
