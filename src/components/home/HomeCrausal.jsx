import React from "react";
import Carousel from "better-react-carousel";
import { Link } from "react-router-dom";

const HomeCrausal = () => {
  return (
    <div className='bg-yellow-50 pb-10 bg-opacity-30'>
      <div className='container h-auto'>
        <Carousel cols={1}  rows={1} gap={10} loop autoplay={2000}>
          <Carousel.Item>
            <div className='grid grid-cols-1 md:space-x-10 space-y-8 md:space-y-0 md:grid-cols-2 items-center'>
              <div>
                <img src='/assets/images/prog.jpg' alt="img"/>
              </div>
              <div>
                <h1 className='font-bold md:text-left text-center text-black text-xl md:text-2xl'>
                  Your Place to Discover Wellness
                </h1>
                <div className='text-xl md:text-2xl tracking-wide  pt-2 pb-5 md:text-left text-center'>
                  EXPLORE OUR PROGRAMS
                </div>
                <Link
                  to='/home-program'
                  className='flex justify-center md:justify-start'
                >
                  <button className='transition-all hover:scale-95 gradient px-8 py-[5px] text-black rounded-2xl'>
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className='grid grid-cols-1 md:space-x-10 md:grid-cols-2 space-y-8 md:space-y-0 items-center'>
              <div>
                <img src='/assets/images/event.png' alt="img"/>
              </div>
              <div>
                <div className='font-bold text-black md:text-left text-center text-xl md:text-2xl'>
                  Online Workshops
                </div>
                <div className='text-xl md:text-2xl tracking-wide md:text-left text-center pt-2 pb-5'>
                  Find Your Path To Health!
                </div>
                <Link
                  to='/home-webinar'
                  className='flex justify-center md:justify-start'
                >
                  <button className='transition-all hover:scale-95 gradient px-8 py-[5px] text-black rounded-2xl'>
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default HomeCrausal;
