"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { socket } from "@/lib/socket";

export default function SocketAuthManager() {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      if (socket.connected) {
        
        const email = user?.primaryEmailAddress?.emailAddress;
        if (email) {
          socket.emit("user-offline", { email });
        }
        socket.disconnect();
      }
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", { email });

    const handleBeforeUnload = () => {
      socket.emit("user-offline", { email });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.emit("user-offline", { email });
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // socket.disconnect(); // চাইলে এখানে নয়, শুধু logout এ ব্যবহার করতে পারিস
    };
  }, [isSignedIn, isLoaded, user]);

  return null;
}
