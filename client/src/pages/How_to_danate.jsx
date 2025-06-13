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

      
    
            <h1 className='text-center my-6 font-bold text-gray-500'>How to donate and Eligibility Criteria</h1>

       <div className="">
        <h1 className='pl-4 font-bold py-4 md:ml-20'>Age</h1>
            <p className='px-4 text-gray-500 md:w-[600px] md:ml-20'>You must be at least 17 years old to donate to the general blood, or older than 17, 
        if allowed by state law. There is no upper age limit for blood donation as long as 
        you are well with no restrictions or limitations to your activities. Persons under 
        the age of 17 may, however, donate blood for their own use, in advance of scheduled 
        surgery or in situations where their blood has special medical value for a particular 
        patient such as a family member.</p>
       </div>

       <div className="">
        <h1 className='pl-4 font-bold py-4 md:ml-20'>Weight</h1>
            <p className='px-4 text-gray-500 md:w-[600px] md:ml-20'>
              You must weigh at least 110 lbs to be eligible 
            for blood donation for your own safety.
            </p>
       </div>


       <div className="">
        <h1 className='pl-4 font-bold py-4 md:ml-20'>Montserrat</h1>
            <p className='px-4 text-gray-500 md:w-[600px] md:ml-20'>
             The person donating blood must be healthy 
            means if the person have cancer or aids, 
            heart attack and other risky diseases it’s 
            not allowed to donate blood due to his own 
            healthy and the health of the  others. 
            </p>
       </div>
      {/* .....How to make an appointment to donate blood */}

      <div className="">

        <h1 className='text-center my-6 font-bold text-gray-500 mt-20'>How to make an appointment to donate blood</h1>

        <ul style={{listStyleType: "number"}} className='px-4 text-gray-500 md:w-[600px] md:ml-20'>
          <li className=' mx-4 md:mx-0text-[18px] py-2'>First  you need to have an account as donor to make donation.</li>
          <li className=' mx-4 md:mx-0text-[18px] py-2'>Second you need fullfil the eligibility criteria to make donation.</li>
          <li className=' mx-4 md:mx-0text-[18px] py-2'>Also you need to the donation page</li>
          <li className=' mx-4 md:mx-0text-[18px] py-2'>After you go to donation page the make an appointment to donate blood.</li>
        </ul>
      </div>



      {/* .......... */}
      <div className="">
            <h1 className='text-center my-6 font-bold text-gray-500 mt-20'>Facts About Different Blood Types</h1>
      {/* ....cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-8 mt-8">
      <div className="">
            <Blood_card
              title = "A+ Facts"
              description1 = "1. A+ is the most common blood type, found in about 34% of the population."
              description2 = "2. A+ blood can receive A+, A-, O+, and O- blood types."
              description3 = "3. A+ blood is compatible with A+ and AB+ recipients for transfusions."
              image = {A_plus_img}
            />
      </div>
      <div className="">
         
            <Blood_card
              title = "B+ Facts"
              description1 = "1. B+ is found in about 8% of the population."
              description2 = "2. B+ blood can receive B+, B-, O+, and O- blood types."
              description3 = "3. B+ blood is compatible with B+ and AB+ recipients for transfusions."
              image = {B_plus_img}
       />
       </div>
      <div className="">
            
            <Blood_card
              title = "AB Facts"
              description1 = "1. AB is the universal recipient, meaning it can receive blood from any type."
              description2 = "2. AB blood can only donate to AB+ recipients."
              description3 = "3. AB+ is the rarest blood type, found in about 4% of the population."
              image = {AB_img}
            />
      </div>
      <div className="">
          
            <Blood_card
              title = "O+ Facts"
              description1 = "1. O+ is the most common blood type, found in about 37% of the population."
              description2 = "2. O+ blood can donate to all positive blood types (A+, B+, AB+, O+)."
              description3 = "3. O+ blood can receive O+, O-, A+, and A- blood types."
              image = {O_plus_img}
            />
        </div>


      </div>

      </div>



      {/* ....footer */}
      <Footer />
    </div>
  )
}

export default How_to_danate
