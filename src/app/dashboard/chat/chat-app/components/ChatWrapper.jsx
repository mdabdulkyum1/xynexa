import useChatStore from "@/store/useChatStore";
import ChatWindow from "./ChatWindow";
import GroupChatWindow from "./GroupChatWindow";

const ChatWrapper = () => {
  const { currentChatPartner, currentGroup } = useChatStore();

  return (
    <>
      {currentGroup ? (
        <GroupChatWindow />
      ) : currentChatPartner?._id ? (
        <ChatWindow />
      ) : (
        <div className="text-center text-gray-500 mt-10">Select a user or group to start chatting</div>
      )}
    </>
  );
};

export default ChatWrapper;
