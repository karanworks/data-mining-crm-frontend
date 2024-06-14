import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAssignedWorkData as getAssignedWorkDataApi,
  createAssignedWorkData as createAssignedWorkDataApi,
} from "../../helpers/fakebackend_helper";

export const getAssignedWorkData = createAsyncThunk(
  "assignedWorkData/getAssignedWorkData",
  async () => {
    try {
      const response = await getAssignedWorkDataApi();
      return response;
    } catch (error) {
      console.log("error inside get assigned work data thunk", error);
    }
  }
);

export const createAssignedWorkData = createAsyncThunk(
  "assignedWorkData/createAssignedWorkData",
  async (values, { dispatch }) => {
    try {
      const response = await createAssignedWorkDataApi(values);

      if (response.status === "success") {
        dispatch(getAssignedWorkData());
      }
      return response;
    } catch (error) {
      console.log("error inside create assigned work data thunk", error);
    }
  }
);
