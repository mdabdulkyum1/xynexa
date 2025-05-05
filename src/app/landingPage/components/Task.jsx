import React from 'react';
import { Plus, Calendar, Flag, Users, CheckCircle } from 'lucide-react'; // Import necessary icons
import Image from 'next/image';

const TaskFeatures = () => {
  return (
    <div className="py-20 max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8 items-center justify-between">
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Create and Assign Tasks <br />
          <span className="text-teal-500">Easily and quickly with Teamly</span>
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          With Teamly, you can create and assign tasks to your team members in just a few clicks.
          Simply enter the task name, description, due date, and priority, and then assign it to one or
          more team members.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Teamly also provides real-time notifications when tasks are updated. This way, you and your
          team members can always stay informed about the status of their tasks.
        </p>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 text-teal-500">
              <Plus className="h-7 w-7" />
            </div>
            <p className="text-lg text-gray-700">
              Create tasks in seconds with Teamly's intuitive task creation interface.
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 text-teal-500">
              <Users className="h-7 w-7" />
            </div>
            <p className="text-lg text-gray-700">
              Assign tasks to one or more team members, set due dates (<Calendar className="inline-block h-5 w-5 text-teal-500 align-text-bottom" />)
              and priorities (<Flag className="inline-block h-5 w-5 text-teal-500 align-text-bottom" />),
              and add attachments and comments.
            </p>
          </div>
        </div>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-md mt-10 text-lg"
        >
          Try Teamly Now
        </button>
      </div>
      <div className="w-full md:w-1/2 relative">
        <div className="relative w-full h-auto aspect-video">
          <Image src='/gotzha-tcs-banner.e389d6c.jpg' alt="Teamly Task Features" width={700} height={800} className="rounded-md object-cover" />
        </div>
        {/* Text overlay 1 */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded-md shadow-md p-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-teal-500" aria-hidden="true" />
            <span>Complete website design tasks</span>
          </h3>
          <p className="text-xs text-gray-500 ml-6">
            09:30 - 10:40 AM (IST)
          </p>
        </div>
        {/* Text overlay 2 (Input field representation) */}
        <div className="absolute bottom-20 right-4 bg-white bg-opacity-80 rounded-md shadow-md p-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-teal-500" aria-hidden="true" />
            <div className="bg-gray-200 w-24 h-3 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFeatures;