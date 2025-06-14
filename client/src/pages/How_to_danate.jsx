import React from 'react'
import Navbar from '../components/Navbar'
import Blood_card from '../components/Blood_card'
import Footer from '../components/Footer'

// imgages
import A_plus_img from '../assets/images/A+.png'
import B_plus_img from '../assets/images/B+.png'
import AB_img from '../assets/images/AB.png'
import O_plus_img from '../assets/images/O+.png'

function How_to_danate() {
  return (
    <div>
            <Navbar />

{/*  How to Donate & Eligibility Criteria */}
      
    <section className="bg-gray-50 py-16 px-6 md:px-20">
  <h1 className="text-center text-3xl md:text-4xl font-bold text-red-600 mb-12">
    How to Donate & Eligibility Criteria
  </h1>

  <div className="space-y-10 max-w-4xl mx-auto">

    {/* Age */}
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-red-500 mb-2">Age</h2>
      <p className="text-gray-600 text-base leading-relaxed">
        You must be at least 17 years old to donate to the general blood supply, or older if required by your local law. 
        There’s no upper age limit for donation as long as you're healthy with no activity restrictions. 
        Under 17s can donate for their own use or for special medical needs in family cases.
      </p>
    </div>

    {/* Weight */}
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-red-500 mb-2">Weight</h2>
      <p className="text-gray-600 text-base leading-relaxed">
        You must weigh at least 110 lbs (50 kg) to donate blood safely. This helps ensure donor well-being and protects recipients.
      </p>
    </div>

    {/* Health */}
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-red-500 mb-2">Health Conditions</h2>
      <p className="text-gray-600 text-base leading-relaxed">
        Donors must be in good health. If you have conditions like cancer, AIDS, heart disease, or other high-risk illnesses, 
        blood donation is not advised—for your safety and that of others.
      </p>
    </div>

  </div>
</section>

      {/* .....How to make an appointment to donate blood */}

     <section className="bg-white py-16 px-6 md:px-20">
  <h2 className="text-center text-3xl md:text-4xl font-bold text-red-600 mb-12">
    How to Make an Appointment to Donate Blood
  </h2>

  <div className="max-w-3xl mx-auto bg-red-50 p-6 rounded-xl shadow-md">
    <ol className="list-decimal list-inside space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
      <li>
        <span className="font-medium text-gray-800">Create a Donor Account:</span>  
        First, you need to register as a donor in the system.
      </li>
      <li>
        <span className="font-medium text-gray-800">Check Eligibility:</span>  
        Make sure you fulfill all the required eligibility criteria.
      </li>
      <li>
        <span className="font-medium text-gray-800">Go to Donation Page:</span>  
        Navigate to the dedicated blood donation appointment section.
      </li>
      <li>
        <span className="font-medium text-gray-800">Make Your Appointment:</span>  
        Select a date, time, and location to confirm your donation.
      </li>
    </ol>
  </div>
</section>



<section className="bg-gray-50 py-16 px-4 md:px-20">
  <h2 className="text-3xl md:text-4xl text-center font-bold text-red-600 mb-12">
    Facts About Different Blood Types
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <Blood_card
      title="A+ Facts"
      description1="1. A+ is the most common blood type, found in about 34% of the population."
      description2="2. A+ blood can receive A+, A-, O+, and O- blood types."
      description3="3. A+ blood is compatible with A+ and AB+ recipients for transfusions."
      image={A_plus_img}
    />
    <Blood_card
      title="B+ Facts"
      description1="1. B+ is found in about 8% of the population."
      description2="2. B+ blood can receive B+, B-, O+, and O- blood types."
      description3="3. B+ blood is compatible with B+ and AB+ recipients for transfusions."
      image={B_plus_img}
    />
    <Blood_card
      title="AB Facts"
      description1="1. AB is the universal recipient — it can receive blood from any type."
      description2="2. AB blood can only donate to AB+ recipients."
      description3="3. AB+ is the rarest blood type, found in about 4% of the population."
      image={AB_img}
    />
    <Blood_card
      title="O+ Facts"
      description1="1. O+ is the most common blood type, found in about 37% of the population."
      description2="2. O+ blood can donate to all positive blood types (A+, B+, AB+, O+)."
      description3="3. O+ blood can receive O+, O-, A+, and A- blood types."
      image={O_plus_img}
    />
  </div>
</section>




      {/* ....footer */}
      <Footer />
    </div>
  )
}

export default How_to_danate
