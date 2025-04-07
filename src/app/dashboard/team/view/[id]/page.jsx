'use client'
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useGetTeamQuery } from '@/redux/features/Api/teamApi';
import AddMember from '../components/AddMember';
import Image from 'next/image';

const TeamDetails = () => {
  let [isOpen, setIsOpen] = useState(false)
  const params = useParams();
  const teamId = params.id;

  const { data: team, isLoading, isError, error } = useGetTeamQuery(teamId);
  console.log(team)

  if (isLoading) {
    return <p>Loading team details...</p>;
  }

  if (isError) {
    return <p>Error loading team details: {error?.message || 'Failed to load team'}</p>;
  }

  if (!team) {
    return <p>Team not found.</p>;
  }


  return (
    <div>
      <h2>{team.name}</h2>
      <p>Description: {team.description}</p>
      <p>Type: {team.type}</p>
      <p>Creator: {team.creator.firstName} {team.creator.lastName}</p>
      <p>Creator Email: {team.creator.email}</p>
      <h3>Members:</h3>
      <h3 className="mt-4 text-xl font-semibold">Members:</h3>
      <div className="mt-2 space-y-2">
        {team?.members?.map((mem) => (
          <div key={mem._id} className="flex items-center space-x-3">

            <Image
              src={mem.imageUrl}
              alt="Member Image"
              width={40}
              height={40}

              className="rounded-full border"
            />
            <p className="text-gray-700">{mem.email}</p>
          </div>
        ))}
      </div>

      <button className='rounded-md bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:from-[#6366F1] hover:to-[#8B5CF6] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' onClick={() => setIsOpen(true)}>
        Add Member
      </button>

      <AddMember teamId={teamId} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default TeamDetails;