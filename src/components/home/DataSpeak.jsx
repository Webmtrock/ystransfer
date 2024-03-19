import React from "react";

const DataSpeak = () => {
  const data = [
    {
      id: 1,
      percent: "70%",
      text: "CUSTOMERS COMPLETELY CURED",
    },
    {
      id: 2,
      percent: "79%",
      text: "CUSTOMERS OFF ALL MEDICINES",
    },
    {
      id: 3,
      percent: "2,500+",
      text: "CUSTOMERS SERVED SUCCESSFULLY",
    },
    {
      id: 4,
      percent: "68%",
      text: "CUSTOMERS HAVE REDUCED MEDICINE ",
    },
  ];

  return (
    <>
      <div className='bg-white container pb-5 pt-8 md:py-16'>
        <div className='text-black text-center font-semibold md:text-2xl tracking-wider'>
          <span className='border-b-2 border-yellow-500'>LET THE</span> DATA
          SPEAK
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 pt-10 md:place-items-center text-center'>
          <div className='md:pl-5'>
            <img
              src='/assets/images/speak.png'
              alt='error'
              className='w-[90%] mx-[5%] md:w-[70%]'
            />
          </div>
          <div className='space-y-10'>
            <div className='grid grid-cols-1  md:grid-cols-2 md:gap-2'>
              {data.map((item, ind) => {
                return (
                  <div key={ind} className='md:pl-0 py-5 space-y-2'>
                    <span className='text-5xl font-bold text-[#CC3D36]'>
                      {item.percent}
                    </span>
                    <div className='text-sm text-black md:w-44'>
                      {item.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataSpeak;
