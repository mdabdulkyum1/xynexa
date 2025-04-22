"use client";

import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
import GroupChatWindow from "./GroupChatWindow";

const ChatWrapper = () => {
  const receiverId = useSelector((state) => state.chat.selectedUserId);
  const groupId = useSelector((state) => state.groupChat.groupChatId);
 

  return (
    <>
      {groupId ? (
        <GroupChatWindow />
      ) : receiverId ? (
        <ChatWindow />
      ) : (
        <div className="text-center text-gray-500 mt-10">Select a user or group to start chatting</div>
      )}
    </>
  );
};

export default ChatWrapper;
