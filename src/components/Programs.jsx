import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { GetUpcomingProgram } from "../api_config/Auth_Services";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { ls } from "../utilitis/SecureLocalStorage";

const Programs = () => {
  const [load, setLoad] = useState(false);

  const location=useLocation() //Capturing Location
  
  //Expert Name From Redux
  const expertName=useSelector((state)=>state.userrole.expertname)
  const ExpertNameLs=ls.get("expertname")
  //Expert Name From Redux

  //upcoming Program Api is Here
  const [upcomingPro, setUpcomingPro] = useState([]);
  const handleUpcoming = async () => {
    try {
      setLoad(true);
      const response = await GetUpcomingProgram({
        expert:location?.pathname=='/home-about-expert'?expertName||ExpertNameLs:''
      });
      if (response.status === true) {
        setUpcomingPro(response.data);
      } else {
        // toast(response.message, { type: 'error', className: 'error' });
        setUpcomingPro([])
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };

  useEffect(() => {
    handleUpcoming();
  }, [expertName||ExpertNameLs]);
  //upcoming Program Api is Here

  const imgStyles = {
    boxSizing: 'border-box',
    fontWeight: 400,
    position: 'static',
    verticalAlign: 'middle',
    borderStyle: 'none',
    maxWidth: '100%',
    minWidth: 'auto',
    maxHeight: '100%',
    minHeight: 'auto',
    height: 'auto',
    width: '600.391px',
    filter: 'invert(0)',
    borderRadius:'6px'
  };

  return (
    <>
      <div className='bg-white space-y-3 px-3 pb-3 hover:border hover:rounded-md transition-all'>
        <div className='text-sm  sticky top-0  font-semibold tracking-wide bg-white pb-2'>
          <span className=' text-lg border-b-[3px] inline-block border-[#F9D121]  bg-white'>
            Upcoming Programs
          </span>
        </div>
        {load ? (
          <div className='space-y-2'>
            <div
              className={`grid border px-2 pt-1 pb-2.5 movinganimate rounded-md hover:scale-95 transition-all grid-cols-12 cursor-pointer`}
            >
              <div className='col-span-5'>
                <Skeleton duration={0.5} className='w-full h-full' />
              </div>
              <div className='col-span-7 px-2'>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-[100%] h-[20px]' />
                </div>
                <div className='text-xs pt-1 text-black text-opacity-80 tracking-wide'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
              </div>
            </div>
            <div
              className={`grid border px-2 pt-1 pb-2.5 movinganimate rounded-md hover:scale-95 transition-all grid-cols-12 cursor-pointer`}
            >
              <div className='col-span-5'>
                <Skeleton duration={0.5} className='w-full h-full' />
              </div>
              <div className='col-span-7 px-2'>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-[100%] h-[20px]' />
                </div>
                <div className='text-xs pt-1 text-black text-opacity-80 tracking-wide'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
              </div>
            </div>
            <div
              className={`grid border px-2 pt-1 pb-2.5 movinganimate rounded-md hover:scale-95 transition-all grid-cols-12 cursor-pointer`}
            >
              <div className='col-span-5'>
                <Skeleton duration={0.5} className='w-full h-full' />
              </div>
              <div className='col-span-7 px-2'>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-[100%] h-[20px]' />
                </div>
                <div className='text-xs pt-1 text-black text-opacity-80 tracking-wide'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
              </div>
            </div>
            <div
              className={`grid border px-2 pt-1 pb-2.5 movinganimate rounded-md hover:scale-95 transition-all grid-cols-12 cursor-pointer`}
            >
              <div className='col-span-5'>
                <Skeleton duration={0.5} className='w-full h-full' />
              </div>
              <div className='col-span-7 px-2'>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-[100%] h-[20px]' />
                </div>
                <div className='text-xs pt-1 text-black text-opacity-80 tracking-wide'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
              </div>
            </div>
            <div
              className={`grid border px-2 pt-1 pb-2.5 movinganimate rounded-md hover:scale-95 transition-all grid-cols-12 cursor-pointer`}
            >
              <div className='col-span-5'>
                <Skeleton duration={0.5} className='w-full h-full' />
              </div>
              <div className='col-span-7 px-2'>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-[100%] h-[20px]' />
                </div>
                <div className='text-xs pt-1 text-black text-opacity-80 tracking-wide'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
              </div>
            </div>
            <div
              className={`grid border px-2 pt-1 pb-2.5 movinganimate rounded-md hover:scale-95 transition-all grid-cols-12 cursor-pointer`}
            >
              <div className='col-span-5'>
                <Skeleton duration={0.5} className='w-full h-full' />
              </div>
              <div className='col-span-7 px-2'>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
                <div className='pt-1 text-xs font-semibold text-black'>
                  <Skeleton duration={0.5} className='w-[100%] h-[20px]' />
                </div>
                <div className='text-xs pt-1 text-black text-opacity-80 tracking-wide'>
                  <Skeleton duration={0.5} className='w-full h-[20px]' />
                </div>
              </div>
            </div>
          </div>
        ) : (
          upcomingPro && upcomingPro?.length < 1 ?
            <div>
              <img src="/assets/images/upcomingdata.jpeg" alt="img" className="w-[200px] mx-auto" />
            </div> :
            <>
              {upcomingPro?.map((item, ind) => (
                <Link
                  className='inline-block'
                  to={`/detail-page/${item.programId}`}
                >
                  <div
                    className={`grid hover:scale-95  transition-all grid-cols-12 cursor-pointer`}
                  >
                    <div className='col-span-5'>
                      <img
                        src={item.imageUrl}
                        alt='error'
                        style={imgStyles}
                      />
                    </div>
                    <div className='col-span-7 px-2'>
                      <div className='text-xs text-black text-opacity-50 flex items-center'>
                        <CiCalendarDate size={18} />
                        <span>{new Date(item.startDate).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <div className='pt-1 text-xs font-semibold text-black'>
                        {item.title}
                      </div>
                      <div className='text-xs pt-1 text-black text-opacity-80 tracking-wide'>
                        {item.expert}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
        )}
      </div>
    </>
  );
};

export default Programs;
