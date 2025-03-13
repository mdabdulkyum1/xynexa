import React from 'react';
import svg1 from './Enterprice.svg'
import Image from 'next/image';

const Pricing = () => {
    return (
        <div className=" bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background SVGs */}
        <svg className="absolute top-10 left-10 w-64 h-64 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M450.9 169.7a99.4 99.4 0 0 0-140.6 0 99.4 99.4 0 1 0-140.6 0 99.4 99.4 0 1 0 0 140.6 99.4 99.4 0 1 0 140.6 0 99.4 99.4 0 0 0 140.6-140.6ZM169.7 310.3l140.6-140.6" fill="#808"></path></svg>
        <svg className="absolute top-1/3 right-10 w-64 h-64 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M240 0H0a240 240 0 0 0 240 240h240A240 240 0 0 0 240 0ZM240 240H0a240 240 0 0 0 240 240h240a240 240 0 0 0-240-240Z" fill="#808"></path></svg>
        <svg className="absolute bottom-10 left-1/3 w-64 h-64 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><path d="M480 0H120v120h120v120h120v120h120V0zM0 480h360V360H240V240H120V120H0v360z" fill="#808"></path></svg>
        
        <div className="w-full container bg-white p-10 rounded-3xl shadow-lg text-center relative z-10">
          <h2 className="text-3xl font-bold mb-3">Pricing Plans</h2>
          <p className="text-gray-500 mb-6">StartAI features that will help your company scale faster</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/** Free Plan */}
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-2xl shadow-md relative overflow-hidden z-10">
              <h3 className="text-2xl font-semibold">Free</h3>
              <p className="text-gray-500">Free plan for all users.</p>
              <button className="mt-4 bg-white text-black py-2 px-4 rounded-lg shadow-md border border-gray-300 relative z-20">
                Get Started
              </button>
              <ul className="mt-4 text-left text-gray-700">
                <li>✔ 2 Workspaces</li>
                <li>✔ 10 Collaborators</li>
                <li>✔ Unlimited Data</li>
                <li>✔ Unified Analytics</li>
              </ul>
            </div>
            
            {/** Business Plan */}
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl shadow-md relative overflow-hidden z-10">
              <h3 className="text-2xl font-semibold">$15/month</h3>
              <p className="text-gray-500">Ideal for small businesses.</p>
              <button className="mt-4 bg-white text-black py-2 px-4 rounded-lg shadow-md border border-gray-300 relative z-20">
                Get Started
              </button>
              <ul className="mt-4 text-left text-gray-700">
                <li>✔ Unlimited Workspaces</li>
                <li>✔ Unlimited Collaboration</li>
                <li>✔ 15GB Data Storage</li>
                <li>✔ Unified Analytics</li>
                <li>✔ Mobile App Access</li>
              </ul>
            </div>
            
            {/** Enterprise Plan */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl shadow-md relative overflow-hidden z-10">
              <h3 className="text-2xl font-semibold">$25/month</h3>
              <p className="text-gray-500">Works best for enterprise companies.</p>
              <button className="mt-4 bg-white text-black py-2 px-4 rounded-lg shadow-md border border-gray-300 relative z-20">
                Get Started
              </button>
              <ul className="mt-4 text-left text-gray-700">
                <li>✔ Unlimited Workspaces</li>
                <li>✔ Unlimited Collaboration</li>
                <li>✔ 15GB Data Storage</li>
                <li>✔ Unified Analytics</li>
                <li>✔ Mobile App Access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Pricing;