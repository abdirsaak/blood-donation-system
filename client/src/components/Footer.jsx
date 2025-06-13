import React from 'react'
import donate_img from '../assets/images/donate_img.png'

import { Link, useNavigate } from "react-router-dom";
function Footer() {
  return (
   
    <>
                <div className="bg-[#EC78A4] md:flex md:justify-between md:items-center p-6 text-center md:text-left text-white">	    
                  
                    {/* img */}
                    <div className="">
                        <img className='hidden md:block' src={donate_img} alt="" />
                    </div>

                    {/* links */}
                    <div className="hidden md:block">
                        <nav className='md:flex md:flex-col md:justify-around md:items-center space-y-6'>
                           <Link to="/home" className="text-gray-700 hover:text-red-600">Home</Link>
                           <Link to="/about-us" className="text-gray-700 hover:text-red-600">about us</Link>
                            <Link to="/how to donate" className="text-gray-700 hover:text-red-600">How To donate</Link>
                            <Link to="/Request-blood" className="text-gray-700 hover:text-red-600">Request Blood</Link>
                        </nav>
                    </div>

                    {/* content */}

                    <div className="text-center md:text-left p-4 text-white ">
                        <h1 className='font-bold py-6'> Somali Blood donation System</h1>
                        <p className='md:w-[400px]'>
                            Somali Blood donation management 
                            system is a system that makes it 
                            easy for people to donate blood 
                            online in a timely manner for both 
                            donors and recipients. It's also a 
                            web-based system that can help 
                            with blood bag information during 
                            handling in the blood bank.
                        </p>
                    </div>
                      {/* links */}
                    <div className=" md:hidden mt-4 pl-2 text-white">
                        <h1 className='font-bold text-[30px]'>Services</h1>
                        <nav className='flex flex-col  space-y-2 mt-6'>
                           <Link to="/home" className="text-white font-bold py-[2px] hover:text-red-600">Home</Link>
                           <Link to="/about-us" className="text-white font-bold py-[2px] hover:text-red-600">about us</Link>
                           <Link to="/how to donate" className="text-white font-bold py-[2px] hover:text-red-600">How To donate</Link>
                           <Link to="/Request-blood" className="text-white font-bold py-[2px] hover:text-red-600">Request Blood</Link>
                        </nav>
                    </div>
                </div>
    </>
  )
}

export default Footer
