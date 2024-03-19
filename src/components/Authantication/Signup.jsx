import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineEye } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { SignupApi } from "../../api_config/Auth_Services";
import { Loader } from "../../utilitis/Loader";
import { UserRole } from "../../redux/RoleSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ls } from "../../utilitis/SecureLocalStorage";

const Signup = () => {
  const dispatch = useDispatch(); //Dispatch redux function
  const [term, setTerm] = useState(false); //validate terms and condition is accepted or not
  const [Load, setLoad] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState("");
  const navigate = useNavigate();
  const phoneNumber = ls.get("phoneNumber"); //Geting Phone Number by LocalStorage

  const [signupdata, setSignupdata] = useState(
    //Targeting Value By Name
    {
      FullName: "",
      EmailID: "",
      PassWord: "",
      ConfirmPassWord: "",
    }
  );
  const handleSignupValue = (e) => {
    //Geting Value onChange
    setSignupdata({ ...signupdata, [e.target.name]: e.target.value });
  };

  const [hide, setHide] = useState(false); //state for Hide and show Password
  const handleHide = () => {
    //function for Toggle hide and show password
    setHide(!hide);
  };
  //Signup Api Intigiration

  //Hide and Show Confirm PassWord 
  const [chide,setChide]=useState(false)
  //Hide and Show Confirm Password

  const data = {
    fullName: signupdata.FullName,
    email: signupdata.EmailID,
    password: signupdata.PassWord,
    phone: phoneNumber,
  };

  useEffect(() => {
    setTimeout(() => setPasswordValidate(""), 4000);
  }, [passwordValidate]);

  const PassValidate =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,12}$/; //For Password Validation

  const regex =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/; //For Email Validation
  const HandleSignup = async () => {
    if (!signupdata.FullName || !signupdata.EmailID || !signupdata.PassWord) {
      toast("Fill complete details", { type: "error", className: "error" });
    } else if (
      !signupdata.EmailID ||
      regex.test(signupdata.EmailID) === false
    ) {
      toast("Email is not valid", { type: "error", className: "error" });
    } else if (
      !signupdata.PassWord ||
      PassValidate.test(signupdata.PassWord) == false
    ) {
      setPasswordValidate(
        "Password must contain one digit from 1 to 9, One lowercase letter, One uppercase letter, One special character, No space, And it must be 8-12 characters long."
      );
    } else if (signupdata.PassWord !== signupdata.ConfirmPassWord) {
      toast("Password not matching", { type: "error", className: "error" });
    } else if (!term) {
      toast("Except terms & condition !", {
        type: "error",
        className: "error",
      });
    } else {
      try {
        setLoad(true);
        const response = await SignupApi(data);
        if (response.status == true) {
          toast(response.message, { type: "success", className: "success" });
          navigate("/");
          dispatch(UserRole(response.data.role));
          ls.save("uId", response.data._id);
          ls.save("UserRole", response.data.role);
          ls.save("token", response.token);
          ls.save("phone", response.data.phone);
          ls.save("email", response.data.email);
          ls.save("fullname", response.data.fullName);
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

  //Signup Details Api

  return (
    <>
      <div className='relative h-screen w-full pt-10 space-y-5 container'>
        <Link to={"/otp-verify"}>
          <BsArrowLeft size={25} className='absolute left-5' />
        </Link>
        <img
          src='/assets/images/logo.png'
          alt='erorr'
          className='mx-auto -translate-y-8'
        />
        <div className='absolute shadow-xl rounded-xl px-8 py-5 top-[50%]  left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[35%] h-auto border'>
          <div className='text-xl text-black'>Fill Basic Details</div>
          <div className='space-y-4 pt-5 pb-3'>
            <div className='w-full  border border-black border-opacity-30 text-sm placeholder:text-xs  rounded-md shadow-sm '>
              <input
                onChange={(e) => handleSignupValue(e)}
                type={"text"}
                onKeyDown={(e) => e.key === "Enter" && HandleSignup()}
                value={signupdata.FullName}
                name='FullName'
                placeholder='Full Name'
                className='w-full rounded-md placeholder:text-xs px-2 py-[5px] outline-none'
              />
            </div>
            <div className='w-full  border border-black border-opacity-30 text-sm placeholder:text-xs  rounded-md shadow-sm '>
              <input
                onChange={(e) => handleSignupValue(e)}
                onKeyDown={(e) => e.key === "Enter" && HandleSignup()}
                type={"email"}
                value={signupdata.EmailID}
                name='EmailID'
                placeholder='Email id'
                className='w-full rounded-md placeholder:text-xs px-2 py-[5px] outline-none'
              />
            </div>
            <div className='w-full flex items-center border border-black pr-4 border-opacity-30 text-sm placeholder:text-xs  rounded-md shadow-sm'>
              <input
                type={hide ? "text" : "password"}
                onChange={(e) => handleSignupValue(e)}
                onKeyDown={(e) => e.key === "Enter" && HandleSignup()}
                value={signupdata.PassWord}
                name='PassWord'
                placeholder='Password Example:  Xyz@123 , Abc@1234#'
                className='w-full placeholder:text-xs rounded-md px-2 py-[5px] outline-none'
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
            <div className='text-red-500 tracking-wide text-[13px]'>
              {passwordValidate}
            </div>
            <div className='w-full flex items-center border border-black pr-4 border-opacity-30 text-sm placeholder:text-xs  rounded-md shadow-sm'>
              <input
                type={chide?"text":"password"}
                value={signupdata.ConfirmPassWord}
                onChange={(e) => handleSignupValue(e)}
                onKeyDown={(e) => e.key === "Enter" && HandleSignup()}
                name='ConfirmPassWord'
                placeholder='Confirm Password'
                className='w-full placeholder:text-xs rounded-md px-2 py-[5px] outline-none'
              />
              {chide ? (
                <HiOutlineEye
                  size={20}
                  className='text-black text-opacity-80 cursor-pointer'
                  onClick={()=>setChide(!chide)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  className='text-black text-opacity-80 cursor-pointer'
                  onClick={()=>setChide(!chide)}
                />
              )}
            </div>
            <div className='flex items-center space-x-2'>
              <input
                type={"checkbox"}
                value={term}
                onChange={(e) => setTerm(e.target.checked)}
                className='accent-[#0FA654] scale-125 cursor-pointer'
                onKeyDown={(e) => e.key === "Enter" && HandleSignup()}
              />
              <div className='text-sm'>
                I agree to all{" "}
                <a
                  href={"/assets/files/ys-terms-conditions.pdf"}
                  className='text-green-500'
                  download
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
          <div className='pt-5'>
            <button
              onClick={HandleSignup}
              className='gradient w-full rounded-md hover:scale-95 transition-all py-[3px]'
            >
              SignUp
            </button>
          </div>

          <div>
            <div className='pt-5 space-y-2'>
              <div className='text-center text-lg tracking-wider text-[#939393] text-opacity-80'>
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span className='text-[#0FA654] cursor-pointer'>Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Loader show={Load} />
    </>
  );
};

export default Signup;
