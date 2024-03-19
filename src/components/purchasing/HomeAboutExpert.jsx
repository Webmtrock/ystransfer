import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Programs from "../Programs";
import Webinar from "../Webinar";
import ConnectionStatus from "../../error/ConnectionStatus";
import { GetExpertById } from "../../api_config/Auth_Services";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import { ls } from "../../utilitis/SecureLocalStorage";


const HomeAboutExpert = () => {

  const BackPath=ls.get("backpath")
  //getExpertId form Redux
    const expertid=useSelector((state)=>state.userrole.expertid)
    const expertidfromls=ls.get("expertid")
    const expertName=useSelector((state)=>state.userrole.expertname)
    const ExpertNameLs= ls.get("expertname")


  //getExpertId from Redux

  //Getting Location
  const location = useLocation();
  //Getting Location  

  //Get Expert BY Id Api is Here
const getexpertdata=expertName||ExpertNameLs?{"expertName":expertName||ExpertNameLs}:{"Id":expertid || expertidfromls}

  const [load, setLoad] = useState(false);
  const [expert, setExpert] = useState([]);
  const handleGetExpertByid = async () => {
    try {
      setLoad(true);
      const response = await GetExpertById(getexpertdata);
      if (response.status == true) {
        setExpert(response.data);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };
  useEffect(() => {
    handleGetExpertByid();
  }, []);
  //Get Expert BY Id Api is Here

  return (
    <>
      <div className="bg-[#f5f5f5]">
        <Header expertlocation={location} />
        <div className='container'>
          <div className='py-2 md:block hidden md:pb-2 md:pt-0'>
            <Link to={BackPath} className='inline-block'>
              <FiArrowLeft size={25} />
            </Link>
          </div>
          <div className='grid md:gap-x-10 px-4 md:px-0 mt-4 md:mt-0 grid-cols-12 md:pb-5'>
            <div className='col-span-12 bg-white p-2 md:pl-8 md:py-8 rounded-md hover:shadow-2xl md:col-span-8'>
              {load ? (
                <div className='w-full md:w-[90%]'>
                  <div className='bg-[#F3F3F3]  movinganimate hover:bg-yellow-100 transition-all rounded-md shadow-md flex items-center p-3 space-x-10'>
                    <div>
                      <Skeleton
                        duration={0.5}
                        className='rounded-full w-[160px] h-[160px] movinganimate'
                      />
                    </div>
                    <div className='space-y-3'>
                      <div className=' font-semibold md:w-[340px]  text-black text-lg tracking-wide'>
                        <Skeleton duration={0.5} className='movinganimate' />
                      </div>
                      <div className=' font-semibold text-black text-lg tracking-wide'>
                        <Skeleton
                          duration={0.5}
                          className='h-[25px] movinganimate'
                        />
                      </div>
                      <div className=' font-semibold text-black text-lg tracking-wide'>
                        <Skeleton
                          duration={0.5}
                          className='h-[30px] movinganimate'
                        />
                      </div>
                      {/* 
                              <p className='text-black tracking-wide text-sm pt-2'>
                                {expert.expertDesignation}
                              </p>
                              <div className='text-sm tracking-wide pt-4'>
                                  {expert.expertCategory}
                              </div> */}
                    </div>
                  </div>
                  <div className='pt-5'>
                    <div className='text-black font-semibold tracking-wide'>
                      About Expert
                    </div>
                    <p className='text-sm text-black tracking-wide pt-1 space-y-1'>
                      <Skeleton duration={0.5} className='h-[20px]' />
                      <Skeleton duration={0.5} className='h-[15px] w-[50%]' />
                      <Skeleton duration={0.5} className='h-[20px]' />
                      <Skeleton duration={0.5} className='h-[15px] w-[50%]' />
                      <Skeleton duration={0.5} className='h-[15px] w-[50%]' />
                      <Skeleton duration={0.5} className='h-[20px]' />
                      <Skeleton duration={0.5} className='h-[15px] w-[50%]' />
                      <Skeleton duration={0.5} className='h-[20px]' />
                      <Skeleton duration={0.5} className='h-[15px] w-[50%]' />
                      <Skeleton duration={0.5} className='h-[20px]' />
                      <Skeleton duration={0.5} className='h-[20px]' />
                      <Skeleton duration={0.5} className='h-[15px] w-[50%]' />
                      <Skeleton duration={0.5} className='h-[20px]' />
                    </p>
                  </div>
                </div>
              ) : (
                <div className='w-full md:w-[90%]'>
                  <div className='bg-[#F3F3F3] pt-2 hover:bg-yellow-100 transition-all rounded-md shadow-md md:flex items-center md:p-3 md:space-x-10'>
                    <div>
                      <img
                        src={expert.expertProfile}
                        alt='error'
                        className=' md:rounded-full mx-auto h-[160px] w-[160px] rounded-full p-2 bg-gray-300 shadow-md'
                      />
                    </div>
                    <div className=' md:pl-0 py-3 text-center md:text-start'>
                      <div className=' font-semibold text-black text-lg tracking-wide'>
                        {expert.expertName}
                      </div>
                      <p className='text-black tracking-wide text-sm pt-2'>
                        {expert.expertDesignation}
                      </p>
                      <div className='text-md flex flex-wrap items-center justify-center md:justify-start space-x-1.5 tracking-wide pt-2'>
                        {expert?.expertCategory?.split('|').splice(0,3).map((item)=><span  className='text-black tracking-wide bg-yellow-300 px-2 py-[4px] rounded-2xl text-[.6rem]'>{item}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className='pt-5'>
                    <div className='text-black font-semibold tracking-wide'>
                      About Expert
                    </div>
                    <p className='text-sm text-black tracking-wide pt-1'>
                      {expert.expertDescription}
                    </p>
                  </div>
                  <div className='pt-5'>
                    <div className='text-black font-semibold tracking-wide'>
                      Qualification
                    </div>
                    <p className='text-sm text-black tracking-wide pt-1'>
                      {expert.qualification}
                    </p>
                  </div>
                  <div className='pt-5'>
                    <div className='text-black font-semibold tracking-wide'>
                      Experience
                    </div>
                    <p className='text-sm text-black tracking-wide pt-1'>
                    {expert.experience}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className='col-span-12 hover:shadow-2xl bg-white md:col-span-4 h-auto customScroll md:overflow-y-scroll  md:pt-0'>
              <div>
                <Programs  Expert={expert}/>
                <Webinar Expert={expert}/>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ConnectionStatus />
      </div>
    </>
  );
};

export default HomeAboutExpert;
