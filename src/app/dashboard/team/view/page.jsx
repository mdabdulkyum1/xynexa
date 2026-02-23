"use client"

import React from 'react';
import Filter from './components/Filter';
import CreateModalBtn from './components/CreateModalBtn';
import { useSession } from "next-auth/react";
import useTeamStore from '@/store/useTeamStore';
import { useEffect } from 'react';

import Link from 'next/link';
import Loading from '@/components/loading/Loading';
import { MdOutlineWatchLater } from "react-icons/md";
import { Avatar, AvatarGroup } from '@mui/material';

export default function TeamView() {
    const { data: session, status } = useSession();
    const teamData = useTeamStore((state) => state.teams);
    const fetchFullTeamsByEmail = useTeamStore((state) => state.fetchFullTeamsByEmail);
    const isTeamsLoading = useTeamStore((state) => state.isLoading);
    const teamError = useTeamStore((state) => state.error);

    const hasFetched = React.useRef(false);

    console.log("TeamView Render:", { 
        status, 
        sessionEmail: session?.user?.email, 
        isTeamsLoading, 
        teamDataCount: teamData?.length,
        hasFetched: hasFetched.current
    });

    useEffect(() => {
        const userEmail = session?.user?.email;
        console.log("TeamView UseEffect Triggered:", { userEmail, status, hasFetched: hasFetched.current });

        if (status === "authenticated" && userEmail && !hasFetched.current) {
            console.log("Calling fetchFullTeamsByEmail for:", userEmail);
            hasFetched.current = true;
            fetchFullTeamsByEmail(userEmail);
        }
    }, [session, status, fetchFullTeamsByEmail]);

    const isLoading = status === "loading" || (isTeamsLoading && teamData.length === 0);
    const isError = !!teamError;

    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'><Loading></Loading></div>;
    }

    if (isError) {
        return <div>Error: {teamError || 'Failed to load teams'}</div>;
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

                        <div key={idx} className="group p-6 rounded-2xl shadow-sm bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                                        team?.type === 'teams' ? 'bg-blue-50 text-blue-500' :
                                        team?.type === 'startups' ? 'bg-orange-50 text-orange-500' :
                                        team?.type === 'businesses' ? 'bg-green-50 text-green-500' :
                                        team?.type === 'remote_workers' ? 'bg-purple-50 text-purple-500' : 'bg-gray-50 text-gray-500'
                                    }`}>
                                        {team?.type?.replace('_', ' ')}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 leading-tight group-hover:text-primary transition-colors">
                                    {team?.name}
                                </h2>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                                    {team?.creator ? `${team.creator.firstName} ${team.creator.lastName}` : 'System Team'}
                                </p>
                                
                                <div className='mb-6 h-12 text-gray-600 dark:text-gray-400 overflow-hidden'>
                                    <p className="text-sm line-clamp-2 leading-relaxed italic">
                                        {team?.description || "No description provided for this team."}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 dark:border-gray-800">
                                <div className="flex items-center text-gray-400 dark:text-gray-500 mb-5">
                                    <div className='flex items-center p-1.5 px-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-[11px] font-medium'>
                                        <MdOutlineWatchLater className="mr-2 w-3.5 h-3.5" />
                                        Created: {team?.createdAt ? new Date(team.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A'}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <AvatarGroup max={4} sx={{ 
                                        '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 12, border: '2px solid white' }
                                    }}>
                                        {team?.members?.map((member) => (
                                            <Avatar
                                                key={member?.id || member?._id}
                                                alt={`${member?.firstName} ${member?.lastName}`}
                                                src={member?.imageUrl || "/default-avatar.png"}
                                            />
                                        ))}
                                    </AvatarGroup>

                                    <Link href={`/dashboard/team/view/${team.id || team._id}`}>
                                        <button className='bg-[#4fd1c5] hover:bg-[#38b2ac] text-white font-semibold py-2 px-5 rounded-lg text-sm transition-all shadow-sm hover:shadow-md active:scale-95'>
                                            View
                                        </button>
                                    </Link>
                                </div>
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