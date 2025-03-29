import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUserId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const { setSelectedUserId } = chatSlice.actions;
export default chatSlice.reducer;
