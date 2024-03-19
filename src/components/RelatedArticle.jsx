import React from "react";
import { ArticleView } from "../api_config/Auth_Services";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { ArticleID } from "../redux/RoleSlice";
import { useDispatch } from "react-redux";
import { ls } from "../utilitis/SecureLocalStorage";

const RelatedArticle = ({ RelatedAtr }) => {
  //Api for Article Views
  const handleArticleViews = async (data, id) => {
    const Data = {
      count: data,
      id: id,
    };
    try {
      const response = await ArticleView(Data);
    } catch (error) {}
  };
  //Api for Article Views

  const dispatch=useDispatch()
  //Handle Article Id
  const handleArticleId=(id)=>{
    ls.save("articleid",id)
    dispatch(ArticleID(id))
  } 
  //Handle Article Id

  return (
    <div className='bg-white space-y-3 p-3 hover:shadow-2xl hover:border hover:rounded-md transition-all'>
      <div className='text-sm sticky z-50 top-0 font-semibold tracking-wide bg-white pb-2'>
        <span className=' text-lg border-b-[3px] border-[#F9D121] bg-white'>
          Related Blogs
        </span>
      </div>
      {RelatedAtr.length>0?
      RelatedAtr?.map((item, ind) => {
        return (
          <div onClick={()=>handleArticleId(item._id)}>
          <Link
            to={`/articles/${item.slug}`}
            onClick={() => handleArticleViews(1, item._id)}
            className='inline-block'
          >
            <div
              key={ind}
              className='hover:scale-95 transition-all cursor-pointer pr-1 grid grid-cols-12 space-x-3'
            >
              <div className='col-span-5'>
                <img
                  src={item.bannerImageUrl}
                  alt='error'
                  className='w-full h-[90px] rounded-md'
                />
              </div>
              <div className='col-span-7 space-y-1'>
                <div className='text-sm font-semibold'>
                  {item.title.substr(0, 30)}...
                </div>
                <div className='text-xs text-black text-opacity-90'>
                  {item.expertName}
                </div>
                <div className='flex w-full text-black text-opacity-50 space-x-1 pt-1'>
                  <AiOutlineEye size={20} />
                  <span>
                    {item.views >= 1000
                      ? ((item.views / 1000).toFixed(1) + "K").toString()
                      : item.views}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          </div>
        );
      }):
      <div>No Article With tr</div>
      }
    </div>
  );
};

export default RelatedArticle;
