import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCenters, createCenter, removeCenter, updateCenter } from "./thunk";

export const initialState = {
  centers: [], // list of all users
  alreadyRegisteredError: null, // if user with same email, mobile number already registered
  error: "",
};

const centersSlice = createSlice({
  name: "centers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCenters.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.centers = action.payload?.data.centers;
        state.error = "";
      }
    });

    builder.addCase(createCenter.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.centers = [...state.centers, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Center has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateCenter.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedCenterId = action.payload.data.updatedCenter.id;
        state.centers = state.centers.map((center) => {
          if (center.id == updatedCenterId) {
            center = action.payload.data.updatedCenter;
            return center;
          } else {
            return center;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Centers details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeCenter.fulfilled, (state, action) => {
      const deletedCenterId = action.payload.deletedCenter.id;
      state.centers = state.centers.filter(
        (center) => center.id !== deletedCenterId
      );
      state.error = "";
      toast.error("Center has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default centersSlice.reducer;
