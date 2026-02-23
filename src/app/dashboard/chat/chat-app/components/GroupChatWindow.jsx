"use client"

import { useCallback, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import useChatStore from "@/store/useChatStore";
import useTeamStore from "@/store/useTeamStore";
import { socket } from "../../../../../lib/socket";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";


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
                content: data.content,
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
                        {team?.members && (
                            <div className="flex -space-x-2 overflow-hidden">
                                {team.members.slice(0, 5).map((member, i) => (
                                    <img
                                        key={member._id || i}
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-blue-600 object-cover"
                                        src={member.imageUrl || member.image || "/default-avatar.png"}
                                        alt={member.firstName || member.name}
                                        title={member.firstName || member.name}
                                    />
                                ))}
                                {team.members.length > 5 && (
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 ring-2 ring-blue-600 text-[10px] font-medium text-white">
                                        +{team.members.length - 5}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <ScrollArea className="flex-1 p-4 bg-gray-50">
                    <div className="space-y-3">
                        {groupMsg.map((msg, index) => {
                            const isOwnMessage = msg?.senderId?._id === currentUserId || msg?.senderId === currentUserId;
                            const sender = msg?.senderId;
                            return (
                                <div
                                    key={msg._id || index}
                                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`flex items-start gap-2 ${isOwnMessage ? "flex-row-reverse" : ""}`}
                                    >
                                        <img
                                            src={
                                                isOwnMessage
                                                    ? (session?.user?.image || session?.user?.imageUrl || "/default-avatar.png")
                                                    : (sender?.imageUrl || sender?.image || "/default-avatar.png")
                                            }
                                            className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                                            alt=""
                                        />
                                        <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
                                            {!isOwnMessage && (
                                                <span className="text-[10px] text-gray-500 mb-0.5 ml-1">
                                                    {sender?.firstName || sender?.name || "Member"}
                                                </span>
                                            )}
                                            <div
                                                className={`px-3 py-1.5 rounded-2xl max-w-sm ${isOwnMessage
                                                    ? "bg-purple-600 text-white rounded-tr-none"
                                                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.content}</p>
                                            </div>
                                            <p className="text-[9px] mt-1 opacity-70">
                                                {msg.createdAt
                                                    ? format(parseISO(msg.createdAt), "HH:mm")
                                                    : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>

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
