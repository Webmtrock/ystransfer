import React from "react";
import { Link } from "react-router-dom";
import {getPurchasedProgram } from "../../api_config/Auth_Services";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../common/Header";
import Skeleton from "react-loading-skeleton";
import Footer from "../common/Footer";
import { useSelector} from "react-redux";
import Explore_Article from "../reuse_components/Explore_Article";
import { ls } from "../../utilitis/SecureLocalStorage";

const My_Purchased_Program = () => {
  const [purchased, setPurchased] = useState([]);
  const [load, setLoad] = useState(false);
  const uid = ls.get("uId"); //Geting User id From localStorage
  const profileid = ls.get("switchid");
  const getFromReduxprofileId = useSelector(
    (state) => state.userrole.profileid
  );

  const data = {
    userId: uid,
    profileId: getFromReduxprofileId || profileid,
  };
  const handlePurchasedprogram = async () => {
    try {
      setLoad(true);
      const response = await getPurchasedProgram(data);
      if (response.status === true) {
        setPurchased(response.data);
      } else {
        toast(response.message, { type: "error", className: "error" });
        setPurchased([])
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };

  useEffect(() => {
    handlePurchasedprogram();
  }, [getFromReduxprofileId || profileid]);


  return (
    <>
      <div className='bg-[#f5f5f5]'>
        <Header />
        <div className='container pb-10 md:pb-16'>
          <div className='grid  md:px-0 grid-cols-12 pt-5 space-y-5 md:space-y-0 md:gap-x-5'>
            <div className='px-4 col-span-12 md:h-screen pt-2 shadow-lg rounded-md hover:shadow-2xl customScroll bg-white md:pr-5 space-y-4 overflow-y-scroll  md:col-span-8 pb-5'>
              <div className='font-semibold text-center text-sm  tracking-wide text-opacity-80 sticky top-0 md:text-lg'>
                My <span className='border-b-2 border-yellow-400'>Purchased</span>{" "}
                Programs
              </div>
              <>
                {load ? (
                  <>
                    <Link className='block md:w-[70%] mx-auto '>
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
                    <Link className='block md:w-[70%] mx-auto '>
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
                    <Link className='block md:w-[70%] mx-auto '>
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
                    <Link className='block md:w-[70%] mx-auto'>
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
                  </>
                ) : purchased.length >= 1 ? (
                  purchased?.map((item, ind) => {
                    return (
                      <>
                        <>
                          <Link
                            key={ind}
                            to={`/detail-page/${item._id}`}
                            className='block md:w-[70%] mx-auto'
                          >
                            <div className='px-4 pt-4 md:px-2 md:pt-0 cursor-pointer items-center md:gap-x-4  bg-white grid hover:scale-95 justify-between transition-all rounded-lg shadow-lg  border border-black border-opacity-5 grid-cols-12'>
                              <div className='md:col-span-5 col-span-12'>
                                <img
                                  src={item.imageUrl}
                                  alt='error'
                                  className=' h-[180px] md:mr-auto mx-auto md:h-[170px] md:w-[210px] rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-tl-none'
                                />
                              </div>
                              <div className='col-span-12 md:col-span-7 w-[100%] md:w-full py-2 pr-4 space-y-2'>
                                <div className='text-xs tracking-wide text-black text-opacity-40'>
                                  {item.programCategory}
                                </div>
                                <div className='text-black font-semibold tracking-wide text-sm'>
                                  {item.title}
                                </div>
                                <div className='flex items-center space-x-2'>
                                  <img
                                    src={item.expertImage}
                                    alt='error'
                                    className='h-[35px] rounded-full w-[35px]'
                                  />
                                  <div>
                                    <div className='text-[#0FA654] tracking-wide text-xs font-semibold tracki'>
                                      {item.expert}
                                    </div>
                                    <div className='text-black text-xs tracking-wide'>
                                      {item.expertDesignation}
                                    </div>
                                  </div>
                                </div>
                                <div className='pt-2.5'>
                                  <div className='text-xs text-black text-opacity-40'>
                                    {item.fordeseases}
                                  </div>
                                </div>
                              </div>
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
                      <span>Buy a Program to see them here</span>
                      <div className='text-black font-bold text-lg text-center py-2'>
                        OR
                      </div>
                      <span>
                        If you Already purchased please switch Pateint to see
                        them here
                      </span>
                    </div>
                  </div>
                )}
              </>
            </div>
            <div className='col-span-12 h-auto md:h-screen  bg-white shadow-lg w-full hover:shadow-2xl md:w-[95%] rounded-md customScroll  space-y-4 md:overflow-y-scroll  md:col-span-4 pb-5'>
               <Explore_Article />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default My_Purchased_Program;
