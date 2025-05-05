"use client";

import { useVideo, useHMSStore, selectIsPeerVideoEnabled } from "@100mslive/react-sdk";

export default function Peer({ peer }) {

    let profileImage = "";
    try {
        const metadataObj = JSON.parse(peer.metadata);
        profileImage = metadataObj?.profileImage;
    } catch (error) {
        console.error("Failed to parse peer metadata:", error);
    }

    // const { videoRef } = useVideo({
    //     trackId: peer.videoTrack,
    // });

    const { videoRef } = useVideo({
        trackId: peer.screenTrack || peer.videoTrack, 
    });


    const isVideoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));

    return (
        <div
            className={`relative rounded-[17px] overflow-hidden shadow-lg bg-gray-700 aspect-video ${peer.isLocal ? "border-purple-900" : "border-red-500"
                } border-[8px]`}
        >
            {isVideoOn ? (
                <video
                    ref={videoRef}
                    className={`peer-video ${peer.isLocal ? "local" : ""} w-full h-full object-cover rounded-lg`}
                    autoPlay
                    muted
                    playsInline
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-600 rounded-lg">
                    <img
                        src={profileImage || "/default-avatar.png"}
                        alt={`${peer?.name}'s profile`}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
            )}
            <div className="absolute bottom-0 left-0 bg-black/75 text-slate-100 px-2 py-[1px] rounded-md text-sm font-light">
                {peer?.name} {peer.isLocal ? "(You)" : ""}
            </div>
        </div>
    );
}