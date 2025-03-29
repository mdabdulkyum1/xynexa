import ChatSidebar from "./components/ChatSidebar";
import Sidebar from "./components/Sidebar";

export default function ChatLayout({ children }) {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <main className="w-full">
        {/* Main Chat Section */}
        <div className="flex flex-1 overflow-hidden">
          <ChatSidebar />
          <div className="flex-1 flex flex-col">{children}</div>
        </div>
      </main>
    </div>
  );
}
