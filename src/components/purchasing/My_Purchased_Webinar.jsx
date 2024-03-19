import React from "react";
import { Link } from "react-router-dom";
import {GetMyWebinar} from "../../api_config/Auth_Services";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../common/Header";
import Skeleton from "react-loading-skeleton";
import Footer from "../common/Footer";
import { BsFillCalendarPlusFill, BsFillPlayFill } from "react-icons/bs";
import WebinarVideoPopup from "../WebinarVideoPopup";
import Explore_Article from "../reuse_components/Explore_Article";
import { ls } from "../../utilitis/SecureLocalStorage";


const My_Purchased_Webinar = () => {
  const [purchased, setPurchased] = useState([]);
  const [load, setLoad] = useState(false);
  const uid = ls.get("uId"); //Geting User id From localStorage
  const phonnum = ls.get("phone");
  const data = {
    userId: uid,
    phone: phonnum,
  };

  const handlePurchasedwebinar = async () => {
    try {
      setLoad(true);
      const response = await GetMyWebinar(data);
      if (response.status == true) {
        setPurchased(response.data);
      } else {
        toast(response.message, { type: "error" ,className:"error"});
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };

  useEffect(() => {
    handlePurchasedwebinar();
  }, []);

  const [webVideo, setWebVideo] = useState();
  const [open, setOpen] = useState(false); /*handle Close Open video modal*/
  const handleopen = (e, Video) => {
    setOpen(true);
    setWebVideo(Video);
    e.preventDefault();
    e.stopPropagation();
  };
  const closeVideoModal = (data) => {
    setOpen(data);
  };


  return (
    <>
      <div className='bg-[#f5f5f5]'>
        <Header />
        <div className='container pb-10 md:pb-16'>
          <div className='grid grid-cols-12 pt-5 space-y-5 md:space-y-0 md:gap-x-5'>
            <div className='bg-white px-4 md:px-0 shadow-lg hover:shadow-2xl rounded-md col-span-12 md:h-screen customScroll md:pr-5 space-y-4 md:overflow-y-scroll  md:col-span-8 pb-5'>
              <div className='text-center text-sm  tracking-wide text-opacity-80 sticky pt-2 md:text-lg'>
                My <span className='border-b-2 border-yellow-400'>Purchased</span>{" "}
                Webinar
              </div>
              <>
                {load ? (
                  <>
                    <Link className='block w-full md:w-[70%] mx-auto'>
                      <div className='md:px-2 md:pt-[5px] md:pb-[8px] cursor-pointer items-center md:gap-x-4  md:space-x-0  bg-white grid hover:scale-95 justify-between transition-all rounded-lg shadow-lg  border border-black border-opacity-5 grid-cols-12'>
                        <div className='md:col-span-5 col-span-12'>
                          <Skeleton
                            duration={0.5}
                            className='w-full h-[180px] md:mr-auto mx-auto md:h-[170px] md:w-[210px] rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-tl-none'
                          />
                        </div>
                        <div className='col-span-12 md:col-span-7 w-[100%] md:w-full py-2 pr-4 space-y-2'>
                          <div className='text-xs tracking-wide text-black text-opacity-40'>
                            <Skeleton
                              duration={0.5}
                              className='h-[25px] rounded-3xl'
                            />
                          </div>
                          <div className='text-black font-semibold tracking-wide text-sm'>
                            <Skeleton
                              duration={0.5}
                              className='h-[15px] rounded-3xl'
                            />
                          </div>
                          <div>
                            <Skeleton
                              duration={0.5}
                              className='h-[10px] rounded-3xl'
                            />
                            <Skeleton
                              duration={0.5}
                              className='h-[10px] rounded-3xl'
                            />
                          </div>
                          <div className='pt-2.5'>
                            <div className='text-xs text-black text-opacity-40'>
                              <Skeleton
                                duration={0.5}
                                className='h-[30px] rounded-3xl'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link className='block w-full md:w-[70%] mx-auto'>
                      <div className='md:px-2 md:pt-[5px] md:pb-[8px] cursor-pointer items-center md:gap-x-4  bg-white grid hover:scale-95 justify-between transition-all rounded-lg shadow-lg  border border-black border-opacity-5 grid-cols-12'>
                        <div className='md:col-span-5 col-span-12'>
                          <Skeleton
                            duration={0.5}
                            className='w-full h-[180px] md:mr-auto mx-auto md:h-[170px] md:w-[210px] rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-tl-none'
                          />
                        </div>
                        <div className='col-span-12 md:col-span-7 w-[100%] md:w-full py-2 pr-4 space-y-2'>
                          <div className='text-xs tracking-wide text-black text-opacity-40'>
                            <Skeleton
                              duration={0.5}
                              className='h-[25px] rounded-3xl'
                            />
                          </div>
                          <div className='text-black font-semibold tracking-wide text-sm'>
                            <Skeleton
                              duration={0.5}
                              className='h-[15px] rounded-3xl'
                            />
                          </div>
                          <div>
                            <Skeleton
                              duration={0.5}
                              className='h-[10px] rounded-3xl'
                            />
                            <Skeleton
                              duration={0.5}
                              className='h-[10px] rounded-3xl'
                            />
                          </div>
                          <div className='pt-2.5'>
                            <div className='text-xs text-black text-opacity-40'>
                              <Skeleton
                                duration={0.5}
                                className='h-[30px] rounded-3xl'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link className='block w-full md:w-[70%] mx-auto'>
                      <div className='md:px-2 md:pt-[5px] md:pb-[8px] cursor-pointer items-center md:gap-x-4  bg-white grid hover:scale-95 justify-between transition-all rounded-lg shadow-lg  border border-black border-opacity-5 grid-cols-12'>
                        <div className='md:col-span-5 col-span-12'>
                          <Skeleton
                            duration={0.5}
                            className='w-full h-[180px] md:mr-auto mx-auto md:h-[170px] md:w-[210px] rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-tl-none'
                          />
                        </div>
                        <div className='col-span-12 md:col-span-7 w-[100%] md:w-full py-2 pr-4 space-y-2'>
                          <div className='text-xs tracking-wide text-black text-opacity-40'>
                            <Skeleton
                              duration={0.5}
                              className='h-[25px] rounded-3xl'
                            />
                          </div>
                          <div className='text-black font-semibold tracking-wide text-sm'>
                            <Skeleton
                              duration={0.5}
                              className='h-[15px] rounded-3xl'
                            />
                          </div>
                          <div>
                            <Skeleton
                              duration={0.5}
                              className='h-[10px] rounded-3xl'
                            />
                            <Skeleton
                              duration={0.5}
                              className='h-[10px] rounded-3xl'
                            />
                          </div>
                          <div className='pt-2.5'>
                            <div className='text-xs text-black text-opacity-40'>
                              <Skeleton
                                duration={0.5}
                                className='h-[30px] rounded-3xl'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Link className='block w-full md:w-[70%] mx-auto'>
                      <div className='md:px-2 md:pt-[5px] md:pb-[8px] cursor-pointer items-center md:gap-x-4  bg-white grid hover:scale-95 justify-between transition-all rounded-lg shadow-lg  border border-black border-opacity-5 grid-cols-12'>
                        <div className='md:col-span-5 col-span-12'>
                          <Skeleton
                            duration={0.5}
                            className='w-full h-[180px] md:mr-auto mx-auto md:h-[170px] md:w-[210px] rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-tl-none'
                          />
                        </div>
                        <div className='col-span-12 md:col-span-7 w-[100%] md:w-full py-2 pr-4 space-y-2'>
                          <div className='text-xs tracking-wide text-black text-opacity-40'>
                            <Skeleton
                              duration={0.5}
                              className='h-[25px] rounded-3xl'
                            />
                          </div>
                          <div className='text-black font-semibold tracking-wide text-sm'>
                            <Skeleton
                              duration={0.5}
                              className='h-[15px] rounded-3xl'
                            />
                          </div>
                          <div>
                            <Skeleton
                              duration={0.5}
                              className='h-[10px] rounded-3xl'
                            />
                            <Skeleton
                              duration={0.5}
                              className='h-[10px] rounded-3xl'
                            />
                          </div>
                          <div className='pt-2.5'>
                            <div className='text-xs text-black text-opacity-40'>
                              <Skeleton
                                duration={0.5}
                                className='h-[30px] rounded-3xl'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                ) : purchased.length >= 1 ? (
                  purchased?.map((item, ind) => {
                    return (
                      <>
                        <>
                          <Link key={ind} to={`/webinar-timer/${item._id}`} className='block md:w-[70%] mx-auto rounded-md'>
                            <div className='hover:scale-95 pl-2 py-2 bg-white transition-all  cursor-pointer items-center w-full grid rounded-md shadow-lg md:gap-x-2 grid-cols-12'>
                              <div className='md:col-span-5 col-span-12'>
                                <img
                                  src={item.image}
                                  alt='error'
                                  className='w-full h-[190px] pt-2  md:mr-auto mx-auto'
                                />
                              </div>
                              <Link
                                to={`/webinar-timer/${item._id}`}
                                className='col-span-12 md:col-span-7 w-[100%]   md:w-full md:px-[8%] md:py-6  space-y-1 md:space-y-2'
                              >
                                <Link
                                  className='space-y-3 md:space-y-1'
                                  to={`/webinar-timer/${item._id}`}
                                >
                                  <div className='text-xs tracking-wide text-black text-opacity-40'>
                                    {item.issue}
                                  </div>
                                  <div className='text-black font-semibold tracking-wide text-xs md:text-sm'>
                                    {item.webinarTitle}
                                  </div>
                                </Link>
                                <Link
                                  className='py-2 md:py-1 block'
                                  to={`/webinar-timer/${item._id}`}
                                >
                                  <div className='flex items-center space-x-2'>
                                    <img
                                      src={item.expertImage}
                                      alt='error'
                                      className='rounded-full w-[35px]'
                                    />
                                    <div>
                                      <div className='text-[#0FA654] tracking-wide text-xs font-semibold tracki'>
                                        {item.expertName}
                                      </div>
                                      <div className='text-black text-xs tracking-wide'>
                                        {item.expertDesignation}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className='pt-2'>
                                  <div className='flex items-center justify-between space-x-3'>
                                    <Link to={`/webinar-timer/${item._id}`}>
                                      <div className='flex items-center space-x-1'>
                                        <div className='text-xs'>
                                          {new Date(item.date).toLocaleString(
                                            "en-US",
                                            {
                                              day: "numeric",
                                              month: "short",
                                              year: "numeric",
                                            }
                                          )}{" "}
                                          , {item.day}
                                        </div>
                                        <BsFillCalendarPlusFill
                                          size={17}
                                          className='cursor-pointer text-[#0FA654]'
                                        />
                                      </div>
                                    </Link>
                                    <div
                                      onClick={(e) =>
                                        handleopen(e, item.webinarVideo)
                                      }
                                    >
                                      <div className='flex items-center'>
                                        <div className='text-xs'>
                                          Watch Intro
                                        </div>
                                        <BsFillPlayFill
                                          size={22}
                                          className='cursor-pointer text-[#0FA654]'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </Link>
                        </>
                      </>
                    );
                  })
                ) : (
                  <div className='pt-5'>
                    <img
                      src='/assets/images/empty.png'
                      className='mx-auto  w-[30%]'
                    />
                    <div className='text-center text-black text-[16px] tracking-wide py-2'>
                      It’s empty in here
                    </div>
                    <div className='text-center text-black text-opacity-40 text-[18px] tracking-wide'>
                      <span>Buy a Webinar to see them here</span>
                    </div>
                  </div>
                )}
              </>
            </div>
            <div className='col-span-12 h-auto md:h-screen  bg-white shadow-lg w-full md:w-[95%] hover:shadow-2xl rounded-md customScroll  space-y-4 md:overflow-y-scroll  md:col-span-4 pb-5'>
               <Explore_Article />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {open && (
        <WebinarVideoPopup
          webinarIndVideo={webVideo}
          closeModal={closeVideoModal}
        />
      )}
    </>
  );
};

export default My_Purchased_Webinar;
