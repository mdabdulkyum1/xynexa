"use client";
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import Conference from "../components/Conference";
import Footer from "../components/Footer";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { userData } = useUserDataFromClerk();
  const { meetRoom: roomCode } = useParams();

  const userName = userData?.user?.firstName && userData?.user?.lastName 
    ? `${userData.user.firstName} ${userData.user.lastName}` 
    : null;

  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  useEffect(() => {
    if (roomCode && !isConnected && userName) {
      startMeeting();
    }
  }, [roomCode, isConnected, userName, hmsActions]);

  const startMeeting = async () => {
    try {
      // Use room code to fetch auth token
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode,
        endpoint: "https://api.100ms.live/v2/rtc/token",
      });

      await hmsActions.join({ userName, authToken });
    } catch (e) {
      console.error("Error starting meeting:", e);
    }
  };

  if (!userName) {
    return <div>Please log in to join the meeting</div>;
  }

  return (
    <div className="bg-white">
      {isConnected ? (
        <>
          <Conference />
          <Footer />
        </>
      ) : (
        <div>Loading meeting...</div>
      )}
    </div>
  );
};

export default Page;