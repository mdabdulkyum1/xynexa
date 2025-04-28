"use client";
import { useHMSActions } from "@100mslive/react-sdk";
import { useState } from "react";
import { Video } from "lucide-react";
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

function JoinForm() {

  const router = useRouter();

  const { userData } = useUserDataFromClerk();



  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    userName: "",
    token: "",
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName = "", roomCode = "qlg-drpd-fml" } = inputValues;

    router.push("/dashboard/meetings/meet/" + roomCode);

    // // use room code to fetch auth token
    // const authToken = await hmsActions.getAuthTokenByRoomCode({
    //   roomCode,
    //   endpoint: "https://api.100ms.live/v2/rtc/token",
    // });


    // try {
    //   await hmsActions.join({ userName, authToken });
    // } catch (e) {
    //   console.error(e);
    // }
  };



  const handleNewMeeting = () => {


    const name = userData?.user?.firstName + " " + userData?.user?.lastName;
    const imageUrl = userData?.user?.imageUrl;

    const meetUserData = {
      name,
      imageUrl,
      timestamp: new Date(),
    };

    socket.emit("createRoom", meetUserData)

    socket.on("RoomCreated", (roomCode, name, timestamp) => {
      console.log("Room Created", roomCode, name, timestamp)



      router.push("/dashboard/meetings/meet/" + roomCode);
    })


  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <div className="flex flex-wrap gap-8 w-full max-w-7xl">

        {/* Left Section */}
        <div className="grid grid-cols-2 gap-6 flex-1 min-w-[300px]">

          <button
            className="flex flex-col items-center justify-center rounded-2xl p-6 backdrop-blur-md bg-white/30 dark:bg-white/10 text-gray-800 dark:text-white shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
            onClick={handleNewMeeting}
          >
            <Video className="w-10 h-10 mb-2" />
            <span className="font-semibold">New Meeting</span>
          </button>

        </div>


        {/* Right Section - Join Room Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 w-full max-w-md p-8 backdrop-blur-md bg-white/30 dark:bg-white/10 shadow-lg rounded-2xl space-y-6 min-w-[300px]"
        >
          <h2 className="text-2xl font-bold text-center text-[#5f9090] dark:text-[#5f9090]">
            Join Room
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                required
                value={inputValues.name}
                onChange={handleInputChange}
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5f9090]"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="room-code"
                className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Room Code
              </label>
              <input
                id="room-code"
                type="text"
                name="roomCode"
                placeholder="Enter room code"
                value={inputValues.roomCode}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5f9090]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#5f9090] hover:bg-[#4a7373] text-white font-semibold rounded-md transition-colors duration-300 dark:bg-[#5f9090] dark:hover:bg-[#4a7373]"
          >
            Join
          </button>
        </form>

      </div>
    </div>
  );
}

export default JoinForm;
