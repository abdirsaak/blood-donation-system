import { Link } from "react-router-dom";

import Blood_donation_pana_1  from "../assets/images/Blood_donation_pana_1.png";
import blood_test  from "../assets/images/blood_test.png";
import blood_donation1 from "../assets/images/blood_donation_1.png";
import blood_donation2 from "../assets/images/blood_donation_2.png";
import blood_donatio_3 from "../assets/images/blood_donatio_3.png";

// ...........Compnones 
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Card from "../components/Card";
import Footer from "../components/Footer";
const Home = () => {
  return (
<>
  <Navbar />

  <div className="flex flex-col-reverse md:flex-row md:justify-around md:items-center md:h-screen px-6 md:px-20 py-10 bg-red-50">
  {/* Content */}
  <div className="text-center md:text-left md:w-1/2 p-4">
    <h1 className="font-extrabold text-3xl md:text-5xl text-red-700 mb-6 leading-tight">
      Recent Blood Donation Happened
    </h1>
    <p className="text-gray-700 md:w-[400px] mx-auto md:mx-0 text-base md:text-lg leading-relaxed">
      People really need people today. Some save a life by the transfusion of blood. Always find out how often you can donate blood and make an appointment to donate today.
    </p>
  </div>

  {/* Image */}
  <div className="flex justify-center md:justify-end md:w-1/2 mb-8 md:mb-0">
    <img
      src={Blood_donation_pana_1}
      alt="Blood Donation Illustration"
      className="w-[250px] md:w-[400px] h-auto rounded-xl shadow-lg"
    />
  </div>
</div>



 {/* Ways to Give */}
<section className="bg-white px-6 md:px-20 py-16">
  <h2 className="text-center text-3xl md:text-4xl font-bold text-red-600 mb-12">
    Ways to Give
  </h2>

  <div className="flex flex-col-reverse md:flex-row items-center gap-12">
    {/* Content */}
    <div className="md:w-1/2 text-center md:text-left">
      <h3 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-4">
        Donate in Somalia
      </h3>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
        Every day, patients in your community need blood transfusions to survive and thrive. 
        They rely on the generosity of donors like you to help ensure a safe and healthy blood supply. 
        Make an appointment to donate blood today.
      </p>

      <div>
        {/* Call-to-action button (customize as needed) */}
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300">
          Make an Appointment
        </button>
      </div>
    </div>

    {/* Image */}
    <div className="md:w-1/2 flex justify-center">
      <img
        src={blood_test}
        alt="Blood donation illustration"
        className="w-[260px] md:w-[460px] h-auto rounded-xl shadow-lg"
      />
    </div>
  </div>
</section>



{/* Donation Highlights Section */}
<section className="bg-red-50 py-20 px-6 md:px-20">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl md:text-4xl text-center font-bold text-red-700 mb-12">
      Donation Highlights
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        title="Want to donate for the first time?"
        description="We always need new donors. Let us take you through the steps to becoming a donor and getting that first appointment booked."
        buttonText="Donate Today"
        image={blood_donation1}
      />
      <Card
        title="We need blood donors"
        description="There are patients who need blood. Donating even one unit can save a life — be a lifesaver today by setting up an appointment."
        buttonText="Donate Today"
        image={blood_donation2}
      />
      <Card
        title="Save a life today. Give blood."
        description="Every two seconds, someone needs blood. Your donation can mean the difference between life and death."
        buttonText="Donate Today"
        image={blood_donatio_3}
      />
    </div>
  </div>
</section>



    {/* .............header */}
    
        <div className=" relative top-[230px] md:relative md:top-[0px]">
          <Footer />
        </div>
</>
  
  );
};

export default Home;
