"use client"

import { useCallback, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import useChatStore from "@/store/useChatStore";
import useTeamStore from "@/store/useTeamStore";
import useAuthStore from "@/store/useAuthStore";
import { socket } from "../../../../../lib/socket";


const GroupChatWindow = () => {

    const [newMessage, setNewMessage] = useState("");

    const { data: session } = useSession();
    const currentUserId = session?.user?.id;

    const { 
        groupMessages: groupMsg, 
        fetchGroupMessages, 
        sendGroupMessage: sendToStore, 
        addGroupMessage,
        currentGroup
    } = useChatStore();

    const groupId = currentGroup?._id || currentGroup?.id;

    const { currentTeam: team } = useTeamStore();

    useEffect(() => {
        if (groupId) {
            fetchGroupMessages(groupId);
        }
    }, [groupId, fetchGroupMessages]);


    // Mock data for messages
    const sendMessage = useCallback(async () => {
        if (!newMessage.trim() || !groupId || !currentUserId) return;

        const messageData = {
            senderId: currentUserId,
            groupId,
            message: newMessage,
        };

        try {
            const data = await sendToStore(groupId, messageData);
            
            // Emit the new message to the socket server
            socket.emit("sentGroupMessage", {
                newMessage: data.message,
                groupId,
                senderId: currentUserId,
                messageId: data._id,
            });

            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }, [newMessage, currentUserId, groupId, sendToStore]);



    // Socket connection for real-time messaging
    useEffect(() => {
        if (!groupId || !currentUserId) return;

        socket.emit("joinGroup", { groupId });

        const handleReceiveGroupMessage = (message) => {
            if (!message) return;
            if (message.senderId === currentUserId) return;
            if (message.groupId !== groupId) return;

            addGroupMessage(message);
        };

        socket.on("receiveGroupMessage", handleReceiveGroupMessage);

        return () => {
            socket.off("receiveGroupMessage", handleReceiveGroupMessage);
        }
    }, [groupId, currentUserId, addGroupMessage]);

    return (
        <div className="flex flex-col w-full h-[80vh] mx-4 shadow-xl rounded-2xl bg-white overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white text-lg font-semibold px-4 py-3  flex items-center justify-between">
                <h5 className="capitalize">{team?.name}</h5>

                <div className="flex items-center gap-2">
                    <AnimatedTooltip items={team?.members} />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {groupMsg.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex ${msg?.senderId?._id === currentUserId ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`flex items-center gap-2 ${msg?.senderId?._id === currentUserId ? "flex-row-reverse" : ""
                                }`}
                        >
                            <img
                                src={
                                    msg?.senderId?._id === currentUserId
                                        ? (user?.imageUrl || session?.user?.image)
                                        : msg?.senderId?.imageUrl
                                }
                                className="w-6 h-6 rounded-full"
                                alt=""
                            />
                            <p
                                className={`${msg?.senderId?._id === currentUserId
                                        ? "bg-purple-700 text-white px-2 py-[0.4px] rounded-full"
                                        : "bg-gray-200 text-black px-2 py-[0.4px] rounded-full"
                                    }`}
                            >
                                {msg?.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="flex items-center border-t p-3 bg-white">
                <input
                    type="text"
                    className="flex-1 border rounded-xl px-4 py-2 mr-2 outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 cursor-pointer text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default GroupChatWindow;
