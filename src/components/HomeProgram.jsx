import React, { useState } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import NoResult from "./NoResult";
import Bottomheader from "./home/Bottomheader";
import Webinar from "./Webinar";
import { Link } from "react-router-dom";
import {
  GetAllPrograms,
  getfilteredPrograms,
} from "../api_config/Auth_Services";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import ConnectionStatus from "../error/ConnectionStatus";
import Categories from "./reuse_components/Categories";
import {useSelector } from "react-redux";
import SearchBar from "./reuse_components/SearchBar";

const HomeProgram = () => {
  const [lazyload, setLazyLoad] = useState(false);
  const [filterload, setFilterLoad] = useState(false);
  const [unCheckload, setUncheckLoad] = useState(false);

  //Get All Programs Api is Here
  const [programs, setPrograms] = useState([]);
  const [category,setCategory]=useState([])
  const FetchAllPrograms = async () => {
    try {
      setLazyLoad(true);
      setUncheckLoad(true);
      const response = await GetAllPrograms();
      setPrograms(response.data);
      setCategory(response.category)
      setLazyLoad(false);
      setUncheckLoad(false);
      setFor(false);
    } catch (error) {
      setLazyLoad(false);
      setUncheckLoad(false);
    }
  };

  useEffect(() => {
    FetchAllPrograms();
  },[]);
  //Get All Programs Api is Here

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

  //Get Filtered Api Data is Here
  const SetForStatus=useSelector((state)=>state.userrole.setFor)
  const [For, setFor] = useState(SetForStatus);
  const [filterd, setFiltered] = useState([]);
  const handleFilterProgram = async () => {
    try {
      setFilterLoad(true);
      const response = await getfilteredPrograms(stringData);
      setFiltered(response.data);
      setFilterLoad(false);
      setFor(response.status);
    } catch (error) {
      setFilterLoad(false);
    }
  };
  useEffect(() => {
    handleFilterProgram();
  }, [stringData]);
  //Get Filtered Api Data is Here

  //States Filter To Filter Data By Search
  const [search, setSearch] = useState("");
  const [newData, setNewData] = useState([]);
  const SearchItem = (SearchValue) => {
    setSearch(SearchValue);
    if (search !== "") {
      const FilterdData = programs.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setNewData(FilterdData);
    } else {
      setNewData(programs);
    }
  };
  //States Filter To Filter Data By Search

  const handleClear = () => {
    setCate([]);
    setFiltered([]);
    FetchAllPrograms();
    setFor();
  };

  return (
    <>
      <div className='bg-[#f5f5f5] w-full h-full'>
        <Header />
        <div className='container'>
          {/* SearchBar is Here */}
             <SearchBar TYPE={"search"} VALUE={search} ONCHANGE={SearchItem}/>
          {/* SearchBar is Here */}

          {/* Main Program container is Start Below */}
          <div className='pb-10'>
            <div className='grid grid-cols-12 md:gap-x-2 lg:gap-x-5'>
               {/* Category Components  */}
                <div className="col-span-3">
                 <Categories CategoryList={category} handelCateChange={handleCate} ClearCategoreis={handleClear} lazyload={lazyload} unCheckLoad={unCheckload}/>
               </div> 
               {/* Category Components  */}
              <div className='md:col-span-6  col-span-12  md:overflow-y-scroll pb-2 md:pb-0 h-auto md:h-screen customScroll'>
                {lazyload || filterload ? (
                  <div className='md:gap-y-4 cursor-pointer px-4 md:px-0 items-center grid rounded-lg shadow-lg  grid-cols-12'>
                    <div className='movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className='movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='text-black font-semibold tracking-wide text-sm'>
                        <Skeleton duration={0.5} className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Skeleton
                          duration={0.5}
                          className='rounded-full w-[40px] h-[40px]'
                        />
                        <div className='w-full'>
                          <Skeleton className='rounded-2xl w-full text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                          <Skeleton className='rounded-2xl text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                        </div>
                      </div>
                      <div className='pt-2.5'>
                        <div className='text-xs text-black text-opacity-40'>
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className='movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className='movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='text-black font-semibold tracking-wide text-sm'>
                        <Skeleton duration={0.5} className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Skeleton
                          duration={0.5}
                          className='rounded-full w-[40px] h-[40px]'
                        />
                        <div className='w-full'>
                          <Skeleton className='rounded-2xl w-full text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                          <Skeleton className='rounded-2xl text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                        </div>
                      </div>
                      <div className='pt-2.5'>
                        <div className='text-xs text-black text-opacity-40'>
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className='movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className='movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='text-black font-semibold tracking-wide text-sm'>
                        <Skeleton duration={0.5} className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Skeleton
                          duration={0.5}
                          className='rounded-full w-[40px] h-[40px]'
                        />
                        <div className='w-full'>
                          <Skeleton className='rounded-2xl w-full text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                          <Skeleton className='rounded-2xl text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                        </div>
                      </div>
                      <div className='pt-2.5'>
                        <div className='text-xs text-black text-opacity-40'>
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className='movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className='movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='text-black font-semibold tracking-wide text-sm'>
                        <Skeleton duration={0.5} className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Skeleton
                          duration={0.5}
                          className='rounded-full w-[40px] h-[40px]'
                        />
                        <div className='w-full'>
                          <Skeleton className='rounded-2xl w-full text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                          <Skeleton className='rounded-2xl text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                        </div>
                      </div>
                      <div className='pt-2.5'>
                        <div className='text-xs text-black text-opacity-40'>
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className='movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className='movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='text-black font-semibold tracking-wide text-sm'>
                        <Skeleton duration={0.5} className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Skeleton
                          duration={0.5}
                          className='rounded-full w-[40px] h-[40px]'
                        />
                        <div className='w-full'>
                          <Skeleton className='rounded-2xl w-full text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                          <Skeleton className='rounded-2xl text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                        </div>
                      </div>
                      <div className='pt-2.5'>
                        <div className='text-xs text-black text-opacity-40'>
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className='movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className='movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='text-black font-semibold tracking-wide text-sm'>
                        <Skeleton duration={0.5} className='rounded-2xl h-[23px]' />
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Skeleton
                          duration={0.5}
                          className='rounded-full w-[40px] h-[40px]'
                        />
                        <div className='w-full'>
                          <Skeleton className='rounded-2xl w-full text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                          <Skeleton className='rounded-2xl text-[#0FA654] tracking-wide text-xs font-semibold tracki h-[13px]' />
                        </div>
                      </div>
                      <div className='pt-2.5'>
                        <div className='text-xs text-black text-opacity-40'>
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : filterd?.length > 0 && cate?.length > 0 ? (
                  <div className='space-y-4 px-4 md:px-0 md:space-y-6'>
                    {search.length >= 1 ? (
                      <>
                        {newData?.map((item, ind) => {
                          return (
                            <Link
                            key={ind}
                            to={`/detail-page/${item._id}`}
                            className='block'
                          >
                            <div className='cursor-pointer items-center md:gap-x-4 p-2 md:space-x-0 space-x-4 bg-white grid hover:scale-95 justify-between transition-all rounded-lg shadow-lg  border border-black border-opacity-5 grid-cols-12'>
                              <div className='md:col-span-5 col-span-12'>
                                <img
                                  src={item.imageUrl}
                                  alt='error'
                                  className='w-full pb-2 md:pb-0 rounded-tl-lg rounded-tr-lg md:rounded-lg'
                                />
                              </div>
                              <div className='col-span-12 md:col-span-7 w-[100%] md:w-full pr-4 space-y-2'>
                                <div className='flex items-center space-x-1.5 flex-wrap'>
                                  {item.programCategory?.split('|').splice(0,3).map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
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
                                  <div className='text-xs text-black text-opacity-70'>
                                    {item?.fordeseases}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {filterd?.map((item, ind) => {
                          return (
                            <Link
                              key={ind}
                              to={`/detail-page/${item._id}`}
                              className='block'
                            >
                              <div className='cursor-pointer items-center md:gap-x-4 p-2 md:space-x-0 space-x-4 bg-white grid hover:scale-95 justify-between transition-all rounded-lg shadow-lg  border border-black border-opacity-5 grid-cols-12'>
                                <div className='md:col-span-5 col-span-12'>
                                  <img
                                    src={item.imageUrl}
                                    alt='error'
                                    className='w-full pb-2 md:pb-0 rounded-tl-lg rounded-tr-lg md:rounded-lg'
                                  />
                                </div>
                                <div className='col-span-12 md:col-span-7 w-[100%] md:w-full pr-4 space-y-2'>
                                  <div className='flex items-center space-x-1.5 flex-wrap'>
                                    {item.programCategory?.split('|').splice(0,3).map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
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
                                    <div className='text-xs text-black text-opacity-70'>
                                      {item?.fordeseases}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </>
                    )}
                  </div>
                ) : For === true && cate.length > 0 ? (
                  <NoResult Reload={handleClear} />
                ) : (
                  <div className='space-y-4 px-4 md:px-0 md:space-y-6'>
                    {search.length > 1 ? (
                      <>
                        {newData.map((item, ind) => {
                          return (
                            <Link
                              key={ind}
                              to={`/detail-page/${item._id}`}
                              className='block'
                            >
                              <div className='cursor-pointer items-center md:gap-x-4 p-2 md:space-x-0 space-x-4 bg-white grid hover:scale-95 justify-between transition-all rounded-lg shadow-lg  border border-black border-opacity-5 grid-cols-12'>
                                <div className='md:col-span-5 col-span-12'>
                                  <img
                                    src={item.imageUrl}
                                    alt='error'
                                    className='w-full pb-2 md:pb-0 rounded-tl-lg rounded-tr-lg md:rounded-lg'
                                  />
                                </div>
                                <div className='col-span-12 md:col-span-7 w-[100%] md:w-full pr-4 space-y-2'>
                                  <div className='flex items-center space-x-1.5 flex-wrap'>
                                    {item.programCategory?.split('|').splice(0,3).map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
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
                                    <div className='text-xs text-black text-opacity-70'>
                                      {item?.fordeseases}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {programs?.map((item, ind) => {
                          return (
                            <Link
                              key={ind}
                              to={`/detail-page/${item._id}`}
                              className='block'
                            >
                              <div className='cursor-pointer items-center md:gap-x-4 p-2 md:space-x-0 space-x-4 bg-white grid hover:scale-95 justify-between transition-all rounded-lg shadow-lg  border border-black border-opacity-5 grid-cols-12'>
                                <div className='md:col-span-5 col-span-12'>
                                  <img
                                    src={item.imageUrl}
                                    alt='error'
                                    className='w-full pb-2 md:pb-0 rounded-tl-lg rounded-tr-lg md:rounded-lg'
                                  />
                                </div>
                                <div className='col-span-12 md:col-span-7 w-[100%] md:w-full pr-4 space-y-2'>
                                  <div className='flex items-center space-x-1.5 flex-wrap'>
                                    {item.programCategory?.split('|').splice(0,3).map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
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
                                    <div className='text-xs text-black text-opacity-70'>
                                      {item?.fordeseases}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                        <div className='text-center text-sm tracking-widest text-black text-opacity-70'>
                          No More Program To Show{" "}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className='md:col-span-3 md:h-screen h-auto md:overflow-y-scroll customScroll px-5 md:px-0 col-span-12'>
                <Webinar />
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Bottomheader />
        <ConnectionStatus />
      </div>
    </>
  );
};

export default HomeProgram;
