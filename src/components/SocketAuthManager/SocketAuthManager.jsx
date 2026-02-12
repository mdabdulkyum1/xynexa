"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { socket } from "../../lib/socket";


export default function SocketAuthManager() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  useEffect(() => {

    if (status === "loading") return;

    if (!isAuthenticated || !user) {
      if (socket.connected) {
        const email = user?.email;
        if (email) {
          socket.emit("user-offline", { email });
        }
        socket.disconnect();
      }
      return;
    }

    const email = user.email;
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

      if (!isAuthenticated) {
        socket.disconnect();
      }
    };
  }, [isAuthenticated, status, user]);

  return null;
}