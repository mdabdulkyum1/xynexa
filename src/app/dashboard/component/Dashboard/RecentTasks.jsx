import React from 'react';

const RecentTasks = () => {
  const tasks = [
    {
      image: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg', 
      name: 'John Doe',
      email: 'john.doe@example.com',
      date: '2023-10-26',
    },
    {
      image: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg', 
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      date: '2023-10-25',
    },
    {
      image: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg', 
      name: 'David Lee',
      email: 'david.lee@example.com',
      date: '2023-10-24',
    },
   
    {
      image: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg', 
      name: 'John Doe',
      email: 'john.doe@example.com',
      date: '2023-10-26',
    },
    
    
   
  ];

  return (
    <div className="mt-6  flex flex-col   p-4 rounded-xl">
    
   
    <div className="space-y-4 overflow-y-auto h-[calc(100%-60px)]"> 
      {tasks.map((task, index) => (
       <div key={index} className="flex flex-col justify-between items-center">
         <div  className="flex items-center space-x-4 bg-gray-100 dark:bg-black rounded-lg p-4 shadow-md">
          <img src={task.image} alt={task.name} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="text-lg font-semibold">{task.name}</h3>
            <p className="text-sm text-gray-500">{task.email}</p>
            <p className="text-xs text-gray-500">{task.date}</p>
          </div>
        </div>
       </div>
      ))}
    </div>
  </div>
  );
};

export default RecentTasks;