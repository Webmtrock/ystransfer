import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Bottomheader from "../components/home/Bottomheader";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const StaticAbout = () => {
  return (
    <>
      <Header />
      <div className='container pt-5 pb-10'>
        <div className='cursor-pointer pl-2 md:pl-0'>
          {" "}
          {/*for move Backside Arrow Button*/}
          <Link to='/'>
            <BiArrowBack size={20} />
          </Link>
        </div>
        <div className='bg-white w-full md:w-[80%] mx-auto transition-all hover:shadow-lg border px-5 md:px-10 py-6'>
          <div className='font-semibold pb-2 text-black  tracking-wide  text-2xl text-center'>
            <span className='border-b-2 border-yellow-500'>About</span>{" "}
            YellowSquash
          </div>

          <p className='text-sm py-2 tracking-wide text-black'>
            YellowSquash is a community-based marketplace for global wellness
            entrepreneurs (both in services and products). We provide platform
            and technology to enable sustainable & holistic wellness
            professionals to be successful, right from generating leads, sales,
            execution and tracking.
          </p>
          <p className='text-sm py-2 tracking-wide text-black'>
            YellowSquash We are on-boarding wellness experts such as Dietitians/
            Nutritionists/ Yoga & Meditation Experts/ Psychologists/ Alternate
            Medicine practitioners / Leadership Coaches etc who can start
            contributing their content on our platform, while other features are
            getting developed. We have a compelling offering for the Experts.
            Get in touch with us at info@yellowsquash.in.
          </p>
          <p className='text-sm py-2 tracking-wide text-black'>
            For the consumers, we create health awareness through our enriching
            content and help them reach their health goals through our
            world-class Experts, tools, programs and products. Currently, we
            have started with online wellness programs.
          </p>
          <p className='text-sm py-2 tracking-wide text-black'>
            Fleurish is our Workplace Wellness offering, focused mainly on
            online programs currently. We have 70+ Wellness Experts from domains
            like Ayurveda, Yoga, Meditation, Mindfulness, Homeopathy, Diet &
            Nutrition, Fitness & Strengthening, Ergonomics & Physiotherapy,
            Emotional Wellness, Psychology, Leadership Grooming, Coaching and so
            on.
          </p>
        </div>
      </div>
      <Footer />
      <Bottomheader />
    </>
  );
};

export default StaticAbout;
