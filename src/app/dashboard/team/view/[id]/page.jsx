// 'use client'
// import { useParams } from 'next/navigation';
// import React, { useState } from 'react';
// import { useGetTeamQuery } from '@/redux/features/Api/teamApi';
// import AddMember from '../components/AddMember';
// import Image from 'next/image';

// const TeamDetails = () => {
//     let [isOpen, setIsOpen] = useState(false)
//     const params = useParams();
//     const teamId = params.id; 

//     const { data: team, isLoading, isError, error } = useGetTeamQuery(teamId); 

//     if (isLoading) {
//         return <p>Loading team details...</p>;
//     }

//     if (isError) {
//         return <p>Error loading team details: {error?.message || 'Failed to load team'}</p>;
//     }

//     if (!team) {
//         return <p>Team not found.</p>;
//     }


//     return (
//         <div>
//             <h2>{team.name}</h2>
//             <p>Description: {team.description}</p>
//             <p>Type: {team.type}</p>
//             <p>Creator: {team.creator.firstName} {team.creator.lastName}</p>
//             <p>Creator Email: {team.creator.email}</p>
//             <h3>Members:</h3>
//             <h3 className="mt-4 text-xl font-semibold">Members:</h3>
//       <div className="mt-2 space-y-2">
//         {team?.members?.map((mem) => (
//           <div key={mem._id} className="flex items-center space-x-3">

//             <Image
//               src={mem.imageUrl }
//               alt="Member Image"
//               width={40}
//               height={40}

//               className="rounded-full border"
//             />
//             <p className="text-gray-700">{mem.email}</p>
//           </div>
//         ))}
//       </div>

//             <button className='rounded-md bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:from-[#6366F1] hover:to-[#8B5CF6] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' onClick={()=>setIsOpen(true)}>
//                 Add Member
//             </button>

//             <AddMember teamId={teamId}  isOpen={isOpen} setIsOpen={setIsOpen} /> 
//         </div>
//     );
// };

// export default TeamDetails;

'use client'; // ক্লায়েন্ট-সাইড রেন্ডারিংয়ের জন্য

import { useGetTeamQuery } from '@/redux/features/Api/teamApi';
import { Users, Mail, Hammer } from 'lucide-react'; // Lucide আইকন
import { useParams } from 'next/navigation';

const teamData = {
  _id: '67f43572e3de1699202964b7',
  name: 'Troy Challengers',
  description: 'Accusantium consecte',
  type: 'teams',
  creator: {
    _id: '67f42e99799869024e86b23c',
    clerkId: 'user_2uyb47VtiDM0hszCRz90jFDMHaL',
    firstName: 'Ashraful',
    lastName: 'Hossain',
    email: 'ahmeadashraful@gmail.com',
    imageUrl: 'https://i.ibb.co.com/103M16B/man-outside-091318-800x450.jpg',
    role: 'member',
    status: 'Online',
    lastActive: '2025-04-07T19:59:21.676Z',
    createdAt: '2025-04-07T19:59:21.681Z',
    updatedAt: '2025-04-07T19:59:21.681Z',
  },
  members: [
    {
      _id: '67f4375ce3de1699202964c1',
      clerkId: 'clerk_12345456799',
      firstName: 'Digonto',
      lastName: 'Doe',
      email: 'digonto@gmail.com',
      imageUrl: 'https://i.ibb.co.com/103M16B/man-outside-091318-800x450.jpg',
      role: 'member',
      status: 'Online',
      lastActive: '2025-04-07T20:36:44.785Z',
      createdAt: '2025-04-07T20:36:44.786Z',
      updatedAt: '2025-04-07T20:36:44.786Z',
    },
    {
      _id: '67e7cb79a8c6371b7facab3d',
      clerkId: 'clerk_12345',
      firstName: 'John',
      lastName: 'Doe',
      email: 'jannatjui414@gmail.com',
      imageUrl: 'https://i.ibb.co.com/103M16B/man-outside-091318-800x450.jpg',
      role: 'member',
      status: 'Online',
      lastActive: '2025-03-29T10:29:13.180Z',
      createdAt: '2025-03-29T10:29:13.185Z',
      updatedAt: '2025-03-29T10:29:13.185Z',
    },
  ],
  createdAt: '2025-04-07T20:28:34.800Z',
  __v: 2,
};

const TeamDetails = () => {
  const { id: teamId } = useParams()

  const { data: team, isLoading, isError, error } = useGetTeamQuery(teamId);
  console.log(team);

  return (
    <div className="min-h-screen p-4 bg-white dark:bg-[#171717] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* টিমের তথ্য */}
      <section className="p-6 shadow-sm rounded-lg bg-white dark:bg-[#121314] dark:border-0 border-gray-200 mx-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold">{team?.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 italic mt-1">{team?.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Created by:{' '}
                  <span className="font-medium">{`${teamData?.creator?.firstName} ${teamData?.creator?.lastName}`}</span> (
                  {teamData?.creator?.email})
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created on: {new Date(team?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Hammer className="h-8 w-8 text-red-500 dark:text-red-400" title="Thor Operation" />
          </div>
        </div>
      </section>

      {/* সদস্যদের টেবিল */}
      <section className="p-6 mx-4">
        <div className="container mx-auto">
          <div className="bg-white dark:bg-[#121314] p-6 rounded-lg shadow-sm dark:border-0 border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Team Members</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200 dark:bg-[#0A0A0A] text-gray-700 dark:text-gray-200">
                    <th className="p-3 font-semibold">SL</th>
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold">Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {team?.members?.map((member, index) => (
                    <tr
                      key={member._id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-black/30"
                    >
                      <td className="p-3 text-gray-600 dark:text-gray-300">{index + 1}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300">{`${member.firstName} ${member.lastName}`}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" /> {member.email}
                      </td>
                      <td className="p-3">
                        <img
                          src={member.imageUrl}
                          alt={`${member.firstName}'s photo`}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => (e.target.src = 'https://via.placeholder.com/40')}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamDetails;