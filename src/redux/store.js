import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./features/Slice/teamSlice";
import { baseApi } from "./features/Api/baseApi";

export const store = configureStore({
  reducer: {
    team: teamReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
