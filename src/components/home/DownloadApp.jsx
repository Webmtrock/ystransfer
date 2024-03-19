import React from "react";

const DownloadApp = () => {
  return (
    <>
      <div className='container py-10'>
        <div className='grid relative grid-cols-1  md:grid-cols-2 md:pl-20 space-y-5 md:space-y-0 place-items-center'>
          <div className='space-y-3 px-5 md:px-0'>
            <div className='text-3xl font-semibold tracking-wider'>
              DOWNLOAD
            </div>
            <span className='text-black text-2xl tracking-wide'>OUR APP</span>
            <div className='flex items-end'>
              <img
                src='/assets/images/scanner.png'
                alt='error'
                className='w-[30%] mr-auto -translate-x-2'
              />
              <img
                src='/assets/images/playstore.png'
                alt='error'
                className='w-[40%] mx-auto -translate-x-10 md:-translate-x-24'
              />
            </div>
          </div>
          <div>
            <img
              src='/assets/images/download.png'
              alt='erorr'
              className='w-[90%] md:w-[70%] md:mx-auto'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadApp;
