import React, { useState } from "react";
import {
  AiFillCaretRight,
  AiFillHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";

const Video = () => {
  const Video = [
    {
      id: 1,
      category: "Nutrition",
      articalImg: "/assets/images/artical1.png",
      heading: "Health Benefits of Moringa or Drumsticks",
      By: "YS Content Team",
    },
    {
      id: 2,
      category: "Nutrition",
      articalImg: "/assets/images/artical2.png",
      heading: "Hypothyroidism: The Underactive Thyroid Disorder",
      By: "Dr Ashwani Garg",
    },
    {
      id: 3,
      category: "Nutrition",
      articalImg: "/assets/images/artical3.png",
      heading: "How to develop a positive body image?",
      By: "YS Content Team",
    },
    {
      id: 4,
      category: "Nutrition",
      articalImg: "/assets/images/artical4.png",
      heading: "All You Need to know about Meditarranean Diet",
      By: "YS Content Team",
    },
    {
      id: 5,
      category: "Nutrition",
      articalImg: "/assets/images/artical5.png",
      heading: "Role of Diet in maintaining High Blood Pressure",
      By: "YS Content Team",
    },
    {
      id: 6,
      category: "Nutrition",
      articalImg: "/assets/images/artical6.png",
      heading: "Children with Autism do have Hope with Functional...",
      By: "Dr Ashwani Garg",
    },
    {
      id: 7,
      category: "Nutrition",
      articalImg: "/assets/images/artical5.png",
      heading: "Role of Diet in maintaining High Blood Pressure",
      By: "YS Content Team",
    },
    {
      id: 8,
      category: "Nutrition",
      articalImg: "/assets/images/artical3.png",
      heading: "How to develop a positive body image?",
      By: "YS Content Team",
    },
    {
      id: 9,
      category: "Nutrition",
      articalImg: "/assets/images/artical2.png",
      heading: "Hypothyroidism: The Underactive Thyroid Disorder",
      By: "Dr Ashwani Garg",
    },
  ];

  const [video, setVideo] = useState(false);
  const Closevideo = (data) => {
    //Props Function For closeing Video
    setVideo(data);
  };

  return (
    <>
      <div className='grid grid-cols-12 pt-6 gap-x-6 gap-y-6 pb-4 md:pb-0'>
        {Video.map((item, ind) => {
          return (
            <div
              onClick={() => setVideo(true)}
              key={ind}
              className='hover:scale-95 transition-all col-span-6 border cursor-pointer rounded-lg shadow-lg'
            >
              <div className='relative'>
                <img
                  src={item.articalImg}
                  alt='error'
                  className='w-full rounded-tr-lg rounded-tl-lg'
                />
                <AiFillCaretRight
                  size={15}
                  className='pl-1 bg-opacity-80 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white h-8 w-8 rounded-full'
                />
              </div>
              <div className='p-3'>
                <div className='flex items-center justify-between'>
                  <div className='text-black text-opacity-50 text-sm'>
                    {item.category}
                  </div>
                  <div className='flex items-center text-black text-opacity-50 space-x-6'>
                    <AiFillHeart
                      size={20}
                      className='cursor-pointer hover:scale-110 transition-all'
                    />
                    <AiOutlineShareAlt
                      size={20}
                      className='cursor-pointer hover:scale-110 transition-all'
                    />
                  </div>
                </div>
                <div className='text-black font-semibold pt-3'>
                  {item.heading}
                </div>
                <div className='pt-1'>
                  <div className='tracking-wide text-sm'>
                    by{" "}
                    <span className='font-semibold text-[#0FA654]'>
                      {item.By}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Video;
