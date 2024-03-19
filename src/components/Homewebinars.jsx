import React, { useState } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import NoResult from "./NoResult";
import Bottomheader from "./home/Bottomheader";
import { BsFillCalendarPlusFill, BsFillPlayFill} from "react-icons/bs";
import Programs from "./Programs";
import { Link } from "react-router-dom";
import { getAllWebinar, getfilteredWebinar } from "../api_config/Auth_Services";
import { useEffect } from "react";
import WebinarVideoPopup from "./WebinarVideoPopup";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import Categories from "./reuse_components/Categories";
import SearchBar from "./reuse_components/SearchBar";

 const Homewebinars = () => {
  const [lazyload, setLasyLoad] = useState(false);
  const [filterload, setFilterLoad] = useState(false);
  const [unCheckload, setUncheckLoad] = useState(false);

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

  //All Webinars Api is Here
  const [webinars, setWebinars] = useState([]);
  const [webCategory, setWebcategory] = useState([]);
  const getWebinars = async () => {
    try {
      setLasyLoad(true);
      setUncheckLoad(true);
      const Response = await getAllWebinar();
      if (Response.status === true) {
        setWebcategory(Response.category);
        setWebinars(Response.data);
      } else {
        setWebcategory([]);
        setWebinars([]);
        toast(Response.message, { type: "error", className: "error" })
      }
      setLasyLoad(false);
      setUncheckLoad(false);
      setFor(false);
    } catch (error) {
      setLasyLoad(false);
      setUncheckLoad(false);
    }
  };
  useEffect(() => {
    getWebinars();
  }, []);
  //All Webinars Api is Here

  //Send Category Api is Here
  const [cate, setCate] = useState([]);
  const stringData = cate.map((item) => `${item}`).join("&");

  const handleCate = (e) => {
    if (e.target.checked) {
      setCate([...cate, e.target.value]);
    } else {
      setCate((item) => {
        return [...item.filter((items) => items !== e.target.value)];
      });
      setFor(true);
    }
  };
  //Send Category Api is Here

  //Get Filtered Api Data is Here
  const [For, setFor] = useState();
  const [filterd, setFiltered] = useState([]);
  const handleFilterWebinar = async () => {
    try {
      setFilterLoad(true);
      const response = await getfilteredWebinar(stringData);
      setFiltered(response.data);
      setFilterLoad(false);
      setFor(response.status);
    } catch (error) {
      setFilterLoad(false);
    }
  };
  useEffect(() => {
    handleFilterWebinar();
  }, [stringData]);
  //Get Filtered Api Data is Here

  //States For Search Data
  const [search, setSearch] = useState("");
  const [newData, setNewData] = useState([]);

  const SearchItem = (SearchValue) => {
    setSearch(SearchValue);
    if (search !== "") {
      const FilterdData = webinars.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setNewData(FilterdData);
    } else {
      setNewData(webinars);
    }
  };
  //States For Search Data

  const handleClear = () => {
    setCate([]);
    setFiltered([]);
    getWebinars();
    setFor();
  };

  return (
    <div className='bg-[#f5f5f5] h-full w-full'>
      <>
        <Header />
        <div className='container md:pt-0'>
          {/* SearchBar is Here */}
          <SearchBar TYPE={"search"} VALUE={search} ONCHANGE={SearchItem} />
          {/* SearchBar is Here */}

          {/* Main Program container is Start Below */}
          <div className='pb-10'>
            <div className='grid grid-cols-12 md:gap-x- 3 lg:gap-x-5'>
              {/* Category Component is Here */}
              <div className="col-span-3">
                <Categories CategoryList={webCategory} handelCateChange={handleCate} ClearCategoreis={handleClear} lazyload={lazyload} unCheckLoad={unCheckload} />
              </div>
              {/* Category Component is Here */}
              <div className='md:col-span-6 col-span-12 md:overflow-y-scroll  md:pb-0 h-auto  md:h-screen customScroll'>
                {lazyload || filterload ? (
                  <div className='space-y-4 px-4 md:px-0'>
                    <div className='movinganimate cursor-pointer md:pl-3 pb-2 pt-1 items-center bg-white   grid rounded-lg shadow-lg md:gap-x-3  grid-cols-12'>
                      <div
                        className={`col-span-12 md:col-span-5 md:pt-0 px-4 md:px-0`}
                      >
                        <Skeleton
                          duration={0.5}
                          className='lg:w-[210px] h-[170px]'
                        />
                      </div>
                      <div className='col-span-12 md:col-span-7 md:w-full pt-1.5 pb-2 pl-4 md:pl-0  pr-4 space-y-2'>
                        <div className='text-xs tracking-wide text-black text-opacity-40'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='text-black font-semibold tracking-wide text-sm'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Skeleton
                            duration={0.5}
                            className='rounded-full w-[40px] h-[40px]'
                          />
                          <div className='w-full'>
                            <Skeleton className='w-full text-[#0FA654] rounded-2xl tracking-wide text-xs font-semibold tracki h-[13px]' />
                            <Skeleton className='text-[#0FA654] tracking-wide rounded-2xl text-xs font-semibold tracki h-[13px]' />
                          </div>
                        </div>
                        <div className='pt-2.5'>
                          <div className='text-xs text-black text-opacity-40'>
                            <Skeleton
                              duration={0.5}
                              className='h-[30px] rounded-2xl'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='movinganimate cursor-pointer md:pl-3 pb-2 pt-1 items-center bg-white   grid rounded-lg shadow-lg md:gap-x-3  grid-cols-12'>
                      <div
                        className={`col-span-12 md:col-span-5 md:pt-0 px-4 md:px-0`}
                      >
                        <Skeleton
                          duration={0.5}
                          className='lg:w-[210px] h-[170px]'
                        />
                      </div>
                      <div className='col-span-12 md:col-span-7 md:w-full pt-1.5 pb-2 pl-4 md:pl-0  pr-4 space-y-2'>
                        <div className='text-xs tracking-wide text-black text-opacity-40'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='text-black font-semibold tracking-wide text-sm'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Skeleton
                            duration={0.5}
                            className='rounded-full w-[40px] h-[40px]'
                          />
                          <div className='w-full'>
                            <Skeleton className='w-full text-[#0FA654] rounded-2xl tracking-wide text-xs font-semibold tracki h-[13px]' />
                            <Skeleton className='text-[#0FA654] tracking-wide rounded-2xl text-xs font-semibold tracki h-[13px]' />
                          </div>
                        </div>
                        <div className='pt-2.5'>
                          <div className='text-xs text-black text-opacity-40'>
                            <Skeleton
                              duration={0.5}
                              className='h-[30px] rounded-2xl'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='movinganimate cursor-pointer md:pl-3 pb-2 pt-1 items-center bg-white   grid rounded-lg shadow-lg md:gap-x-3  grid-cols-12'>
                      <div
                        className={`col-span-12 md:col-span-5 md:pt-0 px-4 md:px-0`}
                      >
                        <Skeleton
                          duration={0.5}
                          className='lg:w-[210px] h-[170px]'
                        />
                      </div>
                      <div className='col-span-12 md:col-span-7 md:w-full pt-1.5 pb-2 pl-4 md:pl-0  pr-4 space-y-2'>
                        <div className='text-xs tracking-wide text-black text-opacity-40'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='text-black font-semibold tracking-wide text-sm'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Skeleton
                            duration={0.5}
                            className='rounded-full w-[40px] h-[40px]'
                          />
                          <div className='w-full'>
                            <Skeleton className='w-full text-[#0FA654] rounded-2xl tracking-wide text-xs font-semibold tracki h-[13px]' />
                            <Skeleton className='text-[#0FA654] tracking-wide rounded-2xl text-xs font-semibold tracki h-[13px]' />
                          </div>
                        </div>
                        <div className='pt-2.5'>
                          <div className='text-xs text-black text-opacity-40'>
                            <Skeleton
                              duration={0.5}
                              className='h-[30px] rounded-2xl'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='movinganimate cursor-pointer md:pl-3 pb-2 pt-1 items-center bg-white   grid rounded-lg shadow-lg md:gap-x-3  grid-cols-12'>
                      <div
                        className={`col-span-12 md:col-span-5 md:pt-0 px-4 md:px-0`}
                      >
                        <Skeleton
                          duration={0.5}
                          className='lg:w-[210px] h-[170px]'
                        />
                      </div>
                      <div className='col-span-12 md:col-span-7 md:w-full pt-1.5 pb-2 pl-4 md:pl-0  pr-4 space-y-2'>
                        <div className='text-xs tracking-wide text-black text-opacity-40'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='text-black font-semibold tracking-wide text-sm'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Skeleton
                            duration={0.5}
                            className='rounded-full w-[40px] h-[40px]'
                          />
                          <div className='w-full'>
                            <Skeleton className='w-full text-[#0FA654] rounded-2xl tracking-wide text-xs font-semibold tracki h-[13px]' />
                            <Skeleton className='text-[#0FA654] tracking-wide rounded-2xl text-xs font-semibold tracki h-[13px]' />
                          </div>
                        </div>
                        <div className='pt-2.5'>
                          <div className='text-xs text-black text-opacity-40'>
                            <Skeleton
                              duration={0.5}
                              className='h-[30px] rounded-2xl'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='movinganimate cursor-pointer md:pl-3 pb-2 pt-1 items-center bg-white   grid rounded-lg shadow-lg md:gap-x-3  grid-cols-12'>
                      <div
                        className={`col-span-12 md:col-span-5 md:pt-0 px-4 md:px-0`}
                      >
                        <Skeleton
                          duration={0.5}
                          className='lg:w-[210px] h-[170px]'
                        />
                      </div>
                      <div className='col-span-12 md:col-span-7 md:w-full pt-1.5 pb-2 pl-4 md:pl-0  pr-4 space-y-2'>
                        <div className='text-xs tracking-wide text-black text-opacity-40'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='text-black font-semibold tracking-wide text-sm'>
                          <Skeleton
                            duration={0.5}
                            className='h-[23px] rounded-2xl'
                          />
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Skeleton
                            duration={0.5}
                            className='rounded-full w-[40px] h-[40px]'
                          />
                          <div className='w-full'>
                            <Skeleton className='w-full text-[#0FA654] rounded-2xl tracking-wide text-xs font-semibold tracki h-[13px]' />
                            <Skeleton className='text-[#0FA654] tracking-wide rounded-2xl text-xs font-semibold tracki h-[13px]' />
                          </div>
                        </div>
                        <div className='pt-2.5'>
                          <div className='text-xs text-black text-opacity-40'>
                            <Skeleton
                              duration={0.5}
                              className='h-[30px] rounded-2xl'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : filterd?.length > 0 && cate?.length > 0 ? (
                  <div className='space-y-2 px-4 md:px-0 md:space-y-6'>
                    {search?.length > 1 ? (
                      <>
                        {newData?.map((item, ind) => {
                          return (

                            <Link to={`/webinar-timer/${item._id}`} key={ind} className='block rounded-md'>
                              <div className='hover:scale-95  px-2 bg-white transition-all  cursor-pointer items-center w-full grid rounded-md shadow-lg  grid-cols-12'>
                                <div
                                  className='md:col-span-5 col-span-12'
                                >
                                  <img
                                    src={item.image}
                                    alt='error'
                                    className='w-full rounded-lg pt-2 md:pt-0'
                                  />
                                </div>
                                <Link
                                  to={`/webinar-timer/${item._id}`}
                                  className='col-span-12 md:col-span-7 py-[8px] w-[100%]   md:w-full md:px-[8%]   space-y-1 md:space-y-2'
                                >
                                  <Link
                                    className='space-y-3 md:space-y-1'
                                    to={`/webinar-timer/${item._id}`}
                                  >
                                    <div className="flex item-center space-x-1.5 text-sm tracking-wide">
                                      {item.webinarCategory?.split('|').splice(0, 3).map((item) => <span className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
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
                                    <div className='flex items-center justify-between space-x-3 md:space-x-3'>
                                      <Link to={`/webinar-timer/${item._id}`}>
                                        <div className='flex items-center space-x-2'>
                                          <div className='text-sm'>
                                            {new Date(item.date).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" })} , {item.day}
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
                                          <div className='text-sm'>
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
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {filterd?.map((item, ind) => {
                          return (

                            <Link to={`/webinar-timer/${item._id}`} key={ind} className='block rounded-md'>
                              <div className='hover:scale-95  px-2 bg-white transition-all  cursor-pointer items-center w-full grid rounded-md shadow-lg  grid-cols-12'>
                                <div
                                  className='md:col-span-5 col-span-12'
                                >
                                  <img
                                    src={item.image}
                                    alt='error'
                                    className='w-full rounded-lg pt-2 md:pt-0'
                                  />
                                </div>
                                <Link
                                  to={`/webinar-timer/${item._id}`}
                                  className='col-span-12 md:col-span-7 py-[8px] w-[100%]   md:w-full md:px-[8%]   space-y-1 md:space-y-2'
                                >
                                  <Link
                                    className='space-y-3 md:space-y-1'
                                    to={`/webinar-timer/${item._id}`}
                                  >
                                    <div className="flex item-center space-x-1.5 text-sm tracking-wide">
                                      {item.webinarCategory?.split('|').splice(0, 3).map((item) => <span className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
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
                                    <div className='flex items-center justify-between space-x-3 md:space-x-3'>
                                      <Link to={`/webinar-timer/${item._id}`}>
                                        <div className='flex items-center space-x-2'>
                                          <div className='text-sm'>
                                            {new Date(item.date).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" })} , {item.day}
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
                                          <div className='text-sm'>
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
                          );
                        })}
                      </>
                    )}
                  </div>
                ) : For == true && cate.length > 0 ? (
                  <NoResult Reload={handleClear} />
                ) : (
                  <div className='space-y-2 px-4 md:px-0 md:space-y-6'>
                    {search?.length > 1 ? (
                      <>
                        {newData?.map((item, ind) => {
                          return (

                            <Link to={`/webinar-timer/${item._id}`} key={ind} className='block rounded-md'>
                              <div className='hover:scale-95  px-2 bg-white transition-all  cursor-pointer items-center w-full grid rounded-md shadow-lg  grid-cols-12'>
                                <div
                                  className='md:col-span-5 col-span-12'
                                >
                                  <img
                                    src={item.image}
                                    alt='error'
                                    className='w-full rounded-lg pt-2 md:pt-0'
                                  />
                                </div>
                                <Link
                                  to={`/webinar-timer/${item._id}`}
                                  className='col-span-12 md:col-span-7 py-[8px] w-[100%]   md:w-full md:px-[8%]   space-y-1 md:space-y-2'
                                >
                                  <Link
                                    className='space-y-3 md:space-y-1'
                                    to={`/webinar-timer/${item._id}`}
                                  >
                                    <div className="flex item-center space-x-1.5 text-sm tracking-wide">
                                      {item.webinarCategory?.split('|').splice(0, 3).map((item) => <span className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
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
                                    <div className='flex items-center justify-between space-x-3 md:space-x-3'>
                                      <Link to={`/webinar-timer/${item._id}`}>
                                        <div className='flex items-center space-x-2'>
                                          <div className='text-sm'>
                                            {new Date(item.date).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" })} , {item.day}
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
                                          <div className='text-sm'>
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
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {webinars?.map((item, ind) => {
                          return (

                            <Link to={`/webinar-timer/${item._id}`} key={ind} className='block rounded-md'>
                              <div className='hover:scale-95  px-2 bg-white transition-all  cursor-pointer items-center w-full grid rounded-md shadow-lg  grid-cols-12'>
                                <div
                                  className='md:col-span-5 col-span-12'
                                >
                                  <img
                                    src={item.image}
                                    alt='error'
                                    className='w-full pt-2 md:pt-0'
                                  />
                                </div>
                                <Link
                                  to={`/webinar-timer/${item._id}`}
                                  className='col-span-12 md:col-span-7 py-[8px] w-[100%]   md:w-full md:px-[8%]   space-y-1 md:space-y-2'
                                >
                                  <Link
                                    className='space-y-3 md:space-y-1'
                                    to={`/webinar-timer/${item._id}`}
                                  >
                                    <div className="flex item-center space-x-1.5 text-sm tracking-wide">
                                      {item.webinarCategory?.split('|').splice(0, 3).map((item) => <span className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
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
                                    <div className='flex items-center justify-between space-x-3 md:space-x-3'>
                                      <Link to={`/webinar-timer/${item._id}`}>
                                        <div className='flex items-center space-x-2'>
                                          <div className='text-sm'>
                                            {new Date(item.date).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" })} , {item.day}
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
                                          <div className='text-sm'>
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
                          );
                        })}
                      </>
                    )}
                  </div>
                )}
                {/* Coming Soon Logo is Here */}
                {webinars?.length == 0 && <div className="flex bg-white  justify-center">
                  <img src="/assets/images/coming.png" className="mx-auto w-[70%]" alt="img" />
                </div>}
                {/* Coming Soon Logo is end Here */}
              </div>
              <div className='md:col-span-3 h-auto md:h-screen md:overflow-y-scroll customScroll px-4 mt-4 md:px-0 col-span-12'>
                <Programs />
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Bottomheader />
        {open && (
          <WebinarVideoPopup
            webinarIndVideo={webVideo}
            closeModal={closeVideoModal}
          />
        )}
      </>
    </div>
  );
};

export default Homewebinars ;
