import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAssignedWorkData, createAssignedWorkData } from "./thunk";

export const initialState = {
  assignedWorkData: null,
  allAssignedWrorkData: null,
  logoutError: "",
};

const addWorkDataSlice = createSlice({
  name: "addWorkData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAssignedWorkData.fulfilled, (state, action) => {
      if (action.payload?.message === "User not logged in!") {
        state.logoutError = action.payload?.message;
      } else if (action.payload?.status === "failure") {
        state.error = action.payload?.message;
      } else {
        state.allAssignedWrorkData = action.payload?.data.assignedWorkData;
        const singleData = action.payload?.data.assignedWorkData.find(
          (data) => {
            return data.status == 0;
          }
        );
        state.assignedWorkData = singleData;
        state.error = "";
      }
    });

    builder.addCase(createAssignedWorkData.fulfilled, (state, action) => {
      console.log("createAssignedWorkData ->", action.payload);
      if (action.payload.status == "failure") {
        state.error = action.payload.message;
      } else {
        toast.success("Data submitted !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
  },
});

export default addWorkDataSlice.reducer;
