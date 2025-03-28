import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/Slice/userSlice";
import teamReducer from "./features/Slice/teamSlice";
import chatReducer from "./features/Slice/chatSlice";
import { baseApi } from "./features/Api/baseApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
    chat: chatReducer,
    [baseApi.reducerPath]:baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
