import React from "react";
import { TfiReload } from "react-icons/tfi";

const NoResult = (props) => {
  return (
    <div className='md:relative py-4 md:py-0 w-full h-full'>
      <div className='md:absolute md:top-[35%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]'>
        <img
          src='/assets/images/notfound.gif'
          alt='img'
          className='mx-auto w-[60%] md:w-full'
        />
        <div className='font-semibold text-center tracking-wide text-sm md:text-lg pt-2'>
          NO RESULTS FOUND
        </div>
        <div className='text-sm md:text-sm pt-2 text-black text-opacity-75 tracking-widest text-center'>
          Sorry, we couldn’t find anything
          <br />
          that matches your search
        </div>
        <div className='pt-3'>
          <div
            onClick={props.Reload}
            className='cursor-pointer text-[#0FA654] hover:scale-95 transition-all flex items-center text-center text-xl justify-center space-x-2'
          >
            <span>Reload</span>
            <TfiReload size={23} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoResult;
