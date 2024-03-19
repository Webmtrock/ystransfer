import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Bottomheader from "../components/home/Bottomheader";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const Faqs = () => {
  const faq = [
    {
      id: 1,
      heading: "What kind of programs does YellowSquash offer?",
      para: "YellowSquash Programs are well thought through well being programs. We cover all aspects of human wellness – nutritional, physical, mental, emotional, intellectual, social and spiritual.",
    },
    {
      id: 2,
      heading: "Are the programs dispensed through only live sessions?",
      para: "For the time being, programs are being conducted through live classes so that you can clear all your doubts and queries. However, in near future we will also have recorded version of these live programs available for subscription at a lower cost",
    },
    {
      id: 3,
      heading: "What if I am not available for the program time slots?",
      para: "If you are not available for the time slots of the program, please check later on. We will soon have recorded version of the courses held in the past.",
    },
    {
      id: 4,
      heading: "What if I miss a session?",
      para: "Not to worry! All participants who have subscribed to a program can access all previously held recorded classes in their account.",
    },
    {
      id: 5,
      heading: "Where can I reach for technical issues?",
      para: "You can write to info@yellowsquash.in or call +91 120 435 6959 for any technical queries.",
    },
    {
      id: 6,
      heading: "How can one become an instructor with YellowSquash?",
      para: "YellowSquash follows a rigorous process to vet an instructor. Once registered, YellowSquash team requires you to fill in a detailed profile form along with submission of relevant certifications. Additionally, there are telephonic and/ or video interviews to qualify as a YellowSquash expert. Kindly note that this necessary to maintain the quality we aspire and promise to our consumers.",
    },
  ];

  return (
    <>
      <Header />
      <div className='container pt-5 pb-10'>
          <div className='cursor-pointer pl-2 md:pl-0'> {/*for move Backside Arrow Button*/}
            <Link to="/"><BiArrowBack size={20}/></Link>
          </div>
        <div className='bg-white w-full md:w-[80%] mx-auto transition-all hover:shadow-lg border px-5 md:px-10 py-6'>
          <div className='font-semibold pb-2 text-black tracking-wide text-opacity-70 text-2xl text-center'>
            <span className='border-b-2 border-yellow-400'>YellowSquash</span>{" "}
            FAQs
          </div>
          <div className='py-5 space-y-5'>
            {faq.map((item, ind) => (
              <div key={ind}>
                <div className='tracking-wide text-lg text-black'>
                  {item.heading}
                </div>
                <p className='text-sm text-black tracking-wide text-opacity-80 py-2'>
                  {item.para}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <Bottomheader />
    </>
  );
};

export default Faqs;
