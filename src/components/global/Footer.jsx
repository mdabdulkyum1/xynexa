"use client";

import { usePathname } from "next/navigation";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const pathName = usePathname(); // Get the current path
  if(!pathName.includes("dashboard")) {
      return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-10">
            {/* gap-8 */}
          <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 lg:gap-20 gap-8">
            
            {/* Left Section - Brand  */}
            <div>
              <h2 className="text-white text-2xl font-bold"><span className="text-primary">XY</span>nexa</h2>
              <p className="text-sm mt-2">Work together & dream together</p>
              <p className="text-sm mt-2">
                  <span className="text-primary font-bold">XYnexa</span> Improving collaboration, productivity and workflow efficiency to help your team grow.
                  </p>
            </div>
    
            {/* Middle Sections Lists */}
            <div>
              <h3 className="text-white font-semibold mb-3 uppercase">Company</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-primary">About US</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Contact US</a></li>
                <li><a href="#" className="hover:text-primary">Terms & Conditions</a></li>
              </ul>
            </div>
    
            <div>
              <h3 className="text-white font-semibold mb-3 uppercase">Services</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-primary">Call</a></li>
                <li><a href="#" className="hover:text-primary">Collaborate</a></li>
                <li><a href="#" className="hover:text-primary">Chats</a></li>
                <li><a href="#" className="hover:text-primary">Team Management</a></li>
              </ul>
            </div>
    
            <div>
              <h3 className="text-white font-semibold mb-3 uppercase">Support</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-primary">Forum Support</a></li>
                <li><a href="#" className="hover:text-primary">Help & FAQ</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
    
          </div>
    
          {/* Newsletter & Social Media */}
          <div className="container mx-auto px-5 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Newsletter Subscription */}
            <div>
              <div className="flex mt-3">
                <input
                  type="email"
                  placeholder="Email address..."
                  className="w-full p-2 rounded-l bg-gray-800 border border-gray-700 text-white focus:outline-none"
                />
                <button className="bg-primary text-black px-4 py-2 rounded-r font-semibold hover:text-white transition">
                  Subscribe 
                </button>
              </div>
            </div>
    
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end space-x-4 text-xl ">
              <a href="#" className="block border-2 p-3 rounded-full  hover:scale-110 transition-all duration-300 hover:text-primary"><FaFacebookF /></a>
              <a href="#" className= "block border-2 p-3 rounded-full hover:scale-110 transition-all duration-300 hover:text-primary"><FaTwitter /></a>
              <a href="#" className="block border-2 p-3 rounded-full  hover:scale-110 transition-all duration-300 hover:text-primary"><FaLinkedinIn /></a>
            </div>
          </div>
    
          {/* Footer Bottom */}
          <div className="text-center  text-sm mt-10 border-t border-gray-700 pt-5">
            <p>Copyright © {currentYear} Xynexa. All rights reserved.</p>
          </div>
        </footer>
      );
  }
};

export default Footer;
