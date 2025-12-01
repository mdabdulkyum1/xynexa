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
    const userId = user.id; 

    if (!email || !userId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", { email });

    socket.emit("joinUserRoom", userId);

    console.log(`Connected: ${email} | UserID Room: ${userId}`);

    const handleBeforeUnload = () => {
      socket.emit("user-offline", { email });
      socket.emit("leaveUserRoom", userId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.emit("user-offline", { email });
      socket.emit("leaveUserRoom", userId);
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (!isSignedIn) {
        socket.disconnect();
      }
    };
  }, [isSignedIn, isLoaded, user]);

  return null;
}