import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaUsers } from "react-icons/fa";

const ChatSidebar = () => {
  // Dummy People & Groups Data
  const people = [
    { id: 1, name: "Anil", status: "Online", img: "https://placehold.co/40x40" },
    { id: 2, name: "Priya", status: "Offline", img: "https://placehold.co/40x40" },
    { id: 3, name: "Raj", status: "Online", img: "https://placehold.co/40x40" },
    { id: 4, name: "Sara", status: "Offline", img: "https://placehold.co/40x40" },
    { id: 5, name: "John", status: "Online", img: "https://placehold.co/40x40" },
  ];

  const groups = [
    { id: 1, name: "React Developers", img: "https://placehold.co/40x40" },
    { id: 2, name: "Gaming Squad", img: "https://placehold.co/40x40" },
    { id: 3, name: "UI Designers", img: "https://placehold.co/40x40" },
  ];

  return (
    <>
      <div className="relative">
          <Card className="w-80 p-4 h-[600px] flex flex-col">
      {/* Search Bar */}
      <div className="mb-4">
        <Input type="text" placeholder="Search..." className="w-full" />
      </div>

      {/* Scrollable List */}
      <ScrollArea className="flex-1 overflow-y-auto">
        {/* People Section */}
        <h3 className="text-lg font-medium text-gray-800 mb-3">People</h3>
        <div className="mb-4 space-y-3">
          {people.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer transition"
            >
              <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className={`text-xs ${user.status === "Online" ? "text-green-500" : "text-gray-500"}`}>
                  {user.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Groups Section */}
        <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
          <FaUsers className="mr-2" /> Groups
        </h3>
        <div className="space-y-3">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer transition"
            >
              <img src={group.img} alt={group.name} className="w-10 h-10 rounded-full mr-3" />
              <p className="text-sm font-medium text-gray-800">{group.name}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
          </Card>

      </div>
    </>
  );
};

export default ChatSidebar;
