import { createSlice } from "@reduxjs/toolkit";
// import { getUsers, createUser, removeUser, updateUser } from "./thunk";
import {
  getCenterUsers,
  createCenterUser,
  removeCenterUser,
  updateCenterUser,
} from "./thunk";
import { toast } from "react-toastify";

export const initialState = {
  users: [],
  alreadyRegisteredError: null,
  error: "",
};

const usersSlice = createSlice({
  name: "addUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCenterUsers.fulfilled, (state, action) => {
      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.users = action.payload?.data.users;
        state.error = "";
      }
    });

    builder.addCase(createCenterUser.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        state.users = [...state.users, action.payload.data];
        state.alreadyRegisteredError = null;
        state.error = "";
        toast.success("Center user has been added !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(updateCenterUser.fulfilled, (state, action) => {
      if (action.payload.status == "failure") {
        state.alreadyRegisteredError = action.payload.message;
        state.error = "";
      } else {
        const updatedCenterUserId = action.payload.data.updatedCenterUser.id;
        state.users = state.users.map((user) => {
          if (user.id == updatedCenterUserId) {
            user = action.payload.data.updatedCenterUser;
            return user;
          } else {
            return user;
          }
        });

        state.alreadyRegisteredError = null;
        state.error = "";

        toast.success("Center User details updated !", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });

    builder.addCase(removeCenterUser.fulfilled, (state, action) => {
      const deletedCenterUserId = action.payload.id;
      state.users = state.users.filter(
        (user) => user.id !== deletedCenterUserId
      );
      state.error = "";
      toast.error("Center user has been removed !", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    });
  },
});

export default usersSlice.reducer;
