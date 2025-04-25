// components/GroupChatWindow.tsx

import { useCallback, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { useGetTeamQuery } from "@/redux/features/Api/teamApi";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import useAxiosPublic from "@/hooks/AxiosPublic/useAxiosPublic";
import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

const GroupChatWindow = () => {


    const [groupMsg, setGroupMsg] = useState([]);
    const [newMessage, setNewMessage] = useState("");


    const axiosPublic = useAxiosPublic()
    // get group _id
    const groupId = useSelector((state) => state.groupChat.groupChatId);

    // get User _id
    const dataHook = useUserDataFromClerk()
    const currentUserId = dataHook?.userData?.user?._id;


    console.log("currentUserId", currentUserId)

    // get group group info and members (by team ID)

    const { data: team, isLoading, isError, error } = useGetTeamQuery(groupId);




    useEffect(() => {
        fetchGroupInfo()
    }, [currentUserId, groupId])

    const fetchGroupInfo = async () => {
        try {
            const { data } = await axiosPublic.get(`/api/groupMessage/${groupId}`);
            setGroupMsg(data)
        } catch (error) {
            console.log("error", error)
        }
    }


    // Mock data for messages
    const sendMessage = useCallback(async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            senderId: currentUserId,
            groupId,
            message: newMessage,
        };

        try {
            const { data } = await axiosPublic.post(
                "/api/groupMessage/send",
                messageData
            );

            const messageId = data?.newGroupMessage?._id

            const newMsg = {
                ...data?.newGroupMessage,
                senderId: {
                    _id: currentUserId,
                    firstName: dataHook?.userData?.user?.firstName,
                    email: dataHook?.userData?.user?.email,
                },
            };

            setGroupMsg((prev) => {
                return [...prev, newMsg];
            });

            // Emit the new message to the socket server
            socket.emit("sentGroupMessage", {
                newMessage,
                groupId,
                senderId: currentUserId,
                messageId,
            });




            // Clear input
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        }
    }, [newMessage, currentUserId, groupId, axiosPublic, groupMsg]);



    // Socket connection for real-time messaging
    useEffect(() => {
        if (!groupId && !currentUserId) return;


        socket.emit("joinGroup", { groupId });

        const handleReceiveGroupMessage = (message) => {
            if (!message) return;
            if (message.senderId === currentUserId) return;
            if (message.groupId !== groupId) return; 


            setGroupMsg((prev) => {
                const exists = prev.some((msg) => msg._id === message._id);
                if (exists) return prev;
                return [...prev, message];
            });
        };


        socket.on("receiveGroupMessage", handleReceiveGroupMessage);

        return () => {
            socket.off("receiveGroupMessage", handleReceiveGroupMessage);
        }


    }, [groupId, currentUserId, newMessage])

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
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 ">
                {groupMsg.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex  ${msg?.senderId?._id === currentUserId ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-2 py-1 rounded-lg max-w-xs ${msg?.senderId?._id === currentUserId
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-black"
                                }`}
                        >
                            <span className="text-xs block mb-1 font-medium">
                                {msg?.senderId?._id === currentUserId ? "You" : msg?.senderId?.firstName}
                            </span>
                            {msg?.message}
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
