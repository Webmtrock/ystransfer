import React from "react";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa";
import { FiRadio } from "react-icons/fi";
import { MdHealthAndSafety } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import {BiStore} from "react-icons/bi"

const Bottomheader = ({
  articleLocation,
  currentLocation,
  currentEventLocation,
  expertlocation,
  HealthpediaVideoCrruntLocation
}) => {

  //navigate function to navigate other route
  const navigate=useNavigate()
   //Manage Article Route 
   const handleRoutetoArticlepage=()=>{
    navigate("/home-healthpedia")
  }

  //Manage Program Routes
  const handleRoutetoProgrampage=()=>{
    navigate('/home-program')
  }

  //handle Events Route
  const handleRoutetoEventpage=()=>{
    navigate('/home-webinar')
  }

  //handle Experts Route
  const handleRoutetoExpertpage=()=>{
    navigate('/experts/ExpertListing')
  }

  return (
    <div className='h-[50px] z-50 w-full fixed md:hidden bg-black bottom-0 bottomheader'>
      <ul className='flex items-center ulIgnore justify-between px-2 h-[50px]'>
        {/* Handle Program Route */}
        <li className='text-white text-[.7rem] listnone'>
         {
          currentLocation?
         <div
            onClick={handleRoutetoProgrampage}
            className='flex  justify-center text-yellow-400 flex-col items-center'
          >
            <AiOutlineFundProjectionScreen className='icons' size={20} />
            Programs
          </div>:
          <NavLink
            to={currentLocation || "/home-program"}
            className='flex justify-center flex-col items-center'
          >
            <AiOutlineFundProjectionScreen className='icons' size={20} />
            Programs
          </NavLink>
          }
        </li>
        {/* Handle Program Route */}
        {/* Handle Events Route */}
        {
          currentEventLocation?
         <div
            onClick={handleRoutetoEventpage}
            className='flex justify-center text-[.7rem] text-yellow-400 flex-col items-center'
          >
            <FiRadio className='icons' size={20} />
            WorkShops
          </div>:
        <li className='text-white text-[.7rem] listnone  '>
          <NavLink to={currentEventLocation || "/home-webinar"} className={'flex flex-col items-center'}>
            <FiRadio  size={20} />
            WorkShops
          </NavLink>
        </li>
       }
       {/* handel Store Link */}
       <div className="bg-black px-2 py-2 rounded-tl-[2.1rem] rounded-tr-[2.1rem] -translate-y-[20%]">
        <div className="bg-white py-2 px-3 hover:scale-90 transition-all -translate-y-[7%] shadow-lg rounded-full">
          <li className='text-black text-[.7rem] listnone'>
              <NavLink to={"https://www.yellowsquash.store"}>
                <BiStore className='ml-[5px]' size={20} />
                Store
              </NavLink>
            </li>
          </div>
        </div>
       {/* handel Store Link */}
        {/* Handlxe Events Route */}
        {
          expertlocation?
          <div
            onClick={handleRoutetoExpertpage}
            className='flex justify-center text-[.7rem] text-yellow-400 flex-col items-center'
          >
            <FaUserCheck className='icons mx-5' size={20} />
            Experts
          </div>:
        <li className='text-white listnone text-[.7rem]'>
          <NavLink to={expertlocation || "/experts/ExpertListing"}>
            <FaUserCheck className='mx-3' size={20} />
            Experts
          </NavLink>
        </li>
      }
        {/* handle Healthpedia route */}
        {
          articleLocation || HealthpediaVideoCrruntLocation?
        <div
            onClick={handleRoutetoArticlepage}
            className='flex justify-center text-[.7rem] text-yellow-400 flex-col items-center'
          >
            <MdHealthAndSafety className='icons mx-5' size={20} />
            Healthpedia
          </div>:
        <li className='listnone text-white text-[.7rem]'>
          <NavLink to={articleLocation || HealthpediaVideoCrruntLocation || "/home-healthpedia"}>
            <MdHealthAndSafety className='mx-5' size={20} />
            Healthpedia
          </NavLink>
        </li>
        }
        {/* handle Healthpedia route */}
      </ul>
    </div>
  );
};

export default Bottomheader;
