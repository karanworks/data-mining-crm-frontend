import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAssignedWorkData, createAssignedWorkData } from "./thunk";

export const initialState = {
  assignedWorkData: null,
  allAssignedWrorkData: null,
};

const addWorkDataSlice = createSlice({
  name: "addWorkData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAssignedWorkData.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
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

    // builder.addCase(updateClient.fulfilled, (state, action) => {
    //   if (action.payload.status == "failure") {
    //     state.alreadyRegisteredError = action.payload.message;
    //     state.error = "";
    //   } else {
    //     const updatedClientId = action.payload.data.updatedClient.id;
    //     state.clients = state.clients.map((client) => {
    //       if (client.id == updatedClientId) {
    //         client = action.payload.data.updatedClient;
    //         return client;
    //       } else {
    //         return client;
    //       }
    //     });

    //     state.alreadyRegisteredError = null;
    //     state.error = "";

    //     toast.success("Client details updated !", {
    //       position: "bottom-center",
    //       autoClose: 3000,
    //       theme: "colored",
    //     });
    //   }
    // });

    // builder.addCase(removeClient.fulfilled, (state, action) => {
    //   const deletedClient = action.payload.deletedClient;

    //   console.log("DELETED CLIENT FROM BACKEND ->", deletedClient);

    //   if (Array.isArray(deletedClient)) {
    //     const deletedClientIds = deletedClient?.map((client) => {
    //       return client.id;
    //     });

    //     state.clients = state.clients.filter((client) => {
    //       return !deletedClientIds.includes(client.id);
    //     });
    //   } else {
    //     state.clients = state.clients.filter(
    //       (client) => client.id !== deletedClient.id
    //     );
    //   }

    //   state.error = "";
    //   toast.error("Client has been removed !", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     theme: "colored",
    //   });
    // });
  },
});

export default addWorkDataSlice.reducer;
