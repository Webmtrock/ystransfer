import React, { useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import { MdOutlineClose } from 'react-icons/md'
import { RiFilter3Fill } from 'react-icons/ri'
import Skeleton from 'react-loading-skeleton'

const Categories = ({ footerselected, handelCateChange, lazyload, unCheckLoad, ClearCategoreis, CategoryList }) => {

    const [mobilfil, setMobilefil] = useState(false);
    const handleMobileFilter = (e) => {
        setMobilefil(true);
    };

    const [show, setShow] = useState(false); //For See More See Less Functionality

    return (
        <div>
            {/* Category Section is Here */}
            <div className='md:block hidden bg-white md:col-span-3 col-span-12 relative border rounded-md hover:shadow-2xl customScroll md:h-screen overflow-y-scroll'>
                <div className='bg-[#525252] z-50 sticky top-0 text-white flex items-center justify-between py-1 px-2 rounded-tr-md rounded-tl-md'>
                    <div className='font-semibold'>Categories</div>
                    <div
                        onClick={ClearCategoreis}
                        className='cursor-pointer gradient text-black px-3 py-[2px] rounded-md text-sm font-semibold'
                    >
                        Clear all
                    </div>
                </div>
                {lazyload || unCheckLoad ? (
                    <div className='py-5 space-y-3 px-4'>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px] movinganimate' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px] movinganimate' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px] movinganimate' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px] movinganimate' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px] movinganimate' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px] movinganimate' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px] movinganimate' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px] movinganimate' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px] movinganimate' />
                        </div>
                    </div>
                ) : (
                    <div className='py-5 space-y-3 px-4'>
                        {CategoryList?.map((item, ind) => (
                            <div
                                key={ind}
                                className={`${ind <= 15 ? "block" : show ? "block" : "hidden"
                                    } flex items-center space-x-2 md:space-x-5 w-full text-sm`}
                            >
                                {ind <= 15 ? (
                                    <input
                                        onChange={(e) => handelCateChange(e)}
                                        value={item}
                                        type={"checkbox"}
                                        className='accent-[#f9d121] larger-checkbox text-white cursor-pointer'
                                        checked={(footerselected && item === footerselected) || null}
                                    />
                                ) : show ? (
                                    <input
                                        onChange={(e) => handelCateChange(e)}
                                        value={item}
                                        type={"checkbox"}
                                        className='accent-[#f9d121] larger-checkbox cursor-pointer'
                                        checked={(footerselected && item === footerselected) || null}
                                    />
                                ) : null}
                                <div>{ind <= 15 ? item : show ? item : null}</div>
                            </div>
                        ))}
                        {CategoryList?.length>0&&<div>
                            <span
                                onClick={() => setShow(!show)}
                                className={`flex  text-xs space-x-1 cursor-pointer ${show ? "text-red-500" : "text-[#0FA654]"
                                    } items-center`}
                            >
                                <div>{show ? "See less" : "See more"}</div>
                                <AiFillCaretRight
                                    className={
                                        show
                                            ? "-rotate-90 text-red-500 transition"
                                            : "text-[#0FA654] rotate-0 transition"
                                    }
                                />
                            </span>
                        </div>}
                        {CategoryList?.length===0&&<div className="flex justify-center items-center">
                            <img src="/assets/images/upcomingdata.jpeg" className="mx-auto" alt="img"/>
                        </div>}
                    </div>
                )}
            </div>

            <div className='w-[80%] pl-4 pb-4 md:hidden block'>
                <div
                    onClick={(e)=>handleMobileFilter(e)}
                    className='w-[100px] cursor-pointer space-x-2 py-[2px] rounded-md px-2 flex items-center bg-gray-200'
                >
                    <RiFilter3Fill className='text-black' size={20} />
                    <div>Sort By</div>
                </div>
            </div>
           
            <div className={`bg-black fixed z-50 bg-opacity-30 ${mobilfil?'block':'hidden'} md:hidden block top-0 left-0 w-full h-screen`}>
            <div
                className={`${mobilfil ? "putanimation" : "animationout"
                    } pt-4 z-50 overflow-y-scroll scale-0 md:hidden block bg-white h-[50%] top-[50%] w-[100%] rounded-tl-3xl py-2 px-3 border-t border-black rounded-tr-3xl shadow text-black fixed bottom-30`}
            >
                <div>
                    <MdOutlineClose
                        size={30}
                        onClick={() => setMobilefil(false)}
                        className='text-black absolute top-2.5 right-2.5'
                    />
                </div>
                <div className='flex items-center space-x-10'>
                    <div className='font-semibold'>Categories</div>
                    <div
                        onClick={ClearCategoreis}
                        className='cursor-pointer gradient text-black px-3 py-[2px] rounded-md text-sm font-semibold'
                    >
                        Clear all
                    </div>
                </div>
                {lazyload || unCheckLoad ? (
                    <div className='py-5 space-y-3 px-4'>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px]' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px]' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px]' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px]' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px]' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px]' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px]' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px]' />
                        </div>
                        <div>
                            <Skeleton duration={0.5} className='w-[140px] h-[20px]' />
                        </div>
                    </div>
                ) : (
                        <div className='py-5 space-y-2 px-4'>
                            {CategoryList?.map((item, ind) => (
                                <div key={ind} className='grid grid-cols-12'>
                                    <div className='col-span-6 flex w-full items-center space-x-2 md:space-x-5'>
                                        <input
                                            type={"checkbox"}
                                            value={item}
                                            onChange={(e) => handelCateChange(e)}
                                            className='accent-[#0FA654] larger-checkbox'
                                            checked={(footerselected && item === footerselected) || null}
                                        />
                                        <div className='text-sm'>{item}</div>
                                    </div>
                                </div>
                            ))}
                            {CategoryList?.length===0&&<div className="flex justify-center items-center">
                                <img src="/assets/images/upcomingdata.jpeg" className="mx-auto" alt="img"/>
                            </div>}
                        </div>
                    
                )}
            </div>
            </div>
            {/* Category Section is Here */}
        </div>
    )
}

export default Categories