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
    {
      image: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg', 
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      date: '2023-10-25',
    },
    {
      image: 'https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=', 
      name: 'David Lee',
      email: 'david.lee@example.com',
      date: '2023-10-24',
    },
   
    {
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fman%2520face%2F&psig=AOvVaw1CxFtSpeOHuBjIP_eSFvZw&ust=1742633242262000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJD6k-7kmowDFQAAAAAdAAAAABAJ0', 
      name: 'John Doe',
      email: 'john.doe@example.com',
      date: '2023-10-26',
    },
    {
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fman%2520face%2F&psig=AOvVaw1CxFtSpeOHuBjIP_eSFvZw&ust=1742633242262000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJD6k-7kmowDFQAAAAAdAAAAABAJ', 
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      date: '2023-10-25',
    },
    {
      image: 'https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=0', 
      name: 'David Lee',
      email: 'david.lee@example.com',
      date: '2023-10-24',
    },
   
  ];

  return (
    <div className="mt-6 max-h-[1050px] h-[1050px]">
    <h2 className="text-xl font-semibold mb-4">Recent Provided Tasks</h2>
    <div className="space-y-4 overflow-y-auto h-[calc(100%-60px)]"> 
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center space-x-4 bg-white dark:bg-black rounded-lg p-4 shadow-md">
          <img src={task.image} alt={task.name} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="text-lg font-semibold">{task.name}</h3>
            <p className="text-sm text-gray-500">{task.email}</p>
            <p className="text-xs text-gray-500">{task.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default RecentTasks;