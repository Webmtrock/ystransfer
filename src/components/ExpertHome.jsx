import React, { useEffect, useState } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import NoResult from "./NoResult";
import Bottomheader from "./home/Bottomheader";
import Programs from "./Programs";
import { GetAllExpert, getfilteredExpert } from "../api_config/Auth_Services";
import Skeleton from "react-loading-skeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ExpertId, ExpertName } from "../redux/RoleSlice";
import Categories from "./reuse_components/Categories";
import SearchBar from "./reuse_components/SearchBar";
import { ls } from "../utilitis/SecureLocalStorage";

const ExpertHome = () => {

  //Screen Location
  const location = useLocation()

  const [lazyload, setLasyLoad] = useState(false); //set state true if api req send and false if api res recieved 
  const [filterload, setFilterLoad] = useState(false); //set state true in filter api if req is send and false if res is recived
  const [unCheckload, setUncheckLoad] = useState(false); //same as above req,res load if user check and uncheck checkbox


  //Get All Experts Api is Here
  const [expertCategory, setExpertcategory] = useState([]);
  const [expertData, setExpertData] = useState([]);

  const GettingExpert = async () => {
    try {
      setLasyLoad(true);
      setUncheckLoad(true);
      const response = await GetAllExpert();
      setExpertData(response.data);
      setExpertcategory(response.category);
      setLasyLoad(false);
      setUncheckLoad(false);
      setFor(false);
    } catch (error) {
      setLasyLoad(false);
      setUncheckLoad(false);
    }
  };
  useEffect(() => {
    GettingExpert();
  }, []);
  //Get All Experts Data With api

  //Handle Filter By Category Api
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
  const [For, setFor] = useState();
  const [filterd, setFiltered] = useState([]);
  const handleFilterProgram = async () => {
    try {
      setFilterLoad(true);
      const response = await getfilteredExpert(stringData);
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
      const FilterdData = expertData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setNewData(FilterdData);
    } else {
      setNewData(expertData);
    }
  };
  //States Filter To Filter Data By Search

  //Handle Filter By Category Api

  const handleClear = () => {
    setCate([]);
    setFiltered([]);
    GettingExpert();
    setFor();
  };

  //dispatch expertid here and also save in localstorage
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExpertDetail = (expertid, expertName) => {
    navigate('/home-about-expert')
    ls.save("expertid", expertid)
    ls.save("expertname", expertName)
    ls.save("backpath", location.pathname)
    dispatch(ExpertId(expertid));
    dispatch(ExpertName(expertName))
  };

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
      <div className='bg-[#f5f5f5]'>
        <Header />
        <div className='container'>

          {/* SearchBar is Here */}
          <SearchBar TYPE={"search"} VALUE={search} ONCHANGE={SearchItem} />
          {/* SearchBar is Here */}

          {/* Main Program container is Start Below */}
          <div className='pb-10'>
            <div className='grid grid-cols-12 md:gap-x-5'>
              {/* Category Component is Here */}
              <div className="col-span-3">
                <Categories CategoryList={expertCategory} handelCateChange={handleCate} ClearCategoreis={handleClear} lazyload={lazyload} unCheckLoad={unCheckload} />
              </div>
              {/* Category Component is Here */}
              <div className='md:col-span-6  col-span-12  pb-2 md:pb-0 h-auto md:bg-white md:p-4'>
                {lazyload || filterload ? (
                  <div className=' md:gap-y-4 cursor-pointer px-4 md:px-0 items-center grid rounded-lg shadow-lg  grid-cols-12'>
                    <div className=' movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className=' movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='h-[23px] rounded-2xl' />
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
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className=' movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className=' movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='h-[23px] rounded-2xl' />
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
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className=' movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className=' movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='h-[23px] rounded-2xl' />
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
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className=' movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className=' movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='h-[23px] rounded-2xl' />
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
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className=' movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className=' movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='h-[23px] rounded-2xl' />
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
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                    <div className=' movinganimate px-4 md:pl-2 md:pr-0 md:rounded-bl-md md:rounded-tl-md border-t-[1px] md:border-t-0 py-[3px]  border-r-[1px] md:border-r-0 bg-white  md:border-l-0 border-l-[1px]  col-span-12 md:col-span-5 pt-4 md:pt-0'>
                      <Skeleton
                        duration={0.5}
                        className={`lg:w-[210px] rounded-md h-[170px]`}
                      />
                    </div>
                    <div className=' movinganimate col-span-12 pb-4  md:col-span-7 border-b-[1px] md:border-b-0 bg-gray-50 md:bg-white border-r-[1px] md:border-r-0 rounded-bl-md rounded-br-md md:border-l-0  border-l-[1px] md:w-full md:py-[6px] pl-4 md:pl-0 pr-4 space-y-2'>
                      <div className='text-xs tracking-wide text-black text-opacity-40'>
                        <Skeleton className='h-[23px] rounded-2xl' />
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
                          <Skeleton className='h-[30px] rounded-2xl' />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : filterd?.length > 0 && cate?.length > 0 ? (
                  <div className='space-y-4 px-4 md:px-0 md:space-y-4'>
                    {search?.length > 1 ? (
                      <>
                        {newData?.map((item, ind) => {
                          return (
                            item?.expertName?.substring(0,2)==="YS"?null:<div
                              onClick={() => handleExpertDetail(item._id, item.expertName)}
                              className='inline-block'
                            >
                              <div
                                key={ind}
                                className='md:px-0 bg-white hover:scale-95  md:rounded-md transition-all'
                              >
                                <div className='cursor-pointer md:pl-3 md:py-3 space-x-3 grid items-center rounded-lg shadow-lg border border-black border-opacity-5 grid-cols-12'>
                                  <div className='md:col-span-4 col-span-12 h-[200px] p-3 md:p-0 md:h-[180px] md:w-[100%]'>
                                    <img
                                      src={item.expertProfile}
                                      alt='error'
                                      style={imgStyles}
                                    />
                                  </div>
                                  <div className='col-span-12 md:space-y-2 md:col-span-8 md:pr-1'>
                                    <div className='flex items-center space-x-1.5 flex-wrap'>
                                      {item.expertCategory?.split('|').splice(0, 3).map((item) => <span className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
                                    <div className='text-sm pt-2 text-black font-semibold'>
                                      {item.expertName}
                                    </div>
                                    <div className='text-black tracking-wider text-xs'>
                                      {item.expertDesignation}
                                    </div>
                                    <p className='text-xs text-black text-opacity-60 pt-3'>
                                      {item.expertDescription.substring(0, 100)}
                                      {item.expertDescription&&<span className='text-sm text-green-400 pl-1'>
                                        Read more..
                                      </span>}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {filterd?.map((item, ind) => {
                          return (
                            item?.expertName?.substring(0,2)==="YS"?null:<div
                              onClick={() => handleExpertDetail(item._id, item.expertName)}
                              className='inline-block'
                            >
                              <div
                                key={ind}
                                className='md:px-0 bg-white hover:scale-95  md:rounded-md transition-all'
                              >
                                <div className='cursor-pointer space-x-3 grid md:pl-3 md:py-3 items-center rounded-lg shadow-lg border border-black border-opacity-5 grid-cols-12'>
                                  <div className='md:col-span-4 col-span-12 h-[200px] p-3 md:p-0 md:h-[180px] md:w-[100%]'>
                                    <img
                                      src={item.expertProfile}
                                      alt='error'
                                      style={imgStyles}
                                    />
                                  </div>
                                  <div className='col-span-12 md:space-y-2 md:col-span-8 md:pr-1'>
                                    <div className='flex items-center space-x-1.5 flex-wrap'>
                                      {item.expertCategory?.split('|').splice(0, 3).map((item) => <span className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
                                    <div className='text-sm pt-2 text-black font-semibold'>
                                      {item.expertName}
                                    </div>
                                    <div className='text-black tracking-wider text-xs'>
                                      {item.expertDesignation}
                                    </div>
                                    <p className='text-xs text-black text-opacity-60 pt-3'>
                                      {item.expertDescription.substring(0, 100)}
                                      {item.expertDescription&&<span className='text-sm text-green-400 pl-1'>
                                        Read more..
                                      </span>}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                ) : For == true && cate?.length > 0 ? (
                  <NoResult Reload={handleClear} />
                ) : (
                  <div className='space-y-4 px-4 md:px-0 md:space-y-4'>
                    {search?.length > 1 ? (
                      <>
                        {newData?.map((item, ind) => {
                          return (
                            item?.expertName?.substring(0,2)==="YS"?null:<div
                              onClick={() => handleExpertDetail(item._id, item.expertName)}
                              className='inline-block'
                            >
                              <div
                                key={ind}
                                className='md:px-0 bg-white hover:scale-95  md:rounded-md transition-all'
                              >
                                <div className='cursor-pointer space-x-3 grid items-center md:py-3 md:pl-3 rounded-lg shadow-lg border border-black border-opacity-5 grid-cols-12'>
                                  <div className='md:col-span-4 col-span-12 h-[200px] p-3 md:p-0 md:h-[180px] md:w-[100%]'>
                                    <img
                                      src={item.expertProfile}
                                      alt='error'
                                      style={imgStyles}
                                    />
                                  </div>
                                  <div className='col-span-12 md:space-y-2 md:col-span-8 md:pr-1'>
                                    <div className='flex items-center space-x-1.5 flex-wrap'>
                                      {item.expertCategory?.split('|').splice(0, 3).map((item) => <span className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
                                    <div className='text-sm pt-2 text-black font-semibold'>
                                      {item.expertName}
                                    </div>
                                    <div className='text-black tracking-wider text-xs'>
                                      {item.expertDesignation}
                                    </div>
                                    <p className='text-xs text-black text-opacity-60 pt-3'>
                                      {item.expertDescription.substring(0, 100)}
                                      {item.expertDescription&&<span className='text-sm text-green-400 pl-1'>
                                        Read more..
                                      </span>}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {expertData?.map((item, ind) => {
                          return (
                            item?.expertName?.substring(0,2)==="YS"?null:<div
                              onClick={() => handleExpertDetail(item._id, item.expertName)}
                              className='inline-block'
                            >
                              <div
                                key={ind}
                                className='md:px-0 bg-white md:bg-gray-50 hover:scale-95  md:rounded-md transition-all'
                              >
                                <div className='cursor-pointer space-x-3 grid md:py-3 md:pl-3 items-center rounded-lg shadow-lg border border-black border-opacity-5 grid-cols-12'>
                                  <div className='md:col-span-4 col-span-12 p-3 md:p-0'>
                                    <img
                                      src={item.expertProfile}
                                      alt='error'
                                      // className='h-[180px] md:rounded-bl-md rounded-tl-md rounded-tr-md md:rounded-tr-none w-full'
                                      style={imgStyles}
                                    />
                                  </div>
                                  <div className='col-span-12 md:space-y-2 md:col-span-8 md:pr-1'>
                                    <div className='flex items-center space-x-1.5 flex-wrap'>
                                      {item.expertCategory?.split('|').splice(0, 3).map((item) => <span className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-[.6rem]'>{item}</span>)}
                                    </div>
                                    <div className='text-sm pt-2 text-black font-semibold'>
                                      {item.expertName}
                                    </div>
                                    <div className='text-black tracking-wider text-xs'>
                                      {item.expertDesignation}
                                    </div>
                                    <p className='text-xs text-black text-opacity-60 pt-3'>
                                      {item.expertDescription.substring(0, 100)}
                                      {item.expertDescription&&<span className='text-sm text-green-400 pl-1'>
                                        Read more..
                                      </span>}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className='text-center pb-2 text-sm tracking-widest text-black text-opacity-70'>
                          No More Experts To Show{" "}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className='md:col-span-3 px-5 md:px-0 col-span-12 md:h-screen h-auto md:overflow-y-scroll customScroll'>
                <Programs />
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Bottomheader />
      </div>
    </>
  );
};

export default ExpertHome;
