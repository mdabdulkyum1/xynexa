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

import { useDeleteTeamMutation, useGetTeamQuery } from '@/redux/features/Api/teamApi';
import { Users, Mail, Hammer, MoreVertical } from 'lucide-react';
import { useParams } from 'next/navigation';
import AddMember from '../components/AddMember';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const TeamDetails = () => {
  const { id: teamId } = useParams();
  const [isOpen, setIsOpen] = useState(false); // For AddMember modal
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For dropdown menu
  const menuRef = useRef(null); // Ref to track the menu element
  const router = useRouter(); // useRouter hook


  const { data: team, isLoading, isError, error } = useGetTeamQuery(teamId);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (isLoading) {
    return <p>Loading team details...</p>;
  }

  if (isError) {
    return <p>Error loading team details: {error?.message || 'Failed to load team'}</p>;
  }

  if (!team) {
    return <p>Team not found.</p>;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUpdate = () => {
    console.log('Update team:', team?.name);
    // const { data: team, isLoading, isError, error } = useUpdateTeamMutation(teamId);


    setIsMenuOpen(false);
  };


  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/teams/${teamId}`)
          .then((response) => {
            if (response.data.message === 'Team deleted successfully') {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              }).then(() => {
                // Navigate using Next.js router
                router.push('/dashboard/team/view');
              });
            }
          })
          .catch((error) => {
            console.error("Delete failed:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error"
            });
          });
      }
    });
  };

  const handleViewDetails = () => {
    console.log('View details for team:', team?.name);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen p-2 md:p-4 bg-white dark:bg-[#171717] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Team info */}
      <section className="p-6 shadow-sm rounded-lg bg-white dark:bg-[#121314] dark:border-0 border-gray-200 mx-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <Image src={team?.creator?.imageUrl} alt="Team Image" width={50} height={50} className="h-24 w-24 rounded-md" onError={(e) => (e.target.src = 'https://via.placeholder.com/50')} />
              <div>
                <h1 className="text-3xl font-bold uppercase">{team?.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 italic mt-1 capitalize">{team?.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, sapiente. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae ullam rem deleniti sed, et vero adipisci eum enim distinctio cumque!</p>
                <h1 className="text-xl font-bold capitalize">Type: {team?.type}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Created by:{' '}
                  <span className="font-medium">{`${team?.creator?.firstName} ${team?.creator?.lastName}`}</span> (
                  {team?.creator?.email})
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created on: {new Date(team?.createdAt).toISOString().split('T')[0]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Three-dot menu */}
              <div className="relative" ref={menuRef}>
                <MoreVertical
                  className="h-6 w-6 text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={toggleMenu}
                />
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1a1b1e] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={handleUpdate}
                      >
                        Update
                      </li>
                      <li
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={handleDelete}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team members */}
      <section className="p-6 mx-4">
        <div className="container mx-auto">
          <div className="bg-white dark:bg-[#121314] p-6 rounded-lg shadow-sm dark:border-0 border-gray-200">
            <div className="flex justify-between items-center mb-4 p-2">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <button
                className="rounded-md bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:from-[#6366F1] hover:to-[#8B5CF6] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsOpen(true)}
              >
                Add Member
              </button>
              <AddMember teamId={teamId} isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
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
                      <td className="p-3 text-gray-600 dark:text-gray-300">{`${member?.firstName} ${member?.lastName}`}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" /> {member?.email}
                      </td>
                      <td className="p-3">
                        <img
                          src={member?.imageUrl}
                          alt={`${member?.firstName}'s photo`}
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