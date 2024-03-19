import React from "react";
import { Link } from "react-router-dom";
import { ls } from "../utilitis/SecureLocalStorage";

const Error404 = () => {

  //Clear Storage If User is Click on Ligin / signup Button
  const handleclearStorage=()=>{
    ls.clear()
  }

  return (
    <div className='relative h-screen w-full p-3 md:p-10'>
      <Link to={"/"}>
        <img src='/assets/images/logo.png' alt='erorr' className='' />
      </Link>
      <div className='md:shadow md:absolute h-auto w-full md:h-[70%] md:w-[50%]  py-10 md:left-[50%] md:top-[50%] md:translate-y-[-50%] md:translate-x-[-50%] md:border'>
        <div className='space-y-10 md:space-y-0'>
          <div className='text-xl md:text-2xl md:text-center pb-5'>
            <span className='text-3xl md:text-4xl'>Error : </span>
            <span className='text-6xl font-semibold text-yellow-500'>
              404
            </span>{" "}
            Page Not Found
          </div>
          <img
            src='/assets/images/404.jpg'
            alt='error'
            className='w-full md:w-[40%] mx-auto'
          />
        </div>
        <div className='pt-20 pb-10 md:pb-0 flex items-center md:pt-0 space-x-4 justify-center'>
          <button className='btn-animataion gradient px-2 md:px-5 py-[5px] rounded-md hover:scale-95 transition-all'>
            <Link to='/'>Back To Home</Link>
          </button>
          <span>OR</span>
          <button onClick={handleclearStorage} className='btn-animataion gradient px-2 md:px-5 py-[5px] rounded-md hover:scale-95 transition-all'>
            <Link to='/login'>Login / Signup</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
