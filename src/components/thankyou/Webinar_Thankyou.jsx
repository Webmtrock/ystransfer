import React from 'react'
import { GetWeinarById } from '../../api_config/Auth_Services';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from '../../utilitis/Loader';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { ls } from '../../utilitis/SecureLocalStorage';

const Webinar_Thankyou = () => {

  const location = useLocation()

  const PurchasedWebinarId = ls.get("purchasedWebinarid") //Purchased Webinar id Getting from localStorage

  //Get Webinar By Id Api is Here
  const [load, setLoad] = useState(false);
  const [webinarbyid, setWebinarbyid] = useState({});

  const handleWebinarById = async () => {
    try {
      setLoad(true);
      const response = await GetWeinarById(PurchasedWebinarId);
      if (response.status === true) {
        setWebinarbyid(response.data);
      } else {
        toast(response.message, { type: "error", className: "error" });
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };

  useEffect(() => {
    handleWebinarById()
  }, []);
  //Get Webinar By Id Api is Here

  return (
    <>
      <div className="bg-white">
        <Header WebThankyoulocation={location} />
        <div className='container pb-5'>
          <div className='py-2 md:pb-2 md:pt-0'>
            <Link to='/' className='inline-block'>
              <FiArrowLeft size={25} />
            </Link>
          </div>
          <div className='py-3'>
            <div className='flex justify-center'>
              <img src='/assets/images/webinarthank.png' alt='img' className='w-[160px] h-[160px] scaleanimate' />
            </div>
            <div className='md:flex text-center items-center pb-5 md:pb-10 pt-4 md:pt-8 md:justify-center'>
              <div className='text-black text-[1rem] tracking-wide'>You’ve successfully enrolled for our</div>
              <div className='text-black pl-1 font-bold tracking-wide text-[1rem]'>{webinarbyid?.webinarTitle}</div>
            </div>
            <div className='p-4 bg-[#e5fff1] md:w-[80%] mx-auto shadow-lg grid grid-cols-12 rounded-lg'>
              <div className='col-span-12 md:col-span-8'>
                <div className='md:flex items-center md:space-x-6'>
                  <div className='pb-2 md:pb-0'>
                    <img src='/assets/images/diversity.png' alt='img' className='mx-auto' />
                  </div>
                  <div>
                    <div className='pb-2 md:pb-4 md:text-left text-center'>
                      <div className='font-bold tracking-wide text-black text-[1.1rem]'>Join Workshop Support Group</div>
                      <div className='text-black text-sm text-opacity-80 tracking-wide'>Share, care & Grow</div>
                    </div>
                    <div className='text-[1rem] tracking-wide text-center md:text-left text-black'>This helps you stay up-to-date with the workshop. </div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 md:col-span-4 pt-5 md:pt-0 md:relative'>
                <a href={webinarbyid?.latestWhatsappLink} target='blank' className='mx-auto hover:scale-90 transition-all md:absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] justify-center w-[80%] text-white font-semibold py-2 rounded-lg shadow-lg animate-pulse hover:animate-none space-x-3 flex items-center px-8 whatsapp'>
                  <img src='/assets/images/whatsapp.webp' alt='img' className="w-[40px]" />
                  <div>Join Group</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Loader show={load} />
    </>
  )
}

export default Webinar_Thankyou
