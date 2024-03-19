import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Bottomheader from "../components/home/Bottomheader";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
        <div className='bg-white w-full md:w-[80%] mx-auto hover:shadow-lg border px-5 md:px-10 py-6'>
          <div className='font-semibold pb-2 text-black tracking-wide text-opacity-70 text-2xl text-center'>
            <span className='border-b-2 border-yellow-400'>YellowSquash</span>{" "}
            Privacy Policy
          </div>

          <div className='text-sm text-black tracking-wide py-4'>
            Your privacy is critical to us. Likewise, we have built up this
            Policy with the end goal you should see how we gather, utilize,
            impart, and reveal and make utilization of individual data. The
            following blueprints our privacy policy.
          </div>
          <div className='text-sm text-black tracking-wide py-4'>
            Before or at the time of collecting personal information, we will
            identify the purposes for which information is being collected. We
            will gather and utilization of individual data singularly with the
            target of satisfying those reasons indicated by us and for other
            good purposes, unless we get the assent of the individual concerned
            or as required by law. We will just hold individual data the length
            of essential for the satisfaction of those reasons. We will gather
            individual data by legal and reasonable means and, where fitting,
            with the information or assent of the individual concerned. Personal
            information ought to be important to the reasons for which it is to
            be utilized, and, to the degree essential for those reasons, ought
            to be exact, finished, and updated. We will protect individual data
            by security shields against misfortune or burglary, and also
            unapproved access, divulgence, duplicating use, or alteration. We
            will promptly provide customers with access to our policies and
            procedures for the administration of individual data. We are focused
            on leading our business as per these standards with a specific end
            goal to guarantee that the privacy of individual data is secure and
            maintained.
          </div>
        </div>
      </div>
      <Footer />
      <Bottomheader />
    </>
  );
};

export default PrivacyPolicy;
