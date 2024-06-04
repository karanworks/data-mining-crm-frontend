import { createAsyncThunk } from "@reduxjs/toolkit";

// import {
//   getClients as getClientsApi,
//   createClient as createClientApi,
//   updateClient as updateClientApi,
//   removeClient as removeClientApi,
//   getClientUsers as getClientUsersApi,
// } from "../../helpers/fakebackend_helper";
import {
  getAssignedWorkData as getAssignedWorkDataApi,
  createAssignedWorkData as createAssignedWorkDataApi,
  // updateClient as updateClientApi,
  // removeClient as removeClientApi,
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

// export const removeClient = createAsyncThunk(
//   "client/removeClient",
//   async ({ clientId }) => {
//     try {
//       const response = await removeClientApi(clientId);

//       return response.data;
//     } catch (error) {
//       console.log("error inside remove client thunk", error);
//     }
//   }
// );
