import React from "react";

const CountoryServed = () => {
  return (
    <div className='h-[100%]'>
      <>
        <div className='text-center text-black text-md md:text-2xl font-semibold pb-1 md:pb-3 text-opacity-80'>
          <span className='border-b-2 border-yellow-500'>COUNTRIES WE</span>{" "}
          SERVED
        </div>
        <video className='w-full h-[100%]' autoPlay loop muted>
          <source src='https://www.yellowsquash.in/assets/images/sp/map.mp4' type='video/mp4' />
        </video>
      </>
    </div>
  );
};

export default CountoryServed;
