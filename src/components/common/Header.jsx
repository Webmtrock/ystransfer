import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiEdit, BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { useDispatch} from "react-redux";
import { GetUserandChild } from "../../api_config/Auth_Services";
import { useEffect } from "react";
import { ParantEdit, ProfileID } from "../../redux/RoleSlice";
import { IoMdSettings } from "react-icons/io"
import { GrClose } from "react-icons/gr"
import Skeleton from "react-loading-skeleton";
import { ls } from "../../utilitis/SecureLocalStorage";


const Header = ({
  currentLocation,
  currentEventLocation,
  expertlocation,
  articleLocation,
  HealthpediaVideoCrruntLocation,
  WebThankyoulocation,
  runwhenReload
}) => {

  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false); //close and open modal when User is click onLogout Button  showing alert for logout
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }


  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    //for toggle hamburger menu
    setToggle(!toggle);
  };

  const handleLogout = () => {
    //Logout Dispatch function
    ls.clear();
    closeModal();
    navigate("/");
    toast("Logout Successfuly !", { type: "success", className: "success" });
    // window.location.reload();
  };

  const token = ls.get("token"); //For Logout login Button Condition

  const uId = ls.get("uId");

  //Manage Article Route 
  const handleRoutetoArticlepage = () => {
    navigate("/home-healthpedia")
  }

  //Manage Program Routes
  const handleRoutetoProgrampage = () => {
    navigate('/home-program')
  }

  //handle Events Route
  const handleRoutetoEventpage = () => {
    navigate('/home-webinar')
  }

  //handle Experts Route
  const handleRoutetoExpertpage = () => {
    navigate('/experts/ExpertListing')
  }

  //User Along With Child Switch Profile
  const [load, setLoad] = useState(false)

  const [showprofile, setShowprofile] = useState(false)
  const [toggelswitch, setToggleSwitch] = useState(false)

  const UserId = ls.get("uId")//UserId From LocalStorage
  
  //Get User Along With Child
  const [user, setUser] = useState([])
  const handelUserWithChild = async () => {
    if (!UserId) {
      return null
    } else {
      try {
        setLoad(true)
        const response = await GetUserandChild(UserId)
        if (response.status === true) {
          setUser(response.data)
        }
        setLoad(false)
      } catch (error) {
        setLoad(false)
      }
    }
  }

  useEffect(() => {
    handelUserWithChild()
  }, [runwhenReload == false || UserId])

  //Get User Along With Child 
  //User Along With Child Switch Profile

  //Switch Child Function
  const dispatch = useDispatch() //disptch Reducer Function 

  const handelSwitchChild = (item, pic) => {
    ls.save("switchname", item.fullName)
    ls.save("switchemail", item.emailId)
    ls.save("switchphoto", pic)
    ls.save("switchid", item.profileId)
    dispatch(ProfileID(item.profileId))
    setToggleSwitch(false)
    navigate("/")
    toast("Pateint Switched Success !", { type: "success", className: "success" })
  }

  const handelParantSwitch = (pic, name, email) => {
    ls.save("switchname", name)
    ls.save("switchemail", email)
    ls.save("switchphoto", pic)
    ls.save("switchid", "")
    dispatch(ProfileID(""))
    setToggleSwitch(false)
    navigate("/")
    toast("Parent Switched Success !", { type: "success", className: "success" })
  }


  const switchName = ls.get("switchname")
  const switchemail = ls.get("switchemail")
  const switchphoto = ls.get("switchphoto")
  //Switch Child Function

  //Edit To Store Data in Redux
  const handelEditParant = (user, pateint, pic, name, email) => {
    handelParantSwitch(pic, name, email)
    dispatch(ParantEdit(user))
    navigate('/account')
  }
  //Edit To Store Data in Redux

  //Login Event Fired here
  const handelLoginEventGA=()=>{
      // reactga.event({
      //   category: "Login",
      //   action: "Header Login button clicked",
      //   label: "Login Button", 
      // })
  }
  //Loging Event Fired here

  return (
    <>
      <div className='md:pb-5 sticky top-0 z-[99]'>
        <div className={`sticky top-0 z-[99] bg-black w-full'}`}>
          <div className='container h-[50px] md:h-[60px] justify-between px-2 md:px-5 flex items-center'>
            <div>
              <Link to={"/"}>
                <img
                  src='/assets/images/logo.png'
                  className='w-[110px] md:w-[170px] hover:scale-95 transition-all'
                  alt='error'
                />
              </Link>
            </div>
            <nav>
              <ul
                className={`md:flex ulIgnore parent hidden items-center text-[.8rem] space-x-6 font-semibold tracking-wide text-white text-opacity-90`}
              >
                {/*  Handle Program Route */}
                {
                  currentLocation ?
                    <li onClick={handleRoutetoProgrampage} className='listnone pb-[2.2px] relative cursor-pointer'>
                      <div className="md:hover:scale-125  hover:text-yellow-300 transition-all pb-[2px]">Programs</div>
                      <span className='inline-block h-[3px] w-full bg-[#F9D121] absolute'></span>
                    </li> :
                    <NavLink to={currentLocation || "/home-program"}>
                      <li className='relative  hover:text-yellow-300 listnone md:hover:scale-125 transition-all cursor-pointer pb-[2px]'>
                        Programs
                        <span className='absolute bottom-0 left-0 animate inline-block h-[2px] w-[60px] bg-gradient-to-tr invisible from-[#FFE575] to-[#F9D121]'></span>
                      </li>
                    </NavLink>
                }
                {/*  Handle Program Route */}
                {/* Handle Events Routes */}
                {
                  currentEventLocation || WebThankyoulocation ?
                    <li onClick={handleRoutetoEventpage} className='pb-[2.2px] listnone relative cursor-pointer'>
                      <div className="md:hover:scale-125  hover:text-yellow-300 transition-all pb-[2px]">Workshop</div>
                      <span className='inline-block h-[3px] w-full bg-[#F9D121] absolute'></span>
                    </li> :
                    <NavLink to={currentEventLocation || WebThankyoulocation || "/home-webinar"}>
                      <li className='relative  cursor-pointer pb-[2px] md:hover:scale-125 listnone hover:text-yellow-300 transition-all'>
                        Workshops
                        <span className='absolute bottom-0 left-0 animate inline-block h-[2px] w-[60px] bg-gradient-to-tr invisible from-[#FFE575] to-[#F9D121]'></span>
                      </li>
                    </NavLink>
                }
                {/* Handle Events Routes */}
                {/* Handle Expert Routes */}
                {
                  expertlocation ?
                    <li onClick={handleRoutetoExpertpage} className='pb-[2.2px] listnone relative cursor-pointer'>
                      <div className="md:hover:scale-125  hover:text-yellow-300 transition-all pb-[2px]">Experts</div>
                      <span className='inline-block h-[3px] w-full bg-[#F9D121] absolute'></span>
                    </li> :
                    <NavLink to={expertlocation || "/experts/ExpertListing"}>
                      <li className='relative  cursor-pointer pb-[2px] md:hover:scale-125 listnone hover:text-yellow-300 transition-all'>
                        Experts
                        <span className='absolute bottom-0 left-0 animate inline-block h-[2px] w-[60px] bg-gradient-to-tr invisible from-[#FFE575] to-[#F9D121]'></span>
                      </li>
                    </NavLink>
                }
                {/* Handle Expert Routes */}
                {/* Healthpedia Route Links */}
                {articleLocation || HealthpediaVideoCrruntLocation ?
                  <li onClick={handleRoutetoArticlepage} className='listnone pb-[2.2px] relative cursor-pointer'>
                    <div className="md:hover:scale-125  hover:text-yellow-300 transition-all pb-[2px]">Healthpedia</div>
                    <span className='inline-block h-[3px] w-full bg-[#F9D121] absolute'></span>
                  </li> :
                  <NavLink
                    to={
                      articleLocation ||
                      HealthpediaVideoCrruntLocation ||
                      "/home-healthpedia"
                    }
                  >
                    <li className='relative  cursor-pointer pb-[2px] listnone  md:hover:scale-125 hover:text-yellow-300 transition-all'>
                      Healthpedia
                      <span className='absolute bottom-0 left-0 animate inline-block h-[2px] w-[60px] bg-gradient-to-tr invisible from-[#FFE575] to-[#F9D121]'></span>
                    </li>
                  </NavLink>
                }

                <NavLink style={{display:"none"}} to={"https://yellowsquash.store"}>
                  <li className='relative  cursor-pointer pb-[2px] listnone  md:hover:scale-125 hover:text-yellow-300 transition-all'>
                    Store
                    <span className='absolute bottom-0 left-0 animate inline-block h-[2px] w-[60px] bg-gradient-to-tr invisible from-[#FFE575] to-[#F9D121]'></span>
                  </li>
                </NavLink>
              </ul>
            </nav>
            <div className='items-center flex md:space-x-8 space-x-2 justify-between'>
              {/* Child Profile With Parant is Here */}
              {currentLocation == "/check-out" ? null : <div className="md:relative">
                {/* User Setting is Here */}
                {
                  <div className={switchphoto && switchName && switchemail ? "block" : "hidden"}>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border border-white rounded-full p-[1px]">
                        <img src={switchphoto} alt='img' className='rounded-full w-full h-full' />
                      </div>
                      <div>
                        <div className='leading-tight font-semibold text-opacity-90 text-white tracking-wide text-xs md:block hidden'>{switchName}</div>
                        <div className='leading-tight font-semibold text-opacity-90 text-white tracking-wide text-xs block md:hidden'>{switchName?.substring(0, 6)}..</div>
                        <div className='text-blue-300 leading-tight tracking-wide text-xs md:block hidden'>{switchemail?.substring(0, 12)}..</div>
                      </div>
                      <div>
                        <IoMdSettings onClick={() => setToggleSwitch(true)} size={22} className="cursor-pointer hover:text-blue-600 transition-all text-blue-400" />
                      </div>
                    </div>
                  </div>
                }
                {/* User Setting is Here */}
                {load ? <div className={`${toggelswitch ? "scale-100 " : "scale-0"}  z-50 top-0 w-full right-0 md:w-[300px] h-screen md:h-[350px] absolute md:transform  rounded-md bg-white text-left md:align-middle Shadow2xl transition-all`}>
                  <GrClose size={20} className="absolute right-2 top-2 cursor-pointer" onClick={() => setToggleSwitch(false)} />
                  <div className="pt-8 px-4">
                    <Skeleton className="w-full mt-4 h-[40px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-[50%] mt-4 h-[20px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-full mt-4 h-[30px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-full mt-4 h-[40px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-[70%] mt-4 h-[25px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-[80%] mt-4 h-[35px] rounded-2xl" duration={.5} />
                  </div>
                  <div className="md:hidden block pt-8 px-4">
                    <Skeleton className="w-full mt-4 h-[40px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-[50%] mt-4 h-[20px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-full mt-4 h-[30px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-full mt-4 h-[40px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-[70%] mt-4 h-[25px] rounded-2xl" duration={.5} />
                    <Skeleton className="w-[80%] mt-4 h-[35px] rounded-2xl" duration={.5} />
                  </div>
                </div> :
                  <div className={`${toggelswitch ? "scale-100 " : "scale-0"} z-50 top-0 w-full right-0 md:w-auto h-screen md:h-[350px] overflow-y-scroll absolute md:transform  rounded-md bg-white text-left md:align-middle Shadow2xl transition-all`}>
                    <div className="relative">
                      <GrClose size={20} className="absolute right-2 top-2 cursor-pointer" onClick={() => setToggleSwitch(false)} />
                      <div className='flex items-center space-x-4 border-b border-black p-5 border-opacity-5'>
                        <div className='w-[70px] h-[70px] border rounded-full'>
                          <img src={user?.profilePicture ? user.profilePicture : user?.gender == "Male" ? "/assets/images/Male.png" : user?.gender == "FeMale" ? "/assets/images/femaile.png" : "/assets/images/femaile.png"} alt='img' className='rounded-full w-full h-full' />
                        </div>
                        <div>
                          <div className='leading-tight font-semibold text-opacity-90 text-black tracking-wide text-[1rem]'>{user?.fullName}</div>
                          <div className='text-blue-500 leading-tight tracking-wide text-[.9rem]'>{user?.email?.substring(0, 12)}..</div>
                          <button onClick={() => handelParantSwitch(user?.profilePicture ? user.profilePicture : user?.gender == "Male" ? "/assets/images/Male.png" : user?.gender == "FeMale" ? "/assets/images/femaile.png" : "/assets/images/femaile.png", user?.fullName, user?.email)} className='bg-blue-500 md:w-[150px] text-white tracking-wide px-5 py-[4px] rounded-[5px] shadow-sm cursor-pointer hover:scale-90 transition-all hover:bg-blue-700 text-xs'>Switch To Parant</button>
                        </div>
                        <div onClick={() => handelEditParant(user, user?.patientDetails, user?.profilePicture ? user.profilePicture : user?.gender == "Male" ? "/assets/images/Male.png" : user?.gender == "FeMale" ? "/assets/images/femaile.png" : "/assets/images/femaile.png", user?.fullName, user?.email)} className="relative group">
                          <BiEdit size={23} className="text-blue-500 mr-2 cursor-pointer" />
                          <span className="absolute group-hover:block hidden transition-all bg-black text-white text-[12px] px-3 tracking-wide py-[2px] rounded-2xl ">edit</span>
                        </div>
                      </div>
                      <div className='bg-gray-50'>
                        <div className='text-[1rem] text-black pl-5 text-center font-bold py-[4px] tracking-wide text-opacity-80'>SWITCH PATEINT'S</div>
                        <div className='space-y-3'>
                          {
                            user?.patientDetails?.map((item, ind) => (
                              <>
                                <div className='border-b justify-between pr-5 flex items-center'>
                                  <div className='flex items-center space-x-4 pb-[10px] pt-[5px] px-5'>
                                    <div className='w-[50px] h-[50px] border rounded-full'>
                                      <img src={item?.image ? item.image : item?.gender == "Male" ? "/assets/images/Male.png" : item?.gender == "FeMale" ? "/assets/images/femaile.png" : "/assets/images/femaile.png"} alt='img' className='w-full rounded-full h-full' />
                                    </div>
                                    <div>
                                      <div className='leading-tight font-normal text-black tracking-wide text-[.95rem]'>{item?.fullName}</div>
                                      <div className='text-gray-400 leading-tight tracking-wide text-[.85rem]'>{item?.emailId.substring(0, 12)}..</div>
                                    </div>
                                  </div>
                                  <button onClick={() => handelSwitchChild(item, item?.image ? item.image : item?.gender == "Male" ? "/assets/images/Male.png" : item?.gender == "FeMale" ? "/assets/images/femaile.png" : "/assets/images/Male.png")} className='bg-blue-500 text-white tracking-wide px-5 py-[4px] rounded-[5px] shadow-sm cursor-pointer hover:scale-90 transition-all hover:bg-blue-700 text-[.9rem]'>Switch</button>
                                </div>
                              </>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>}
              {/* Child Profile With Parant is Here  */}
              <div>
                {/* Overlay When User is Clicked to Switch Profilce */}
                <div onClick={() => setShowprofile(false)} className={`top-0 left-0 w-full h-full bg-black z-10 bg-opacity-30 ${showprofile ? "fixed" : null}`}></div>
                {/* Overlay When User is Clicked to Switch Profilce */}
                {token ? (
                  <button
                    onClick={openModal}
                    className='cursor-pointer flex  text-black text-xs md:text-sm text-opacity-90 items-center bg-yellow-300 pl-2 rounded-2xl hover:scale-95 transition-all '
                  >
                    <BiLogOutCircle size={18} className="mr-1" />
                    <span
                      className='pr-2 md:pr-4 md:pl-2 cursor-pointer py-[5px] md:text-[1.1rem] text-[.8rem] md:py-[7px] font-bold tracking-wide'
                      onClick={openModal}
                    >
                      Logout
                    </span>
                  </button>
                ) : (
                  <Link to={"/login"}>
                    <button onClick={handelLoginEventGA} className='animate-pulse hover:animate-none flex text-black text-xs md:text-sm  items-center bg-yellow-300 px-2 md:px-4 rounded-2xl hover:scale-95 transition-all'>
                      <span className='pr-2 text-black  py-[6px] md:px-3 md:py-[7px]  font-bold text-[.8rem] tracking-wide md:text-[1.1rem]'>
                        Login
                      </span>
                      <BiLogInCircle size={18} />
                    </button>
                  </Link>
                )}
              </div>
              {uId&&<div className='relative'>
                <div className=' cursor-pointer'>
                  {toggle === false ? (
                    <GiHamburgerMenu
                      size={20}
                      className={`text-white hover:scale-110`}
                      onClick={handleToggle}
                    />
                  ) : (
                    <MdClose
                      className={`text-white hover:scale-110`}
                      onClick={handleToggle}
                      size={20}
                    />
                  )}
                </div>
                {/* OnClick Navbar Show is Here */}
                <div className='absolute top-[100%] pt-3 right-0'>
                  <div>
                    <div
                      className={`${toggle ? "scale-100 transition-all" : "scale-0 h-0"
                        } z-[9999]  relative  hamburgerul text-[1rem] w-[200px] bg-yellow-50  shadow-2xl border rounded-md inline-block`}
                    >
                     
                        <>
                          <div>
                            <Link to={'/my_program'} className='px-5 rounded-md block hover:shadow-inner py-[10px] transition-all cursor-pointer hover:bg-black text-black hover:text-yellow-400'>
                              My Program
                            </Link>
                          </div>
                          <div className='px-5 rounded-md block hover:shadow-inner py-[10px] transition-all cursor-pointer hover:bg-black text-black hover:text-yellow-400'>
                            <Link to={'/my_webinar'}>
                              My Webinar
                            </Link>
                          </div>
                        </>
                    </div>
                  </div>
                </div>
                {/* OnClick Navbar Show is Here */}
              </div>}
            </div>
          </div>
        </div>
        {toggelswitch && (
          <div
            onClick={() => setToggleSwitch(false)}
            className='h-screen w-full absolute top-0 left-0 bg-black bg-opacity-40  cursor-pointer'
          ></div>
        )}
        {toggle && (
          <div
            onClick={() => setToggle(false)}
            className='h-screen w-full absolute top-0 left-0 bg-black bg-opacity-40  cursor-pointer'
          ></div>
        )}
        <>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-[99]' onClose={closeModal}>
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
                        Are you want to Logout ?
                      </Dialog.Title>

                      <div className='mt-4 pl-5 pr-3'>
                        <div className='flex items-center justify-between'>
                          <button
                            onClick={closeModal}
                            className='inline-block bg-red-500 text-white px-6 rounded-md font-semibold text-sm hover:scale-95 transition-all py-[4px]'
                          >
                            NO
                          </button>
                          <button
                            onClick={handleLogout}
                            className='inline-block gradient text-black px-8 font-semibold rounded-md text-sm hover:scale-95 transition-all py-[4px]'
                          >
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
      </div>
    </>
  );
};

export default Header;
