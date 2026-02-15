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
    const handleConnect = () => {
      console.log(`✅ Socket connected: ${email}`);
      setIsConnected(true);
      
      // Join rooms
      console.log(`Socket: Joining rooms with email: ${email} and userId: ${userId}`);
      socket.emit("join", { email });
      socket.emit("joinUserRoom", { userId }); // Changed to object payload for consistency
      
      // Mark as online immediately
      hasEmittedOnline.current = true;
      console.log(`🟢 User ${email} is now ONLINE`);
    };

    const handleDisconnect = () => {
      console.log(`❌ Socket disconnected: ${email}`);
      setIsConnected(false);
      hasEmittedOnline.current = false;
    };

    const handleConnectError = (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    };

    // Attach socket event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    // If already connected, emit join immediately
    if (socket.connected && !hasEmittedOnline.current) {
      handleConnect();
    }

    // Improved beforeunload handler with Beacon API fallback
    const handleBeforeUnload = (e) => {
      // Emit offline status via socket
      socket.emit("user-offline", { email });
      socket.emit("leaveUserRoom", userId);

      // Beacon API fallback for more reliable offline detection
      if (navigator.sendBeacon) {
        const offlineData = JSON.stringify({ email, userId, action: "offline" });
        const beaconUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/online/beacon-offline`;
        navigator.sendBeacon(beaconUrl, offlineData);
      }
    };

    // Handle visibility change (tab hidden/shown)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden - could be closing
        socket.emit("user-offline", { email });
      } else {
        // Tab is visible again - reconnect if needed
        if (!socket.connected) {
          socket.connect();
        } else {
          socket.emit("join", { email });
        }
      }
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup function
    return () => {
      socket.emit("user-offline", { email });
      socket.emit("leaveUserRoom", userId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);

      if (!isAuthenticated) {
        socket.disconnect();
      }
    };
  }, [isAuthenticated, status, user]);

  return null;
}