import Image from 'next/image';
import React from 'react';
import { MdPeople } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiMessageRoundedDots } from "react-icons/bi";

const EasyCollaborationSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="w-11/12 lg:w-3/4 mx-auto">
        <div className="flex flex-col justify-center items-center text-center mb-16">
          <div className="flex gap-3 items-center mb-6">
            <button className="p-3 text-teal-500 border-teal-500 border rounded-lg text-xl">
              <MdPeople />
            </button>
            <p className="text-teal-500 font-semibold text-lg">Easy Collaboration</p>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 dm-font dark:text-white">
            Solution for seamless productive teamwork
          </h2>
          <p className="dark:text-gray-400 leading-relaxed text-lg">
            Working together on documents has never been easier, allowing you and your team to collaborate and provide constructive feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Card 1: User Permissions */}
          <div className="p-6 rounded-xl shadow-lg dark:bg-gray-800 bg-white flex flex-col justify-between h-full">
            <div>
              <div className="text-teal-500 text-3xl mb-4">
                <FaUser />
              </div>
              <h3 className="text-xl font-semibold dark:text-white text-teal-500 mb-3">User Permissions</h3>
              <p className="dark:text-gray-500 leading-relaxed text-lg">
                The ability to set varying levels of permissions for different users, ensuring data security and full access control.
              </p>
            </div>
            <div className="bg-teal-100 dark:bg-teal-800 dark:text-white text-black p-4 rounded-lg mt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-semibold dark:text-white">Lisa Jackson</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Sales Manager</p>
                  </div>
                </div>
                <select className="bg-transparent text-sm border border-gray-600 dark:border-gray-400 px-2 py-1 rounded focus:outline-none dark:text-white">
                  <option defaultValue>Full access</option>
                  <option className='bg-transparent dark:text-white'>Can edit</option>
                  <option className='dark:text-white'>Can view</option>
                </select>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-semibold dark:text-white">Katie Adams</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Product Manager</p>
                  </div>
                </div>
                <select className="bg-transparent text-sm border border-gray-600 dark:border-gray-400 px-2 py-1 rounded focus:outline-none dark:text-white">
                  <option>Full access</option>
                  <option>Can edit</option>
                  <option defaultValue>Can view</option>
                </select>
              </div>
              <div className="flex items-center justify-between border-t border-gray-700 dark:border-gray-500 pt-4">
                <div>
                  <h4 className="font-semibold dark:text-white">Share to web</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Anyone with the link can edit</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-teal-300 relative transition-all">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Task Assignment */}
          <div className="p-6 rounded-xl shadow-lg dark:bg-gray-800 bg-white flex flex-col justify-between h-full">
            <div>
              <div className="text-teal-500 text-3xl mb-4">
                <IoIosCheckmarkCircleOutline />
              </div>
              <h3 className="text-xl font-semibold dark:text-white text-teal-500 mb-3">Task Assignment</h3>
              <p className="dark:text-gray-500 leading-relaxed text-lg">
                The ability to assign tasks to specific team members and track their progress, ensuring accountability and transparency.
              </p>
            </div>
            <div className="bg-teal-100 dark:bg-teal-800 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-gray-600 dark:text-white p-2 rounded-lg bg-teal-200 dark:bg-teal-900 bg-opacity-20 dark:bg-opacity-30">
                  <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium dark:text-white">Create design system for team project</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <div className="text-gray-600 dark:text-white p-2 rounded-lg bg-teal-200 dark:bg-teal-900 bg-opacity-20 dark:bg-opacity-30">
                  <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium dark:text-white">Write a document for team project.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <div className="text-gray-600 dark:text-white p-2 rounded-lg bg-teal-200 dark:bg-teal-900 bg-opacity-20 dark:bg-opacity-30">
                  <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium dark:text-white">Assigned task on team members.</p>
                </div>
              </div>
              <span className="inline-block bg-teal-500 text-white dark:bg-teal-300 dark:text-black text-xs font-semibold px-3 py-1 rounded-full">
                Medium
              </span>
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                <div className="flex items-center gap-1">
                  <span>Aug 12</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Assigned</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Feedback Activity */}
          <div className="p-6 rounded-xl shadow-lg dark:bg-gray-800 bg-white flex flex-col justify-between h-full">
            <div>
              <div className="text-teal-500 text-3xl mb-4">
                <BiMessageRoundedDots />
              </div>
              <h3 className="text-xl font-semibold dark:text-white text-teal-500 mb-3">Feedback Activity</h3>
              <p className="dark:text-gray-500 leading-relaxed text-lg">
                Leave comments, suggestions, and questions directly within the document, ensuring clear communication and context.
              </p>
            </div>
            <div className="bg-teal-100 dark:bg-teal-800 rounded-xl p-4 mt-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold dark:text-white">Alex Schiller commented</p>
                  <p className="text-sm mt-1 border-2 border-gray-700 dark:border-gray-500 p-2 rounded-lg dark:text-white">
                    Your work on this task has really set a new benchmark...
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 text-gray-500 dark:text-gray-400 text-xs">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>5 min ago</span>
                </div>
                <button className="hover:text-blue-400 dark:text-white">Reply</button>
              </div>
              <div className="flex items-start gap-3 mt-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold dark:text-white">Jessika luis commented</p>
                  <p className="text-sm mt-1 border-2 border-gray-700 dark:border-gray-500 p-2 rounded-lg dark:text-white">
                    well done...
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 text-gray-500 dark:text-gray-400 text-xs">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>5 min ago</span>
                </div>
                <button className="hover:text-blue-400 dark:text-white">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyCollaborationSection;