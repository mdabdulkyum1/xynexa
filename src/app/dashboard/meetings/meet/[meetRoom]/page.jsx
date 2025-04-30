"use client";

import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import Conference from "../components/Conference";
import Footer from "../components/Footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [isStarting, setIsStarting] = useState(false);
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
      setIsStarting(true);
      const timer = setTimeout(() => {
        startMeeting();
        setIsStarting(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [roomCode, isConnected, userName, hmsActions]);

  const startMeeting = async () => {
    try {
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode,
        endpoint: "https://api.100ms.live/v2/rtc/token",
      });

      await hmsActions.join({
        userName,
        authToken,
        metaData: JSON.stringify({
          profileImage: userData?.user?.imageUrl || "",
        }),
      });
    } catch (e) {
      console.error("Error starting meeting:", e);
    }
  };





  return (
    <div className=" bg-gray-100 h-full flex flex-col justify-between font-roboto">
      {isConnected ? (
        <>
          <div className="flex-1">
            <Conference />
          </div>
          <Footer />
        </>
      ) : isStarting ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl font-medium text-gray-700">Loading your meeting...</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
