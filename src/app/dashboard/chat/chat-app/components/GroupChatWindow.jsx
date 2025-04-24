// components/GroupChatWindow.tsx

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { useGetTeamQuery } from "@/redux/features/Api/teamApi";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const GroupChatWindow = () => {
    // get group _id
    const groupId = useSelector((state) => state.groupChat.groupChatId);

    // get User _id
    const data = useUserDataFromClerk()
    const currentUserId = data?.userData?.user?._id;

    // get group group info and members (by team ID)

    const { data: team, isLoading, isError, error } = useGetTeamQuery(groupId);
    console.log("team", team)


    useEffect(() => {
        fetchGroupInfo()

    }, [currentUserId, groupId])


    const fetchGroupInfo = async () => {

    }


    // Mock data for messages
    const [messages, setMessages] = useState([
        { id: 1, sender: "Alice", text: "Hey team!" },
        { id: 2, sender: "Bob", text: "Hello everyone!" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (newMessage.trim() === "") return;
        const message = {
            id: messages.length + 1,
            sender: "You",
            text: newMessage,
        };
        setMessages([...messages, message]);
        setNewMessage("");
    };

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
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === "You"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-black"
                                }`}
                        >
                            <span className="text-xs block mb-1 font-medium">{msg.sender}</span>
                            {msg.text}
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
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default GroupChatWindow;
