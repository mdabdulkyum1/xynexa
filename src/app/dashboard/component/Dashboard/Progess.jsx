import React from 'react';

const ProgressCard = ({ title, progress, startDate, endDate, gradient }) => {
  return (
    <div className="bg-white dark:bg-black rounded-lg p-4 shadow-md w-full">
      <p className="text-sm text-gray-500">Ongoing Project</p>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full ${gradient}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500">{progress}% Complete</p>
      <div className="flex justify-between mt-4">
        <p className="text-xs text-gray-500">Start Date: {startDate}</p>
        <p className="text-xs text-gray-500">End Date: {endDate}</p>
      </div>
    </div>
  );
};

const Progress = () => {
  const projects = [
    {
      title: 'UI Design',
      progress: 90,
      startDate: '10 Jan',
      endDate: '29 Jan',
      gradient: 'bg-gradient-to-r from-purple-400 to-purple-200',
    },
    {
      title: 'Frontend Development',
      progress: 30,
      startDate: '12 Jan',
      endDate: '25 Jan',
      gradient: 'bg-gradient-to-r from-blue-400 to-blue-200',
    },
    {
      title: 'Backend Development',
      progress: 60,
      startDate: '15 Jan',
      endDate: '30 Jan',
      gradient: 'bg-gradient-to-r from-red-400 to-red-200',
    },
    {
      title: 'Content Creation',
      progress: 75,
      startDate: '18 Jan',
      endDate: '31 Jan',
      gradient: 'bg-gradient-to-r from-green-400 to-green-200',
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Work Progress</h2>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProgressCard
            key={index}
            title={project.title}
            progress={project.progress}
            startDate={project.startDate}
            endDate={project.endDate}
            gradient={project.gradient}
          />
        ))}
      </div>
    </div>
  );
};

export default Progress;