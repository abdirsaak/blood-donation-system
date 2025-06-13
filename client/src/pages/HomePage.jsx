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

  <div className="flex flex-col  justify-center md:flex md:flex-row md:justify-around md:items-center  md:h-screen">
    {/* .....img */}
    <div className="flex justify-center items-center  mt-[10px] md:mt-[0px]">
      <img
        src={Blood_donation_pana_1}
        alt="Blood Donation 1"
        className="w-[250px] md:w-[400px] h-auto"
      />
      </div>

    {/* ....content */}
    <div className="text-center md:text-left md:w-1/2 p-4">
      <h1 className="font-bold text-[30px] md:text-[50px] my-4 ">Recent Blood Donation Happened</h1>
      <p className="md:w-[400px]">
        People realy need people today some saves
      aperson live by transution of bloood always 
      find out how often you can donate blood and 
      make an appointment to donate today.
      </p>
    </div>
  </div>


  {/* Ways to Give */}

  <div className="">

    <h2 className="text-center text-3xl font-bold my-8 
     relative top-[220px] md:relative md:top-[0px]
    ">Ways to Give</h2>
  <div className="
  flex flex-col md:flex-row justify-center items-center  p-8 mt-2
  relative top-[220px] md:relative md:top-[0px]">
    {/* img */}

    <div className="flex flex-col md:flex-row justify-around items-center p-4">
          <img className="w-[250px] md:w-[460px] h-auto" src={blood_test} alt="" />
    </div>
    {/* conatne */}
    <div className="">

           <h2 className="font-bold md:text-[50px] my-4">Donate in Somali</h2>
           <p className="md:w-[570px]">Every day, patients in your community
                  need blood transfusions to survive and
                  thrive. they rely on the generosity of  
                  donors like you, who help ensure a 
                  safe, healthy blood supply. Make an 
                  appointment to donate blood today.</p>

                <div className="my-4 ">
                    <Button  />
                </div>
    </div>


  </div>
  </div>


{/* ......cards */}
    <div className=" relative top-[220px] md:relative md:top-[0px]">
<div className="my-10 px-4">
  <h2 className="text-center text-3xl font-bold mb-6">Donation Highlights</h2>
  <div className="grid gap-6 md:grid-cols-3">
    <Card
      title="Want to donate for the first time?"
      description="We always need new donors. Let 
        us take you through the steps to 
        becoming a donor and the process
        of getting that first appointment 
        booked."
      buttonText="Donate Today"
      image={blood_donation1}
    />
    <Card
      title="We need blood donors"
      description="There are patients need blood if
        you give away even one unit of 
        blood means you are saving live and 
        you are live saver so to donate now 
        set up an appointment now."
      buttonText="Donate Today"
      image={blood_donation2}
    />
    <Card
      title="Save a life today give blood."
      description="Every two seconds Someone needs blood so make your appointment now to donate to save life."
      buttonText="Donate Today"
      image={blood_donatio_3}
    />
  </div>
</div>

    </div> 


    {/* .............header */}
    
        <div className=" relative top-[230px] md:relative md:top-[0px]">
          <Footer />
        </div>
</>
  
  );
};

export default Home;
