import { useAuth, useUser } from '@clerk/nextjs';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const TeamCreateModal = ({ isOpen, closeModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const { isSignedIn } = useAuth();
    // const { user } = useUser();

    const user = useSelector((state) => state.user.user);

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        
    
        closeModal();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-semibold text-gray-900 dark:text-gray-100"
                                >
                                    Create a New Team
                                </Dialog.Title>

                                <div className="mt-4">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* Team Name */}
                                        <div className="mb-5">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Team Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register("teamName", { required: "Team Name is required" })}
                                                className="mt-2 block w-full rounded-lg border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
                                                placeholder="Enter team name"
                                            />
                                            {errors.teamName && (
                                                <p className="text-red-500 text-sm mt-1">{errors.teamName.message}</p>
                                            )}
                                        </div>

                                        {/* Team Description */}
                                        <div className="mb-5">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Team Short Description
                                            </label>
                                            <textarea
                                                rows="3"
                                                {...register("teamDescription", {
                                                    required: "Description is required",
                                                    minLength: { value: 20, message: "Description must be at least 20 characters" }
                                                })}
                                                className="mt-2 block w-full rounded-lg border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
                                                placeholder="Enter a short description"
                                            />
                                            {errors.teamDescription && (
                                                <p className="text-red-500 text-sm mt-1">{errors.teamDescription.message}</p>
                                            )}
                                        </div>

                                        {/* Team Type */}
                                        <div className="mb-5">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Type
                                            </label>
                                            <select
                                                {...register("teamType", { required: "Please select a type" })}
                                                className="mt-2 block w-full rounded-lg border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
                                            >
                                                <option value="">Select type</option>
                                                <option value="teams">Teams</option>
                                                <option value="startups">Startups</option>
                                                <option value="businesses">Businesses</option>
                                                <option value="remote_workers">Remote Workers</option>
                                            </select>
                                            {errors.teamType && (
                                                <p className="text-red-500 text-sm mt-1">{errors.teamType.message}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                type="submit"
                                                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-900 px-5 py-2 text-white font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                            >
                                                Create Team
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TeamCreateModal;
