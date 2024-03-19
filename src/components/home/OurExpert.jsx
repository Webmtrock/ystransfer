import Carousel from "better-react-carousel";
import React from "react";
import { GetAllExpert } from "../../api_config/Auth_Services";
import { useEffect } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import {useLocation, useNavigate } from "react-router-dom";
import { ExpertId, ExpertName } from "../../redux/RoleSlice";
import { useDispatch } from "react-redux";
import { ls } from "../../utilitis/SecureLocalStorage";

const OurExpert = () => {

  //Location Path
  const location = useLocation() 
  
  //Get All Experts Api is Here
  const [load, setLoad] = useState(false);
  const [expertData, setExpertData] = useState([]);

  const GettingExpert = async () => {
    try {
      setLoad(true);
      const response = await GetAllExpert();
      setExpertData(response.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };
  useEffect(() => {
    GettingExpert();
  }, []);
  //Get All Experts Data With api

  //dispatch Expert id n redux
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleExpertDetail = (expertid,expertname) => {
    navigate('/home-about-expert')
    ls.save("expertid", expertid)
    ls.save("expertname",expertname)
    ls.save("backpath",location.pathname)
    dispatch(ExpertId(expertid));
    dispatch(ExpertName(""))
  };
  //dispatch Expert id n redux

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
    <>
      <div className='container py-8'>
        <div className='md:text-2xl font-semibold text-black text-opacity-80 text-center py-5 tracking-wider'>
          OUR <span className='border-b-2 border-yellow-500'>EXPERTS</span>
        </div>
        <div>
          {load ? (
            <Carousel
              className='grid grid-cols-12 px-5 md:px-0 space-y-5 md:space-y-0 lg:pl-[6%]'
              cols={3}
              rows={1}
            >
              {expertData.map((item, ind) => {
                return (
                  <Carousel.Item>
                    <div
                      key={ind}
                      className='col-span-12  md:col-span-4 p-3 border md:w-[300px] shadow-lg rounded-lg'
                    >
                      <Skeleton
                        duration={0.5}
                        className='rounded-lg w-[100%] h-[200px]'
                      />
                      <div className='p-1.5 rounded-md'>
                        <div>
                          <span className='text-center block text-xs'>
                            <Skeleton className='h-[25px]' duration={0.5} />
                          </span>
                        </div>
                      </div>
                      <div>
                        <Skeleton className='h-[25px]' duration={0.5} />
                        <Skeleton duration={0.5} className='h-[30px]' />
                      </div>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          ) : (
            <Carousel
              className='grid grid-cols-12 px-5 md:px-0 space-y-5 md:space-y-0 lg:pl-[6%]'
              cols={3}
              rows={1}
              loop
              autoplay={2000}
            >
              {expertData?.map((item, ind) => {
                return (
                  item?.expertName?.substring(0,2)==="YS"?null:<Carousel.Item>
                    <div
                      onClick={()=>handleExpertDetail(item._id,item.expertName)}
                      className=' hover:scale-95 transition-all cursor-pointer inline-block'
                    >
                      <div
                        key={ind}
                        className='col-span-12 md:col-span-4 p-3 border mx-auto md:w-[300px] shadow-lg rounded-lg'
                      >
                        <img
                          src={item.expertProfile}
                          alt='error'
                          style={imgStyles}
                        />
                        <div className='p-1.5 rounded-md w-[90%] mx-auto'>
                          <div className='py-3 bg-black rounded-md -translate-y-[50%]'>
                            <div className='text-yellow-500 tracking-wide leading-snug font-semibold text-xs text-center'>
                              {item.expertName}
                            </div>
                            <span className='text-center text-white tracking-wide block text-xs'>
                              {item.expertDesignation}
                            </span>
                          </div>
                        </div>
                        <div className='flex items-center text-sm md:space-x-3'>
                          <div className='text-center'>
                            <span className='text-black font-semibold'>
                              {item?.patientsTreated}+
                            </span>
                            <div className='text-center text-black text-opacity-70 text-xs'>
                              Patients Treated
                            </div>
                          </div>
                          <div className='text-center'>
                            <span className='text-black font-semibold'>
                              {item?.participantsEnrolled}+
                            </span>
                            <div className='text-center text-black text-opacity-70 text-xs'>
                              Participants Enrolled
                            </div>
                          </div>
                          <div className='text-center'>
                            <span className='text-black font-semibold'>
                              {item?.yearsOfExperience}+
                            </span>
                            <div className='text-center text-black text-opacity-70 text-xs'>
                              Years of Experience
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                  // </Link>
                );
              })}
            </Carousel>
          )}
        </div>
      </div>
    </>
  );
};

export default OurExpert;
