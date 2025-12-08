import ChatSidebar from "./components/ChatSidebar";


export default function ChatLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-black">

      <div className="w-full md:w-96 border-r border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900">
        <ChatSidebar />
      </div>


      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}