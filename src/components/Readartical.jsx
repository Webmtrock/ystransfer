import React, { useState } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Bottomheader from "./home/Bottomheader";
import { AiFillHeart, AiOutlineEye, AiOutlineSend } from "react-icons/ai";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Webinar from "./Webinar";
import Programs from "./Programs";
import { useEffect } from "react";
import {
  ArticleLiked,
  GetArticleById,
  GetComment,
  GetRelatedBlogs,
  PostComment,
} from "../api_config/Auth_Services";
import { Loader } from "../utilitis/Loader";
import { TfiComment } from "react-icons/tfi";
import RelatedArticle from "./RelatedArticle";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { ExpertName } from "../redux/RoleSlice";
import Skeleton from "react-loading-skeleton";
import { ls } from "../utilitis/SecureLocalStorage";


const Readartical = () => {
  const slug = useParams(); //Getting Slug From Params
  const location = useLocation(); //Getting Path Location
  //Get ARTICLE ID By Redux and LocalStorge
  const articleid = ls.get("articleid");
  const ArtidfromRedux = useSelector((state) => state.userrole.articleId);
  //Get ARTICLE ID By Redux and LocalStorge

  //Api For Handle Like Functionality
  const [like, setLike] = useState(false); //State when any user click on Like Heart
  let [isLike, setIsLike] = useState(false); //close and open modal if User Delete There comment

  //Loading Loader if request is trigger
  const [load, setLoad] = useState(false);
  //loading Loader if request is trigger

  const handleLike = () => {
    if (UID) {
      setLike(!like);
      handleArticleLike();
    } else {
      setIsLike(true);
    }
  };
  //Api For Handle Like Functionality

  let [isOpen, setIsOpen] = useState(false); //close and open modal if User Delete There comment

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //api for Get Article By Id
  const [relatedcat, setRelatedCat] = useState("");
  const [articleload, setArticleLoad] = useState(false);
  const [article, setArticle] = useState([]);
  const handleArticleById = async () => {
    try {
      setArticleLoad(true);
      const response = await GetArticleById(slug.slug);
      if (response.status == true) {
        setArticle(response.data);
        setRelatedCat(response.data[0].category?.split('|')[0]);
      }
      setArticleLoad(false);
    } catch (error) {
      setArticleLoad(false);
    }
  };

  useEffect(() => {
    handleArticleById();
  }, [slug.slug]);
  //api for Get Article By Id

  //api for handle liked
  const [dislike, setDislike] = useState(false);
  const UID = ls.get("uId");
  const GetProfileID = ls.get("switchid");
  const getFromReduxprofileId = useSelector(
    (state) => state.userrole.profileid
  );
  
  const data = {
    userID:(getFromReduxprofileId||GetProfileID)||UID,
    healthPediaId: ArtidfromRedux || articleid,
  };
  const handleArticleLike = async () => {
    try {
      setLoad(true);
      const response = await ArticleLiked(data);
      if (response.status === true) {
        handleArticleById();
      }
      if (response.message === true) {
        setDislike(true);
      } else {
        setDislike(false);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };
  //api for handle liked

  //Nested Array maping for Getting Liked Ids
  const [d, setD] = useState(false);
  const handlkeLikedid = () => {
    article?.map((item) => setD(item.like.includes((getFromReduxprofileId||GetProfileID)||UID)));
  };
  useEffect(() => {
    handlkeLikedid();
  }, [article]);

  //Nested Array maping for Getting Liked Ids

  //Api For Related blogs Category Wise
  const [relatedload, setRelatedload] = useState(false);
  let relatedData = {
    cat: relatedcat,
    blogId: ArtidfromRedux || articleid,
  };
  const [relatedarticle, setRelatedArticle] = useState([]);
  const handleRelatedBlogs = async () => {
    if (relatedcat && (ArtidfromRedux || articleid)) {
      try {
        setRelatedload(true);
        const response = await GetRelatedBlogs(relatedData);
        if (response.status == true) {
          setRelatedArticle(response.data);
        } else {
          setRelatedArticle([])
        }
        setRelatedload(false);
      } catch (error) {
        setRelatedload(false);
      }
    }
  };
  useEffect(() => {
    handleRelatedBlogs();
  }, [article]);

  //Api For Related blogs Category Wise

  //Api For Article Comment is here
  const [comment, setComment] = useState("");

  let [isComment, setIsComment] = useState(false); //close and open modal if User Delete There comment

  function closeCommentModal() {
    setIsComment(false);
  }

  var phoneNumberPattern = /\d{10}/;
  var urlPattern = /(http|https|ftp|ftps):\/\/[^\s/$.?#].[^\s]*/; //Validating any type of links
  const handlepostcomment = async () => {
    const comment_data = {
      userId: UID,
      articleId: ArtidfromRedux || articleid,
      comment: comment,
    };
    if (!comment) {
      toast("Enter comment !", { type: "error", className: "error" });
    } else if (urlPattern.test(comment) == true) {
      toast("Urls are not allowed !", { type: "error", className: "error" });
    } else if (phoneNumberPattern.test(comment) == true) {
      toast("Phone numbers are not allowed !", {
        type: "error",
        className: "error",
      });
    } else {
      try {
        setLoad(true);
        const response = await PostComment(comment_data); //this api is hited when user is commented on any articlee
        if (response.status == true) {
          setIsComment(false);
          setComment("");
          handlegetcomment();
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
  };
  //Api For Article Comment is here

  //Api For Get Article Comments
  const [commarry, setCommarry] = useState([]);
  const handlegetcomment = async () => {
    try {
      const response = await GetComment(ArtidfromRedux || articleid);
      setCommarry(response.data);
    } catch (error) { }
  };

  useEffect(() => {
    handlegetcomment();
  }, [ArtidfromRedux || articleid]);
  //Api For Get Article Comments

  //Social Media sharing implementation here
  const handleFacebookShare = (title, url) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `https://www.yellowsquash.in${url.pathname}`
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleWhatsappshare = (url, title) => {
    const imageSum="https://ysdbresouces.s3.ap-south-1.amazonaws.com/sp/7.png"
    const message =
      ` Checkout this awesome article ${title}` +
      ` https://www.yellowsquash.in${url}`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
      `${<img src={imageSum}/>} ${message}`
    )}`;
    // window.open(whatsappUrl, "_blank");
    window.location.href = whatsappUrl;
  };

  const handleTwitterShare = (url, title) => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      `https://www.yellowsquash.in${url}`
    )}&text=${encodeURIComponent(title)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleLinkedInShare = (url, title, summary) => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      `https://www.yellowsquash.in${url}`
    )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
      summary
    )}`;
    window.open(linkedinUrl, "_blank");
  };
  //Social Media sharing implementation here

  //handle Expert Detail dispatch in redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleExpertDetail = (expertname) => {
    navigate("/home-about-expert");
    ls.save("expertname", expertname)
    ls.save("backpath",location.pathname)    
    dispatch(ExpertName(expertname));
  };
  //handle Expert Detail dispatch in redux

  return (
    <>
      <div className='bg-[#f5f5f5]'>
        {/* dynamic Meta Tag and Description for Seo */}
        {article?.map((item) => (
          <Helmet
            meta={[
              { name: "KeyWords", Content: item?.metatag },
              { name: "Description", Content: item?.metadiscription },
            ]}
          />
        ))}
        {/* dynamic Meta Tag and Description for Seo */}
        <Header articleLocation={location} />
        <div className='container'>
          {articleload ? (
            <div className='grid grid-cols-12 pb-5 md:gap-x-6'>
              <div className='col-span-12 md:col-span-9 bg-white movinganimate px-2 md:p-6'>
                <div >
                  <div>
                  <Skeleton duration={0.5} className='mb-3 h-[30px] w-[100%] rounded-2xl' />
                  <Skeleton duration={0.5} className='h-[20px] w-[60%] rounded-2xl mb-3' />
                  <Skeleton duration={0.5} className='mb-3 h-[30px] w-[100%] rounded-2xl' />
                  <Skeleton duration={0.5} className='mb-3 h-[300px] w-[100%] rounded-2xl' />
                  <Skeleton duration={0.5} className='h-[20px] w-[60%] rounded-2xl mb-3' />
                  <Skeleton duration={0.5} className='mb-3 h-[30px] w-[100%] rounded-2xl' />
                  <Skeleton duration={0.5} className='mb-3 h-[200px] w-[100%] rounded-2xl' />
                  </div>
                </div>
              </div>
              {/* About The Author */}
            </div>
          ) : (
            article?.map((item, ind) => (
              <div className='grid grid-cols-12 pb-5 md:gap-x-6'>
                <div className='col-span-12 md:col-span-9 bg-white h-auto md:overflow-y-scrol hidescrol px-2 md:p-6'>
                  <div>
                    {/*Artical Heading*/}
                    <div className='font-semibold pt-2 md:pt-0 tracking-wide text-[1.05rem] w-[90%] md:text-[1.8rem] text-black'>
                      {item.title}
                    </div>
                  </div>
                  <div className='grid grid-cols-12 items-center justify-between  pt-3'>
                    <div className='flex items-center col-span-8 w-full justify-start space-x-6'>
                      <div className='flex items-center space-x-2'>
                        <img
                          src={item.expertImageUrl}
                          alt='error'
                          className='w-[30px] h-[30px] bg-green-400 pb-[1px] px-[1px] pt-[.4px] rounded-full'
                        />
                        <div
                          onClick={() => handleExpertDetail(item.expertName)}
                          className='text-xs md:text-sm font-semibold text-[#0FA654] cursor-pointer hover:text-green-700'
                        >
                          {item.expertName}
                        </div>
                      </div>
                      <div className='flex items-center text-xs md:text-sm text-black text-opacity-50 space-x-3'>
                        <div>
                          {new Date(item.releaseDate).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className='text-sm md:text-lg w-full justify-end flex col-span-4 items-center md:pt-2  space-x-4 text-gray-400'>
                      <div className='flex items-center space-x-[2px]'>
                        <AiOutlineEye size={22} className='text-gray-500' />
                        <span>{item?.views}</span>
                      </div>
                      {/* <div className='flex items-center space-x-[2px]'>
                              <AiOutlineShareAlt size={16}/> 
                              <span>17</span>
                            </div> */}
                      <div className='flex items-center space-x-[2px]'>
                        <span>{item.like.length}</span>
                        <AiFillHeart
                          onClick={handleLike}
                          size={22}
                          className={`${dislike
                              ? "text-gray-500"
                              : d == true 
                                ? "text-red-500"
                                : "text-gray-500"
                            } cursor-pointer transition-all`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='text-black text-xs py-2 flex flex-wrap  items-center '>
                          {item?.category?.split('|').map((item) => <span className=" text-xs px-[6px] py-[2px] rounded-2xl bg-gray-100 mr-2 flex space-x-1"><span className="inline-block">{item}</span></span>)}
                        </div>
                  <div>
                    <img
                      src={item.bannerImageUrl}
                      alt='error'
                      className='w-full'
                    />
                  </div>
                  <div className='py-5'>
                    <div className='rounded-md bg-[#F2F2F2] py-4 px-1 md:px-6'>
                      <div className='text-sm text-black italic tracking-wide'>
                        {item.summary}
                      </div>
                    </div>
                  </div>
                  <div className='space-y-5'>
                    {/* Main Artical Html Content */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.articleBody,
                      }}
                    />
                    {/* Main Artical Html Content */}
                    {/* About The Author */}
                    <div
                      onClick={() => handleExpertDetail(item.expertName)}
                      className='grid py-2 md:py-5 px-3 space-x-4 md:space-x-5 bg-yellow-100 cursor-pointer items-center grid-cols-12 hover:bg-yellow-200  transition-all rounded-xl hover:shadow-lg md:w-[70%] w-[90%] mx-auto border'
                    >
                      <div className='w-[80px] md:w-[110px] md:h-[110px] h-[80px] col-span-3 md:col-span-4'>
                        <img
                          src={item.expertImageUrl}
                          alt='error'
                          className='border-[5px] p-1 bg-white border-green-400 rounded-full  w-full h-full'
                        />
                      </div>
                      <div className='space-y-[4px] col-span-8 md:col-span-7'>
                        <div className='text-green-500 font-semibold text-lg'>
                          {item.expertName}
                        </div>
                        <p className='text-sm text-black text-opacity-80 tracking-wide'>
                          Please give your feedback comments section is given
                          below...
                        </p>
                      </div>
                    </div>
                    {/* About The Author */}
                    <div className='flex items-center pb-4 justify-between'>
                      <div className='flex items-center space-x-3'>
                        <img
                          src='/assets/images/whatsapp.webp'
                          alt='error'
                          className='hover:scale-125 h-[35px] w-[35px] transition-all cursor-pointer'
                          onClick={() =>
                            handleWhatsappshare(location.pathname, item.title)
                          }
                        />
                        {/* <img
                        src='/assets/images/linkedin.png'
                        onClick={()=>handleLinkedInShare(location.pathname,item.title,item.summary)}
                        className='hover:scale-125 transition-all cursor-pointer'
                        alt='error'
                      /> */}
                        <img
                          src='/assets/images/twitter.svg'
                          alt='error'
                          className='hover:scale-125 h-[35px] w-[35px] transition-all cursor-pointer'
                          onClick={() =>
                            handleTwitterShare(location.pathname, item.title)
                          }
                        />
                        <img
                          src='/assets/images/facebook.svg'
                          alt='error'
                          className='hover:scale-125 h-[35px] w-[35px] transition-all cursor-pointer'
                          onClick={() =>
                            handleFacebookShare(item.title, location)
                          }
                        />
                      </div>

                      <div className='flex items-center text-lg text-black space-x-2 relative'>
                        <div>Like the article?</div>
                        <AiFillHeart
                          onClick={handleLike}
                          size={24}
                          className={`${dislike
                              ? "text-gray-500"
                              : d == true || like
                                ? "text-red-500"
                                : "text-gray-500"
                            } cursor-pointer scale-125 transition-all`}
                        />
                      </div>
                    </div>
                    <div>
                      <div onClick={() =>
                              !UID
                                ? toast("Ops! please login first", {
                                  type: "error",
                                  className: "error",
                                })
                                : setIsComment(true)
                            } className='cursor-pointer flex rounded-lg hover:shadow-lg items-center justify-between border-2 border-[#F9D121] py-4 px-4'>
                        <div className='flex items-center space-x-2'>
                          <TfiComment size={25} />
                          <div className='flex items-center space-x-1'>
                            <span>{commarry.length}</span>
                            <div>Comments</div>
                          </div>
                        </div>
                        <div>
                          <button 
                            className='bg-[#F9D121] hover:scale-95 transition-all text-black font-semibold text-sm px-3 py-[8px] rounded-md flex items-center space-x-2'
                          >
                            <span>New Comment</span>
                            <AiOutlineSend size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='space-y-3 pb-5 bg-yellow-50 pl-5 shadow-lg py-3 rounded-2xl'>
                      {" "}
                      {/*Comment array is Here*/}
                      <>
                        {commarry.length > 0 ? (
                          commarry?.map((item, ind) => {
                            return (
                              <div key={ind} className='flex space-x-2'>
                                <div>
                                  <img
                                    src='/assets/images/commentp.jpg'
                                    alt='error'
                                    className='rounded-full w-[30px] border shadow-sm'
                                  />
                                </div>
                                <div>
                                  {/* <div className='text-sm font-semibold text-[#0FA654]'>
                                  Hemant Gupta
                                </div> */}
                                  <div className='text-sm text-black text-opacity-90 tracking-wide'>
                                    {item}
                                  </div>
                                </div>
                                {/* <div className='relative group cursor-pointer'>
                                <BsThreeDots
                                  size={20}
                                  className='cursor-pointer'
                                />
                                <div className='top-0 group-hover:block hidden right-[-100%] absolute items-center space-x-1 bg-white'>
                                  <AiOutlineEdit
                                    size={18}
                                    className='inline text-[#0FA654]'
                                  />
                                  <MdDelete
                                    size={18}
                                    onClick={openModal}
                                    className='inline text-red-500'
                                  />
                                </div>
                              </div> */}
                              </div>
                            );
                          })
                        ) : (
                          <div className='py-3'>
                            <img
                              src='/assets/images/nocomment.svg'
                              alt='error'
                              className='w-[30%] mx-auto'
                            />
                            <div className='text-black text-center text-lg tracking-wide pt-7'>
                              This article doesn't have any comments.
                            </div>
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                </div>

                <div className='md:col-span-3 space-y-3 md:sticky top-[80px] col-span-12 h-auto md:h-screen md:overflow-y-scroll customScroll'>
                  {relatedload ? (
                    <div className='space-y-4 movinganimate bg-white p-2 px-3'>
                      <Skeleton duration={0.5} className='h-[300px] w-full' />
                      <Skeleton duration={0.5} className='h-[300px] w-full' />
                      <Skeleton duration={0.5} className='h-[300px] w-full' />
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      <RelatedArticle RelatedAtr={relatedarticle} />
                      <Programs />
                      <Webinar />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* //For deleting comment popup  */}
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-50' onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all'>
                    <div className='flex items-center px-5 py-4 space-x-4'>
                      <div>
                        <MdDelete size={40} className='text-red-500' />
                      </div>
                      <div className='font-semibold text-black'>
                        Your comment will be deleted permanently. Do you want to
                        proceed?
                      </div>
                    </div>
                    <div className=' pl-5 pr-3'>
                      <div className='items-center justify-between flex w-full'>
                        <button
                          onClick={closeModal}
                          className='inline-block bg-red-500 text-white px-6 rounded-md font-semibold text-xs hover:scale-95 transition-all py-[4px]'
                        >
                          CANCEL
                        </button>
                        <button className='inline-block gradient text-black px-8 font-semibold rounded-md text-xs hover:scale-95 transition-all py-[4px]'>
                          YES
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
      <>
        <Transition appear show={isComment} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50'
            onClose={closeCommentModal}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full  items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all'>
                    <div>
                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        className='w-full outline-none border p-2 border-black rounded-md'
                        cols={50}
                        rows={5}
                      >
                        write your comment..
                      </textarea>
                    </div>
                    <div className=' pl-5 pr-3'>
                      <div className='items-center justify-between flex w-full'>
                        <button
                          onClick={closeCommentModal}
                          className='inline-block bg-red-500 text-white px-6 rounded-md font-semibold text-xs hover:scale-95 transition-all py-[4px]'
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={handlepostcomment}
                          className='bg-green-500 text-white  px-4  font-semibold rounded-md text-xs hover:scale-95 transition-all py-[4px] flex items-center'
                        >
                          SEND <AiOutlineSend className='ml-3' size={16} />
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>

      <>
        <Transition appear show={isLike} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50'
            onClose={() => setIsLike(false)}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full  items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all'>
                    <span className='text-center block text-lg pb-5'>
                      Ops! please login first to like article!
                    </span>
                    <div className=' pl-5 pr-3'>
                      <div className='items-center justify-center flex w-full'>
                        <button
                          onClick={() => setIsLike(false)}
                          className='inline-block bg-green-500 text-white px-6 rounded-md font-semibold text-xs hover:scale-95 transition-all py-[4px]'
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
      {/* //For deleting comment popup  */}

      <Footer />
      <Bottomheader articleLocation={location} />
      <Loader show={load} />
    </>
  );
};

export default Readartical;
