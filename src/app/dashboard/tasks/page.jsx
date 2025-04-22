'use client'
import { useGetTaskByCurrentUserEmailQuery } from '@/redux/features/Api/TaskApi';
import { useUser } from '@clerk/nextjs';
import TaskBoard from './components/TaskBoard ';
import TaskControl from './components/TaskControl';


export default function Page() {

      const { user } = useUser();
      const userEmail = user?.emailAddresses[0]?.emailAddress;

      const {data:allTasks}=useGetTaskByCurrentUserEmailQuery(userEmail);

    return (
        <div className='bg-gray-100 dark:bg-[#0A0A0A] py-2 px-2'>
            <h2 className='text-lg font-semibold py-2 '>Your Tasks </h2>
            <TaskControl></TaskControl>
            <TaskBoard  allTasks={allTasks}></TaskBoard>
        </div>
    );
}
