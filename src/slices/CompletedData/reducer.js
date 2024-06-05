import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getCompletedWorkData,
  removeCompletedWorkData,
  updateCompletedWorkData,
} from "./thunk";

export const initialState = {
  completedWorkData: [],
  filteredCompletedData: [],
};

const completedWorkDataSlice = createSlice({
  name: "completedData",
  initialState,
  reducers: {
    searchCompletedData(state, action) {
      const inputValue = action.payload.toLowerCase();
      console.log("SEARCH FUNCTION CALLED WITH THIS VALUE ->", action.payload);

      if (inputValue === "") {
        state.filteredCompletedData = [];
      } else {
        state.filteredCompletedData =
          state.completedWorkData?.completedWorkData.filter((data) => {
            return Object.values(data).some((dataVal) => {
              return String(dataVal).toLowerCase().includes(inputValue);
            });
          });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompletedWorkData.fulfilled, (state, action) => {
      console.log(
        "COMPLETED DATA IN REDUCER ->",
        action.payload?.data.completedWorkData
      );
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.completedWorkData = action.payload?.data;
        state.error = "";
      }
    });

    builder.addCase(updateCompletedWorkData.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        // const updatedClientId = action.payload.data.updatedClient.id;
        // state.clients = state.clients.map((client) => {
        //   if (client.id == updatedClientId) {
        //     client = action.payload.data.updatedClient;
        //     return client;
        //   } else {
        //     return client;
        //   }
        // });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Data details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeCompletedWorkData.fulfilled, (state, action) => {
      const deletedCompletedData = action.payload.deletedCompletedData;

      if (Array.isArray(deletedCompletedData)) {
        const deletedCompletedDataIds = deletedCompletedData?.map((data) => {
          return data.id;
        });

        state.completedWorkData.completedWorkData =
          state.completedWorkData.completedWorkData.filter((data) => {
            return !deletedCompletedDataIds.includes(data.id);
          });
      } else {
        state.completedWorkData.completedWorkData =
          state.completedWorkData.completedWorkData.filter(
            (data) => data.id !== deletedCompletedData.id
          );
      }

      state.error = "";
      toast.error("Website data has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });

    // builder.addCase(removeCompletedWorkData.fulfilled, (state, action) => {
    //   const deletedCompletedData = action.payload.deletedCompletedData;

    //   if (Array.isArray(deletedCompletedData)) {
    //     const deletedCompletedDataIds = deletedCompletedData?.map((data) => {
    //       return data.id;
    //     });

    //     state.completedWorkData.completedWorkData =
    //       state.completedWorkData.completedWorkData.filter((data) => {
    //         return !deletedCompletedDataIds.includes(data.id);
    //       });
    //   } else {
    //     state.completedWorkData.completedWorkData =
    //       state.completedWorkData.completedWorkData.filter(
    //         (data) => data.id !== deletedCompletedData.id
    //       );
    //   }

    //   state.error = "";
    //   toast.error("Website data has been removed !", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     theme: "colored",
    //   });
    // });
  },
});

export const { searchCompletedData } = completedWorkDataSlice.actions;
export default completedWorkDataSlice.reducer;
