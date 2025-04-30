"use client";

// import { useEffect } from "react";
// import { selectIsConnectedToRoom, selectRoomState, useHMSActions, useHMSStore } from "@100mslive/react-sdk";

// import Conference from './components/Conference';
// import Footer from './components/Footer';
import JoinForm from './components/JoinForm';

const page = () => {
    // const isConnected = useHMSStore(selectIsConnectedToRoom);
    // const hmsActions = useHMSActions();


    // useEffect(() => {
    //     window.onunload = () => {
    //         if (isConnected) {
    //             hmsActions.leave();
    //         }
    //     };
    // }, [hmsActions, isConnected]);

    return (
        // <div className=" bg-white">
        //     {isConnected ? (
        //         <>
        //             {/* <Conference />
        //             <Footer /> */}
        //         </>
        //     ) : (
                <JoinForm />
        //     )}
        // </div>
    );
};

export default page;