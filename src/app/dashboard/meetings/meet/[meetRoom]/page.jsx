"use client";
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import Conference from "../components/Conference";
import Footer from "../components/Footer";
import JoinForm from "../components/JoinForm";
import { useParams } from "next/navigation";
import { useEffect } from "react";



const page = () => {
    const { userData } = useUserDataFromClerk();
    const { meetRoom: roomCode } = useParams()

    const userName = userData?.user?.firstName + " " + userData?.user?.lastName;



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
        startMeeting()

    }, [roomCode, userData])

    const startMeeting = async () => {

        // use room code to fetch auth token
        const authToken = await hmsActions.getAuthTokenByRoomCode({
            roomCode,
            endpoint: "https://api.100ms.live/v2/rtc/token",
        });


        try {
            await hmsActions.join({ userName, authToken });
        } catch (e) {
            console.error(e);
        }
    }



    return (
        <div className="bg-white">
            {isConnected ? (
                <>
                    <Conference />
                    <Footer />
                </>
            ) : (
                <JoinForm />
            )}
        </div>
    );
};

export default page;