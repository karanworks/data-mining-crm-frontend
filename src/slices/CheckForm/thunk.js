import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  checkFormData as checkFormDataApi,
  recheckFormData as recheckFormDataApi,
} from "../../helpers/fakebackend_helper";

export const formCheck = createAsyncThunk(
  "checkForm/formCheck",
  async (data) => {
    try {
      const response = await checkFormDataApi(data);

      return response;
    } catch (error) {
      console.log("error inside get check form thunk", error);
    }
  }
);
export const formRecheck = createAsyncThunk(
  "checkForm/formRecheck",
  async (token) => {
    try {
      const response = await recheckFormDataApi(token);

      return response;
    } catch (error) {
      console.log("error inside get check form thunk", error);
    }
  }
);
