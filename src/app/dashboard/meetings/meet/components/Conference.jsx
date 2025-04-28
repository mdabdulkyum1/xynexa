"use client";
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";


function Conference() {
  const peers = useHMSStore(selectPeers);
  console.log("peers", peers);
  return (
    <div className="conference-section">
      <h2>Conference</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
}

export default Conference;
