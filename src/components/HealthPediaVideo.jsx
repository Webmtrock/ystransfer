import React, { useEffect,useState } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import NoResult from "./NoResult";
import Bottomheader from "./home/Bottomheader";
import TrendingArticles from "./TrendingArticles";
import {
  getAllHealthpideaVideo,
  getfilteredHealthPedia,
} from "../api_config/Auth_Services";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FaPlay } from "react-icons/fa";
import VideoPopup from "./VideoPopup";
import Categories from "./reuse_components/Categories";
import SearchBar from "./reuse_components/SearchBar";

const HealthPediaVideo = () => {
  const [lazyload, setLasyLoad] = useState(false);
  const [filterload, setFilterLoad] = useState(false);
  const [unCheckload, setUncheckLoad] = useState(false);

  //Get All Programs Api is Here
  const [category, setCategory] = useState([]);
  const [pediavideo, setPediaVideo] = useState([]);

  const FetchAllHealthpediaVideo = async () => {
    try {
      setLasyLoad(true);
      setUncheckLoad(true);
      const response = await getAllHealthpideaVideo();
      setPediaVideo(response.data);
      setCategory(response.category);
      setLasyLoad(false);
      setUncheckLoad(false);
      setFor(false);
    } catch (error) {
      setLasyLoad(false);
      setUncheckLoad(false);
    }
  };
  useEffect(() => {
    FetchAllHealthpediaVideo();
  }, []);
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
  const [For, setFor] = useState();
  const [filterd, setFiltered] = useState([]);
  const handleFilterHealthpediaVideo = async () => {
    try {
      setFilterLoad(true);
      const response = await getfilteredHealthPedia(stringData);
      setFiltered(response.data);
      setFilterLoad(false);
      setFor(response.status);
    } catch (error) {
      setFilterLoad(false);
    }
  };
  useEffect(() => {
    handleFilterHealthpediaVideo();
  }, [stringData]);
  //Get Filtered Api Data is Here

  //States Filter To Filter Data By Search
  const [search, setSearch] = useState("");
  const [newData, setNewData] = useState([]);
  const SearchItem = (SearchValue) => {
    setSearch(SearchValue);
    if (search !== "") {
      const FilterdData = pediavideo.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setNewData(FilterdData);
    } else {
      setNewData(pediavideo);
    }
  };
  //States Filter To Filter Data By Search

  const handleClear = () => {
    setCate([]);
    setFiltered([]);
    FetchAllHealthpediaVideo();
    setFor();
  };

  const location = useLocation(); //Geting Page Path Locations

  const [video, setVideo] = useState(false);
  const Closevideo = (data) => {
    //Props Function For closeing Video
    setVideo(data);
  };

  //Send VideoUrl
  const [sendvideo, setsendVideo] = useState("");

  return (
    <>
      <div className='bg-[#f5f5f5]'>
        <Header HealthpediaVideoCrruntLocation={location} />
        <div className='container'>
           {/* SearchBar is Here */}
           <SearchBar TYPE={"search"}  VALUE={search} ONCHANGE={SearchItem}/>
          {/* SearchBar is Here */}
          {/* Main Program container is Start Below */}
          <div className='pb-5 md:pb-10'>
            <div className='grid grid-cols-12 md:gap-x-5'>
              {/* Category Component is Here */}
              <div className="col-span-12 pr-5 md:pr-0 flex md:block items-center justify-between  md:col-span-3">
                <Categories CategoryList={category} handelCateChange={handleCate} ClearCategoreis={handleClear} lazyload={lazyload} unCheckLoad={unCheckload} />
                <div className='flex space-x-4  sticky py-1 pb-2 text-[.9rem]  md:hidden  md:pt-0 top-0 z-50 bg-[#f5f5f5]  items-center'>
                  <Link to={"/home-healthpedia"}>
                    <button
                      className={`text-black font-semibold  -translate-y-1 `}
                    >
                      Articles
                    </button>
                  </Link>
                  <Link to={"/healthpedia-video"}>
                    <button
                      className={`text-black font-semibold border-b-[3px] border-[#F9D121] -translate-y-1`}
                    >
                      Videos
                    </button>
                  </Link>
                </div>  
              </div>
              {/* Category Component is Here */}
                         
              <div className='md:col-span-6 px-4 md:px-0 col-span-12 md:overflow-y-scroll h-auto md:h-screen customScroll'>
                <div className='hidden md:flex space-x-4 sticky py-1 pb-2  md:pt-0 top-0 z-50 bg-[#f5f5f5]  items-center'>
                  <Link to={"/home-healthpedia"}>
                    <button
                      className={`text-black font-semibold -translate-y-1`}
                    >
                      Articles
                    </button>
                  </Link>
                  <Link to={"/healthpedia-video"}>
                    <button
                      className={`text-black font-semibold border-b-[3px] -translate-y-1 border-[#F9D121]`}
                    >
                      Videos
                    </button>
                  </Link>
                </div>
                <div className='pb-4  md:h-full md:pb-0 md:gap-y-4  space-y-3  md:space-y-0 md:gap-x-4 grid grid-cols-12'>
                  {lazyload || filterload ? (
                    <>
                      <div className='movinganimate hover:scale-95 bg-white transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'>
                        <Link>
                          <div className='h-[170px] relative px-2 pb-2 pt-1'>
                            <Skeleton
                              duration={0.5}
                              className='h-full w-full'
                            />
                          </div>
                          <div className='py-2 px-2'>
                            <div className='flex items-center justify-between'>
                              <div className='text-black text-opacity-50 text-sm'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                              <div className='text-gray-300'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                            </div>
                            <div className='text-black font-semibold pt-3'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[70%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className='movinganimate hover:scale-95 bg-white transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'>
                        <Link>
                          <div className='h-[170px] relative px-2 pb-2 pt-1'>
                            <Skeleton
                              duration={0.5}
                              className='h-full w-full'
                            />
                          </div>
                          <div className='py-2 px-2'>
                            <div className='flex items-center justify-between'>
                              <div className='text-black text-opacity-50 text-sm'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                              <div className='text-gray-300'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                            </div>
                            <div className='text-black font-semibold pt-3'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[70%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className='movinganimate hover:scale-95 bg-white transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'>
                        <Link>
                          <div className='h-[170px] relative px-2 pb-2 pt-1'>
                            <Skeleton
                              duration={0.5}
                              className='h-full w-full'
                            />
                          </div>
                          <div className='py-2 px-2'>
                            <div className='flex items-center justify-between'>
                              <div className='text-black text-opacity-50 text-sm'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                              <div className='text-gray-300'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                            </div>
                            <div className='text-black font-semibold pt-3'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[70%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className='movinganimate hover:scale-95 bg-white transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'>
                        <Link>
                          <div className='h-[170px] relative px-2 pb-2 pt-1'>
                            <Skeleton
                              duration={0.5}
                              className='h-full w-full'
                            />
                          </div>
                          <div className='py-2 px-2'>
                            <div className='flex items-center justify-between'>
                              <div className='text-black text-opacity-50 text-sm'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                              <div className='text-gray-300'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                            </div>
                            <div className='text-black font-semibold pt-3'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[70%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className='movinganimate hover:scale-95 bg-white transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'>
                        <Link>
                          <div className='h-[170px] relative px-2 pb-2 pt-1'>
                            <Skeleton
                              duration={0.5}
                              className='h-full w-full'
                            />
                          </div>
                          <div className='py-2 px-2'>
                            <div className='flex items-center justify-between'>
                              <div className='text-black text-opacity-50 text-sm'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                              <div className='text-gray-300'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                            </div>
                            <div className='text-black font-semibold pt-3'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[70%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className='movinganimate hover:scale-95 bg-white transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'>
                        <Link>
                          <div className='h-[170px] relative px-2 pb-2 pt-1'>
                            <Skeleton
                              duration={0.5}
                              className='h-full w-full'
                            />
                          </div>
                          <div className='py-2 px-2'>
                            <div className='flex items-center justify-between'>
                              <div className='text-black text-opacity-50 text-sm'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                              <div className='text-gray-300'>
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100px] rounded-3xl h-[20px]'
                                />
                              </div>
                            </div>
                            <div className='text-black font-semibold pt-3'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[70%] rounded-3xl h-[20px]'
                              />
                            </div>
                            <div className='pt-1'>
                              <Skeleton
                                duration={0.5}
                                className='w-[100%] rounded-3xl h-[20px]'
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </>
                  ) : filterd?.length > 0 && cate?.length > 0 ? (
                    <>
                      {search?.length > 1
                        ? newData?.map((item, ind) => {
                            return (
                              <div
                                onClick={() => setVideo(true)}
                                key={item._id}
                                className='bg-white h-[300px]  hover:scale-95 transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'
                              >
                                <div
                                  onClick={() => setsendVideo(item.blogVideo)}
                                  className='h-[170px] relative'
                                >
                                  <div className='relative'>
                                    {item.blogVideo && (
                                      <img
                                        src={item.blogthumbnail}
                                        className='w-full h-[170px] rounded-tr-lg rounded-tl-lg'
                                        alt="img"
                                      />
                                    )}
                                    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-gray-200 bg-black p-3 rounded-full bg-opacity-30'>
                                      <FaPlay size={30} />
                                    </div>
                                    <div className='text-sm px-6 py-0.5 rounded-2xl gradient inline-block absolute left-[3%] bottom-[0%] translate-y-[50%]'>
                                      {item.blogBy}
                                    </div>
                                  </div>
                                </div>
                                <div className='p-3 pt-5'>
                                  <div className='flex items-center justify-between'>
                                     <div>
                                       {item.blogCategory?.split('|').splice(0,2).map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
                                  </div>
                                  <div className='text-black font-semibold pt-3'>
                                    {item.blogTitle}
                                  </div>
                                  <div className='pt-1'>
                                    <div className='tracking-wide text-sm'>
                                      by{" "}
                                      <span className='font-semibold text-[#0FA654]'>
                                        {item.blogBy}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : filterd?.map((item, ind) => {
                            return (
                              <div
                                onClick={() => setVideo(true)}
                                key={item._id}
                                className='bg-white   hover:scale-95 transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'
                              >
                                <div
                                  onClick={() => setsendVideo(item.blogVideo)}
                                  className='h-[170px] relative'
                                >
                                  <div className='relative'>
                                    {item.blogVideo && (
                                      <img
                                        src={item.blogthumbnail}
                                        className='w-full h-[170px] rounded-tr-lg rounded-tl-lg'
                                      />
                                    )}
                                    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-gray-200 bg-black p-3 rounded-full bg-opacity-30'>
                                      <FaPlay size={30} />
                                    </div>
                                    <div className='text-sm px-6 py-0.5 rounded-2xl gradient inline-block absolute left-[3%] bottom-[0%] translate-y-[50%]'>
                                      {item.blogBy}
                                    </div>
                                  </div>
                                </div>
                                <div className='p-3 pt-5'>
                                  <div className='flex items-center justify-between'>
                                    <div>
                                       {item.blogCategory?.split('|').splice(0,2).map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
                                  </div>
                                  <div className='text-black font-semibold pt-3'>
                                    {item.blogTitle}
                                  </div>
                                  <div className='pt-1'>
                                    <div className='tracking-wide text-sm'>
                                      by{" "}
                                      <span className='font-semibold text-[#0FA654]'>
                                        {item.blogBy}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                    </>
                  ) : For == true && cate?.length > 0 ? (
                      <div className="col-span-12">
                        <NoResult Reload={handleClear} />
                      </div>
                  ) : (
                    <>
                      {search?.length > 1
                        ? newData?.map((item, ind) => {
                            return (
                              <div
                                onClick={() => setVideo(true)}
                                key={item._id}
                                className='bg-white h-[300px] hover:scale-95 transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'
                              >
                                <div
                                  onClick={() => setsendVideo(item.blogVideo)}
                                  className='h-[170px] relative'
                                >
                                  <div className='relative'>
                                    {item.blogVideo && (
                                      <img
                                        src={item.blogthumbnail}
                                        className='w-full h-[170px] rounded-tr-lg rounded-tl-lg'
                                      />
                                    )}
                                    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-gray-200 bg-black p-3 rounded-full bg-opacity-30'>
                                      <FaPlay size={30} />
                                    </div>
                                    <div className='text-sm px-6 py-0.5 rounded-2xl gradient inline-block absolute left-[3%] bottom-[0%] translate-y-[50%]'>
                                      {item.blogBy}
                                    </div>
                                  </div>
                                </div>
                                <div className='p-3 pt-5'>
                                  <div className='flex items-center justify-between'>
                                    <div>
                                       {item.blogCategory?.split('|').splice(0,2).map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
                                  </div>
                                  <div className='text-black font-semibold pt-3'>
                                    {item.blogTitle}
                                  </div>
                                  <div className='pt-1'>
                                    <div className='tracking-wide text-sm'>
                                      by{" "}
                                      <span className='font-semibold text-[#0FA654]'>
                                        {item.blogBy}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : pediavideo?.map((item, ind) => {
                            return (
                              <div
                                onClick={() => setVideo(true)}
                                key={item._id}
                                className='bg-white h-auto hover:scale-95 transition-all col-span-12 md:col-span-6 border cursor-pointer rounded-lg shadow-lg'
                              >
                                <div
                                  onClick={() => setsendVideo(item.blogVideo)}
                                  className='h-[170px] relative'
                                >
                                  <div className='relative'>
                                    {item.blogVideo && (
                                      <img
                                        src={item.blogthumbnail}
                                        className='w-full h-[170px] rounded-tr-lg rounded-tl-lg'
                                      />
                                    )}
                                    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-gray-200 bg-black p-3 rounded-full bg-opacity-30'>
                                      <FaPlay size={30} />
                                    </div>
                                    <div className='text-sm px-6 py-0.5 rounded-2xl gradient inline-block absolute left-[3%] bottom-[0%] translate-y-[50%]'>
                                      {item.blogBy}
                                    </div>
                                  </div>
                                </div>
                                <div className='p-3 pt-5'>
                                  <div className='flex items-center justify-between'>
                                    <div className="space-x-2">
                                      {item.blogCategory?.split('|').splice(0,2).map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                                    </div>
                                  </div>
                                  <div className='text-black font-semibold pt-3'>
                                    {item.blogTitle}
                                  </div>
                                  <div className='pt-1'>
                                    <div className='tracking-wide text-sm'>
                                      by{" "}
                                      <span className='font-semibold text-[#0FA654]'>
                                        {item.blogBy}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                    </>
                  )}
                </div>
                   {/* Coming Soon Logo is Here */}
                    {pediavideo?.length==0&&<div className="flex bg-white justify-center">
                       <img src="/assets/images/coming.png" className="mx-auto w-[70%]" alt="img"/>
                    </div>}
                  {/* Coming Soon Logo is end Here */}
                <div className='text-gray-500 text-sm text-center pt-2'>
                  No more articles videos to show
                </div>
              </div>

              <div className='md:col-span-3 bg-white space-y-5 p-2 hover:shadow-lg col-span-12 h-auto mt-2 md:mt-0 md:h-screen  md:overflow-y-scroll customScroll'>
                <TrendingArticles />
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Bottomheader HealthpediaVideoCrruntLocation={location}/>
        {video && (
          <VideoPopup healthpediaVideo={sendvideo} closeVideo={Closevideo} />
        )}
      </div>
    </>
  );
};

export default HealthPediaVideo;
