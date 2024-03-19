import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { GetUpcomingWebinar } from "../api_config/Auth_Services";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ls } from "../utilitis/SecureLocalStorage";

const Webinar = () => {
  const [loadweb, setLoadweb] = useState(false);
  const location=useLocation() //Capturing Location 
  //ExpertName From Redux
  const expertName=useSelector((state)=>state.userrole.expertname)
  const ExpertNameLs= ls.get("expertname")

  //ExpertName From Redux

  //upcoming Program Api is Here
  const [upcomingWeb, setUpcomingWeb] = useState([]);
  const handleUpcoming = async () => {
    try {
      setLoadweb(true);
      const response = await GetUpcomingWebinar({
        expert:location?.pathname=='/home-about-expert'?expertName||ExpertNameLs:''
      });
      if (response.status == true) {
        setUpcomingWeb(response.data);
      } else {
        setUpcomingWeb([])
      }
      setLoadweb(false);
    } catch (error) {
      setLoadweb(false);
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
    borderRadius: '10px',
    filter: 'invert(0)',
    borderRadius:'6px'
  };

  return (
    <>
      <div>
        <div className='bg-white space-y-3 p-3 hover:shadow-2xl hover:border hover:rounded-md transition-all'>
          <div className='text-sm sticky z-50 top-0 font-semibold tracking-wide bg-white pb-2'>
            <span className='pb-1.5 text-lg border-b-[3px] border-[#F9D121] bg-white'>
              Upcoming Workshops
            </span>
          </div>
          {loadweb ? (
            <div className='space-y-4'>
              <div
                className={`grid grid-cols-12 border px-2 py-2 pb-3 rounded-md movinganimate hover:scale-95 transition-all cursor-pointer`}
              >
                <div className='col-span-5'>
                  <Skeleton duration={0.5} className='h-[100%] w-[100%]' />
                </div>
                <div className='col-span-7 px-2'>
                  <div>
                    <Skeleton duration={0.5} className='w-full h-[20px]' />
                  </div>
                  <div>
                    <Skeleton duration={0.5} className='w-[80%] h-[20px]' />
                  </div>
                  <div>
                    <Skeleton duration={0.5} className='w-full h-[20px]' />
                  </div>
                </div>
              </div>
              <div
                className={`grid grid-cols-12 border px-2 py-2 pb-3 rounded-md movinganimate hover:scale-95 transition-all cursor-pointer`}
              >
                <div className='col-span-5'>
                  <Skeleton duration={0.5} className='h-[100%] w-[100%]' />
                </div>
                <div className='col-span-7 px-2'>
                  <div>
                    <Skeleton duration={0.5} className='w-full h-[20px]' />
                  </div>
                  <div>
                    <Skeleton duration={0.5} className='w-[80%] h-[20px]' />
                  </div>
                  <div>
                    <Skeleton duration={0.5} className='w-full h-[20px]' />
                  </div>
                </div>
              </div>
              <div
                className={`grid grid-cols-12 border px-2 py-2 pb-3 rounded-md movinganimate hover:scale-95 transition-all cursor-pointer`}
              >
                <div className='col-span-5'>
                  <Skeleton duration={0.5} className='h-[100%] w-[100%]' />
                </div>
                <div className='col-span-7 px-2'>
                  <div>
                    <Skeleton duration={0.5} className='w-full h-[20px]' />
                  </div>
                  <div>
                    <Skeleton duration={0.5} className='w-[80%] h-[20px]' />
                  </div>
                  <div>
                    <Skeleton duration={0.5} className='w-full h-[20px]' />
                  </div>
                </div>
              </div>
              <div
                className={`grid grid-cols-12 border px-2 py-2 pb-3 rounded-md movinganimate hover:scale-95 transition-all cursor-pointer`}
              >
                <div className='col-span-5'>
                  <Skeleton duration={0.5} className='h-[100%] w-[100%]' />
                </div>
                <div className='col-span-7 px-2'>
                  <div>
                    <Skeleton duration={0.5} className='w-full h-[20px]' />
                  </div>
                  <div>
                    <Skeleton duration={0.5} className='w-[80%] h-[20px]' />
                  </div>
                  <div>
                    <Skeleton duration={0.5} className='w-full h-[20px]' />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            upcomingWeb&&upcomingWeb?.length<1?
             <div>
               <img src="/assets/images/upcomingdata.jpeg" alt="img" className="w-[200px] mx-auto"/>
             </div>
            :
            <>
              {upcomingWeb.map((item, ind) => (
                <Link
                  to={`/webinar-timer/${item._id}`}
                  className='inline-block'
                  key={ind}
                >
                  <div
                    className={`grid grid-cols-12 hover:scale-95 transition-all cursor-pointer`}
                  >
                    <div className='col-span-5'>
                      <img src={item.image} alt='error' style={imgStyles}/>
                    </div>
                    <div className='col-span-7 px-2'>
                      <div className='text-sm text-black flex items-center space-x-1.5'>
                        <CiCalendarDate size={18} />
                        <span>{new Date(item.date).toLocaleDateString("en-US" ,{day:"numeric",month:"short",year:"numeric"})}</span>
                      </div>
                      <div className='pt-1 text-xs font-semibold text-black'>
                        {item.webinarTitle}
                      </div>
                      <div className='text-sm pt-1   tracking-wide'>
                        <span className="font-semibold text-black text-sm pr-1">By:</span> <span className="text-green-600">{item.expertName?.substring(0,15)}..</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Webinar;
