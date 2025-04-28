"use client";
import { useVideo } from "@100mslive/react-sdk";

function Peer({ peer }) {
    console.log("peer", peer);
    console.log("peer", peer.name);
    // console.log("peer",  peer.userName);

    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    });
    return (
        <div className="border-4 border-purple-600 rounded-lg">
            <video
                ref={videoRef}
                className={`peer-video ${peer.isLocal ? "local" : ""}`}
                autoPlay
                muted
                playsInline
            />
            <div className="peer-name">
                {peer?.name} {peer.isLocal ? "(You)" : ""}
            </div>
        </div>
    );
}

export default Peer;
