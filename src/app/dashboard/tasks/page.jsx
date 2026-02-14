'use client'
import { useSession } from "next-auth/react";
import useBoardStore from "@/store/useBoardStore";
import { useEffect } from "react";
import TaskControl from "./components/TaskControl";
import TaskBoard from "./components/TaskBoard ";

export default function Page() {

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const { boards: allTasks, fetchBoardsByEmail } = useBoardStore();

  useEffect(() => {
    if (userEmail) {
      fetchBoardsByEmail(userEmail);
    }
  }, [userEmail, fetchBoardsByEmail]);

    return (
        <div className='bg-gray-100 dark:bg-[#0A0A0A] py-2 px-2'>
            <h2 className='text-lg font-semibold py-2 '>Your Tasks </h2>
            <TaskControl></TaskControl>
            <TaskBoard  allTasks={allTasks}></TaskBoard>
        </div>
    );
}
