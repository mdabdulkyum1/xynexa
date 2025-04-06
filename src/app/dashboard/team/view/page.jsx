'use client'
import Image from 'next/image';
import React from 'react';
import Filter from './components/Filter';
import CreateModalBtn from './components/CreateModalBtn';
import { useUser } from '@clerk/nextjs';
import { useGetUserByEmailQuery } from '@/redux/features/Api/userApi';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
import { useGetUseTeamsQuery } from '@/redux/features/Api/teamApi';
import { LucideIcon, Users, Calendar, Type, User } from 'lucide-react'; // Import Lucide Icons
import Link from 'next/link';

export default function TeamView() {

    const { userData, isLoading, isError, error } = useUserDataFromClerk();

    const userId = userData?.user?._id
    console.log(userId);

    const { data: teamData } = useGetUseTeamsQuery(userId);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (isError) {
        return <div>Error: {error?.message || 'Failed to load teams'}</div>;
    }

    const emptyCard = (
        <div className="p-4 rounded-lg shadow border-dashed border-2 border-gray-400 flex items-center justify-center h-48">
            <div className="text-center">
                <p className="text-gray-500">No teams yet.</p>
            </div>
        </div>
    );

    return (
        <div>
            <div className=' flex lg:pl-20  border-b-2 border-gray-600 mb-4'>
                <div className='mt-2'>
                    <Image src="/assets/images/logo-xynexa.png" alt='logo-img' width={100} height={100}></Image>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-bold text-xl lg:text-3xl'>XY<span className='text-purple-500'>nexa</span></h2>

                </div>
            </div>
            <div className=''>
                <h1 className='text-xl lg:text-2xl font-semibold'>Teams</h1>
                <div>
                    <div>
                        <Filter></Filter>
                    </div>
                </div>
                <div></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-8 mt-5 lg:mt-10'>
                
                <CreateModalBtn></CreateModalBtn>
                {teamData && teamData.length > 0 ? (
                    teamData.map((team) => (
                       <Link  key={team._id} href={`/dashboard/team/view/${team._id}`}>
                         <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {team.name}
                            </h2>
                            <div className="flex items-center mb-3">
                                <Image
                                    src={team.creator.imageUrl}
                                    alt="Creator Image"
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-3"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                        {team.creator.firstName} {team.creator.lastName}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {team.creator.email}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                                <Type className="mr-2 w-4 h-4" /> 
                                {team.type}
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                                <Users className="mr-2 w-4 h-4" /> 
                                {team.members.length} Members
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Calendar className="mr-2 w-4 h-4" /> 
                                Created: {new Date(team.createdAt).toLocaleDateString()}
                            </div>

                        </div>
                       </Link>
                    ))
                ) : (
                    emptyCard
                )}
            </div>
        </div>
    );
}