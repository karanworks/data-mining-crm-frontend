import { createAsyncThunk } from "@reduxjs/toolkit";

import { addDataUpload as addDataUploadApi } from "../../helpers/fakebackend_helper";

export const addDataUpload = createAsyncThunk(
  "addData/addDataUpload",
  async (values) => {
    try {
      console.log("VALUES OF DATA WHILE UPLOADING FILE ->", values);
      const response = await addDataUploadApi(values);

      console.log("RESPONSE AFTER FILE UPLOAD ->", response);

      return response;
    } catch (error) {
      console.log("error inside add data thunk", error);
    }
  }
);
