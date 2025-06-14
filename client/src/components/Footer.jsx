import React from 'react';
import donate_img from '../assets/images/donate_img.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#EC78A4] text-white px-6 py-10 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Logo/Image */}
        <div className="flex justify-center md:justify-start">
          <img
            className="w-40 hidden md:block"
            src={donate_img}
            alt="Donate"
          />
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <nav className="flex flex-col space-y-3">
            <Link to="/home" className="hover:text-gray-100 transition">Home</Link>
            <Link to="/about-us" className="hover:text-gray-100 transition">About Us</Link>
            <Link to="/how to donate" className="hover:text-gray-100 transition">How to Donate</Link>
            <Link to="/Request-blood" className="hover:text-gray-100 transition">Request Blood</Link>
          </nav>
        </div>

        {/* Info Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Somali Blood Donation System</h2>
          <p className="text-sm leading-relaxed">
            Somali Blood Donation Management System is a platform that simplifies blood donation 
            for both donors and recipients. It is a web-based system that streamlines donation processes 
            and manages blood bank logistics effectively.
          </p>
        </div>
      </div>

      {/* Mobile-Only Nav (Optional if keeping above mobile-friendly) */}
      <div className="hidden mt-10 text-center">
        <h2 className="text-lg font-semibold mb-4">Services</h2>
        <nav className="space-y-2">
          <Link to="/home" className="block font-medium hover:text-gray-100">Home</Link>
          <Link to="/about-us" className="block font-medium hover:text-gray-100">About Us</Link>
          <Link to="/how to donate" className="block font-medium hover:text-gray-100">How to Donate</Link>
          <Link to="/Request-blood" className="block font-medium hover:text-gray-100">Request Blood</Link>
        </nav>
      </div>

      {/* Bottom Copy */}
      <div className="mt-12 text-center text-sm text-white/80">
        &copy; {new Date().getFullYear()} Somali Blood Donation System. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
