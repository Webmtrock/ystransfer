import React from "react";
import { ArticleView, GetTrandingsBlogs } from "../api_config/Auth_Services";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { ArticleID } from "../redux/RoleSlice";
import { ls } from "../utilitis/SecureLocalStorage";

const TrendingArticles = () => {

  //Tranding Blogs Api is Here
  const [load, setLoad] = useState(false);
  const [tranding, setTranding] = useState([]);
  const handleTrandingBlogs = async () => {
    try {
      setLoad(true);
      const response = await GetTrandingsBlogs();
      setTranding(response.data);
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };
  useEffect(() => {
    handleTrandingBlogs();
  }, []);
  //Tranding Blogs Api is Here

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

  const dispatch = useDispatch(); //Dispatch redux reducer functions

  return (
    <div className='space-y-2'>
      <div className='text-sm  z-40 pt-3 md:pt-0 font-semibold tracking-wide pb-2'>
        <span className=' border-b-[3px] bg-white text-lg border-[#F9D121]'>
          Trending Blogs
        </span>
      </div>
      {load ?
        <>
          <div
            className='pr-1 grid border px-2 py-2 rounded-md grid-cols-12 space-x-3 movinganimate'
          >
            <div className='col-span-5'>
              <Skeleton duration={0.5} className='w-full h-[80px]' />
            </div>
            <div className='col-span-7 space-y-1'>
              <div className='text-sm font-semibold'>
                <Skeleton duration={0.5} className='h-[15px] rounded-2xl w-full' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[25px] w-full rounded-2xl' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[15px] w-[40%] rounded-2xl' />
              </div>
            </div>
          </div>
          <div
            className='pr-1 grid border px-2 py-2 rounded-md grid-cols-12 space-x-3 movinganimate'
          >
            <div className='col-span-5'>
              <Skeleton duration={0.5} className='w-full h-[80px]' />
            </div>
            <div className='col-span-7 space-y-1'>
              <div className='text-sm font-semibold'>
                <Skeleton duration={0.5} className='h-[15px] rounded-2xl w-full' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[25px] w-full rounded-2xl' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[15px] w-[40%] rounded-2xl' />
              </div>
            </div>
          </div>
          <div
            className='pr-1 grid border px-2 py-2 rounded-md grid-cols-12 space-x-3 movinganimate'
          >
            <div className='col-span-5'>
              <Skeleton duration={0.5} className='w-full h-[80px]' />
            </div>
            <div className='col-span-7 space-y-1'>
              <div className='text-sm font-semibold'>
                <Skeleton duration={0.5} className='h-[15px] rounded-2xl w-full' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[25px] w-full rounded-2xl' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[15px] w-[40%] rounded-2xl' />
              </div>
            </div>
          </div>
          <div
            className='pr-1 grid border px-2 py-2 rounded-md grid-cols-12 space-x-3 movinganimate'
          >
            <div className='col-span-5'>
              <Skeleton duration={0.5} className='w-full h-[80px]' />
            </div>
            <div className='col-span-7 space-y-1'>
              <div className='text-sm font-semibold'>
                <Skeleton duration={0.5} className='h-[15px] rounded-2xl w-full' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[25px] w-full rounded-2xl' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[15px] w-[40%] rounded-2xl' />
              </div>
            </div>
          </div>
          <div
            className='pr-1 grid border px-2 py-2 rounded-md grid-cols-12 space-x-3 movinganimate'
          >
            <div className='col-span-5'>
              <Skeleton duration={0.5} className='w-full h-[80px]' />
            </div>
            <div className='col-span-7 space-y-1'>
              <div className='text-sm font-semibold'>
                <Skeleton duration={0.5} className='h-[15px] rounded-2xl w-full' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[25px] w-full rounded-2xl' />
              </div>
              <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                <Skeleton duration={0.5} className='h-[15px] w-[40%] rounded-2xl' />
              </div>
            </div>
          </div>
        </>
        :
        tranding?.map((item, ind) => {
          return (
            <>
              <div onClick={() => handleArticleId(item._id)}>
                <Link
                  to={`/articles/${item.slug}`}
                  onClick={() => handleArticleViews(1, item._id)}
                  className='inline-block border p-2 rounded-md'
                  key={item._id}
                >
                  <div className='hover:scale-95  transition-all cursor-pointer pr-1 grid grid-cols-12 space-x-3'>
                    <div className='col-span-5'>
                      <img
                        src={item.bannerImageUrl}
                        alt='error'
                        className='w-full h-[90px] rounded-md'
                      />
                    </div>
                    <div className='col-span-7 space-y-1'>
                      <div className='text-sm font-semibold'>
                        {item.title.substr(0, 55)}...
                      </div>
                      <div className='text-xs text-green-500 font-semibold text-opacity-90'>
                        {item.expertName}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )
        }
        )}
    </div>
  );
};

export default TrendingArticles;
