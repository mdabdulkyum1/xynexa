import React from 'react';
import Sidebar from './components/Sidebar';
import RegisterForm from './components/RegisterForm';

const register_page = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16">
      <Sidebar></Sidebar>
      <div className="lg:col-span-2">
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
};

export default register_page;
