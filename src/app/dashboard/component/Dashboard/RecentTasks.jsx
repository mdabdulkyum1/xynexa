'use client';
import React from 'react';
import { useGetTaskByCurrentUserEmailQuery } from '@/redux/features/Api/TaskApi';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

const RecentTasks = () => {
    const { user } = useUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const { data: allTasks, isLoading, isError } = useGetTaskByCurrentUserEmailQuery(userEmail);

    if (isLoading) {
        return <div>Loading recent tasks...</div>;
    }

    if (isError) {
        return <div>Error loading recent tasks.</div>;
    }

    // Get the last 4 tasks
    const lastFourTasks = allTasks?.slice(-5);

    return (
        <div className="mt-3 flex flex-col p-4 rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Tasks</h2>
            <div className="space-y-4 overflow-y-auto h-[calc(100%-60px)]">
                {lastFourTasks?.map((task, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 dark:bg-black rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                            {task?.members?.[0]?.imageUrl && (
                                <img
                                    src={task.members[0].imageUrl}
                                    alt={task.members[0].firstName}
                                    className="w-10 h-10 rounded-full"
                                />
                            )}
                            <div>
                                <h3 className="text-lg font-semibold dark:text-white">{task.title}</h3>
                                {task?.members?.[0]?.email && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{task.members[0].email}</p>
                                )}
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {task.createdAt && moment(task.createdAt).format('MMM D, YYYY h:mm A')}
                                </p>
                            </div>
                        </div>
                        
                    </div>
                ))}
                {lastFourTasks?.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400">No recent tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default RecentTasks;