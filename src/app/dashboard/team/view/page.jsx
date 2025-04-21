"use client"
import Image from 'next/image';
import React from 'react';
import Filter from './components/Filter';
import CreateModalBtn from './components/CreateModalBtn';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
import { useGetTeamsByCurrentUserQuery } from '@/redux/features/Api/teamApi';
import { Users, Calendar, Type, User } from 'lucide-react'; // Import Lucide Icons
import Link from 'next/link';

export default function TeamView() {

    const { userData, isLoading, isError, error } = useUserDataFromClerk();

    const userId = userData?.user?._id
    console.log(userId);

    // const { data: teamData } = useGetUseTeamsQuery(userId);
    const { data: teamData } = useGetTeamsByCurrentUserQuery(userId);

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
            <div className=' flex lg:pl-20  border-b-2 border-gray-600  bg-gray-100 dark:bg-black p-4'>
                <div className=' '>
                {/* <Image src="/assets/images/xy-logo.png" alt='logo-img' width={200} height={200}></Image> */}
                </div>
                <div className='flex flex-col justify-center items-center'>
                <h2 className='font-bold text-xl lg:text-3xl mb-4 '>XY<span className=''>nexa</span></h2>
                <p className='text-xs font-bold '>Make a team work together</p>
                </div>
            </div>
            <div className='bg-red-100 dark:bg-black p-4'>
                <h1 className='text-xl lg:text-2xl font-semibold '>Your Teams</h1>
                <div>
                    <div className=''>
                        <Filter></Filter>
                    </div>
                </div>
                <div></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-8  bg-red-100 dark:bg-black'>
                
                <CreateModalBtn></CreateModalBtn>
                {teamData && teamData.length > 0 ? (
                    teamData.map((team, idx) => (
                       
                         <div key={idx} className="p-4 rounded-lg shadow bg-white dark:bg-gray-700">
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
                                    <p className="text-xs text-gray-500 dark:text-gray-300">
                                        {team.creator.email}
                                    </p>
                                </div>
                            </div>
                            
                            
                            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                                <Users className="mr-2 w-4 h-4" /> 
                                {team.members.length} Members
                            </div>
                            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                                <p className='flex items-center'>
                                <Calendar className="mr-2 w-4 h-4" /> 
                                Created: {new Date(team.createdAt).toLocaleDateString()}
                                </p>
                                <button className='btn bg-primary text-white dark:text-black dark:bg-white border-none'><Link  key={team._id} href={`/dashboard/team/view/${team._id}`}> Details </Link></button>
                            </div>

                        </div>
                       
                    ))
                ) : (
                    emptyCard
                )}
            </div>
        </div>
    );
}