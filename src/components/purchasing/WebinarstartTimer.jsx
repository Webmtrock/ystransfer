import React, { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Bottomheader from "../home/Bottomheader";
import {BsCheck2Circle, BsWatch } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Applywebinarcuponcode,
  CreateWebinarOrder,
  GetWeinarById,
  verifyWebinarpayment,
} from "../../api_config/Auth_Services";
import { toast } from "react-toastify";
import { Loader } from "../../utilitis/Loader";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { ExpertName } from "../../redux/RoleSlice";
import { ls } from "../../utilitis/SecureLocalStorage";


const WebinarstartTimer = () => {

  const location = useLocation();
  const [webinarvideo, setWebinarvideo] = useState("");
  //Get Webinar By Id Api is Here
  const id = useParams();
  const Id = id.id;
  const [load, setLoad] = useState(false);
  const [webinarbyid, setWebinarbyid] = useState({});
  const handleWebinarById = async () => {
    try {
      setLoad(true);
      const response = await GetWeinarById(Id);
      if (response.status === true) {
        setWebinarbyid(response.data);
        setWebinarvideo(response.data.webinarVideo);
      } else {
        toast(response.message, { type: "error", className: "error" });
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };

  useEffect(() => {
    handleWebinarById();
  }, []);
  //Get Webinar By Id Api is Here

  //webinar Timer is Here
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [timeroff, setTimeroff] = useState(false);
  let interval;

  const startTimer = () => {
    const countDownDate = new Date(
      `${webinarbyid?.date} ${webinarbyid?.Starttime}`
    ).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        //Timer is Stoped
        clearInterval(interval.current);
        setTimeroff(true);
      } else {
        //Else update the timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    if (webinarbyid?.date && webinarbyid?.Starttime) {
      startTimer();
    }

    // Clear the interval when the component unmounts or when webinarbyid changes to false
    return () => {
      clearInterval(interval);
    };
  }, [webinarbyid?.date && webinarbyid?.Starttime]);

  //For getting Name Email And PhoneNumber of User Popup
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  //For getting Name Email And PhoneNumber of User Popup

  //Open Modal for applying cuopon code
  let [editmodal, setEditmodal] = useState(false); //close and open modal if exper edit member

  function closeEditModal() {
    setEditmodal(false);
  }

  function openEditModal() {
    setEditmodal(true);
  }
  //Open modal for apply cuopon code

  //Get Details of User who is Going to purchase webinar

  const phone = ls.get("phone"); //default phone number enterd by user on login or register time
  const Emailid = ls.get("email"); //default email enterd by user on login or register time
  const fullName = ls.get("fullname"); //default full name enterd by user on login or register time

  const [webinardetail, setWebinardtail] = useState({
    Fullname: fullName,
    Email: Emailid,
    PhoneNumber: phone,
  });
  const handleChange = (e) => {
    let Value = e.target.value;
    let Name = e.target.name;
    setWebinardtail({ ...webinardetail, [Name]: Value });
  };
  //Get Details of User who is Going to purchase webinar

  //Order Api For Webinar is Here
  const [validname, setValidName] = useState("");
  const [validemail, setValidEmail] = useState("");
  const [validphone, setValidPhone] = useState("");
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    setTimeout(() => setValidName(""), 5000);
  }, [validname]);

  useEffect(() => {
    setTimeout(() => setValidEmail(""), 5000);
  }, [validemail]);

  useEffect(() => {
    setTimeout(() => setValidPhone(""), 5000);
  }, [validphone]);

  const regex =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;

  const userid = ls.get("uId");
  const handleOrder = async (price, webinarid) => {
    const webinar_order_data = {
      userId: userid || "Guest_User",
      webinarId: webinarid,
      currency: "INR",
      amount: price,
      couponCode: coupon,
    };
    if (!webinardetail.Fullname) {
      setValidName("please enter fullname!");
    } else if (
      !webinardetail.Email ||
      regex.test(webinardetail.Email) === false
    ) {
      setValidEmail("email is not valid");
    } else if (!webinardetail.PhoneNumber) {
      setValidPhone("please enter phone number!");
    } else if (
      webinardetail.PhoneNumber.length > 10 ||
      webinardetail.PhoneNumber.length < 10
    ) {
      setValidPhone("phone number is not valid!");
    } else {
      try {
        setLoad(true);
        const response = await CreateWebinarOrder(webinar_order_data);
        if (response.status === true) {
          handleOpenRazerpay(response.data);
          closeModal();
        } else {
          toast(response.message, { type: "error", className: "error" });
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }

    //Tracking How many times user clicked on webinar enrollment
    
    //Tracking How many times user clicked on webinar enrollment
  };
  //Order Api For Webinarv  is here

  // handle Open Razorpay
  const handleOpenRazerpay = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
      amount: data.amount / 100,
      currency: data.currency,
      name: "Yellow Squash",
      order_id: data.id,
      prefill: {
        name: webinardetail.Fullname,
        email: webinardetail.Email,
        contact: webinardetail.PhoneNumber,
      },
      handler: async function (response) {
        const data = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          fullName: webinardetail?.Fullname,
          phoneNumber: webinardetail?.PhoneNumber,
          emailId: webinardetail?.Email,
        };
        try {
          setLoad(true);
          const Response = await verifyWebinarpayment(data);
          if (Response.status === true) {
            navigate("/webinar-thankyou");
            ls.save("purchasedWebinarid", webinarbyid?._id);
          } else {
            toast("Something Went Wrong !", {
              type: "error",
              className: "error",
            });
          }
          setLoad(false);
        } catch (error) {
          setLoad(false);
        }
      },
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
  };

  // handle Open Razorpay

  //Webinar CouponCode api is Here
  const [coupondiscount, setCoupondiscount] = useState();
  const [disstatus, setDisStatus] = useState(false);
  const handleWebinarCouponcode = async (id, price) => {
    const coupondata = {
      Coupon: coupon,
      webinarId: id,
      userId: userid || "Guest_User",
      Price: price,
    };
    if (!coupon) {
      toast("Enter Coupon code!", { type: "error", className: "error" });
    } else {
      try {
        setLoad(true);
        const response = await Applywebinarcuponcode(coupondata);
        if (response.status === true) {
          toast("Coupon Applied Successfuly!", {
            type: "success",
            className: "success",
          });
          setDisStatus(true);
          setCoupondiscount(response.dicountedPrice);
          closeEditModal();
        } else {
          toast(response.message, { type: "error", className: "error" });
          setCoupon("");
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
  };

  const handelOpenModal=()=>{ //Open Register Modal if User Clicked on Coupon Apply Boutton
    setIsOpen(true)
  }
  //Webinar CouponCode api is Here
  
  //Handle Expert Details is dispatch here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleExpertDetail = (expertname) => {
    navigate("/home-about-expert");
    ls.save("expertname",expertname)  
    ls.save("backpath",location.pathname)
    dispatch(ExpertName(expertname));
  };
  //Handle Expert Details is dispatch here

  
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
    <div className='bg-[#f1f1f1]'>
      <>
        <Header currentEventLocation={location.pathname} />
        <div className='container'>
          {/* <Link to={backpath} className="md:block hidden">
            <BsArrowLeft size={25} className='font-semibold text-black ml-4 md:ml-0' />
          </Link> */}
          <div className='grid grid-cols-12  md:px-0  md:gap-x-5 space-y-[4px] md:space-y-0'>
            <div className='order-last md:order-first bg-white md:p-5 hover:shadow-lg mt-4 md:mt-0  p-4 col-span-12 rounded-md md:col-span-7 pb-5'>
              <div>
                <div className='text-[1rem] md:text-lg font-semibold text-black w-full tracking-wide md:w-[90%]'>
                  {webinarbyid.webinarTitle}
                </div>
                <div className='text-sm inline-block md:block pb-2 md:pb-0 font-semibold tracking-wider pt-[2px]'>
                  <span>By</span>{" "}
                  <span className='text-[#0FA654]'>
                    {webinarbyid.expertName}
                  </span>
                </div>
                <div className="flex  items-center justify-start pt-1 md:pt-3 flex-wrap space-x-1.5">
                  {webinarbyid.webinarDescription?.split('|').map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-xs'>{item}</span>)}
                </div>
                <div className='pt-3 font-semibold text-black text-xs md:text-sm flex  space-x-1 items-center md:space-x-1'>
                  <MdDateRange size={18} className="md:inline-block hidden"/>
                  <div>
                    {new Date(webinarbyid.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <span>|</span>
                  <div>
                    {webinarbyid.Starttime} - {webinarbyid.Endtime} (IST)
                  </div>
                </div>
                <div className='pt-5'>
                  {timeroff ? (
                    <div className='flex items-center bg-yellow-100 text-center p-2 py-3 md:py-5 rounded-md shadow-md md:text-[16px] text-sm justify-center'>
                      {/* <div>
                        <img
                          src='/assets/images/party.gif'
                          className='w-[100px]'
                        />
                      </div> */}
                      <div className='text-center'>
                        Next Webinar Dates will be published soon
                      </div>
                      {/* <div>
                        <img
                          src='/assets/images/party.gif'
                          className='w-[100px]'
                        />
                      </div> */}
                    </div>
                  ) : (
                    <div className='md:bg-gray-100 md:w-[100%] rounded-sm'>
                      <div className='text-center text-black text-lg text-opacity-70 pt-4 font-semibold'>
                        Workshop Starts in
                      </div>
                      <div className='p-5 justify-center w-full inline-flex items-center space-x-3'>
                        <div className=' text-black text-xl bg-black p-1'>
                          <div className='text-2xl bg-white w-[2.5rem] h-[2.5rem] md:w-[3.5rem] md:h-[3.5rem]  text-center relative'>
                            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                              {timerDays}
                            </span>
                          </div>
                          <div className='text-[#F9D121] text-xs md:text-sm text-center'>
                            Days
                          </div>
                        </div>
                        <span className='text-black font-bold text-2xl'>:</span>
                        <div className=' text-black text-xl bg-black p-1'>
                          <div className='text-2xl bg-white   w-[2.5rem] h-[2.5rem] md:w-[3.5rem] md:h-[3.5rem] relative text-center'>
                            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                              {timerHours}
                            </span>
                          </div>
                          <div className='text-[#F9D121] text-xs md:text-sm text-center'>
                            Hours
                          </div>
                        </div>
                        <span className='text-black font-bold text-2xl'>:</span>
                        <div className=' text-black text-xl bg-black p-1'>
                          <div className='text-2xl bg-white px-6 py-3  w-[2.5rem] h-[2.5rem] md:w-[3.5rem] md:h-[3.5rem] relative text-center'>
                            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                              {timerMinutes}
                            </span>
                          </div>
                          <div className='text-[#F9D121] text-xs md:text-sm text-center'>
                            Minutes
                          </div>
                        </div>
                        <span className='text-black font-bold text-2xl'>:</span>
                        <div className=' text-black text-xl bg-black p-1'>
                          <div className='text-2xl bg-white px-6 py-3  w-[2.5rem] h-[2.5rem] md:w-[3.5rem] md:h-[3.5rem] relative text-center'>
                            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                              {timerSeconds}
                            </span>
                          </div>
                          <div className='text-[#F9D121] text-xs md:text-sm text-center'>
                            Seconds
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='pt-3'>
                  <div className='text-black font-semibold  tracking-wide text-[1rem] md:text-[1.1rem]'>
                    The {webinarbyid?.sessionDurationinHour} interactive session
                    will cover :
                  </div>
                  <div className='pt-2  pb-2'>
                    {webinarbyid?.sessionwillCover?.map((item, ind) => (
                      <div className='pt-2.5' key={ind}>
                        <div className="flex space-x-1">
                        <span className={webinarbyid?.sessionwillCover?.length>1?'inline-block':'hidden'}>{ind + 1})</span><div className='text-black font-semibold tracking-wide text-[.9rem]'>
                           {item.Heading} :
                        </div>
                        </div>
                        <p className='text-black pl-1 font-normal tracking-wide text-sm'>
                          {item.defination}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='py-2'>
                  <div className='text-black font-semibold  tracking-wide text-[1rem]'>
                    What you’ll learn in this exclusive session:
                  </div>
                  <div className='pt-3'>
                    {webinarbyid?.youwillLearn?.map((item, ind) => (
                      <li
                        key={ind}
                        className={`${webinarbyid?.youwillLearn?.length>1?'list-decimal':'list-none'} text-black pt-2 font-normal tracking-wide text-sm`}
                      >
                        {item}
                      </li>
                    ))}
                  </div>
                </div>
                <div className='pt-3'>
                  <div className='text-black text-[1.1rem] tracking-wide font-semibold text-sm'>
                    Who is it for?
                  </div>
                  {webinarbyid?.whoisitFor?.map((item, ind) => (
                    <div key={ind} className='flex items-center pt-3 space-x-3'>
                      <div>
                        <BsCheck2Circle size={20} className='text-[#0FA654]' />
                      </div>
                      <div className=' text-black text-sm font-normal tracking-wide'>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='pt-6'>
                  <div className="flex justify-center md:justify-start pb-2">
                    <div className='inline-block font-semibold text-black text-sm text-center md:text-start tracking-wide border-b-2  md:border-none border-yellow-500 pb-1 md:pb-0'>
                      About Expert
                    </div>
                  </div>
                  <div
                    onClick={() => handleExpertDetail(webinarbyid?.expertName)}
                  >
                    <div className='w-[100%]  hover:scale-95 cursor-pointer transition-all'>
                      <div className='grid grid-cols-12 md:items-center md:py-1.5 p-1 bg-white hover:bg-yellow-50 transition-all shadow-xl rounded-md border'>
                        <div className='md:pt-0 col-span-12 md:col-span-4 md:pr-2'>
                          <img
                            src={webinarbyid?.expertImage}
                            alt='img'
                            style={imgStyles}
                          />
                        </div>
                        <div className='col-span-12 md:col-span-8 py-[4px] md:py-0'>
                          <div className="flex items-center flex-wrap justify-center md:justify-start space-x-1.5">
                            {webinarbyid?.expertCategory?.split('|').splice(0,3).map((item)=><span  className='text-black tracking-wide bg-gray-100 px-2 py-[4px] rounded-2xl text-[.6rem]'>{item}</span>)}
                          </div>
                          <div className='text-black font-semibold text-xs text-center md:text-start md:text-sm tracking-wide pt-2'>
                            {webinarbyid?.expertName}
                          </div>
                          <div className='text-black tracking-wide text-xs md:text-sm text-center md:text-start text-opacity-90 font-semibold'>
                            {webinarbyid?.expertDesignation}
                          </div>
                          <p className='text-gray-500 pt-4 text-xs md:text-sm tracking-wide text-center md:text-start'>
                            {webinarbyid?.expertDescription?.substring(0, 200)}
                            {webinarbyid?.expertDescription&&(<div className='text-[#0FA654]  cursor-pointer inline-block  text-sm'>
                              <span className="pl-[2px]">read more......</span>
                            </div>)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className='col-span-12 md:col-span-5 order-first md:order-last'>
              <div className='mr-auto md:sticky md:top-[80px] bg-white border hover:shadow-lg md:p-3 md:pt-5 rounded-md'>
                <div>
                  {webinarvideo && (
                    <video
                      controls
                      controlsList='nodownload'
                      className='cursor-pointer mx-auto  h-[200px]'
                    >
                      <source src={webinarvideo} alt='error' type='video/mp4' />
                    </video>
                  )}
                </div>
                <div>
                  <div className='animate-pulse text-lg tracking-wide text-black text-opacity-90 text-center pt-2'>
                    HURRY! Seats filling FAST!
                  </div>
                </div>
                <div className='px-4 pt-3'>
                  <Link>
                    <div
                      onClick={() => openModal()}
                      className='text-black gradient cursor-pointer hover:scale-95 transition-all px-4 text-center font-semibold rounded-md py-[5px]'
                    >
                      Register Now for{" "}
                      <span className='text-[#0FA654] text-2xl font-semibold'>
                        ₹ {disstatus ? coupondiscount : webinarbyid?.price}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className='pt-4'>
                  <div className='text-sm text-black text-opacity-80 pl-2 text-center md:text-left'>
                    Reserve your seat before{" "}
                    <div className='inline-block font-semibold text-black'>
                      {new Date(webinarbyid.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>{" "}
                    to confirm your slot!
                  </div>
                  <div className='px-2 py-3 sp  ace-x-2 flex items-center'>
                    <BsWatch size={20} />
                    <span className='pl-2'>
                      <span className='text-black font-semibold text-lg'>
                        Duration :
                      </span>{" "}
                      <span>{webinarbyid?.sessionDurationinHour}</span>
                    </span>
                  </div>
                  <div className='px-2 pb-3 space-x-2 flex items-center'>
                    <CiCalendarDate size={20} />
                    <span>
                      <span className='text-lg text-black font-semibold'>
                        Starting on :
                      </span>
                      <div className='inline-block pl-1'>
                        {new Date(webinarbyid.date).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Bottomheader currentEventLocation={location.pathname} />
        <Loader show={load} />
        <>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={handelOpenModal}>
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
                      <Dialog.Title
                        as='h3'
                        className='text-lg text-center leading-6 text-black text-opacity-80 font-semibold'
                      >
                        Please Enter Details
                      </Dialog.Title>
                      <div className='mt-2 p-5 py-5'>
                        <div className='space-y-4'>
                          <div>
                            <label className='block text-sm'>Name</label>
                            <input
                              type={"text"}
                              name='Fullname'
                              onChange={(e) => handleChange(e)}
                              onKeyDown={(e) =>
                                e.key == "Enter" &&
                                handleOrder(
                                  disstatus
                                    ? coupondiscount
                                    : webinarbyid?.price,
                                  webinarbyid?._id
                                )
                              }
                              value={webinardetail.Fullname}
                              placeholder='full name'
                              className='placeholder:text-xs text-sm py-[5px] rounded-sm border-opacity-30 px-2 outline-none border w-full border-black'
                            />
                            <div className='text-red-500 text-sm tracking-wide'>
                              {validname}
                            </div>
                          </div>
                          <div>
                            <label className='block text-sm'>Email</label>
                            <input
                              type={"email"}
                              onChange={(e) => handleChange(e)}
                              value={webinardetail.Email}
                              onKeyDown={(e) =>
                                e.key == "Enter" &&
                                handleOrder(
                                  disstatus
                                    ? coupondiscount
                                    : webinarbyid?.price,
                                  webinarbyid?._id
                                )
                              }
                              name='Email'
                              placeholder='enter email'
                              className='placeholder:text-xs text-sm py-[5px] rounded-sm border-opacity-30 px-2 outline-none border w-full border-black'
                            />
                            <div className='text-red-500 text-sm tracking-wide'>
                              {validemail}
                            </div>
                          </div>
                          <div>
                            <label className='block text-sm'>
                              Phone number
                            </label>
                            <input
                              type={"number"}
                              onChange={(e) => handleChange(e)}
                              onKeyDown={(e) =>
                                e.key == "Enter" &&
                                handleOrder(
                                  disstatus
                                    ? coupondiscount
                                    : webinarbyid?.price,
                                  webinarbyid?._id
                                )
                              }
                              value={webinardetail.PhoneNumber}
                              name='PhoneNumber'
                              placeholder='phone number'
                              className='placeholder:text-xs text-sm py-[5px] rounded-sm border-opacity-30 px-2 outline-none border w-full border-black'
                            />
                            <div className='text-red-500 text-sm tracking-wide'>
                              {validphone}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='pl-5 pr-3'>
                        <div className='flex items-center justify-between'>
                          <button
                            onClick={closeModal}
                            className='inline-block bg-red-500 text-white px-5 md:px-10  rounded-md font-semibold text-sm md:text-lg hover:scale-95 transition-all py-[4px]'
                          >
                            CANCEL
                          </button>
                          <button
                            onClick={() =>
                              handleOrder(
                                disstatus ? coupondiscount : webinarbyid?.price,
                                webinarbyid?._id
                              )
                            }
                            className='inline-block gradient text-black px-4 md:px-8 font-semibold rounded-md text-sm md:text-lg tracking-wide hover:scale-95 transition-all py-[4px]'
                          >
                            Paynow{" "}
                            <span className='font-semibold text-green-600 text-sm md:text-2xl'>
                              {" "}
                              <span className='pr-0.5'>₹</span>{" "}
                              {disstatus ? coupondiscount : webinarbyid?.price}
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className='flex items-center space-x-1 pt-4 pl-4'>
                        <div className='md:text-lg tracking-wide'>
                          You have coupon code?
                        </div>
                        <div
                          onClick={() => openEditModal()}
                          className='md:text-lg text-blue-600 cursor-pointer md:hover:scale-110 transition-all tracking-wide'
                        >
                          Apply here
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
          <Transition appear show={editmodal} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeEditModal}>
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
                      <Dialog.Title
                        as='h3'
                        className='text-lg text-center leading-6 text-black text-opacity-80 font-semibold'
                      >
                        Apply Cuopon Code
                      </Dialog.Title>
                      <div className='mt-2 p-5 py-5'>
                        <div className='space-y-4'>
                          <div>
                            <label className='block text-sm'>
                              Enter Cuopon Code
                            </label>
                            <input
                              type={"text"}
                              value={coupon}
                              onChange={(e) => setCoupon(e.target.value)}
                              onKeyDown={(e) =>
                                e.key == "Enter" &&
                                handleWebinarCouponcode(
                                  webinarbyid?._id,
                                  webinarbyid?.price
                                )
                              }
                              name='coupon'
                              className='placeholder:text-xs text-sm py-[5px] rounded-sm border-opacity-30 px-2 outline-none border w-full border-black'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='pl-5 pr-3'>
                        <div className='flex items-center justify-between'>
                          <button
                            onClick={closeEditModal}
                            className='inline-block bg-red-500 text-white px-6 rounded-md font-semibold text-sm hover:scale-95 transition-all py-[4px]'
                          >
                            CANCEL
                          </button>
                          <button
                            onClick={() =>
                              handleWebinarCouponcode(
                                webinarbyid?._id,
                                webinarbyid?.price
                              )
                            }
                            className='inline-block gradient text-black px-8 font-semibold rounded-md text-sm hover:scale-95 transition-all py-[4px]'
                          >
                            Apply
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
        <></>
      </>
    </div>
  );
};

export default WebinarstartTimer;
