import React, { useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { BsFillCameraVideoFill, BsStarFill } from "react-icons/bs";
import { AiFillCaretDown,AiOutlineStar } from "react-icons/ai";
import {FaRegCommentDots} from "react-icons/fa"
import { Disclosure } from "@headlessui/react";
import {
  Applycuponcode,
  GetPlanPayment,
  GetPlan_PlanType,
  GetProgramReviews,
  GetSessionbypu,
  VerifyContinuity,
  sendOrderPrice,
} from "../../api_config/Auth_Services";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { ProgramPrice } from "../../redux/RoleSlice";
import Skeleton from "react-loading-skeleton";
import { Loader } from "../../utilitis/Loader";
import ShowIfNotLogin from "../../utilitis/ShowIfNotLogin";
import Bottomheader from "../home/Bottomheader";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ChildNotPurchase from "./ChildNotPurchase";
import ImageView from "../../utilitis/ImageView";
import { ls } from "../../utilitis/SecureLocalStorage";


const ProgramDetail = () => {
  const location = useLocation();

  const [active, setActive] = useState("overview");

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const id = useParams();
  const uid = ls.get("uId"); //Geting User id From localStorage

  const [load, setLoad] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  const [Data, setData] = useState({});
  const [continuitydata, setContinuitydata] = useState([]);
  const [continuitycounter, setContinuitycounter] = useState();

  const [pvideo, setPvideo] = useState("");
  const [lastdate, setLastDate] = useState("");
  const [secondsessiondate, setSecondSessionDate] = useState(""); //Second Session Date

  //Get Program Details by Id
  const GetProfileID = ls.get("switchid");
  const getFromReduxprofileId = useSelector(
    (state) => state.userrole.profileid
  );

  const GetProgramDetailById = async () => {
    const session_data = {
      programId: id.id,
      userId: uid || "Guest_User",
      profileId: getFromReduxprofileId || GetProfileID || "Guest_Profile",
    };
    try {
      setSkeleton(true);
      const Response = await GetSessionbypu(session_data);
      if (Response.status === true) {
        ls.save("pid", Response.data._id);
        ls.save("pimg", Response.data.imageUrl);
        ls.save("title", Response.data.title);
        setData(Response.data);
        setContinuitydata(Response.continuitySession);
        setContinuitycounter(Response.continuityCounter);
        setPvideo(Response.data.programintovideourl);
        const lastSessionDate =
          Response.data.structure[Response.data.structure.length - 1].endDate; //for Disbable end Enable Subscribe Button
        setLastDate(lastSessionDate);
        const SecondSessionDate = Response?.data?.structure[1]?.startDate; //for enable Continuity Plan
        setSecondSessionDate(SecondSessionDate);
      } else {
        toast(Response.message, { type: "error", className: "error" });
      }
      setSkeleton(false);
    } catch (error) {
      setSkeleton(false);
    }
  };

  useEffect(() => {
    GetProgramDetailById();
  }, [getFromReduxprofileId || GetProfileID]);

  //Get Program Details by Id
  //Api for Session Get By UserId and ProgramId
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed).toISOString().slice(0, 10);

  // //Getting Current Time to Comparing with Session Time To Show Meeting Link
  const time2 = new Date();
  const amPm = time2
    .toLocaleTimeString([], { hour12: true, hourCycle: "h12" })
    .split(" ")[1];

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  const formattedTime = time
    .toLocaleTimeString([], { hour12: true, hourCycle: "h12" })
    .replace(/:\d+ /, " ");

  //Nested Plans and Plan Category listing
  //Getiing Plan And PlanDuration if User is Purchased program on the behaif of plan and plan duration
  const [getplan, setgetPlan] = useState();
  //Getiing Plan And PlanDuration if User is Purchased program on the behaif of plan and plan duration

  const [selectedItems, setSelectedItems] = useState({
    plan: "",
    planDurations: "",
  });
  const numericValue = Number(
    selectedItems.planDurations.split("")[0]
  );

  ls.save(
    "planNumeric",
    selectedItems?.planDurations ==="Individual"?1:selectedItems?.planDurations ==="3 Months"?1:selectedItems?.planDurations === "6 Months"?1:selectedItems?.planDurations ==="3 months diet & lifetyle (group)"?1:selectedItems?.planDurations ==="6 months diet & lifetyle (group)"?1
      : numericValue
  );

  const handleSelection = (event) => {
    const { name, value } = event.target;
    setSelectedItems((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //Nested Plans and Plan Category listing

  const [notlogin, setNotlogin] = useState(false);
  const UID = ls.get("uId");

  const handleNotLogin = () => {
    if (UID) {
      setNotlogin(false);
      handleProgramPrice();
      //Send Price of Program plan wise to checkout page
    } else {
      setNotlogin(true)
    }

    //React Google Aan.lt. s if User Clicked on Subscribe Button
      // reactga.event({
      //   category: "Program detail page subscribe button",
      //   action: "Program detail page subscribe button clicked",
      //   label: "Subscribe Button", 
      // })
    };
    //React Google Aan.lt. s if User Clicked on Subscribe Button


  const handleclose = (data) => {
    //For Hide Popup by data props
    setNotlogin(data);
  };

  //Get Price By Plan And PlanDuration
  const [pprice, setpprice] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const planData = {
    programId: id.id,
    userId: UID,
    type: selectedItems.plan || getplan?.user?.planType,
    planDuration: selectedItems.planDurations || getplan?.user?.planSubType,
  };
  const handleProgramPrice = async () => {
    if (getplan) {
      try {
        setLoad(true);
        const response = await GetPlanPayment(planData);
        if (response.status === true) {
          setpprice(response.discountedPrice);
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
      openModal();
    } else {
      if (!selectedItems.plan) {
        toast("Select Plan !", { type: "error", className: "error" });
      } else if (!selectedItems.planDurations) {
        toast("Select Plan Type !", { type: "error", className: "error" });
      } else {
        try {
          setLoad(true);
          const response = await GetPlanPayment(planData);
          if (response.status === true) {
            ls.save("planDuration", selectedItems.planDurations);
            ls.save("plan", selectedItems.plan);
            navigate("/check-out");
            dispatch(ProgramPrice(response.discountedPrice));
          }
          setLoad(false);
        } catch (error) {
          setLoad(false);
        }
      }
    }
  };
  //Get Price By Plan And PlanDuration

  //Change Date Format Like this 06,june,
  const dateString = Data && Data.startDate;
  const dateoon = new Date(dateString);

  const formattedDate = dateoon.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  //Change Date Format like this 06 , june , 2023

  //Getting 15 days + date as Campare to last Session Date
  var currentDate = new Date(lastdate);
  var next15Days = new Date(currentDate);
  next15Days.setDate(currentDate.getDate() + 15);
  const last15day = next15Days
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
  //Getting 15 days + date as Campare to last Session Date

  //Hit Pay For Continuity Api is Here
  const handleContinuity = async () => {
    if (secondsessiondate && lastdate) {
      if (secondsessiondate < today && last15day > today) {
        const forplandata = {
          programId: id.id,
          userId: uid,
          profileId: getFromReduxprofileId || GetProfileID,
        };
        try {
          const response = await GetPlan_PlanType(forplandata);
          setgetPlan(response.data);
        } catch (error) { }
      } else if (last15day < today) {
        const forplandata = {
          programId: id.id,
          userId: uid,
          profileId: getFromReduxprofileId || GetProfileID,
        };
        try {
          const response = await GetPlan_PlanType(forplandata);
          setgetPlan(response.data);
        } catch (error) { }
      } else {
      }
    }
  };

  useEffect(() => {
    handleContinuity();
  }, [secondsessiondate && lastdate]);
  //Hit Pay For Continuity Api is Here

  //Hadle Continuity Payment api is Here with Cuopon code Popup
  let [isOpen, setIsOpen] = useState(false); //close and open modal if Expert Add team Member

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //Api for apply cupon code
  const [cupencode, setCupencode] = useState("");
  const cupondata = {
    programId: id.id,
    userId: uid,
    discountedprice: pprice.discountedPrice,
    cupancode: cupencode,
    plan:selectedItems?.plan,
    plantype:selectedItems?.planDurations
  };

  const [disstatus, setDisstatus] = useState(false);
  const [newPrice, setNewprice] = useState({}); //Latest price after cuopon apply
  const handleApplycupoun = async () => {
    if (!cupencode) {
      toast("Enter Coupon code !", { type: "error", className: "error" });
    } else {
      try {
        setLoad(true);
        const response = await Applycuponcode(cupondata);
        if (response.status == true) {
          toast("Successfuly applied !", {
            type: "success",
            className: "success",
          });
          setDisstatus(true);
          setNewprice(response);
        } else {
          toast(response.message, { type: "error", className: "error" });
          setCupencode("");
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
  };
  //Api for apply cupon code

  const handleOrderofContinuity = async (price) => {
    const order_continuity_data = {
      userId: uid,
      programId: id.id,
      currency: "INR",
      amount: price,
      couponCode: cupencode,
      planType: getplan?.user?.planType,
      planSubType: getplan?.user?.planSubType,
    };
    if (continuitycounter >= 20) {
      toast("Ops! You have exceeded continuity limit", {
        type: "error",
        className: "error",
      });
    } else {
      try {
        setLoad(true);
        const response = await sendOrderPrice(order_continuity_data);
        if (response.status == true) {
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
  };

  // handle Open Razorpay
  const [thankyou, setThankyou] = useState(false);
  const closeThankyou = () => {
    setThankyou(false);
    window.location.reload();
  };
  const handleOpenRazerpay = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
      amount: data.amount / 100,
      currency: data.currency,
      name: "Yellow Squash",
      order_id: data.id,
      handler: async function (response) {
        const data = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          programId: id.id,
          userId: uid,
          profileId: getFromReduxprofileId || GetProfileID,
        };
        try {
          setLoad(true);
          const Response = await VerifyContinuity(data);
          if (Response.status == true) {
            setThankyou(true);
          } else {
            toast(Response.message,{type:'error',className:'error'});
            setThankyou(false);
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
  //Handle Continuity Payment api is Here with Cuopon code Popup

  //Handel Popup If Child is Going to Purchasing Program
  const [openavoidchildtopurchase, setAvoidChildToPurchase] = useState(false)
  const CloseavoidModal = (data) => {
    setAvoidChildToPurchase(data)
  }
  //Handel Popup If Child is Going to Purchasing Program

  //Resources Image Preview Modal
  const [openimage, setOpenImage] = useState(false)
  const [imgurl, setImgurl] = useState("")

  const handelPreview = (url) => {
    setImgurl(url)
    setOpenImage(true)
  }
  const closeimagemodal = (state) => { //Close Image Modal dynamically
    setOpenImage(state)
  }
  //Resources Image Preview Modal

  
  //Get Program Reviews By Id
  const [review,setReview]=useState([])
  const [reviewload,setReviewload]=useState(false)
  const programReviews=async(ID)=>{
    try {
      setReviewload(true)
      const response=await GetProgramReviews(ID)
      if(response.status===true){
         setReview(response?.data?.programReview)
      }else{
        setReview([])
      }
      setReviewload(false)
    } catch (error) {
      setReviewload(false)
    }
  }

  useEffect(()=>{
   programReviews(id.id)
  },[active==="reviews"])
  //Get Program Reviews By Id 


  return (
    <>
      <div className='bg-[#f5f5f5]'>
        <Header
          GetDetailByid={GetProgramDetailById}
          currentLocation={location.pathname}
        />
        <div className='container'>
          {/* <div className='py-2 md:pb-2 md:pt-0 md:block hidden'>
            <Link to='/home-program' className='inline-block'>
              <FiArrowLeft size={25} />
            </Link>
          </div> */}
          <div className='grid grid-cols-12 md:gap-x-5'>
            {skeleton ? (
              <>
                <div className='col-span-12 md:col-span-6 pt-4 bg-white rounded-md px-4 pb-4'>
                  <div>
                    <Skeleton
                      duration={0.5}
                      className='w-full h-[270px] movinganimate'
                    />
                  </div>
                  <div className='py-3 w-full'>
                    <Skeleton
                      duration={0.5}
                      className='w-full h-[35px] movinganimate'
                    />
                  </div>
                  <div className='shadow-lg rounded-md hover:shadow-xl'>
                    <div>
                      <Skeleton
                        duration={0.5}
                        className='w-full h-[80px] movinganimate'
                      />
                    </div>
                    <div className='py-3'>
                      <Skeleton
                        duration={0.5}
                        className='w-full h-[35px] movinganimate'
                      />
                    </div>
                    <div className='py-3'>
                      <Skeleton
                        duration={0.5}
                        className='h-[50px] ml-[15%] hover:scale-95  py-4 rounded-[5rem] w-[70%]'
                      />
                    </div>
                  </div>

                  {/* About Expert is Start Here */}
                  <div className='pt-8 grid grid-cols-12  mt-8 py-4 shadow-lg hover:bg-yellow-100 cursor-pointer bg-yellow-50 rounded-md items-center'>
                    <div className='col-span-4'>
                      <Skeleton
                        duration={0.5}
                        className='w-[100px] h-[100px] movinganimate rounded-full'
                      />
                      <Skeleton
                        duration={0.5}
                        className='w-full h-[20px] movinganimate rounded-md'
                      />
                    </div>
                    <div
                      className={
                        toggle
                          ? "col-span-12 transition-all"
                          : "col-span-8 transition-all"
                      }
                    >
                      <Skeleton
                        duration={0.5}
                        className='w-full h-[30px] movinganimate rounded-md'
                      />
                      <Skeleton
                        duration={0.5}
                        className='w-full h-[30px] movinganimate rounded-md'
                      />
                      <Skeleton
                        duration={0.5}
                        className='w-full h-[30px] movinganimate rounded-md'
                      />
                    </div>
                  </div>
                </div>
                {/* overView and More things are Here */}
                <div className='col-span-12 md:col-span-6 px-4 md:px-0 rounded-md space-y-3'>
                  <div>
                    <Skeleton
                      duration={0.5}
                      className='w-full h-[60px] movinganimate rounded-md'
                    />
                  </div>

                  {/* container Show after clicking any of These button */}
                  <div className='bg-white py-3 px-2 md:px-5 h-screen rounded-md'>
                    <Skeleton
                      duration={0.5}
                      className='w-full movinganimate h-full'
                    />

                  </div>

                  <div className="bg-white p-4 rounded-md">
                    <Skeleton
                      duration={0.5}
                      className='w-full h-[60px] movinganimate rounded-md'
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='col-span-12 md:col-span-6 md:h-[1200px] md:sticky md:top-[80px] bg-white rounded-md px-4 pt-4 pb-4'>
                  <div>
                    {pvideo && (
                      <video
                        controls
                        className='mx-auto h-auto md:h-[280px]'
                        controlsList='nodownload'
                      >
                        <source src={pvideo} type='video/mp4' />
                      </video>
                    )}
                  </div>
                  <div className='flex py-3 items-center  justify-between w-full space-x-4'>
                    <div className='flex items-center space-x-2'>
                      <div className='flex space-x-[2px] items-center'>
                        <BsStarFill size={15} className='text-yellow-400' />
                        <BsStarFill size={15} className='text-yellow-400' />
                        <BsStarFill size={15} className='text-yellow-400' />
                        <BsStarFill size={15} className='text-yellow-400' />
                        <AiOutlineStar
                          size={18}
                          className='text-black text-opacity-50'
                        />
                      </div>
                      <div className='text-sm text-black'>
                        <span className='block text-center md:inline'>
                          {Data?.rating}
                        </span>{" "}
                        Reviews
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <div className='flex items-center'>
                        <div className='bg-gray-300 h-[30px] w-[30px] pt-1 text-black rounded-full border text-center'>
                          T
                        </div>
                        <div className='bg-gray-600 -translate-x-2 md:-translate-x-2 h-[30px] w-[30px] pt-1 text-black rounded-full border text-center'>
                          R
                        </div>
                        <div className='bg-yellow-300 h-[30px] -translate-x-4 md:-translate-x-4 w-[30px] pt-1 text-black rounded-full border text-center'>
                          P
                        </div>
                      </div>
                      <div className='text-black text-sm'>
                        <span className='block text-center md:inline'>
                          {Data?.enrolledUser} +
                        </span>{" "}
                        Enrolled
                      </div>
                    </div>
                  </div>
                  <div className='shadow-lg rounded-md hover:shadow-xl'>
                    <div className='py-3'>
                      <div className='text-center text-black text-[17px] tracking-wider'>
                        {Data?.title}
                      </div>
                    </div>
                    <div className='flex items-center justify-around'>
                      <div className='flex space-x-2 text-sm'>
                        <div>
                          <img
                            src='/assets/images/session.png'
                            alt='error'
                            className='w-10 h-10'
                          />
                        </div>
                        <div>
                          <div>Sessions</div>
                          <span className='text-black font-semibold text-center block'>
                            {Data?.structure?.length}
                          </span>
                        </div>
                      </div>
                      <div className='flex space-x-2 text-sm'>
                        <div>
                          <img
                            src='/assets/images/calender.png'
                            alt='error'
                            className='w-10 h-10'
                          />
                        </div>
                        <div>
                          <div>Start Date</div>
                          <span className='text-black font-semibold text-center block'>
                            {formattedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='pt-4'>
                      {getplan ? (
                        <div className='grid grid-cols-12 md:gap-x-8 px-4'>
                          <select
                            disabled
                            className='col-span-6 py-[5px] cursor-pointer bg-gray-50 w-full outline-none border-[1px] border-black  px-1'
                          >
                            <option>{getplan?.user?.planType}</option>
                          </select>
                          <select
                            disabled
                            className='col-span-6 py-[5px] cursor-pointer bg-gray-50 w-full outline-none border-[1px] border-black  px-1'
                          >
                            <option>{getplan?.user?.planSubType}</option>
                          </select>
                        </div>
                      ) : (
                        <div className='grid grid-cols-12 md:gap-x-8 px-4'>
                          <div
                            className={`${selectedItems.plan
                              ? "col-span-6"
                              : "md:col-span-12"
                              } col-span-12`}
                          >
                            <select
                              name='plan'
                              value={selectedItems.plan}
                              onChange={handleSelection}
                              className='py-[5px] cursor-pointer bg-gray-50 w-full outline-none border-[1px] border-black  px-1'
                            >
                              <option value=''>Select Plan</option>
                              {Data?.plans?.plansdetails?.map((item, ind) => (
                                <option key={ind} value={item.type}>
                                  {item.type}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div
                            className={`${selectedItems.plan ? "col-span-6" : ""
                              } col-span-12`}
                          >
                            {selectedItems.plan && (
                              <select
                                name='planDurations'
                                value={selectedItems.planDurations}
                                onChange={handleSelection}
                                className='py-[5px] cursor-pointer bg-gray-50 w-full outline-none border-[1px] border-black  px-1'
                              >
                                <option value=''>Select Plan Type</option>
                                {selectedItems.plan === "Educational" && (
                                  <>
                                    {Data?.plans?.plansdetails?.map(
                                      (item, ind) => (
                                        <>
                                          {item.type === selectedItems.plan &&
                                            item?.plans?.map((nitem, ind) => (
                                              <option
                                                key={ind}
                                                value={nitem.planDuration}
                                              >
                                                {nitem.planDuration}
                                              </option>
                                            ))}
                                        </>
                                      )
                                    )}
                                  </>
                                )}
                                {selectedItems.plan === "Treatment" && (
                                  <>
                                    {Data?.plans?.plansdetails?.map(
                                      (item, ind) => (
                                        <>
                                          {item.type === selectedItems.plan &&
                                            item?.plans?.map((nesitem, ind) => (
                                              <option
                                                key={ind}
                                                value={nesitem.planDuration}
                                              >
                                                {nesitem.planDuration}
                                              </option>
                                            ))}
                                        </>
                                      )
                                    )}
                                  </>
                                )}
                              </select>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {Data?.isSubscribed && (getFromReduxprofileId || GetProfileID) ?
                      <div className='w-full flex justify-center py-3'>
                        {secondsessiondate && secondsessiondate >= today ? (
                          <button className='hover:scale-95 transition-all text-black font-bold text-opacity-80 bg-gray-300 py-2 md:py-3 rounded-[5rem] w-[60%] text-lg  tracking-wide'>
                            SUBSCRIBED
                          </button>
                        ) : lastdate && last15day >= today ? (
                          <button
                            onClick={handleNotLogin}
                            className={` hover:scale-95  capitalize transition-all text-black font-bold text-opacity-80 hover:text-white hover:bg-black bg-[#f9d121] py-2 md:py-3 rounded-[5rem] w-[70%] md:w-[60%] text-sm md:text-lg  tracking-wide`}
                          >
                            PAY FOR CONTINUITY{" "}
                            <span className='text-green-800 font-semibold text-xl pl-1'>
                              {continuitycounter + 1}
                            </span>
                          </button>
                        ) : lastdate && last15day < today ? (
                          <button
                            onClick={handleNotLogin}
                            className={` hover:scale-95  capitalize transition-all text-black font-bold text-opacity-80 hover:text-white hover:bg-black bg-[#f9d121] py-2 md:py-3 rounded-[5rem] w-[70%] md:w-[60%] text-sm md:text-lg  tracking-wide`}
                          >
                            PAY FOR CONTINUITY{" "}
                            <span className='text-green-800 font-semibold text-xg pl-1'>
                              {continuitycounter + 1}
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={handleNotLogin}
                            className={` hover:scale-95  capitalize transition-all text-black font-bold text-opacity-80 hover:text-white hover:bg-black bg-[#f9d121] py-2 md:py-4 rounded-[5rem] w-[70%] text-lg  tracking-wide`}
                          >
                            SUBSCRIBE
                          </button>
                        )}
                      </div> :
                      !GetProfileID ?
                        <div className='w-full flex justify-center py-3'>
                          {secondsessiondate && secondsessiondate >= today ? (
                            <button className='hover:scale-95 transition-all text-black font-bold text-opacity-80 bg-gray-300 py-2 md:py-3 rounded-[5rem] w-[60%] text-lg  tracking-wide'>
                              SUBSCRIBED
                            </button>
                          ) : lastdate && last15day >= today ? (
                            <button
                              onClick={handleNotLogin}
                              className={` hover:scale-95  capitalize transition-all text-black font-bold text-opacity-80 hover:text-white hover:bg-black bg-[#f9d121] py-2 md:py-3 rounded-[5rem] w-[70%] md:w-[60%] text-sm md:text-lg  tracking-wide`}
                            >
                              PAY FOR CONTINUITY{" "}
                              <span className='text-green-800 font-semibold text-xl pl-1'>
                                {continuitycounter + 1}
                              </span>
                            </button>
                          ) : lastdate && last15day < today ? (
                            <button
                              onClick={handleNotLogin}
                              className={` hover:scale-95  capitalize transition-all text-black font-bold text-opacity-80 hover:text-white hover:bg-black bg-[#f9d121] py-2 md:py-3 rounded-[5rem] w-[60%] text-lg  tracking-wide`}
                            >
                              PAY FOR CONTINUITY{" "}
                              <span className='text-green-800 font-semibold text-xg pl-1'>
                                {continuitycounter + 1}
                              </span>
                            </button>
                          ) : (
                            <button
                              onClick={handleNotLogin}
                              className={` hover:scale-95  capitalize transition-all text-black font-bold text-opacity-80 hover:text-white hover:bg-black bg-[#f9d121] py-2 md:py-3 rounded-[5rem] w-[60%] text-lg  tracking-wide`}
                            >
                              SUBSCRIBE
                            </button>
                          )}
                        </div>
                        :
                        <div className='w-full flex justify-center py-3'>
                          <button onClick={() => setAvoidChildToPurchase(true)} className='hover:scale-95 transition-all text-black font-bold text-opacity-80  bg-[#f9d121] py-2 md:py-3 rounded-[5rem] w-[60%] text-lg  tracking-wide'>
                            SUBSCRIBE
                          </button>
                        </div>
                    }
                  </div>
                  {/* About Expert is Start Here */}
                  <div
                    onClick={handleToggle}
                    className='pt-8 grid grid-cols-12  mt-8 py-4 shadow-lg hover:bg-yellow-100 cursor-pointer bg-yellow-50 rounded-md items-center'
                  >
                    <div
                      className={
                        toggle
                          ? "col-span-12 transition-all"
                          : "transition-all col-span-4"
                      }
                    >
                      <img
                        src={Data.expertImage}
                        alt='error'
                        className='w-[100px] h-[100px] rounded-full border-2 mx-auto border-green-500 p-[1px]'
                      />
                      <div className='text-sm text-center text-black tracking-wide'>
                        {Data.expert}
                      </div>
                    </div>
                    <div
                      className={
                        toggle
                          ? "col-span-12 transition-all"
                          : "col-span-8 transition-all"
                      }
                    >
                      <div
                        className={`${toggle
                          ? "text-center transition-all"
                          : "text-left transition-all"
                          } text-sm tracking-wider text-black font-semibold pb-1`}
                      >
                        {Data?.expertDesignation}
                      </div>
                      <p
                        className={`${toggle
                          ? "pt-3 px-3 transition-all"
                          : "pt-0 px-0 transition-all"
                          } text-black font-normal text-sm tracking-wide text-opacity-80`}
                      >
                        {toggle
                          ? Data?.aboutTheExpert?.expertDescription
                          : Data?.aboutTheExpert?.expertDescription.substring(
                            0,
                            185
                          )}
                      </p>
                      <div
                        className={`${toggle
                          ? "text-red-500 transition-all"
                          : "transition-all text-green-500"
                          }  text-xs text-right pr-5 cursor-pointer`}
                        onClick={handleToggle}
                      >
                        {toggle ? "Read Less" : "Read More"}
                      </div>
                    </div>
                  </div>
                </div>
                {/* overView and More things are Here */}
                <div className='col-span-12 pt-4 md:pt-0  md:px-0 md:col-span-6 rounded-md space-y-3'>
                  <div className=' bg-white text-lg py-3 rounded-md text-black space-x-4 md:space-x-8 px-2 md:px-4 items-center grid grid-cols-4'>
                    <button
                      onClick={() => setActive("overview")}
                      className={`${active == "overview"
                        ? "border-b-2 border-yellow-400 text-yellow-400"
                        : ""
                        } cursor-pointer inline-block text-center`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActive("session")}
                      className={`${active == "session"
                        ? "border-b-2 border-yellow-400 text-yellow-400 inline-block text-center cursor-pointer"
                        : "cursor-pointer inline-block text-center"
                        }`}
                    >
                      Sessions
                    </button>
                    <button
                      onClick={() => setActive("reviews")}
                      className={`${active == "reviews"
                        ? "border-b-2 border-yellow-400 text-yellow-400 cursor-pointer inline-block text-center"
                        : "cursor-pointer inline-block text-center"
                        }`}
                    >
                      Reviews
                    </button>
                    <button
                      onClick={() => setActive("faqs")}
                      className={`${active == "faqs"
                        ? "border-b-2 border-yellow-400 inline-block text-center text-yellow-400 cursor-pointer"
                        : "cursor-pointer inline-block text-center"
                        }`}
                    >
                      F.A.Qs
                    </button>
                  </div>

                  {/* container Show after clicking any of These button */}
                  <div className='bg-white py-3 px-2 md:px-5 rounded-md'>
                    {active == "overview" ? (
                      <div className="h-auto">
                        <div dangerouslySetInnerHTML={{ __html: Data?.overview }} />
                      </div>
                    ) : active == "session" ? (
                      <div>
                        <>
                          {Data?.structure?.map((item, ind) => {
                            return (
                              <Disclosure key={ind}>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className='flex w-full bg-gray-100 border-l-[5px] border-green-400 my-2 px-1 md:px-2 justify-between rounded-sm py-2   text-left text-sm  text-black text-opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                      <div className={`${item?.startDate ? "justify-between space-x-2" : "justify-between w-[100%]"} flex  items-center md:space-x-4`}>
                                        <div className='flex items-center justify-between space-x-2 text-[14px] md:text-lg'>
                                          <div>Session : {ind + 1}</div>
                                          <span className='block w-[2px] bg-gray-500 h-[20px]'></span>
                                          <div>Duration</div>
                                          <div>{item.sessionDuration}</div>
                                        </div>
                                        <AiFillCaretDown
                                          className={`${open ? "rotate-180 transform" : ""
                                            } md:h-5 h-3 w-3 md:w-5 bg-yellow-400 rounded-full p-[1px] md:p-1 text-black`}
                                        />
                                      </div>
                                      {item.startDate && item.startTime ? (
                                        <div className='text-[14px] md:text-lg  md:flex items-center space-x-2'>
                                          <div>
                                            {new Date(
                                              item.startDate
                                            ).toLocaleDateString("en-US", {
                                              day: "numeric",
                                              month: "short",
                                              year: "numeric",
                                            })}
                                          </div>
                                          <span className='w-[2px] bg-gray-500 hidden md:block h-[20px]'></span>
                                          <div>{item.startTime}</div>
                                        </div>
                                      ) : null}
                                    </Disclosure.Button>
                                    <Transition
                                      enter='transition duration-50 ease-out'
                                      enterFrom='transform scale-95 opacity-0'
                                      enterTo='transform scale-100 opacity-100'
                                      leave='transition duration-45 ease-out'
                                      leaveFrom='transform scale-100 opacity-100'
                                      leaveTo='transform scale-95 opacity-0'
                                    >
                                      <Disclosure.Panel className='px-5  pb-5 shadow-2xl rounded-2xl w-full  text-[14px] md:text-[16px] text black'>
                                        <div className='font-semibold text-black text-lg tracking-wide'>
                                          {item.sessionTitle}
                                        </div>
                                        <p className='text-sm text-gray-500 tracking-wide pt-1 pb-2'>
                                          {item.description}
                                        </p>
                                        {item.startDate ? (
                                          <div className='space-y-5'>
                                            <div>
                                              {today == item.startDate ? (
                                                new Date(
                                                  new Date(
                                                    `"${item.startDate} "` +
                                                    `"${item.startTime} "`
                                                  ).setTime(
                                                    new Date(
                                                      `"${item.startDate} "` +
                                                      `"${item.startTime} "`
                                                    ).getTime() -
                                                    10 * 60 * 1000
                                                  )
                                                ).toLocaleTimeString("en-US", {
                                                  hour: "numeric",
                                                  minute: "numeric",
                                                  hour12: true,
                                                }) <= formattedTime &&
                                                  item.startDate == today &&
                                                  new Date(
                                                    `"${item.startDate} "` +
                                                    `"${item.startTime} "`
                                                  )
                                                    .toLocaleTimeString([], {
                                                      hour12: true,
                                                      hourCycle: "h12",
                                                    })
                                                    .split(" ")[1] == amPm ? (
                                                  <a
                                                    href={
                                                      item.sessionRecording ||
                                                        item.sessionResources.length > 1
                                                        ? ""
                                                        : item.sessionlink
                                                    }
                                                    target="blank"
                                                    className={` ${item.sessionRecording ||
                                                      item.sessionResources?.length > 1
                                                      ? "bg-yellow-50 border-[1px] border-yellow-200 text-sm rounded-md py-4 px-4 text-black"
                                                      : "font-semibold text-white hover:scale-90 transition-all bg-[#0FA654] py-[7px] rounded-sm  text-sm md:text-lg"
                                                      }  block text-center w-[80%] `}
                                                  >
                                                    {item.sessionRecording ||
                                                      item.sessionResources.length > 1
                                                      ? "Session Link is Expired, Session Recordings & Resources is Given Below !"
                                                      : "Join Session Now "}
                                                    {item.sessionRecording ||
                                                      item.sessionResources?.length > 1 ? (
                                                      <img
                                                        src='/assets/images/hand.png'
                                                        alt='erorr'
                                                        className='w-12 rotate-180 mx-auto'
                                                      />
                                                    ) : null}{" "}
                                                    {item.sessionRecording ||
                                                      item.sessionResources?.length ? (
                                                      ""
                                                    ) : (
                                                      <BsFillCameraVideoFill
                                                        className='inline-block'
                                                        size={18}
                                                      />
                                                    )}
                                                  </a>
                                                ) : (
                                                  <div className='text-sm text-black tracking-wide bg-yellow-50 inline-block border-[1px] border-yellow-200 py-4 px-4 rounded-md shadow-xl'>
                                                    Session Link is Available 10
                                                    Minutes Before{" "}
                                                    <span className='text-lg text-black font-bold tracking-wide'>
                                                      {item.startTime}
                                                    </span>{" "}
                                                    Schedule Time Today !{" "}
                                                    <img
                                                      src='/assets/images/hand.png'
                                                      alt='error'
                                                      className='w-10 mx-auto'
                                                    />
                                                  </div>
                                                )
                                              ) : item.sessionRecording ||
                                                today >
                                                item.startDate ? null : (
                                                <span className='text-sm text-black tracking-wide bg-yellow-50 inline-block border-[1px] border-yellow-200 py-4 px-4 rounded-md shadow-xl'>
                                                  {" "}
                                                  Session Start Date is{" "}
                                                  <span className='text-lg text-black font-bold tracking-wide'>
                                                    {new Date(
                                                      item.startDate
                                                    ).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                      }
                                                    )}
                                                  </span>{" "}
                                                  <img
                                                    src='/assets/images/hand.png'
                                                    alt='error'
                                                    className='w-10 mx-auto'
                                                  />
                                                </span>
                                              )}
                                            </div>
                                            <div>
                                              {today >= item.startDate &&
                                                item.sessionRecording ? (
                                                <div className='text-lg text-green-500 pb-3 font-semibold'>
                                                  <span className='text-lg'>
                                                    Session
                                                  </span>{" "}
                                                  Recording{" "}
                                                  <span>
                                                    <BsFillCameraVideoFill className='inline-block' />
                                                  </span>
                                                </div>
                                              ) : null}
                                              {today >= item.startDate &&
                                                item.sessionRecording ? (
                                                <video
                                                  controls
                                                  controlsList='nodownload'
                                                  className='cursor-pointer w-full shadow-lg h-[50%] md:w-full md:h-[250px] rounded-2xl'
                                                >
                                                  <source
                                                    src={item.sessionRecording}
                                                    type='video/mp4'
                                                  />
                                                </video>
                                              ) : null}
                                            </div>
                                            <div>
                                              {today >= item.startDate &&
                                                item.sessionResources?.length > 1 ? (
                                                <div>
                                                  <div className="text-[1rem] tracking-wide font-semibold pb-5 text-green-500 ">Session Resources</div>
                                                  <div className="grid grid-cols-12 space-y-4 md:space-y-0 md:space-x-5">
                                                    {item.sessionResources?.map((item, ind) => (
                                                      item.type === "image" ? <div key={ind} className="col-span-12 md:col-span-6">
                                                        IMAGE
                                                        <div className="md:w-[200px] md:h-[200px] pb-3">
                                                          <img src={item?.resourceLink} alt="img" className="w-full h-full border rounded-md" />
                                                        </div>
                                                        <div onClick={() => handelPreview(item?.resourceLink)} className="bg-green-500 md:w-[70%] text-center block text-white px-4 py-[4px] rounded-lg hover:scale-90 transition-all cursor-pointer">Click to View</div>
                                                      </div> :
                                                        <div className="col-span-12 md:col-span-6" key={ind}>
                                                          PDF
                                                          <div className="md:w-[200px] md:h-[200px] pb-3">
                                                            <img src={'/assets/images/pdf.png'} alt="img" className="w-full h-full border rounded-md" />
                                                          </div>
                                                          <a href={item?.resourceLink} className="bg-green-500 text-center px-4 block md:inline-block md:w-[70%] text-white py-[4px] rounded-lg hover:scale-90 transition-all cursor-pointer">Click to View</a>
                                                        </div>
                                                    ))
                                                    }
                                                  </div>
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        ) : (
                                          <div className='bg-yellow-50 border-[1px] tracking-wide  border-yellow-200 text-sm rounded-md py-4 px-4 text-black'>
                                            Please Subscribe Program to access
                                            sessions !
                                            <img
                                              src='/assets/images/hand.png'
                                              alt='erorr'
                                              className='w-12 mx-auto'
                                            />
                                          </div>
                                        )}
                                      </Disclosure.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Disclosure>
                            );
                          })}

                          {/* Continuity Sessions is Here */}
                          {continuitydata?.length > 0 ? (
                            <div className='text-black font-semibold tracking-wide py-3 pt-5 text-lg text-center'>
                              <span className='border-b-2 border-yellow-400'>
                                Continuity Sessions
                              </span>
                            </div>
                          ) : null}
                          {continuitydata?.map((item, ind) => {
                            return (
                              <Disclosure key={ind}>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className='flex w-full bg-gray-100 border-l-[5px] border-green-400 my-2 px-1 md:px-2 justify-between rounded-sm py-2   text-left text-sm  text-black text-opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                      <div className='flex justify-between w-[70%] md:w-[55%] items-center md:space-x-4'>
                                        <span className='flex items-center text-[14px] md:text-lg space-x-2'>
                                          <div>Session-{ind + 1}</div>
                                          <span className='block w-[2px] bg-gray-500 h-[20px]'></span>
                                          <div>Duration</div>
                                          <div>{item.sessionDuration}</div>
                                        </span>
                                        <AiFillCaretDown
                                          className={`${open ? "rotate-180 transform" : ""
                                            } md:h-5 h-3 w-3 md:w-5 bg-yellow-400 rounded-full p-[1px] md:p-1 text-black`}
                                        />

                                      </div>
                                      {item.ContinuitystartDate &&
                                        item.startTime ? (
                                        <div className='text-[14px] md:text-lg  md:flex items-center space-x-2'>
                                          <div>
                                            {new Date(
                                              item.ContinuitystartDate
                                            ).toLocaleDateString("en-US", {
                                              day: "numeric",
                                              month: "short",
                                              year: "numeric",
                                            })}
                                          </div>
                                          <span className='w-[2px] bg-gray-500 hidden md:block h-[20px]'></span>
                                          <div>{item.startTime}</div>
                                        </div>
                                      ) : null}
                                    </Disclosure.Button>
                                    <Transition
                                      enter='transition duration-50 ease-out'
                                      enterFrom='transform scale-95 opacity-0'
                                      enterTo='transform scale-100 opacity-100'
                                      leave='transition duration-45 ease-out'
                                      leaveFrom='transform scale-100 opacity-100'
                                      leaveTo='transform scale-95 opacity-0'
                                    >
                                      <Disclosure.Panel className='px-5  pb-5 shadow-2xl rounded-2xl w-full  text-[14px] md:text-[16px] text black'>
                                        <div>{item.sessionTitle}</div>
                                        <p>{item.description}</p>
                                        {item.ContinuitystartDate ? (
                                          <div className='space-y-5'>
                                            <div>
                                              {today ==
                                                item.ContinuitystartDate ? (
                                                new Date(
                                                  new Date(
                                                    `"${item.ContinuitystartDate} "` +
                                                    `"${item.startTime} "`
                                                  ).setTime(
                                                    new Date(
                                                      `"${item.ContinuitystartDate} "` +
                                                      `"${item.startTime} "`
                                                    ).getTime() -
                                                    10 * 60 * 1000
                                                  )
                                                ).toLocaleTimeString("en-US", {
                                                  hour: "numeric",
                                                  minute: "numeric",
                                                  hour12: true,
                                                }) <= formattedTime &&
                                                  item.ContinuitystartDate ==
                                                  today &&
                                                  new Date(
                                                    `"${item.ContinuitystartDate} "` +
                                                    `"${item.startTime} "`
                                                  )
                                                    .toLocaleTimeString([], {
                                                      hour12: true,
                                                      hourCycle: "h12",
                                                    })
                                                    .split(" ")[1] == amPm ? (
                                                  <a
                                                    href={
                                                      item.sessionRecording ||
                                                        item.sessionResources.length > 1
                                                        ? ""
                                                        : item.sessionlink

                                                    }
                                                    target="blank"
                                                    className={` ${item.sessionRecording ||
                                                      item.sessionResources?.length > 1
                                                      ? "bg-yellow-50 border-[1px] border-yellow-200 text-sm rounded-md py-4 px-4 text-black"
                                                      : "font-semibold text-white bg-[#0FA654] py-[7px] rounded-sm  text-sm md:text-lg"
                                                      }  block text-center w-[80%] `}
                                                  >
                                                    {item.sessionRecording ||
                                                      item.sessionResources?.length > 1
                                                      ? "Session Link is Expired, Session Recordings & Resources is Given Below !"
                                                      : "Join Session Now "}
                                                    {item.sessionRecording ||
                                                      item.sessionResources?.length > 1 ? (
                                                      <img
                                                        src='/assets/images/hand.png'
                                                        alt='erorr'
                                                        className='w-12 rotate-180 mx-auto'
                                                      />
                                                    ) : null}{" "}
                                                    {item.sessionRecording ||
                                                      item.sessionResources?.length > 1 ? (
                                                      ""
                                                    ) : (
                                                      <BsFillCameraVideoFill
                                                        className='inline-block'
                                                        size={18}
                                                      />
                                                    )}
                                                  </a>
                                                ) : (
                                                  <div className='text-sm text-black tracking-wide bg-yellow-50 inline-block border-[1px] border-yellow-200 py-4 px-4 rounded-md shadow-xl'>
                                                    Session Link is Available 10
                                                    Minutes Before{" "}
                                                    <span className='text-lg text-black font-bold tracking-wide'>
                                                      {item.startTime}
                                                    </span>{" "}
                                                    Schedule Time Today !{" "}
                                                    <img
                                                      src='/assets/images/hand.png'
                                                      alt='error'
                                                      className='w-10 mx-auto'
                                                    />
                                                  </div>
                                                )
                                              ) : item.sessionRecording ||
                                                today >
                                                item.ContinuitystartDate ? null : (
                                                <span className='text-sm text-black tracking-wide bg-yellow-50 inline-block border-[1px] border-yellow-200 py-4 px-4 rounded-md shadow-xl'>
                                                  {" "}
                                                  Session Start Date is{" "}
                                                  <span className='text-lg text-black font-bold tracking-wide'>
                                                    {new Date(
                                                      item.ContinuitystartDate
                                                    ).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                      }
                                                    )}
                                                  </span>{" "}
                                                  <img
                                                    src='/assets/images/hand.png'
                                                    alt='error'
                                                    className='w-10 mx-auto'
                                                  />
                                                </span>
                                              )}
                                            </div>
                                            <div>
                                              {today >=
                                                item.ContinuitystartDate &&
                                                item.sessionRecording ? (
                                                <div className='text-lg text-green-500 pb-3 font-semibold'>
                                                  <span className='text-lg'>
                                                    Session
                                                  </span>{" "}
                                                  Recording{" "}
                                                  <span>
                                                    <BsFillCameraVideoFill className='inline-block' />
                                                  </span>
                                                </div>
                                              ) : null}
                                              {today >=
                                                item.ContinuitystartDate &&
                                                item.sessionRecording ? (
                                                <video
                                                  controls
                                                  controlsList='nodownload'
                                                  className='cursor-pointer w-[70%] h-[50%] md:w-full md:h-[200px]'
                                                >
                                                  <source
                                                    src={item.sessionRecording}
                                                    type='video/mp4'
                                                  />
                                                </video>
                                              ) : null}
                                            </div>
                                            <div>
                                              {today >= item.COUN &&
                                                item.sessionResources?.length > 1 ? (
                                                <div>
                                                  <div className="text-[1rem] tracking-wide font-semibold pb-5 text-green-500 ">Session Resources</div>
                                                  <div className="grid grid-cols-12 space-y-4 md:space-y-0 md:space-x-5">
                                                    {item.sessionResources?.map((item, ind) => (
                                                      item.type === "image" ? <div key={ind} className="col-span-12 md:col-span-6">
                                                        IMAGE
                                                        <div className="md:w-[200px] md:h-[200px] pb-3">
                                                          <img src={item?.resourceLink} alt="img" className="w-full h-full border rounded-md" />
                                                        </div>
                                                        <div onClick={() => handelPreview(item?.resourceLink)} className="bg-green-500 md:w-[70%] text-center block text-white px-4 py-[4px] rounded-lg hover:scale-90 transition-all cursor-pointer">Click to View</div>
                                                      </div> :
                                                        <div className="col-span-12 md:col-span-6" key={ind}>
                                                          PDF
                                                          <div className="md:w-[200px] md:h-[200px] pb-3">
                                                            <img src={'/assets/images/pdf.png'} alt="img" className="w-full h-full border rounded-md" />
                                                          </div>
                                                          <a href={item?.resourceLink} className="bg-green-500 text-center px-4 block md:inline-block md:w-[70%] text-white py-[4px] rounded-lg hover:scale-90 transition-all cursor-pointer">Click to View</a>
                                                        </div>
                                                    ))
                                                    }
                                                  </div>
                                                </div>
                                              ) : null}
                                            </div>

                                          </div>
                                        ) : (
                                          <div className='bg-yellow-50 border-[1px] tracking-wide  border-yellow-200 text-sm rounded-md py-4 px-4 text-black'>
                                            Please Subscribe Program to access
                                            sessions !
                                            <img
                                              src='/assets/images/hand.png'
                                              alt='erorr'
                                              className='w-12 mx-auto'
                                            />
                                          </div>
                                        )}
                                      </Disclosure.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Disclosure>
                            );
                          })}
                        </>
                      </div>
                    ) : active === "reviews" ? (
                      <div className=' text-sm tracking-wide'>
                        {reviewload ?
                          <div className="movinganimate">
                            <Skeleton duration={.5} className="h-[40px] mb-1 rounded-2xl w-full" />
                            <Skeleton duration={.5} className="h-[20px] mb-1 rounded-2xl w-[60%]" />
                            <Skeleton duration={.5} className="h-[50px] mb-1 rounded-2xl w-[75%]" />
                            <Skeleton duration={.5} className="h-[30px] mb-1 rounded-2xl w-full" />
                            <Skeleton duration={.5} className="h-[15px] mb-1 rounded-2xl w-[45%]" />
                            <Skeleton duration={.5} className="h-[40px] mb-1 rounded-2xl w-[85%]" />
                            <Skeleton duration={.5} className="h-[30px] mb-1 rounded-2xl w-[75%]" />
                            <Skeleton duration={.5} className="h-[25px] mb-1 rounded-2xl w-[45%]" />
                            <Skeleton duration={.5} className="h-[20px] mb-1 rounded-2xl w-[65%]" />
                            <Skeleton duration={.5} className="h-[50px] mb-1 rounded-2xl w-[95%]" />
                          </div> :
                          review?.length > 1 ? review.map((item, ind) => (
                            <div key={ind} className="shadow-2xl rounded-md p-4 mb-4 border border-black">
                              <div>
                                <img src={item.commentPhoto} alt="img" className="w-full h-full rounded-lg" />
                              </div>
                              {item?.comment&&<div className="flex items-center space-x-2 justify-center">
                                <FaRegCommentDots size={25} className="text-green-500" />
                                <div className="text-center  tracking-wide">{item?.comment}</div>
                              </div>}
                            </div>
                          )) :
                            <div>
                              <img src="/assets/images/review.jpg" alt="img" className="mx-auto w-[100%] md:w-[40%] h-[100%] md:h-[40%]" />
                              <div className='text-center text-gray-400 tracking-wide'>No Review's Found !</div>
                            </div>
                        }
                      </div>
                    ) : (
                      <div className='mx-auto w-full rounded-2xl bg-white'>
                        {Data?.FAQ?.map((item, ind) => (
                          <Disclosure key={ind}>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className='flex  w-full justify-between font-semibold rounded-sm  px-4 py-3 text-left text-sm  text-black text-opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                  <span className="w-[90%]">{item?.ques}</span>
                                  <AiFillCaretDown
                                    className={`${open ? "rotate-180 transform" : ""
                                      } text-black`}
                                    size={20}
                                  />
                                </Disclosure.Button>
                                <Transition
                                  enter='transition duration-50 ease-out'
                                  enterFrom='transform scale-95 opacity-0'
                                  enterTo='transform scale-100 opacity-100'
                                  leave='transition duration-45 ease-out'
                                  leaveFrom='transform scale-100 opacity-100'
                                  leaveTo='transform scale-95 opacity-0'
                                >
                                  <Disclosure.Panel className='px-4 w-full  text-sm text-gray-500'>
                                    {[item?.ans].map((itemans, index) =>
                                      itemans?.map((Ans) => (
                                        <li className='list-none py-1 text-black text-sm tracking-wide text-opacity-80'>
                                          {Ans}
                                        </li>
                                      ))
                                    )}
                                  </Disclosure.Panel>
                                </Transition>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
        <Loader show={load} />
        {notlogin && <ShowIfNotLogin handleClosefun={handleclose} />}
        <Bottomheader currentLocation={location.pathname} />
        <>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                        Yup! You are Going to be a Part of Continuity
                      </Dialog.Title>
                      <div className='mt-2 p-5 py-5'>
                        <div className='space-y-4'>
                          <div>
                            <label className='block text-sm pb-1.5'>
                              Enter Coupon Code & Get Continuity Discount
                            </label>
                            <input
                              type={"text"}
                              name='couponcode'
                              onChange={(e) =>
                                setCupencode(e.currentTarget.value)
                              }
                              onKeyDown={(e) => e.key == "Enter" && handleApplycupoun()}
                              placeholder='coupon code'
                              className='placeholder:text-xs text-sm py-[5px] rounded-sm border-opacity-30 px-2 outline-none border w-full border-black'
                            />
                          </div>
                          <div
                            onClick={handleApplycupoun}
                            className='gradient px-4 py-[4px] rounded-lg hover:scale-95 transition-all cursor-pointer inline-block'
                          >
                            Apply
                          </div>
                        </div>
                      </div>
                      {/* Continuity Price is Here */}
                      <div className=' px-5 pb-5'>
                        <div className='flex items-center space-x-2'>
                          <div className='font-semibold'>Total Price:</div>
                          <div className='text-green-500'>₹ {pprice.price - pprice.discount / 100 * pprice.price}</div>
                        </div>
                        {disstatus ? (
                          <div className='border-b-2 border-black pb-2 flex items-center space-x-2'>
                            <div className='font-semibold'>
                              Coupon Discount:
                            </div>
                            <div className='text-green-500'>
                              ₹{" "}
                              {pprice.discountedPrice - newPrice.dicountedPrice}
                            </div>
                          </div>
                        ) : null}
                        <div className='flex items-center space-x-2 pt-2'>
                          <div className='font-semibold'>Gross Total :</div>
                          <div className='text-green-500'>
                            ₹{" "}
                            {disstatus ? newPrice.dicountedPrice : pprice.price - pprice.discount / 100 * pprice.price}
                          </div>
                        </div>
                      </div>
                      {/* Continuity Price is Here */}
                      <div className='mt-4 pl-5 pr-3'>
                        <div className='flex items-center justify-between'>
                          <button
                            onClick={closeModal}
                            className='inline-block bg-red-500 text-white px-6 rounded-md font-semibold text-sm hover:scale-95 transition-all py-[4px]'
                          >
                            CANCEL
                          </button>
                          <button
                            onClick={() =>
                              handleOrderofContinuity(
                                disstatus
                                  ? newPrice.dicountedPrice
                                  : pprice.discountedPrice
                              )
                            }
                            className='inline-block gradient text-black px-8 font-semibold rounded-md text-sm hover:scale-95 transition-all py-[4px]'
                          >
                            Pay Now
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
          <Transition appear show={thankyou} as={Fragment}>
            <Dialog
              as='div'
              className='relative z-[99]'
              onClose={closeThankyou}
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
                <div className='flex min-h-full items-center justify-center p-1 md:p-4 text-center'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Dialog.Panel className='w-full md:w-[60%] transform overflow-hidden rounded-2xl bg-yellow-50 p-5 text-left align-middle shadow-xl transition-all'>
                      <Dialog.Title
                        as='h3'
                        className='text-[1.1rem] text-center text-green-500 text-opacity-80 font-semibold'
                      >
                        Your Payment of{" "}
                        <span className='text-black px-1 text-[1.2rem]'>
                          <span className='mr-1'>₹</span>
                          {disstatus ? newPrice.dicountedPrice : pprice.price - pprice.discount / 100 * pprice.price}
                        </span>{" "}
                        is Successful !
                      </Dialog.Title>
                      <div className='mt-2 md:p-5 md:py-5'>
                        <div className='flex justify-center'>
                          <img
                            src='/assets/images/success.gif'
                            alt='error'
                            className='w-[80px] h-[80px] rounded-full'
                          />
                        </div>
                        <div className='text-center py-2 font-bold tracking-wide'>
                          Thankyou for Purchasing Continuity{" "}
                          {continuitycounter + 1}
                        </div>
                        <div className='flex items-center justify-center'>
                          <button
                            onClick={closeThankyou}
                            className='inline-block bg-red-500 text-white px-6 rounded-md font-semibold text-sm hover:scale-95 transition-all py-[4px]'
                          >
                            CLOSE
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
        {openavoidchildtopurchase && <ChildNotPurchase closeavoidmodal={CloseavoidModal} />}
        {openimage && <ImageView image={imgurl} closemodal={closeimagemodal} />}
      </div>
    </>
  );
};

export default ProgramDetail;