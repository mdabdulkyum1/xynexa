import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useGetUserByEmailQuery } from '@/redux/features/Api/userApi';
import { toast } from 'sonner';
import { useAddMemberToTeamMutation } from '@/redux/features/Api/teamApi';

const AddMember = ({ teamId, isOpenAdd,  setIsOpenAdd }) => {
    const closeModal = () => setIsOpenAdd(false);
    const openModal = () => setIsOpenAdd(true);
    const [userEmail, setEmail] = useState('');

    const { data: userData, isLoading, isError, error } = useGetUserByEmailQuery(userEmail, { skip: !userEmail });

    const [addMemberToTeam, { isLoading: isAddingMember, isError: addMemberError }] = useAddMemberToTeamMutation();

    const handleAddMember = async () => {
        if (isLoading) {
            toast.loading('Loading user...');
            return;
        }

        if (isError) {
            toast.error(error?.message || 'Failed to fetch user');
            return;
        }

        if (userData) {
            try {
                const response = await addMemberToTeam({ teamId: teamId, memberEmail: userEmail });
                if (response.error) {
                    
                    toast.error(response.error.data.message || 'Failed to add member');
                } else {
                    toast.success('Member added successfully!');
                    closeModal();
                }
            } catch (addMemberError) {
                toast.error(addMemberError?.message || 'Failed to add member');
            }
        } else {
            toast.error('User not found');
        }
    };

    return (
        <>
            <Transition appear show={isOpenAdd} as={Fragment}>
                <Dialog as="div" className="relative z-999" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                                        Add to Team member
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-300">
                                            Grow your team and work better together. Adding people to this
                                            team gives them access to all the team's work. Learn more
                                            about teams.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            placeholder="Add Member"
                                            className="w-full p-2 border border-gray-600 rounded-md bg-transparent text-white"
                                            value={userEmail}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="w-full justify-center rounded-md bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:from-[#6366F1] hover:to-[#8B5CF6] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleAddMember}
                                        >
                                            {isAddingMember ? 'Adding...' : 'Add'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default AddMember;