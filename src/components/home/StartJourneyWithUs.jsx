import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const StartJourneyWithUs = () => {
  const [change1, setChange1] = useState(false);
  const [change2, setChange2] = useState(false);
  const [change3, setChange3] = useState(false);
  const [change4, setChange4] = useState(false);
  const [change5, setChange5] = useState(false);

  const componentref=useRef(null)


  const scrollChange1 = () => {
    if (window.scrollY > 400) {
      setChange1(true);
    } else {
      setChange1(false);
    }
  };

  const scrollChange2 = () => {
    if (window.scrollY > 800) {
      setChange2(true);
    } else {
      setChange2(false);
    }
  };

  const scrollChange3 = () => {
    if (window.scrollY > 1150) {
      setChange3(true);
    } else {
      setChange3(false);
    }
  };

  const scrollChange4 = () => {
    if (window.scrollY > 600) {
      setChange4(true);
    } else {
      setChange4(false);
    }
  };

  const scrollChange5 = () => {
    if (window.scrollY > 900) {
      setChange5(true);
    } else {
      setChange5(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollChange5);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollChange4);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollChange2);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollChange3);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollChange1);
  }, []);

  return (
    <div className='bg-gray-100' ref={componentref}>
      <div className='container py-10'>
        <div className='md:text-2xl tracking-wide font-semibold text-center text-black '>
          START THE{" "}
          <span className='border-b-2 border-[#F9D121]'>JOURNEY WITH US</span>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 relative'>
          <div className="order-2 md:order-none">
            <Link to='/home-webinar' className='cursor-pointer'>
              <div className='relative'>
                <div>
                  <img
                    src='/assets/images/J1.png'
                    className='w-[80%] mx-auto'
                  />
                </div>
                <div>
                  <div
                    className={`${
                      change1 ? "text-[#F9D121]" : "text-black"
                    } font-semibold text-lg text-center`}
                  >
                    Informative Events
                  </div>
                  <div className='text-black text-lg tracking-wide text-center'>
                    Find Your Path To Health!
                  </div>
                </div>
                <div
                  className={`${
                    change1 ? "gradient" : "bg-gray-200"
                  } z-10 p-8 right-10 bottom-28  hidden md:inline-block rounded-full absolute`}
                ></div>
              </div>
            </Link>
            <Link to={"/home-program"} >
              <div className='relative md:pr-10'>
                <div>
                  <img
                    src={`/assets/images/${change2 ? "J2.png" : "oldj2.png"}`}
                    className='w-[80%] mx-auto'
                  />
                </div>
                <div>
                  <div
                    className={`${
                      change2 ? "text-[#F9D121]" : "text-black"
                    } font-semibold text-lg text-center`}
                  >
                    Wellness Programs
                  </div>
                  <div className='text-black text-lg tracking-wide text-center'>
                    Become a better version of yourself!
                  </div>
                </div>
                <div
                  className={`${
                    change2 ? "gradient" : "bg-gray-200"
                  } z-10 p-8 right-20 top-32 hidden md:inline-block rounded-full absolute`}
                ></div>
              </div>
            </Link>
            <div></div>
            <div></div>
            <Link to={"/home-healthpedia"}>
              <div className='relative'>
                <div>
                  <img
                    src={`/assets/images/${change3 ? "j3.png" : "oldj3.png"}`}
                    className='w-[80%] mx-auto'
                  />
                </div>
                <div>
                  <div
                    className={` ${
                      change3 ? "text-[#F9D121]" : "text-black"
                    } font-semibold text-lg text-center`}
                  >
                    Healthpedia
                  </div>
                  <div className='text-black text-lg tracking-wide text-center'>
                    Become Aware!
                  </div>
                </div>
                <div
                  className={`${
                    change3 ? "gradient" : "bg-gray-200"
                  } z-10 p-8 top-32 right-5 hidden md:inline-block rounded-full absolute`}
                ></div>
              </div>
            </Link>
          </div>
          <div className='md:pt-32 order-1 md:order-none'>
            <Link to='/home-expert'>
              <div className='relative'>
                <div>
                  <img
                    src={`/assets/images/${change4 ? "j4.png" : "oldj4.png"}`}
                    className='w-[80%] mx-auto'
                  />
                </div>
                <div>
                  <div
                    className={`${
                      change4 ? "text-[#F9D121]" : "text-black"
                    } font-semibold text-lg text-center`}
                  >
                    Consultations
                  </div>
                  <div className='text-black text-lg tracking-wide text-center'>
                    Find The Best Wellness Expert For Yourself!
                  </div>
                </div>
                <div
                  className={`${
                    change4 ? "gradient" : "bg-gray-200"
                  } z-10 p-8 left-20 bottom-28  hidden md:inline-block rounded-full absolute`}
                ></div>
              </div>
            </Link>
            <div className='order-1 relative'>
              <div>
                <img
                  src={`/assets/images/${change5 ? "j5.png" : "oldj5.png"}`}
                  className='w-[80%] mx-auto'
                />
              </div>
              <div>
                <div
                  className={`${
                    change5 ? "text-[#F9D121]" : "text-black"
                  }  font-semibold text-lg text-center`}
                >
                  Product
                </div>
                <div className='text-black text-lg tracking-wide text-center'>
                  Coming Soon!
                </div>
              </div>
              <div
                className={`${
                  change5 ? "gradient" : "bg-gray-200"
                }  z-10 p-8 left-20 bottom-32  md:inline-block rounded-full hidden absolute`}
              ></div>
            </div>
          </div>
          <div>
            <img
              src='/assets/images/line.png'
              className='h-[60%] hidden md:block absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartJourneyWithUs;
