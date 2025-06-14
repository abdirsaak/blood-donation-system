// client/src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Blood_donation_pana_1 from "../assets/images/Blood_donation_pana_1.png";
import blood_team from "../assets/images/blood_team.jpg";

function Contact() {

  return (
    <>
          <Navbar />
          <div className="">
            {/* aboutus */}
           
         <section class="bg-red-50 py-20 px-6 md:px-20">
  <div class="max-w-6xl mx-auto text-center">
    <h2 class="text-4xl md:text-5xl font-bold text-red-600 mb-6">About Us</h2>
    <p class="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
      Welcome to <span class="text-red-500 font-semibold">Somali Blood Donation</span> — a digital platform dedicated to saving lives by making blood donation simple, transparent, and efficient. 
      We believe in empowering communities to help each other when it matters most.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8">
      {/* <!-- Card 1 --> */}
      <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-red-500">
        <h3 class="text-xl font-semibold text-red-600 mb-2">Our Vision</h3>
        <p class="text-gray-600">
          A world where no one dies due to the lack of timely blood availability.
        </p>
      </div>

      {/* <!-- Card 2 --> */}
      <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-red-500">
        <h3 class="text-xl font-semibold text-red-600 mb-2">Our Commitment</h3>
        <p class="text-gray-600">
          We strive to connect every willing donor with someone in urgent need, quickly and reliably.
        </p>
      </div>

      {/* <!-- Card 3 --> */}
      <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-red-500">
        <h3 class="text-xl font-semibold text-red-600 mb-2">Why It Matters</h3>
        <p class="text-gray-600">
          Blood can’t be manufactured — it must be given. Your donation can save up to three lives.
        </p>
      </div>
    </div>
  </div>
</section>

           {/* who we are */}

     <section class="bg-white py-16 px-6 md:px-20">
  <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    {/* <!-- Text Content --> */}
    <div>
      <h2 class="text-4xl font-bold text-red-600 mb-4">Who We Are</h2>
      <p class="text-lg text-gray-700 mb-6">
        We are a passionate team of healthcare advocates, tech innovators, and volunteers who believe in the power of giving. 
        Our platform connects generous blood donors with patients and hospitals in need — using smart technology, transparent systems, and human compassion.
      </p>
      <ul class="space-y-4 text-gray-700">
        <li class="flex items-start">
          <span class="text-red-500 mr-3 mt-1">✓</span>
          Community-powered and volunteer-driven
        </li>
        <li class="flex items-start">
          <span class="text-red-500 mr-3 mt-1">✓</span>
          Secure and real-time donor-recipient matching
        </li>
        <li class="flex items-start">
          <span class="text-red-500 mr-3 mt-1">✓</span>
          Backed by medical professionals and local hospitals
        </li>
      </ul>
    </div>

    {/* <!-- Image / Illustration --> */}
    <div class="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
      <img 
        src={blood_team}
        alt="Blood donation team"
        class="object-cover w-full h-full"
      />
      <div class="absolute inset-0 bg-red-600 bg-opacity-30"></div>
    </div>
  </div>
</section>



<section class="bg-red-50 py-16 px-6 md:px-20">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-4xl font-bold text-red-600 mb-4">Our Mission</h2>
    <p class="text-lg text-gray-700 mb-10">
      At <span class="font-semibold text-red-500">[Your System Name]</span>, we are committed to ensuring that no life is lost due to the unavailability of blood. 
      We believe in the power of community, technology, and compassion to connect generous donors with those in critical need.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
      <div class="bg-white shadow-md rounded-2xl p-6 border-l-4 border-red-500">
        <h3 class="text-xl font-semibold text-red-600 mb-2">Save Lives</h3>
        <p class="text-gray-600">We aim to reduce blood shortages by connecting donors with patients in real time.</p>
      </div>
      <div class="bg-white shadow-md rounded-2xl p-6 border-l-4 border-red-500">
        <h3 class="text-xl font-semibold text-red-600 mb-2">Raise Awareness</h3>
        <p class="text-gray-600">We educate communities on the importance of regular, voluntary blood donation.</p>
      </div>
      <div class="bg-white shadow-md rounded-2xl p-6 border-l-4 border-red-500">
        <h3 class="text-xl font-semibold text-red-600 mb-2">Build a Trusted Network</h3>
        <p class="text-gray-600">We partner with hospitals, clinics, and local organizations to ensure safety and efficiency.</p>
      </div>
      <div class="bg-white shadow-md rounded-2xl p-6 border-l-4 border-red-500">
        <h3 class="text-xl font-semibold text-red-600 mb-2">Empower Donors</h3>
        <p class="text-gray-600">We give every donor a platform to track, manage, and celebrate their lifesaving impact.</p>
      </div>
    </div>
  </div>
</section>


          </div>
         
          
    </>
  )
}
export default Contact;
