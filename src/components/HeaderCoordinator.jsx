import {Menu , X} from "lucide-react";
import React from 'react';
import { useState } from "react";
import gcek from '../assets/gcek.png';
import { Link,useLocation } from "react-router-dom";


const HeaderCoordinator = () => {
    const [mobileDrawerOpen,setMobileDrawerOpen]=useState(false);
    const toggleNavbar = () =>{
        setMobileDrawerOpen(!mobileDrawerOpen)
    };
    const location = useLocation();
    const navItems = [
      { label: "HOME", href: "/Coordinator" },
      { label: "Add Aptitude Test", href: "/add-test" },
      { label: "Add Event", href: "/add-event" },
      { label: "Add Resources", href: "/add-resources" },
      { label: "Placement Results", href: "/add-results" },
    ];
    {navItems.map((item, index) => (
      <li key={index}>
        <Link
          to={item.href}
          className={`${
            location.pathname === item.href
              ? "text-orange-500 font-bold"
              : "text-white"
          } hover:text-orange-500 transition duration-300`}
        >
          {item.label}
        </Link>
      </li>
    ))}

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
    <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-12 w-12 mr-2" src={gcek} alt="gcek" />
            <span className="text-xl tracking tight">GCEK</span>
          </div>
          <ul className='hidden lg:flex ml-14 space-x-12'>
            {navItems.map((item,index)=>(
              <li key={index}>
                <Link
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? "text-orange-500 font-bold"
                      : "text-black"
                  } hover:text-orange-500 transition duration-300`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items center">

            <Link to="/" className='bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md'>
                LOG OUT
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} aria-label="Toggle mobile menu">
                {mobileDrawerOpen ? <X/> :<Menu/>}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (<div className="fixed right-0 bg-gradient-to-r from-gray-700 to-gray-900 z-20 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
                {navItems.map((item,index)=>(

                    <li key={index} className="py-4">
                 <Link
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? "text-orange-500 font-bold"
                      : "text-white"
                  } hover:text-orange-500 transition duration-300`}
                >
                  {item.label}
                </Link>
                    </li>

                ))}
            </ul>
           <div className="flex space-x-6">
                <a href="#" className="py-2 px-3 border rounded-md bg-gradient-to-r from-orange-500 to-orange-800">
                   LOG OUT
                </a>
            </div>
        </div>

        )}
    </div>
 </nav>
  )
}

export default HeaderCoordinator
