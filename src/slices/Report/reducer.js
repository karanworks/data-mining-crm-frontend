import { createSlice } from "@reduxjs/toolkit";
import { getReportData, getReportDataForms } from "./thunk";

import { toast } from "react-toastify";

export const initialState = {
  reportData: [],
  reportDataForms: [],
  error: "",
};

const eventSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReportData.fulfilled, (state, action) => {
      console.log("DATA PAYLOAD ON REPORT GET REQUEST ->", action.payload);

      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.reportData = action.payload?.data.reportData;
        state.error = "";
      }
    });
    builder.addCase(getReportDataForms.fulfilled, (state, action) => {
      console.log(
        "DATA PAYLOAD ON REPORT FORMS GET REQUEST ->",
        action.payload
      );

      if (action.payload.status === "failure") {
        state.error = action.payload.message;
      } else {
        state.reportDataForms = action.payload?.data.reportDataForms;
        state.error = "";
      }
    });

    // builder.addCase(createEvent.fulfilled, (state, action) => {
    //   if (action.payload.status == "failure") {
    //     state.error = action.payload.message;
    //   } else {
    //     state.leadEvents = [...state.leadEvents, action.payload.data];
    //     state.error = "";

    //     toast.success("Event has been added !", {
    //       position: "bottom-center",
    //       autoClose: 3000,
    //       theme: "colored",
    //     });
    //   }
    // });

    // builder.addCase(updateEvent.fulfilled, (state, action) => {
    //   if (action.payload.status == "failure") {
    //     state.error = action.payload.message;
    //   } else {
    //     const updatedEventId = action.payload.data?.updatedEvent.id;

    //     if (action.payload.data?.updatedEvent.status === 0) {
    //       state.leadEvents = state.leadEvents.filter(
    //         (event) => event.id !== updatedEventId
    //       );
    //       state.error = "";

    //       toast.error("Event has been removed !", {
    //         position: "bottom-center",
    //         autoClose: 3000,
    //         theme: "colored",
    //       });
    //     } else {
    //       state.leadEvents = state.leadEvents.map((event) => {
    //         if (event.id == updatedEventId) {
    //           event = action.payload.data.updatedEvent;
    //           return event;
    //         } else {
    //           return event;
    //         }
    //       });

    //       state.error = "";
    //       toast.success("Event details updated !", {
    //         position: "bottom-center",
    //         autoClose: 3000,
    //         theme: "colored",
    //       });
    //     }
    //   }
    // });
  },
});

export const { getLeadEvents } = eventSlice.actions;
export default eventSlice.reducer;
