import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GetUpcomingWebinar } from "../../api_config/Auth_Services";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "better-react-carousel";

const Webinar = () => {
  //upcoming Program Api is Here
  const [upcomingWeb, setUpcomingWeb] = useState([]);
  const handleUpcoming = async () => {
    try {
      const response = await GetUpcomingWebinar({
        expert:''
      });
      if (response.status === true) {
        setUpcomingWeb(response.data);
      } else {
        // toast(response.message,{type:"error",className:"error"});
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleUpcoming();
  }, []);
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
  };


  return (
    upcomingWeb?.length>0&&<>
      <div className='container space-y-5 px-4 pb-10 md:pb-12 md:px-0'>
        <div className='text-center md:text-2xl text-black font-semibold pb-5 text-opacity-80 tracking-wider'>
          UPCOMING{" "}
          <span className='border-b-2 border-yellow-500'>WEBINARS</span>
        </div>
        <Carousel cols={3} rows={1} gap={10} loop autoplay={5000}>
          {upcomingWeb.map((item, ind) => {
            return (
              <Carousel.Item  key={ind}>
                <div className='pl-0 md:pl-2'>
                  <Link
                    to={`/webinar-timer/${item._id}`}
                    className='block col-span-9 bg-white md:col-span-3 hover:scale-95 transition-all shadow-xl p-4 space-y-2 overflow-hidden rounded-md cursor-pointer'
                  >
                    <img
                      src={item.image}
                      alt='error'
                      style={imgStyles}
                    />
                    <div>
                      <div className='flex items-center text-sm justify-start'>
                        Start Date:{" "}
                        <CiCalendarDate size={20} className='ml-2' />
                        <span className='pl-1'>
                          {new Date(item.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} | {item.Starttime}
                        </span>
                      </div>
                      <p className='text-black font-semibold text-sm w-full md:w-[70%] text-left'>
                        {item.webinarTitle}
                      </p>
                      <span className='text-sm italic text-[#0FA654] text-left block'>
                        {item.expertName}
                      </span>
                    </div>
                  </Link>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className='flex justify-center  md:pt-5'>
        <Link to='/home-webinar'>
          <button className='gradient px-8 py-[4px] transition-all hover:scale-95 rounded-md'>
            View all
          </button>
        </Link>
      </div>
    </>
  );
};

export default Webinar;
