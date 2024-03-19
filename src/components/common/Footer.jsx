import React, { useEffect, useState,Fragment } from "react";
import { Link } from "react-router-dom";
import { GetAllPrograms, PostMyQuery } from "../../api_config/Auth_Services";
import { GoLocation } from "react-icons/go";
import { BsFacebook, BsFillTelephoneOutboundFill } from "react-icons/bs";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiOutlineMail,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { FooterCategory } from "../../redux/RoleSlice";
import { Loader } from "../../utilitis/Loader";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";


const Footer = () => {
  //getting All Blogs Category
  const [Cate, setCate] = useState([]);
  const FetchCategory = async () => {
    try {
      const Response = await GetAllPrograms();
      setCate(Response.category);
    } catch (error) {}
  };

  useEffect(() => {
    FetchCategory();
  }, []);
  //getting All Blogs Category

  const dispatch = useDispatch(); //Dispatch state in redux Globel Store

  const handleFooterCate = (item) => {
    dispatch(FooterCategory(item));
    //  allArticleCate
  };

  //Capture Data Query Post
  const [query, setQuery] = useState({
    fullName: "",
    Emailid: "",
    PhoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  //Capture Data Query Post

  //Query modal after suucessful payment
  let [isOpen, setIsOpen] = useState(false); //close and open modal if Expert Add team Member

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //Query modal after successful payment

  //Api For Query is Here
  const [load, setLoad] = useState(false);
  const querydata = {
    fullName: query.fullName,
    emailId: query.Emailid,
    mobileNumber: query.PhoneNumber,
    query: query.message,
  };

  const regex =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/; //For Email Validation
  const HandlepostQuery = async () => {
    if (!query.fullName) {
      toast("Enter FullName", { type: "error", className: "error" });
    } else if (!query.Emailid) {
      toast("Enter EmailId", { type: "error", className: "error" });
    } else if (regex.test(query.Emailid) === false) {
      toast("Invalid EmailId ", { type: "error", className: "error" });
    } else if (!query.PhoneNumber) {
      toast("Enter Phone Number", { type: "error", className: "error" });
    } else if (query.PhoneNumber.length > 10 || query.PhoneNumber.length < 10) {
      toast("Invalid Phone Number", { type: "error", className: "error" });
    } else if (!query.message) {
      toast("Enter Your Message", { type: "error", className: "error" });
    } else {
      try {
        setLoad(true);
        const response = await PostMyQuery(querydata);
        if (response.status === true) {
          //Logic if user post query successfull
          openModal()
          setQuery({ })
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
  };
  //Api For Query is Here

  return (
    <>
      {/* <div id='ScrollToDwon'></div> */}
      <div className='md:pt-14'>
        <div className='bg-black px-4 md:px-0 pb-16 md:pb-0 w-full'>
          <div className='container'>
            <div className='grid grid-cols-12 md:space-x-5'>
              <div className='col-span-12 md:col-span-9'>
                <div className='md:py-8 grid md:space-x-8 grid-cols-12'>
                  <div className='col-span-12 md:col-span-5 py-5 md:py-0 space-y-4'>
                    <p className='text-[#989898] text-xs tracking-wide'>
                      YellowSquash is a community-based marketplace for global
                      wellness entrepreneurs (both in services and products). We
                      provide platform and technology to enable sustainable &
                      holistic wellness professionals to be successful, right
                      from...
                    </p>
                    <Link to='/AboutUs' className='inline-block'>
                      <button className='hover:text-[#f9d121] text-white transition-all tracking-wide text-opacity-80 py-[6px] px-4 border-t-[.5px] border-white bg-gray-900 text-xs'>
                        About Us
                      </button>
                    </Link>
                  </div>
                  <div className='col-span-6 md:col-span-3 pb-5 md:pb-0'>
                    <div className='text-white'>Quick Links</div>
                    <div className='text-xs space-y-[3px] pt-3 transition-all text-[#989898]'>
                      <div>
                        <Link
                          to='/home-healthpedia'
                          className='hover:text-[#f9d121]'
                        >
                          Healthpedia
                        </Link>
                      </div>
                      <div>
                        <Link
                          to='/experts/ExpertListing'
                          className='hover:text-[#f9d121]'
                        >
                          Experts
                        </Link>
                      </div>
                      <div>
                        <Link
                          to='/home-program'
                          className='hover:text-[#f9d121]'
                        >
                          Programs
                        </Link>
                      </div>
                      <div>
                        <Link
                          to='/home-webinar'
                          className='hover:text-[#f9d121]'
                        >
                          Workshops
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6 md:col-span-3'>
                    <div className='text-white'>Important Links</div>
                    <div className='text-xs transition-all space-y-[3px] pt-3 text-[#989898]'>
                      <div>
                        <Link
                          to='/verify-phone'
                          className='hover:text-[#f9d121]'
                        >
                          User Signup
                        </Link>
                      </div>
                      <div>
                        <Link to='/faq' className='hover:text-[#f9d121]'>
                          FAQs
                        </Link>
                      </div>
                      <div>
                        <Link
                          to='/privacy-policy'
                          className='hover:text-[#f9d121]'
                        >
                          Privacy Policy
                        </Link>
                      </div>
                      <div>
                        <a
                          href={"/assets/files/ys-terms-conditions.pdf"}
                          download
                          className='hover:text-[#f9d121]'
                        >
                          Terms & Conditions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-12 md:space-x-5 py-4'>
                  <div className='col-span-12 md:col-span-8'>
                    <div className='text-white tracking-wide pb-3 text-sm md:text-lg'>
                      Trending Blog Ctaegories
                    </div>
                    <div className='space-x-1 pb-5 flex md:pb-0 flex-wrap'>
                      {Cate?.map((item, ind) => {
                        return (
                          <Link
                            key={ind}
                            to={"/home-healthpedia"}
                            onClick={() => handleFooterCate(item)}
                          >
                            <span
                              className={`my-1 text-[#989898] hover:text-yellow-500 hover:border-yellow-500  transition-all text-xs bg-black border-[0.001px] border-opacity-30 rounded-sm px-3 ${
                                ind === 0 ? "ml-1" : ""
                              }`}
                            >
                              {item}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className='text-xs text-white md:pt-32 md:block hidden tracking-wide'>
                      Copyright © 2023 YellowSquash. All Rights Reserved.
                    </div>
                  </div>
                  <div className='col-span-12 md:col-span-4'>
                    <div className='text-white text-lg pb-4'>Reach Us</div>
                    <div className='flex space-x-2 pb-4'>
                      <div>
                        <GoLocation size={20} className='text-[#989898]' />
                      </div>
                      <div className='text-[#989898] text-sm tracking-wide'>
                        Platina Heights C-24, C Block, Phase 2, Industrial Area,
                        Sector 62, Noida, Uttar Pradesh 201301
                      </div>
                    </div>
                    <div className='flex space-x-2 pb-4'>
                      <div>
                        <BsFillTelephoneOutboundFill
                          size={18}
                          className='text-[#989898]'
                        />
                      </div>
                      <div className='text-[#989898] text-sm tracking-wide'>
                        <a
                          href='tel:97173 33655'
                          className='hover:text-[#f9d121] transition-all'
                        >
                          +91 97173 33655
                        </a>
                      </div>
                    </div>
                    <div className='flex space-x-2 pb-4'>
                      <div>
                        <AiOutlineMail size={20} className='text-[#989898]' />
                      </div>
                      <div className='text-[#989898] text-sm tracking-wide hover:text-[#f9d121] transition-all'>
                        <a href='mailto:info@yellowsquash.in'>
                          info@yellowsquash.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 md:col-span-3'>
                <div className='px-4 rounded-lg shadow-xl py-3 border-[1px] bg-white w-full md:-translate-y-10'>
                  <div className='text-center text-black text-xl font-semibold tracking-wide pb-4'>
                    Contact{" "}
                    <span className='border-b-2 inline-block border-[#f9d121]'>
                      Us
                    </span>
                  </div>
                  <div className='space-y-3'>
                    <div className='border-b-[.5px] border-gray-700 '>
                      <input
                        type='text'
                        value={query.fullName}
                        name='fullName'
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e)=>e.key==="Enter"&&HandlepostQuery(e)}
                        placeholder='Enter Full Name'
                        className='px-4 py-2 w-full outline-none border-0 text-sm placeholder:text-gray-400'
                      />
                    </div>
                    <div className='border-b-[.5px] border-gray-700 '>
                      <input
                        type='email'
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e)=>e.key=="Enter"&&HandlepostQuery(e)}
                        value={query.Emailid}
                        name='Emailid'
                        placeholder='Enter Email Id'
                        className='px-4 py-2 w-full outline-none border-0 text-sm placeholder:text-gray-400'
                      />
                    </div>
                    <div className='border-b-[.5px] border-gray-700 '>
                      <input
                        type='number'
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e)=>e.key=="Enter"&&HandlepostQuery(e)}
                        value={query.PhoneNumber}
                        name='PhoneNumber'
                        placeholder='Enter Phone No.'
                        className='px-4 py-2 w-full outline-none border-0 text-sm placeholder:text-gray-400'
                      />
                    </div>
                    <div>
                      <textarea
                        value={query.message}
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e)=>e.key=="Enter"&&HandlepostQuery(e)}
                        name='message'
                        className='text-black border-b-[.5px] border-gray-700 text-sm px-4 placeholder:text-gray-400 outline-none pt-2 pb-4 w-full'
                        placeholder="Enter Your Query.."
                      />
                    </div>
                    <button
                      onClick={HandlepostQuery}
                      className='text-black gradient px-4 py-[4px] rounded-md'
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className='md:pt-10 flex items-center py-4 md:py-0 space-x-2 md:justify-start justify-center'>
                  <Link to={"https://www.facebook.com/yellowsquash.in/"} target="blank">
                    <BsFacebook
                      size={30}
                      className='rounded-full p-[1px] bg-white text-[#3b5998]'
                    />
                  </Link>
                  <Link to={""}>
                    <AiFillTwitterCircle
                      size={30}
                      className='rounded-full p-[1px] bg-white text-[#00acee]'
                    />
                  </Link>
                  <Link to={"https://www.instagram.com/yellow.squash/?igshid=MzRlODBiNWFlZA%3D%3D"} target="blank">
                    <AiFillInstagram
                      size={30}
                      className='rounded-full p-[1px] bg-white text-[#d62976]'
                    />
                  </Link>
                  <Link to={"https://www.linkedin.com/company/yellowsquash/"} target="blank">
                    <AiFillLinkedin
                      size={30}
                      className='rounded-full p-[1px]  bg-white text-[#0A66C2]'
                    />
                  </Link>
                </div>
                <div className='text-xs text-white md:pt-32 block md:hidden text-center tracking-wide'>
                  Copyright © 2023 YellowSquash. All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='ScrollToDwon'></div>
      <Loader show={load} />
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
                  <Dialog.Panel className='w-full max-w-md transform border-[5px] border-green-300 overflow-hidden rounded-2xl bg-green-50 p-5 text-left align-middle shadow-xl transition-all'>
                    <div className='flex relative justify-between mt-2 p-5 py-5'>
                      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] w-full translate-y-[-50%]">
                        <div className="md:text-[1.2rem] text-sm pb-1.5 tracking-wide w-full text-center">Thankyou, For Reaching Us</div>
                        <div className="md:text-[1rem] text-xs tracking-wide w-full text-center">Our, Team Will Contact With You Soon...</div>
                      </div>
                    </div>

                    <div className='mt-4 pl-5 pr-3'>
                      <div className='flex items-center justify-center'>
                        <button
                          onClick={closeModal}
                          className='inline-block bg-red-500 text-white px-10 rounded-md font-semibold text-sm hover:scale-95 transition-all py-[4px]'
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
    </>
  );
};

export default Footer;
