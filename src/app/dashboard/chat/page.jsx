"use client";

import useChatStore from "@/store/useChatStore";

export default function ChatPage() {
  const currentChatPartner = useChatStore((state) => state.currentChatPartner);
  const currentGroup = useChatStore((state) => state.currentGroup);

  const isChatOpen = currentChatPartner || currentGroup;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
      {isChatOpen ? (
        <>
          {groupChatId ? (
            <GroupChatWindow />
          ) : (
            <ChatWindow />
          )}
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <Image
              src="/assets/images/Conversation-pana.png"
              alt="Start chatting"
              width={400}
              height={400}
              className="mx-auto mb-8"
            />
            <h2 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-4">
              Stay connected with friends and colleagues.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discuss ideas, share updates, and work together effortlessly!
            </p>
            <p className="mt-6 text-sm text-gray-500">
              ← Select a conversation from the left to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}