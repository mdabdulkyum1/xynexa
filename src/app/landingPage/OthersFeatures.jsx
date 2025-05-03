import React from 'react';
import { motion } from 'framer-motion';
import { Users, FolderCheck, Layers, MessageSquare, Activity, CreditCard } from 'lucide-react';

const OthersFeatures = () => {
  // Animation variants for the main container
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  // Animation variants for individual feature cards
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, transition: { duration: 0.15 } },
  };

  return (
    <motion.div
      className='z-20 py-12 bg-gradient-to-b from-white to-teal-50'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-10'>
          <h2 className='text-5xl font-bold text-gray-900 dark:text-white'>
            Teamly Main Features
          </h2>
          <p className='mt-2 text-lg text-gray-600 dark:text-white'>
            All-in-one solution for Managing your team
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          <motion.div
            className='bg-white rounded-lg shadow-md p-6 flex flex-col border-l-4 border-teal-400'
            variants={cardVariants}
            whileHover='hover'
          >
            <div className='w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mb-4'>
              <Users size={24} />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Team Collaboration
            </h3>
            <p className='text-gray-700 '>
              Together is better. Streamline workflows, and achieve shared goals
              with intuitive team platform.
            </p>
          </motion.div>
          <motion.div
            className='bg-white rounded-lg shadow-md p-6 flex flex-col border-l-4 border-teal-400'
            variants={cardVariants}
            whileHover='hover'
          >
            <div className='w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mb-4'>
              <FolderCheck size={24} />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Team Report
            </h3>
            <p className='text-gray-700 '>
              Team Reports provide actionable insights to optimize workflows and
              boost team effectiveness.
            </p>
          </motion.div>
          <motion.div
            className='bg-white rounded-lg shadow-md p-6 flex flex-col border-l-4 border-teal-400'
            variants={cardVariants}
            whileHover='hover'
          >
            <div className='w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mb-4'>
              <Layers size={24} />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Manage Teams
            </h3>
            <p className='text-gray-700 '>
              Manage teams, projects, and communication from one central hub,
              ensuring everyone stays on track.
            </p>
          </motion.div>
          <motion.div
            className='bg-white rounded-lg shadow-md p-6 flex flex-col border-l-4 border-teal-400'
            variants={cardVariants}
            whileHover='hover'
          >
            <div className='w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mb-4'>
              <MessageSquare size={24} />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Conversation
            </h3>
            <p className='text-gray-700 '>
              Real-time conversations, file sharing, and threaded messaging ensure
              everyone engages in the discussion.
            </p>
          </motion.div>
          <motion.div
            className='bg-white rounded-lg shadow-md p-6 flex flex-col border-l-4 border-teal-400'
            variants={cardVariants}
            whileHover='hover'
          >
            <div className='w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mb-4'>
              <Activity size={24} />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Performance Stats
            </h3>
            <p className='text-gray-700 '>
              Gain real-time insights into individual and team performance with
              comprehensive performance stats.
            </p>
          </motion.div>
          <motion.div
            className='bg-white rounded-lg shadow-md p-6 flex flex-col border-l-4 border-teal-400'
            variants={cardVariants}
            whileHover='hover'
          >
            <div className='w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mb-4'>
              <CreditCard size={24} />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              Payment Setup
            </h3>
            <p className='text-gray-700 '>
              Simplify team expenses and invoicing with our secure and integrated
              payment setup.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OthersFeatures;