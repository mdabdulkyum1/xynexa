'use client'
import { useGetTaskByCurrentUserEmailQuery } from '@/redux/features/Api/TaskApi';
import { useSession } from "next-auth/react";

export default function Page() {

      const { data: session } = useSession();
      const userEmail = session?.user?.email;

      const {data:allTasks}=useGetTaskByCurrentUserEmailQuery(userEmail);

    return (
        <div className='bg-gray-100 dark:bg-[#0A0A0A] py-2 px-2'>
            <h2 className='text-lg font-semibold py-2 '>Your Tasks </h2>
            <TaskControl></TaskControl>
            <TaskBoard  allTasks={allTasks}></TaskBoard>
        </div>
    );
}
