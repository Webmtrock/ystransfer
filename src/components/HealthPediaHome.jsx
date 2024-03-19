import React, { useEffect,useState } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import NoResult from "./NoResult";
import Bottomheader from "./home/Bottomheader";
import TrendingArticles from "./TrendingArticles";
import {
  ArticleView,
  getAllArticles,
  getfilteredArticle,
} from "../api_config/Auth_Services";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { ArticleID, FooterCategory } from "../redux/RoleSlice";
import Categories from "./reuse_components/Categories";
import SearchBar from "./reuse_components/SearchBar";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ls } from "../utilitis/SecureLocalStorage";

const HealthPediaHome = () => {

  const [lazyload, setLazyLoad] = useState(false);
  const [filterload, setFilterLoad] = useState(false);
  const [unCheckload, setUncheckLoad] = useState(false);
  const dispatch = useDispatch();

  //Fatch Data witch InfeniteScroll 
  const [category, setCategory] = useState([]);
  const [article, setArticle] = useState([]);
  const LIMIT = 6 //Default LIMIT
  const [totalarticle, setTotalarticle] = useState(0)
  const [pagecount, setPageCount] = useState(1)
  const FetchAllArticles = async () => {
    try {
      setLazyLoad(true);
      setUncheckLoad(true);
      const response = await getAllArticles(pagecount, LIMIT);
      if (response.status === true) {
        setArticle([...article, ...response.data]);
        setCategory(response.category);
        setFor(false);
        setPageCount(pagecount + 1)
        setTotalarticle(response.totalData)
      } else {
        setArticle([])
        setCategory([])
      }
      setLazyLoad(false);
      setUncheckLoad(false);
    } catch (error) {
      setLazyLoad(false);
      setUncheckLoad(false);
    }
  };
  useEffect(() => {
    FetchAllArticles();
  }, []);

  const FetchInfiniteArticles = async () => {
    try {
      const response = await getAllArticles(pagecount, LIMIT);
      if (response.status === true) {
        setArticle([...article, ...response.data]);
        setFor(false);
        setPageCount(pagecount + 1)
        setTotalarticle(response.totalData)
      } else {
        setArticle([])
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    FetchInfiniteArticles();
  }, []);
  //Fatch Data witch InfeniteScroll 
  const selectedCate = useSelector((state) => state.userrole.foterCate); //Geting Category of footer recived by redux

  const [cate, setCate] = useState([]);
  const stringData = cate.map((item) => `${item}`).join("&");
  const handleCate = (e) => {
    dispatch(FooterCategory(""));
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
  const handleFilterArticle = async () => {
    try {
      setFilterLoad(true);
      const response = await getfilteredArticle(
        stringData ? stringData : selectedCate
      );
      setFiltered(response.data);
      setFilterLoad(false);
      setFor(response.status);
    } catch (error) {
      setFilterLoad(false);
    }
  };
  useEffect(() => {
    handleFilterArticle();
  }, [stringData || selectedCate]);
  //Get Filtered Api Data is Here

  //States Filter To Filter Data By Search
  const [search, setSearch] = useState("");
  const [newData, setNewData] = useState([]);
  const SearchItem = (SearchValue) => {
    setSearch(SearchValue);
    if (search !== "") {
      const FilterdData = article.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase())||article.includes(search);
      });
      setNewData(FilterdData);
    } else {
      setNewData(article);
    }
  };
  //States Filter To Filter Data By Search

  const handleClear = () => {
    setCate([]);
    setFiltered([]);
    FetchAllArticles();
    setFor();
    dispatch(FooterCategory(""));
  };

  //Api for Article Views
  const handleArticleViews = async (data, id) => {
    const Data = {
      count: data,
      id: id,
    };
    try {
      const response = await ArticleView(Data);
    } catch (error) { }
  };
  //Api for Article Views

  //Handle Article Id
  const handleArticleId = (id) => {
    ls.save("articleid", id);
    dispatch(ArticleID(id));
  };
  //Handle Article Id

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
              <div className="pr-5 col-span-12 md:col-span-3 md:pr-0 flex md:block items-center justify-between w-full">
                <Categories footerselected={selectedCate} CategoryList={category} handelCateChange={handleCate} ClearCategoreis={handleClear} lazyload={lazyload} unCheckLoad={unCheckload} />
                <div className='flex space-x-4  sticky py-1 pb-2 text-[.9rem]  md:hidden  md:pt-0 top-0  bg-[#f5f5f5]  items-center'>
                  <Link to={"/home-healthpedia"}>
                    <button
                      className={`text-black font-semibold border-b-[3px] -translate-y-1 border-[#F9D121]`}
                    >
                      Articles
                    </button>
                  </Link>
                  <Link to={"/healthpedia-video"}>
                    <button
                      className={`text-black font-semibold  -translate-y-1`}
                    >
                      Videos
                    </button>
                  </Link>
                </div>
              </div>
              {/* Category Component is Here */}

              <div id="scrollableDiv" className='md:col-span-6 px-4 md:px-0 col-span-12 overflow-scroll overflow-x-hidden h-[60vh]  md:h-screen  customScroll'>
                <div className='md:flex space-x-4 hidden  sticky py-1 pb-2  md:pt-0 top-0 z-50 bg-[#f5f5f5]  items-center'>
                  <Link to={"/home-healthpedia"}>
                    <button
                      className={`text-black font-semibold border-b-[3px] -translate-y-1 border-[#F9D121]`}
                    >
                      Articles
                    </button>
                  </Link>
                  <Link to={"/healthpedia-video"}>
                    <button
                      className={`text-black font-semibold  -translate-y-1`}
                    >
                      Videos
                    </button>
                  </Link>
                </div>
                <div className='pb-4  md:h-full md:pb-0 relative'>
                  {lazyload || filterload ? (
                    <>
                      <div className="grid grid-cols-12 gap-4">
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
                                    className='w-[100px]  rounded-3xl h-[20px]'
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
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100%] rounded-3xl h-[20px]'
                                />
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
                                    className='w-[100px]  rounded-3xl h-[20px]'
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
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100%] rounded-3xl h-[20px]'
                                />
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
                                    className='w-[100px]  rounded-3xl h-[20px]'
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
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100%] rounded-3xl h-[20px]'
                                />
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
                                    className='w-[100px]  rounded-3xl h-[20px]'
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
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100%] rounded-3xl h-[20px]'
                                />
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
                                    className='w-[100px]  rounded-3xl h-[20px]'
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
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100%] rounded-3xl h-[20px]'
                                />
                                <Skeleton
                                  duration={0.5}
                                  className='w-[100%] rounded-3xl h-[20px]'
                                />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (filterd?.length > 0 && cate?.length > 0) ||
                    selectedCate ? (
                    search.length > 1
                      ?
                      <div
                        className="gap-4 grid grid-cols-12"
                      >
                        {newData?.map((item, ind) => {
                          return (
                            <div
                              onClick={() => handleArticleId(item._id)}
                              key={item._id}
                              className='bg-white group col-span-12  md:col-span-6  hover:scale-95 transition-all border cursor-pointer rounded-lg shadow-lg'
                            >
                              <Link
                                to={`/articles/${item.slug}`}
                                onClick={() =>
                                  handleArticleViews(1, item._id)
                                }
                              >
                                <div className='h-[170px] relative'>
                                  <img
                                    src={item.bannerImageUrl}
                                    alt='error'
                                    className='w-full h-full rounded-tr-lg rounded-tl-lg'
                                  />
                                  <div className='text-sm px-6 py-0.5 rounded-2xl gradient inline-block absolute left-[3%] bottom-[0%] translate-y-[50%]'>
                                    {item.expertName}
                                  </div>
                                </div>
                                <div className='p-3 border-b pt-2'>
                                  <div className='text-black group-hover:text-green-600 transition-all text-[.8rem]  tracking-wide text-opacity-80 font-semibold pt-5'>
                                    {item.title}
                                  </div>
                                  <div className='text-black text-xs py-2 flex items-center'>
                                    {item?.category?.split('|').splice(0, 2).map((item) => <span className="text-xs px-[6px] py-[2px] rounded-2xl bg-gray-100 mr-2">{item}</span>)}
                                  </div>
                                  <div className='text-black text-[.7rem] pb-2  tracking-wide text-opacity-70 font-semibold'>
                                    {item.summary?.substring(0, 80)}
                                  </div>
                                  <div className="text-green-500 text-[.8rem] tracking-wide text-end">Read More..</div>
                                </div>
                                <div className='flex items-center justify-end py-2 pr-2'>
                                  <div className='flex items-center text-gray-300 space-x-4'>
                                    <div className='flex items-center space-x-1'>
                                      <span className='text-[.8rem] text-black text-opacity-80'>
                                        {item.like.length}
                                      </span>
                                      <AiFillHeart
                                        size={18}
                                        className='cursor-pointer hover:scale-110 transition-all'
                                      />
                                    </div>
                                    <div className='flex items-center space-x-1'>
                                      <div className='flex w-full text-[.8rem] text-black text-opacity-50 space-x-1 pt-1'>
                                        <AiOutlineEye size={18} />
                                        <span>
                                          {item.views >= 1000
                                            ? (
                                              (item.views / 1000).toFixed(
                                                1
                                              ) + "K"
                                            ).toString()
                                            : item.views}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                      :
                      <InfiniteScroll
                        className="gap-4 grid grid-cols-12"
                        dataLength={filterd?.length}
                      >
                        {filterd?.map((item, ind) => {
                          return (
                            <div
                              onClick={() => handleArticleId(item._id)}
                              key={item._id}
                              className='bg-white group col-span-12  md:col-span-6  hover:scale-95 transition-all border cursor-pointer rounded-lg shadow-lg'
                            >
                              <Link
                                to={`/articles/${item.slug}`}
                                onClick={() =>
                                  handleArticleViews(1, item._id)
                                }
                              >
                                <div className='h-[170px] relative'>
                                  <img
                                    src={item.bannerImageUrl}
                                    alt='error'
                                    className='w-full h-full rounded-tr-lg rounded-tl-lg'
                                  />
                                  <div className='text-sm px-6 py-0.5 rounded-2xl gradient inline-block absolute left-[3%] bottom-[0%] translate-y-[50%]'>
                                    {item.expertName}
                                  </div>
                                </div>
                                <div className='p-3 border-b pt-2'>
                                  <div className='text-black group-hover:text-green-600 transition-all text-[.8rem]  tracking-wide text-opacity-80 font-semibold pt-5'>
                                    {item.title}
                                  </div>
                                  <div className='text-black text-xs py-2 flex items-center'>
                                    {item?.category?.split('|').splice(0, 2).map((item) => <span className="text-xs px-[6px] py-[2px] rounded-2xl bg-gray-100 mr-2">{item}</span>)}
                                  </div>
                                  <div className='text-black text-[.7rem] pb-2  tracking-wide text-opacity-70 font-semibold'>
                                    {item.summary?.substring(0, 80)}
                                  </div>
                                  <div className="text-green-500 text-[.8rem] tracking-wide text-end">Read More..</div>
                                </div>
                                <div className='flex items-center justify-end py-2 pr-2'>
                                  <div className='flex items-center text-gray-300 space-x-4'>
                                    <div className='flex items-center space-x-1'>
                                      <span className='text-[.8rem] text-black text-opacity-80'>
                                        {item.like.length}
                                      </span>
                                      <AiFillHeart
                                        size={18}
                                        className='cursor-pointer hover:scale-110 transition-all'
                                      />
                                    </div>
                                    <div className='flex items-center space-x-1'>
                                      <div className='flex w-full text-[.8rem] text-black text-opacity-50 space-x-1 pt-1'>
                                        <AiOutlineEye size={18} />
                                        <span>
                                          {item.views >= 1000
                                            ? (
                                              (item.views / 1000).toFixed(
                                                1
                                              ) + "K"
                                            ).toString()
                                            : item.views}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </InfiniteScroll>

                  ) : (For == true && cate?.length > 0) ? (
                    <NoResult Reload={handleClear} />
                  ) : (
                    search?.length > 1
                      ?
                      <div
                        className="gap-4 grid grid-cols-12"
                      >
                        {newData?.map((item, ind) => {
                          return (
                            <div
                              onClick={() => handleArticleId(item._id)}
                              key={item._id}
                              className='bg-white group col-span-12  md:col-span-6  hover:scale-95 transition-all border cursor-pointer rounded-lg shadow-lg'
                            >
                              <Link
                                to={`/articles/${item.slug}`}
                                onClick={() =>
                                  handleArticleViews(1, item._id)
                                }
                              >
                                <div className='h-[170px] relative'>
                                  <img
                                    src={item.bannerImageUrl}
                                    alt='error'
                                    className='w-full h-full rounded-tr-lg rounded-tl-lg'
                                  />
                                  <div className='text-sm px-6 py-0.5 rounded-2xl gradient inline-block absolute left-[3%] bottom-[0%] translate-y-[50%]'>
                                    {item.expertName}
                                  </div>
                                </div>
                                <div className='p-3 border-b pt-2'>
                                  <div className='text-black group-hover:text-green-600 transition-all text-[.8rem]  tracking-wide text-opacity-80 font-semibold pt-5'>
                                    {item.title}
                                  </div>
                                  <div className='text-black text-xs py-2 flex items-center'>
                                    {item?.category?.split('|').splice(0, 2).map((item) => <span className="text-xs px-[6px] py-[2px] rounded-2xl bg-gray-100 mr-2">{item}</span>)}
                                  </div>
                                  <div className='text-black text-[.7rem] pb-2  tracking-wide text-opacity-70 font-semibold'>
                                    {item.summary?.substring(0, 80)}
                                  </div>
                                  <div className="text-green-500 text-[.8rem] tracking-wide text-end">Read More..</div>
                                </div>
                                <div className='flex items-center justify-end py-2 pr-2'>
                                  <div className='flex items-center text-gray-300 space-x-4'>
                                    <div className='flex items-center space-x-1'>
                                      <span className='text-[.8rem] text-black text-opacity-80'>
                                        {item.like.length}
                                      </span>
                                      <AiFillHeart
                                        size={18}
                                        className='cursor-pointer hover:scale-110 transition-all'
                                      />
                                    </div>
                                    <div className='flex items-center space-x-1'>
                                      <div className='flex w-full text-[.8rem] text-black text-opacity-50 space-x-1 pt-1'>
                                        <AiOutlineEye size={18} />
                                        <span>
                                          {item.views >= 1000
                                            ? (
                                              (item.views / 1000).toFixed(
                                                1
                                              ) + "K"
                                            ).toString()
                                            : item.views}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                      :
                      <InfiniteScroll
                        scrollableTarget="scrollableDiv"
                        className="gap-4 grid grid-cols-12"
                        dataLength={article?.length}
                        next={FetchInfiniteArticles}
                        hasMore={article?.length < totalarticle}
                        loader={<div className="grid grid-cols-12 space-y-4 col-span-12">
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
                                      className='w-[100px]  rounded-3xl h-[20px]'
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
                                  <Skeleton
                                    duration={0.5}
                                    className='w-[100%] rounded-3xl h-[20px]'
                                  />
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
                                      className='w-[100px]  rounded-3xl h-[20px]'
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
                                  <Skeleton
                                    duration={0.5}
                                    className='w-[100%] rounded-3xl h-[20px]'
                                  />
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
                                      className='w-[100px]  rounded-3xl h-[20px]'
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
                                  <Skeleton
                                    duration={0.5}
                                    className='w-[100%] rounded-3xl h-[20px]'
                                  />
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
                                      className='w-[100px]  rounded-3xl h-[20px]'
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
                                  <Skeleton
                                    duration={0.5}
                                    className='w-[100%] rounded-3xl h-[20px]'
                                  />
                                  <Skeleton
                                    duration={0.5}
                                    className='w-[100%] rounded-3xl h-[20px]'
                                  />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>}
                      >
                        {article?.map((item, ind) => {
                          return (
                            <div
                              onClick={() => handleArticleId(item._id)}
                              key={item._id}
                              className='bg-white group col-span-12  md:col-span-6  hover:scale-95 transition-all border cursor-pointer rounded-lg shadow-lg'
                            >
                              <Link
                                to={`/articles/${item.slug}`}
                                onClick={() =>
                                  handleArticleViews(1, item._id)
                                }
                              >
                                <div className='h-[170px] relative'>
                                  <img
                                    src={item.bannerImageUrl}
                                    alt='error'
                                    className='w-full h-full rounded-tr-lg rounded-tl-lg'
                                  />
                                  <div className='text-sm px-6 py-0.5 rounded-2xl gradient inline-block absolute left-[3%] bottom-[0%] translate-y-[50%]'>
                                    {item.expertName}
                                  </div>
                                </div>
                                <div className='p-3 border-b pt-2'>
                                  <div className='text-black group-hover:text-green-600 transition-all text-[.8rem]  tracking-wide text-opacity-80 font-semibold pt-5'>
                                    {item.title}
                                  </div>
                                  <div className='text-black text-xs py-2 flex items-center'>
                                    {item?.category?.split('|').splice(0, 2).map((item) => <span className="text-xs px-[6px] py-[2px] rounded-2xl bg-gray-100 mr-2">{item}</span>)}
                                  </div>
                                  <div className='text-black text-[.7rem] pb-2  tracking-wide text-opacity-70 font-semibold'>
                                    {item.summary?.substring(0, 80)}
                                  </div>
                                  <div className="text-green-500 text-[.8rem] tracking-wide text-end">Read More..</div>
                                </div>
                                <div className='flex items-center justify-end py-2 pr-2'>
                                  <div className='flex items-center text-gray-300 space-x-4'>
                                    <div className='flex items-center space-x-1'>
                                      <span className='text-[.8rem] text-black text-opacity-80'>
                                        {item.like.length}
                                      </span>
                                      <AiFillHeart
                                        size={18}
                                        className='cursor-pointer hover:scale-110 transition-all'
                                      />
                                    </div>
                                    <div className='flex items-center space-x-1'>
                                      <div className='flex w-full text-[.8rem] text-black text-opacity-50 space-x-1 pt-1'>
                                        <AiOutlineEye size={18} />
                                        <span>
                                          {item.views >= 1000
                                            ? (
                                              (item.views / 1000).toFixed(
                                                1
                                              ) + "K"
                                            ).toString()
                                            : item.views}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </InfiniteScroll>
                  )}
                </div>
                {For === true && (selectedCate && filterd?.length < 1 &&
                  <div className={`absolute w-[90%] ${selectedCate && filterd ? "block" : "hidden"} md:w-[40%] md:top-[60%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
                    <NoResult Reload={handleClear} />
                  </div>
                )}
              </div>
              <div className='md:col-span-3 bg-white space-y-5 p-2 hover:shadow-lg col-span-12 md:h-screen h-auto md:overflow-y-scroll customScroll'>
                <TrendingArticles />
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

export default HealthPediaHome;
