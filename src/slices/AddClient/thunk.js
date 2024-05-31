import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getClients as getClientsApi,
  createClient as createClientApi,
  updateClient as updateClientApi,
  removeClient as removeClientApi,
} from "../../helpers/fakebackend_helper";

export const getClients = createAsyncThunk("client/getClients", async () => {
  try {
    const response = await getClientsApi();
    return response;
  } catch (error) {
    console.log("error inside get client thunk", error);
  }
});

export const createClient = createAsyncThunk(
  "client/createClient",
  async (values) => {
    try {
      const response = await createClientApi(values);

      return response;
    } catch (error) {
      console.log("error inside create client thunk", error);
    }
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async ({ clientId, values }) => {
    try {
      const response = await updateClientApi(clientId, values);
      return response;
    } catch (error) {
      console.log("error inside update client thunk", error);
    }
  }
);

export const removeClient = createAsyncThunk(
  "client/removeClient",
  async ({ clientId }) => {
    try {
      const response = await removeClientApi(clientId);

      return response.data;
    } catch (error) {
      console.log("error inside remove client thunk", error);
    }
  }
);
