import { createAsyncThunk } from "@reduxjs/toolkit";

// import {
//   getAssignedWorkData as getAssignedWorkDataApi,
//   createAssignedWorkData as createAssignedWorkDataApi,
//   // updateClient as updateClientApi,
//   // removeClient as removeClientApi,
// } from "../../helpers/fakebackend_helper";

import {
  getCompletedWorkData as getCompletedWorkDataApi,
  removeCompletedWorkData as removeCompletedWorkDataApi,
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

// export const createAssignedWorkData = createAsyncThunk(
//   "assignedWorkData/createAssignedWorkData",
//   async (values, { dispatch }) => {
//     try {
//       const response = await createAssignedWorkDataApi(values);

//       if (response.status === "success") {
//         dispatch(getAssignedWorkData());
//       }
//       return response;
//     } catch (error) {
//       console.log("error inside create assigned work data thunk", error);
//     }
//   }
// );

// export const updateClient = createAsyncThunk(
//   "client/updateClient",
//   async ({ clientId, values, status }) => {
//     try {
//       const response = await updateClientApi(clientId, values, status);
//       return response;
//     } catch (error) {
//       console.log("error inside update client thunk", error);
//     }
//   }
// );

export const removeCompletedWorkData = createAsyncThunk(
  "completedData/removeCompletedWorkData",
  async ({ dataId }) => {
    try {
      const response = await removeCompletedWorkDataApi(dataId);

      return response.data;
    } catch (error) {
      console.log("error inside remove client thunk", error);
    }
  }
);
