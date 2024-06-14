import { createAsyncThunk } from "@reduxjs/toolkit";

import { addDataUpload as addDataUploadApi } from "../../helpers/fakebackend_helper";

export const addDataUpload = createAsyncThunk(
  "addData/addDataUpload",
  async (values) => {
    try {
      const response = await addDataUploadApi(values);

      return response;
    } catch (error) {
      console.log("error inside add data thunk", error);
    }
  }
);
