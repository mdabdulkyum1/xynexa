"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { socket } from "../../lib/socket";

export default function SocketAuthManager() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;
  const [isConnected, setIsConnected] = useState(false);
  const hasEmittedOnline = useRef(false);

  useEffect(() => {
    if (status === "loading") return;

    // Handle unauthenticated state
    if (!isAuthenticated || !user) {
      if (socket.connected) {
        const email = user?.email;
        if (email) {
          socket.emit("user-offline", { email });
        }
        socket.disconnect();
        setIsConnected(false);
      }
      hasEmittedOnline.current = false;
      return;
    }

    const email = user.email;
    const userId = user.id || user._id || user.sub; // Robust ID extraction

    if (!email || !userId) {
      console.warn("SocketAuthManager: Missing email or userId", { email, userId, user });
      return;
    }

    // Connect socket if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // Socket connection handlers
    // Socket connection handlers
    const onConnect = () => {
      console.log(`✅ Socket connected: ${email}`);
      setIsConnected(true);
      
      // Join rooms
      socket.emit("join", { email });
      socket.emit("joinUserRoom", { userId }); 
      
      // Mark as online immediately
      hasEmittedOnline.current = true;
      console.log(`🟢 User ${email} is now ONLINE`);
    };

    const onDisconnect = () => {
      console.log(`❌ Socket disconnected: ${email}`);
      setIsConnected(false);
      hasEmittedOnline.current = false;
    };
    
    // Attach socket event listeners
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    
    // Join main user room if email exists (backup)
    if (session?.user?.email) {
        socket.emit("join", { email: session.user.email });
    }

    // If already connected, emit join immediately
    if (socket.connected && !hasEmittedOnline.current) {
      onConnect();
    }

    // Improved beforeunload handler
    const handleBeforeUnload = (e) => {
      socket.emit("user-offline", { email });
      socket.emit("leaveUserRoom", userId);
      // Beacon logic...
    };

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        socket.emit("user-offline", { email });
      } else {
        if (!socket.connected) {
          socket.connect();
        } else {
          socket.emit("join", { email });
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      
      socket.emit("user-offline", { email });
      socket.emit("leaveUserRoom", userId);
    };
  }, [isAuthenticated, status, user]);

  return null;
}