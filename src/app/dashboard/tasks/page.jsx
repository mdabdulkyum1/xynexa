'use client'
import TaskHeading from './components/TaskHeading';
import TaskControl from './components/TaskControl';
import TaskBoard from './components/TaskBoard ';
import { useUser } from '@clerk/nextjs';
import { useGetTaskByCurrentUserEmailQuery } from '@/redux/features/Api/TaskApi';


export default function Page() {

      const { user } = useUser();
      const userEmail = user?.emailAddresses[0]?.emailAddress;

      const {data:allTasks}=useGetTaskByCurrentUserEmailQuery(userEmail);

      console.log(allTasks,userEmail);
    



    return (
        <div className='bg-gray-100 dark:bg-[#0A0A0A] py-2 px-2'>
            <h2 className='text-lg font-semibold py-2 '>Your Tasks </h2>
            <TaskControl></TaskControl>
            <TaskBoard  allTasks={allTasks}></TaskBoard>
        </div>
    );
}
