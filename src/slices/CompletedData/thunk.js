import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCompletedWorkData as getCompletedWorkDataApi,
  removeCompletedWorkData as removeCompletedWorkDataApi,
  updateCompletedWorkData as updateCompletedWorkDataApi,
  filterCompletedWorkData as filterCompletedWorkDataApi,
  // updateClient as updateClientApi,
  // removeClient as removeClientApi,
} from "../../helpers/fakebackend_helper";

export const getCompletedWorkData = createAsyncThunk(
  "completedData/getCompletedWorkData",
  async () => {
    try {
      const response = await getCompletedWorkDataApi();
      return response;
    } catch (error) {
      console.log("error inside get completed work data thunk", error);
    }
  }
);

export const updateCompletedWorkData = createAsyncThunk(
  "completedData/updateCompletedWorkData",
  async (data) => {
    try {
      const response = await updateCompletedWorkDataApi(data);
      return response;
    } catch (error) {
      console.log("error inside update completed work data thunk", error);
    }
  }
);

export const removeCompletedWorkData = createAsyncThunk(
  "completedData/removeCompletedWorkData",
  async ({ dataId }) => {
    try {
      const response = await removeCompletedWorkDataApi(dataId);

      return response.data;
    } catch (error) {
      console.log("error inside remove completed work data thunk", error);
    }
  }
);
export const filterCompletedWorkData = createAsyncThunk(
  "completedData/filterCompletedWorkData",
  async (data) => {
    try {
      console.log("GETTING DATA IN THUNK", data);
      const response = await filterCompletedWorkDataApi(data);

      return response;
    } catch (error) {
      console.log("error inside filter completed work data thunk", error);
    }
  }
);
