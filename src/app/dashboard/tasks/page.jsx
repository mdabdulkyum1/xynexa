import React from 'react';
import TaskHeading from './components/TaskHeading';
import TaskControl from './components/TaskControl';
import TaskBoard from './components/TaskBoard ';

export default function Page() {
    return (
        <div className='bg-gray-100 dark:bg-[#0A0A0A]'>
            <TaskHeading></TaskHeading>
            <TaskControl></TaskControl>
            <TaskBoard></TaskBoard>
        </div>
    );
}
