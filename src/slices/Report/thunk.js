import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getEvents as getEventsApi,
//   createEvent as createEventApi,
//   removeEvent as removeEventApi,
//   updateEvent as updateEventApi,
// } from "../../helpers/fakebackend_helper";

import { getReportData as getReportDataApi } from "../../helpers/fakebackend_helper";

export const getReportData = createAsyncThunk(
  "report/getReportData",
  async () => {
    try {
      const response = await getReportDataApi();

      return response;
    } catch (error) {
      console.log("error inside get report data thunk", error);
    }
  }
);

// export const createEvent = createAsyncThunk(
//   "report/createEvent",
//   async (data) => {
//     try {
//       console.log("EVENTS IN CREATE EVENT THUNK ->", data);
//       const response = await createEventApi(data);

//       return response;
//     } catch (error) {
//       console.log("error inside get event thunk", error);
//     }
//   }
// );

// export const updateEvent = createAsyncThunk(
//   "report/updateEvent",
//   async ({ eventName, eventDate, listEventId: eventId, status }) => {
//     try {
//       const response = await updateEventApi({
//         eventName,
//         eventDate,
//         eventId,
//         status,
//       });

//       return response;
//     } catch (error) {
//       console.log("error inside update event thunk", error);
//     }
//   }
// );

// export const removeEvent = createAsyncThunk(
//   "report/removeEvent",
//   async (listEventId) => {
//     try {
//       const response = await removeEventApi(listEventId);

//       return response;
//     } catch (error) {
//       console.log("error inside remove event thunk", error);
//     }
//   }
// );
