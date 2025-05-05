"use client";
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";


function Conference() {
  const peers = useHMSStore(selectPeers);
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-12 max-w-7xl mx-auto">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
}

export default Conference;
