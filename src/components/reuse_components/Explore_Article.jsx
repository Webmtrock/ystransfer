import React from 'react'
import { useDispatch } from 'react-redux';
import { ArticleID } from '../../redux/RoleSlice';
import { ArticleView, GetTrandingsBlogs } from '../../api_config/Auth_Services';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ls } from '../../utilitis/SecureLocalStorage';

const Explore_Article = () => {

    //State for api reload
    const [load,setLoad]=useState(false)
    //State for api reload
    
  //Tranding Blogs Api is Here
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
        <>
            <div className='text-center text-sm  tracking-wide font-semibold text-opacity-80  pt-2 md:text-lg'>
                Explore <span className='border-b-2 pt-3 md:pt-0 border-yellow-400'>Articles</span>{" "}
            </div>

            <div className='space-y-2'>
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
                                        className='inline-block border p-2 md:p-0 shadow-lg w-[94%] mx-[3%] bg-white hover:scale-95 transition-all rounded-md'
                                        key={item._id}
                                    >
                                        <div className='hover:scale-95 pt-2 transition-all cursor-pointer px-2 grid grid-cols-12'>
                                            <div className='col-span-12'>
                                                <img
                                                    src={item.bannerImageUrl}
                                                    alt='error'
                                                    className='w-full h-[160px] rounded-md'
                                                />
                                            </div>
                                            <div className='col-span-12 pt-1.5 space-y-1'>
                                                <div className='text-sm font-semibold'>
                                                    {item.title.substr(0, 55)}...
                                                </div>
                                                <div className='text-xs text-green-500 pb-1 font-semibold text-opacity-90'>
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
        </>
    )
}

export default Explore_Article