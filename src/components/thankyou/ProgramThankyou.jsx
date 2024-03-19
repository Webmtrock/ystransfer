import React from "react";
import { GetSessionbypu } from "../../api_config/Auth_Services";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../../utilitis/Loader";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ls } from "../../utilitis/SecureLocalStorage";

const Program_Thankyou = () => {
  const location = useLocation();

  const PurchasedProgramId = ls.get("PurcahsedIdProgram"); //Purchased Webinar id Getting from localStorage
  const [data, setData] = useState({}); //response Received from Get Program by id Api
  const [load, setLoad] = useState(false); //Change State if req is send and stop if res is recievd

  //Purchased Program Api is Here
  const GetProgramDetailById = async () => {
    const session_data = {
      programId: PurchasedProgramId,
      userId: "Guest_User",
      profileId: "Guest_User",
    };

    try {
      setLoad(true);
      const Response = await GetSessionbypu(session_data);
      if (Response.status === true) {
        setData(Response.data);
      } else {
        toast(Response.message, { type: "error", className: "error" });
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };

  useEffect(() => {
    GetProgramDetailById();
  }, []);
  //Purchased Program api is Here

  //Get Plan and Implement Logic That if User is Going to Purcase Educational plan then dont show Intake form Link
  const SELECTED_PLAN = ls.get("plan");
  const SELECTED_DURATION = ls.get("planDuration")
  //Get Plan and Implement Logic That if User is Going to Purcase Educational plan then dont show Intake form Link

  return (
    <>
      <div className='bg-white'>
        <Header WebThankyoulocation={location} />
        <div className='container pb-5'>
          <div className='py-2 md:pb-2 md:pt-0'>
            <Link to='/home-program' className='inline-block'>
              <FiArrowLeft size={25} />
            </Link>
          </div>
          <div className='py-3'>
            <div className='flex justify-center'>
              <img
                src='/assets/images/webinarthank.png'
                alt='img'
                className='scaleanimate w-[160px] h-[160px]'
              />
            </div>
            <div className='md:flex items-center text-center pb-5 md:pb-10 pt-4 md:pt-8 justify-center'>
              <div className='text-black text-[1rem] tracking-wide'>
                You’ve successfully enrolled for our
              </div>
              <div className='text-black pl-1 font-bold tracking-wide text-[1rem]'>
                {data?.title}
              </div>
            </div>
            <div className='p-4 bg-[#e5fff1] md:w-[80%] w-full mx-auto shadow-lg grid grid-cols-12 rounded-lg'>
              <div className='col-span-12 md:col-span-8'>
                <div className='md:flex items-center md:space-x-6'>
                  <div>
                    <img
                      src='/assets/images/diversity.png'
                      alt='img'
                      className='mx-auto'
                    />
                  </div>
                  <div className='md:pb-0 pb-5'>
                    <div className='md:pb-4 pb-2 md:text-left text-center'>
                      <div className='font-bold tracking-wide text-black text-[1.1rem]'>
                        Join Program Support Group
                      </div>
                      <div className='text-black text-sm text-opacity-80 tracking-wide'>
                        Share, care & Grow
                      </div>
                    </div>
                    <div className='text-[1rem] tracking-wide text-center md:text-left text-black'>
                      This helps you stay up-to-date with the program.{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className='md:col-span-4 col-span-12 md:relative'>
                <a
                  href={data?.whatsappLink}
                  target='blank'
                  className='md:absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] mx-auto justify-center w-[80%] text-white font-semibold py-2 rounded-lg shadow-lg animate-pulse hover:scale-90 transition-all hover:animate-none space-x-3 flex items-center px-8 whatsapp'
                >
                  <img src='/assets/images/whatsapp.webp' alt='img' className="w-[40px]"/>
                  <div>Join Group</div>
                </a>
              </div>
            </div>
            {SELECTED_PLAN==="Treatment"&&SELECTED_DURATION==="Individual" ?(
              <div className='pt-8 md:pt-16'>
                <div className='text-black text-[1.2rem] md:text-[1.6rem] font-semibold tracking-wide text-center'>
                  let’s Begin Your Journey!
                </div>
                <div className='flex pt-5 justify-center'>
                  <img
                    src='/assets/images/intakeform.png'
                    alt='img'
                    className='w-[140px] h-[140px]'
                  />
                </div>
                <div className='text-black font-semibold tracking-wide text-center pt-3 text-[1.1rem]'>
                  Intake Form
                </div>
                <div className='text-[1rem] text-black tracking-wide text-opacity-70 text-center pt-2'>
                  To understand your medical history to offer you personalized
                  treatment plan.
                  <br />
                  Email/WhatsApp your reports at +91 000000000
                </div>
                <div className='relative pt-20'>
                  <a
                    href={data?.whatsappLink}
                    target='blank'
                    className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center mx-auto w-[70%] md:w-[20%] text-white font-semibold py-2 rounded-lg shadow-lg bg-opacity-70 hover:scale-90 transition-all space-x-3 flex items-center px-8 whatsapp'
                  >
                    <div>Fill Google Form</div>
                  </a>
                </div>
              </div>
            ):null}
          </div>
        </div>
        <Footer />
      </div>
      <Loader show={load} />
    </>
  );
};

export default Program_Thankyou;
