import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetUpcomingProgram } from "../../api_config/Auth_Services";
import { CiCalendarDate } from "react-icons/ci";
import Carousel from "better-react-carousel";

const OurProgramme = () => {
  //upcoming Program Api is Here
  const [upcomingPro, setUpcomingPro] = useState([]);
  const handleUpcoming = async () => {
    try {
      const response = await GetUpcomingProgram({
        expert:''
      });
      if (response.status === true) {
        setUpcomingPro(response.data);
      } else {
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
    upcomingPro?.length>0&&<>
      <div className='container space-y-5 pt-14 pb-8 px-4 md:px-0'>
        <div className='text-center md:text-2xl text-black font-semibold pb-0 md:pb-3 text-opacity-80 tracking-wider'>
          UPCOMING{" "}
          <span className='border-b-2 border-yellow-500'>PROGRAMS</span>
        </div>
        <Carousel cols={3} rows={1} gap={10} loop autoplay={5000}>
          {upcomingPro.map((item, ind) => (
            <Carousel.Item key={ind}>
              <div className='md:pl-2'>
                <Link
                  to={`/detail-page/${item.programId}`}
                  className='block col-span-9 md:col-span-3 bg-white border h-[380px] hover:scale-95 transition-all p-4 space-y-2 overflow-hidden rounded-md cursor-pointer'
                >
                  <img
                    src={item.imageUrl}
                    alt='error'
                    style={imgStyles}
                  />
                  <div>
                    <div className='text-sm text-black font-semibold text-start'>
                      <div className='inline-block'>Start Date:</div>{" "}
                      <CiCalendarDate
                        size={20}
                        className='ml-2 mr-1 inline-block text-black'
                      />
                      {new Date(item.startDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                    </div>
                    <p className='text-black font-semibold text-sm text-start'>
                      {item.title}
                    </p>
                    <p className='text-black font-semibold italic text-sm md:w-[70%] text-start'>
                      <span className='pr-2'>By</span>
                      <span className='text-[#0FA654]'>{item.expert}</span>
                    </p>
                  </div>
                </Link>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className='flex justify-center pt-4 md:pt-8'>
          <Link to='/home-program'>
            <button className='gradient px-8 py-[4px] transition-all hover:scale-95 rounded-md'>
              View all
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OurProgramme;
