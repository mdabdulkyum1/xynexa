import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';

const Navbar = () => {

const links =<>
  <li>
    <Link href="/">Tasks</Link>
  </li>
  <li>
    <Link href="/about">About Us</Link>
  </li>
  <li>
    <Link href="/">Pricing</Link>
  </li>
  <>
    <li><ModeToggle></ModeToggle></li>
  </>
</>

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl lg:text-3xl">XYnexa</a>
                    
                </div>
                {/* <div className="navbar-center hidden lg:flex">
                    
                </div> */}
                <div className="navbar-end">
                <div>
                    <ul className="menu menu-horizontal px-1 hidden lg:flex">
                        
                        {links}
                    </ul>
                    </div>
                    <a className=" btn p-1 lg:p-2 text-[#895ef7] bg-transparent border-2 border-[#895ef7] mr-2 rounded-2xl">Login</a>
                    <a className="btn p-1 lg:p-2 bg-[#895ef7] text-white border-2 border-[#895ef7] rounded-2xl">Get Started</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;