import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import { HiOutlineEye } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsFillTelephoneFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { LoginApi } from "../../api_config/Auth_Services";
import { Loader } from "../../utilitis/Loader";
import { useDispatch } from "react-redux";
import { LoginPaymentStatus, UserRole } from "../../redux/RoleSlice";
import {RiLockPasswordFill} from "react-icons/ri"
import { ls } from "../../utilitis/SecureLocalStorage";


const Login = () => {
  const navigate = useNavigate(); //Navigating To The Route After login is successful

  const dispatch = useDispatch(); //dispatch Redux Function this hook is provided by redux

  const [Load, setLoad] = useState(false); //Make state true if req is send and false if req is completed

  const [hide, setHide] = useState(false); //state for Hide and show Password
  const handleHide = () => {
    //function for Toggle hide and show password
    setHide(!hide);
  };

  //Capture Phone Number and Password value filled by user
  const [loginData, setLoginData] = useState({
    phonenumberOremail: "",
    PassWord: "",
  });

  const handleChange = (e) => {
    //get Value on OnChange
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  //Capture Phone Number and Password value filled by user

  //This data is send in body of api to validate the existing user
  const data = {
    phone: loginData.phonenumberOremail,
    password: loginData.PassWord,
  };

  const handleLogin = async () => {
    //Handle Login function
    if (!loginData.phonenumberOremail) {
      toast("Enter phone number !", { type: "error", className: "error" });
    } else if (loginData.phonenumberOremail.length < 10) {
      toast("Enter valid number !", { type: "error", className: "error" });
    } else if (loginData.phonenumberOremail.length > 10) {
      toast("phone number is not greater than 10 !", {
        type: "error",
        className: "error",
      });
    } else if (!loginData.PassWord) {
      toast("Enter password !", { type: "error", className: "error" });
    } else {
      try {
        setLoad(true);
        const response = await LoginApi(data);
        if (response.status == true) {
          toast("login Sucessfuly !", {
            type: "success",
            className: "success",
          });
          navigate("/");
          dispatch(UserRole(response.data.role));
          dispatch(LoginPaymentStatus(true))
          ls.save("uId", response.data._id);
          ls.save("UserRole", response.data.role);
          ls.save("token", response.token);
          ls.save("phone", response.data.phone);
          ls.save("email", response.data.email);
          ls.save("fullname", response.data.fullName);
          ls.save("switchprofile",true)
          ls.save("logindate", new Date());
        } else {
          toast(response.message, { type: "error", className: "error" });
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
  };

  //Handel Google A Signup Button Event
  const handelsignupEventGA=()=>{
    // reactga.event({
    //   category: "Login page signup button",
    //   action: "Login page signup button clicked",
    //   label: "Signup Button", 
    // })
  } 
  //Handel Google A Signup Button Event

  return (
    <>
      <div className='relative h-screen w-full pt-10 space-y-5 container'>
        <Link to={"/"}>
          <BsArrowLeft size={25} className='absolute left-5 md:left-0' />
        </Link>
        <img src='/assets/images/logo.png' alt='erorr' className='md:block hidden mx-auto' />
        <div className='grid grid-cols-12 items-center md:space-x-6 absolute md:shadow-xl md:rounded-[2rem] px-2 pr-6 py-5 top-[40%] md:top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[70%] md:h-[70%] md:border md:border-opacity-25'>
          <div className="col-span-12 md:hidden block pb-6">
            <img src='/assets/images/logo.png' alt='erorr' className='mx-auto' />
          </div>
            <div className="col-span-6 hidden md:block">
              <div className="space-y-6">
                <div className="grid grid-cols-12">
                   <div className="col-span-9">
                      <img src="/assets/images/loginimage2.svg" className="w-full"/>
                   </div>
                   <div className="col-span-3"></div>
                </div>
                <div className="grid grid-cols-12 pt-5">
                  <div className="col-span-2"></div>
                   <div className="col-span-10">
                      <img src="/assets/images/loginimage.svg"/>
                   </div>
                </div>
                <div className="text-center font-semibold pt-2"><span className="border-b-4 text-[1.1rem] tracking-wide  text-[#444] border-[#f9d121]">Gate</span>way to wellness...</div>
              </div>   
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className='text-2xl text-[#444] font-semibold text-center'>Login</div>
              <div className='space-y-4 pt-5 '>
                <div className='w-full flex items-center border-b border-black border-opacity-30 text-sm placeholder:text-xs shadow-sm '>
                  <BsFillTelephoneFill size={20} className="text-[#444] text-opacity-50"/>
                  <input
                    type={"number"}
                    name='phonenumberOremail'
                    value={loginData.phonenumberOremail}
                    onChange={(e) => handleChange(e)}
                    placeholder='Whatsapp Number'
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className='w-full rounded-md placeholder:text-sm placeholder:text-black placeholder:text-opacity-70 px-2 py-[5px] outline-none'
                  />
                </div>
                <div className='w-full  flex items-center border-b border-black pr-4 border-opacity-30 text-sm placeholder:text-xs shadow-sm'>
                  <RiLockPasswordFill  size={22}  className="text-[#444] text-opacity-50"/>
                  <input
                    type={hide ? "text" : "password"}
                    name='PassWord'
                    value={loginData.PassWord}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder='Password'
                    className='w-full placeholder:text-sm placeholder:text-black placeholder:text-opacity-70 rounded-md px-2 py-[5px] outline-none'
                  />
                  {hide ? (
                    <HiOutlineEye
                      size={20}
                      className='text-black text-opacity-80 cursor-pointer'
                      onClick={handleHide}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      size={20}
                      className='text-black text-opacity-80 cursor-pointer'
                      onClick={handleHide}
                    />
                  )}
                </div>
              </div>
              <div className='flex pt-3 items-center justify-between'>
                <Link to='/reset-password'>
                  <span className='text-[#0FA654] hover:scale-95 transition-all text-[17px] tracking-wider'>
                    Forgot Password?
                  </span>
                </Link>
              </div>
              <div className='pt-5'>
                <button
                  onClick={handleLogin}
                  className='gradient hover:bg-black w-full rounded-md hover:scale-95 transition-all py-[6px] font-semibold tracking-wide'
                >
                  Login
                </button>
              </div>
              <div>
                <div className='pt-5'>
                  <div className='text-center text-lg font-semibold text-opacity-70 tracking-wider text-black'>
                    Signup as a user?{" "}
                    <Link to={"/verify-phone"}>
                      <span onClick={handelsignupEventGA} className='text-[#0FA654] cursor-pointer hover:scale-95 transition-all'>
                        Sign Up
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <Loader show={Load} />
      <Footer />
    </>
  );
};

export default Login;
