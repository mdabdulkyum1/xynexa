"use client";
import { useAVToggle, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { Mic, MicOff, Video, VideoOff, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaDesktop } from "react-icons/fa";

function Footer() {
  const router = useRouter();
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useAVToggle();

  const hmsActions = useHMSActions();
  // Use HMS store to check if screen sharing is active
  const isScreenShareEnabled = useHMSStore((state) => state.localPeer?.isScreenShared);

  const handleToggleAudio = async () => {
    try {
      await toggleAudio();
    } catch (error) {
      console.error("Failed to toggle audio:", error);
      alert("Unable to toggle audio. Please try again.");
    }
  };

  const handleToggleVideo = async () => {
    try {
      await toggleVideo();
    } catch (error) {
      console.error("Failed to toggle video:", error);
      alert("Unable to toggle video. Please try again.");
    }
  };

  const handleLeave = async () => {
    try {
      await hmsActions.leave();
      router.push("/dashboard/meetings/meet");
    } catch (error) {
      console.error("Failed to leave call:", error);
      alert("Unable to leave call. Please try again.");
    }
  };

  const handleScreenShare = async () => {
    try {
      const isShare =  await hmsActions.setScreenShareEnabled(!isScreenShareEnabled);
    } catch (error) {
      console.error("Failed to toggle screen share:", error);
      alert("Unable to toggle screen share. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 p-4 flex justify-center gap-4 border-t">
      <button
        className={`px-3 py-1 rounded border flex items-center ${
          isLocalAudioEnabled ? "bg-green-300 border-green-400" : "bg-gray-300 border-gray-400"
        }`}
        onClick={handleToggleAudio}
        title={isLocalAudioEnabled ? "Microphone is on" : "Microphone is off"}
        aria-label={isLocalAudioEnabled ? "Mute microphone" : "Unmute microphone"}
      >
        {isLocalAudioEnabled ? (
          <>
            <Mic size={20} className="mr-1" />
            Mute
          </>
        ) : (
          <>
            <MicOff size={20} className="mr-1" />
            Unmute
          </>
        )}
      </button>

      <button
        className={`px-3 py-1 rounded border flex items-center ${
          isLocalVideoEnabled ? "bg-green-300 border-green-400" : "bg-gray-300 border-gray-400"
        }`}
        onClick={handleToggleVideo}
        title={isLocalVideoEnabled ? "Video is on" : "Video is off"}
        aria-label={isLocalVideoEnabled ? "Hide video" : "Unhide video"}
      >
        {isLocalVideoEnabled ? (
          <>
            <Video size={20} className="mr-1" />
            Hide
          </>
        ) : (
          <>
            <VideoOff size={20} className="mr-1" />
            Unhide
          </>
        )}
      </button>

      <button
        className={`px-3 py-1 rounded border flex items-center ${
          isScreenShareEnabled ? "bg-green-300 border-green-400" : "bg-gray-300 border-gray-400"
        }`}
        onClick={handleScreenShare}
        title={isScreenShareEnabled ? "Stop sharing screen" : "Share screen"}
        aria-label={isScreenShareEnabled ? "Stop sharing screen" : "Share screen"}
      >
        <FaDesktop size={20} className="mr-1" />
        {isScreenShareEnabled ? "Stop Share" : "Share Screen"}
      </button>

      <button
        className="bg-gray-300 px-3 py-1 rounded border border-gray-400 flex items-center"
        onClick={handleLeave}
        title="Leave call"
        aria-label="Leave call"
      >
        <LogOut size={20} className="mr-1" />
        Leave
      </button>
    </div>
  );
}

export default Footer;