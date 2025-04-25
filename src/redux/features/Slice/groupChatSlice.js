import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupChatId: null,
 };


 const groupChatSlice = createSlice({
   name: "groupChat",
   initialState,
   reducers: {
    setGroupChatId: (state, action) => {
       state.groupChatId = action.payload;
       state.selectedUserId = null;
     },
   },
 });
 
 export const { setGroupChatId } = groupChatSlice.actions;
 export default groupChatSlice.reducer;
 