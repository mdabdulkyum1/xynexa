"use client"

import React from 'react';
import Filter from './components/Filter';
import CreateModalBtn from './components/CreateModalBtn';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
import { useGetTeamsByCurrentUserQuery } from '@/redux/features/Api/teamApi';

import Link from 'next/link';
import Loading from '@/components/loading/Loading';
import { MdOutlineWatchLater } from "react-icons/md";
import { Avatar, AvatarGroup } from '@mui/material';

export default function TeamView() {

    const { userData, isLoading, isError, error } = useUserDataFromClerk();

    const userId = userData?.user?._id
    console.log(userId);

    // const { data: teamData } = useGetUseTeamsQuery(userId);
    const { data: teamData } = useGetTeamsByCurrentUserQuery(userId);

    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'><Loading></Loading></div>;
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

    console.log(teamData);

    return (
        <div>
            <div className=' flex lg:pl-20  border-b-2 border-gray-600  bg-yellow-100 dark:bg-black p-4'>
                <div className=' '>
                    {/* <Image src="/assets/images/xy-logo.png" alt='logo-img' width={200} height={200}></Image> */}
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='font-bold text-xl lg:text-3xl mb-4 '>XY<span className=''>nexa</span></h2>
                    <p className='text-xs font-bold '>Make a team work together</p>
                </div>
            </div>
            <div className='bg-purple-100 dark:bg-black p-4'>
                <h1 className='text-xl lg:text-2xl font-semibold '>Your Teams</h1>
                <div>
                    <div className=''>
                        <Filter></Filter>
                    </div>
                </div>
                <div></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-8  bg-purple-100 dark:bg-black'>

                <CreateModalBtn></CreateModalBtn>
                {teamData && teamData?.length > 0 ? (
                    teamData?.map((team, idx) => (

                        <div key={idx} className="p-4 rounded-lg shadow bg-white dark:bg-gray-800 transform transition duration-300 ease-in-out 
             hover:scale-[1.02] hover:shadow-lg">
                            <p className={`uppercase font-bold mb-4 text-[14px] ${team?.type === 'teams' ? 'text-blue-400' :
                                team?.type === 'startups' ? 'text-orange-400' :
                                    team?.type === 'businesses' ? 'text-green-400' :
                                        team?.type === 'remote_workers' ? 'text-purple-400' : 'text-gray-500'
                                }`}>{team?.type}</p>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 ">
                                {team?.name}
                            </h2>
                            <div className="flex items-center mb-2">
                               
                                <div className='mb-3'>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                        {team?.creator?.firstName} {team?.creator?.lastName}
                                    </p>

                                </div>
                            </div>
                            <div className='mb-4 h-14 text-gray-700 dark:text-gray-300'>
                                <p>
                                    {team?.description?.toString().length > 100
                                        ? team.description.toString().slice(0, 100) + '...'
                                        : team?.description}
                                </p>
                            </div>


                            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2 ">
                                <p className='flex items-center  p-2 bg-gray-100 dark:text-gray-800 rounded-lg'>
                                    <MdOutlineWatchLater className="mr-2 w-4 h-4" />
                                    Created: {new Date(team?.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                                <AvatarGroup max={6}>
                                    {team?.members?.map((member) => (
                                        <Avatar
                                            key={member?._id}
                                            sx={{ width: 24, height: 24 }}
                                            alt={`${member?.firstName} ${member?.lastName}`}
                                            src={member?.imageUrl || "https://i.ibb.co/B6sBj8C/stokes.jpg"}
                                        />
                                    ))}
                                </AvatarGroup>


                                <button className='btn bg-primary text-white dark:text-gray-800 dark:bg-white border-none p-2'><Link key={team._id} href={`/dashboard/team/view/${team?._id}`}> View </Link></button>
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