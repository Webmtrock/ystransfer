import React, { useState } from "react";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineEye } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { updateUserPassword } from "../../api_config/Auth_Services";
import { Loader } from "../../utilitis/Loader";
import { ls } from "../../utilitis/SecureLocalStorage";

const CreateNewPassword = () => {
  const [Load, setLoad] = useState(false); //make state true if req is send and stope if res is reiceved

  const userId = ls.get("userid"); //Get USER-ID to change User password
  const [hide, setHide] = useState(false); //state for Hide and show Password
  const handleHide = () => {
    //function for Toggle hide and show password
    setHide(!hide);
  };

  const [hide2, setHide2] = useState(false); //state for Hide and show Password
  const handleHide2 = () => {
    //function for Toggle hide and show password
    setHide2(!hide2);
  };

  //Capture Password Filled by User
  const [newpass, setNewpass] = useState({
    NewPassword: "",
    confirmPassword: "",
  });

  const handleNewPassword = (e) => {
    setNewpass({ ...newpass, [e.target.name]: e.target.value });
  };
  //Capture Password Filled by User

  const navigate = useNavigate(); //Navigate To next Page

  //Data which is send in body via api to change User Password
  const data = {
    userId: userId,
    password: newpass.NewPassword,
  };
  //Data which is send in body via api to change User Password

  const PassValidate =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,12}$/; //For Password Validation

  const GenarateNewPassword = async () => {
    //Validatipon Plus submition of New Password Data
    if (!newpass.NewPassword) {
      toast("Enter password !", { type: "error", className: "error" });
    } else if (
      !newpass.NewPassword ||
      PassValidate.test(newpass.NewPassword) == false
    ) {
      toast(
        "Password contain one digit from 1 to 9, One lowercase letter, One uppercase letter, One special character, No space, And it must be 8-12 characters long.",
        { type: "error", className: "error", autoClose: 10000 }
      );
    } else if (!newpass.confirmPassword) {
      toast("Enter confirm password !", { type: "error", className: "error" });
    } else if (newpass.NewPassword !== newpass.confirmPassword) {
      toast("Password not matching !", { type: "error", className: "error" });
    } else {
      try {
        setLoad(true);
        const response = await updateUserPassword(data);
        if (response.status == true) {
          toast("Password changed successfuly !", {
            type: "success",
            className: "success",
          });
          navigate("/login");
        } else {
          setLoad(false);
          toast(Response.message, { type: "error", className: "error" });
        }
      } catch (error) {
        setLoad(false);
      }
    }
  };

  return (
    <>
      <div className='relative h-screen w-full pt-10 space-y-5 container'>
        <Link to={"/reset-password-otp"}>
          <BsArrowLeft size={25} className='absolute left-5' />
        </Link>
        <img src='/assets/images/logo.png' alt='erorr' className='mx-auto' />
        <div className='absolute shadow-xl rounded-xl px-8 py-5 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[35%] h-auto border'>
          <div className='text-xl text-black'>Create New Password</div>
          <div className='space-y-4 pt-5 pb-3'>
            <div className='w-full flex items-center border border-black pr-4 border-opacity-30 text-sm placeholder:text-xs  rounded-md shadow-sm'>
              <input
                type={hide ? "text" : "password"}
                onChange={handleNewPassword}
                value={newpass.NewPassword}
                onKeyDown={(e) => e.key === "Enter" && GenarateNewPassword()}
                name='NewPassword'
                placeholder='New Password Example:- Xyz@123# , Abc@1234'
                className='w-full placeholder:text-xs rounded-md px-2 py-[5px] outline-none'
              />
              {hide ? (
                <HiOutlineEye
                  size={20}
                  onChange={handleNewPassword}
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
            <div className='w-full flex items-center border border-black pr-4 border-opacity-30 text-sm placeholder:text-xs  rounded-md shadow-sm'>
              <input
              type={hide2?"text":"password"}
                onChange={handleNewPassword}
                value={newpass.confirmPassword}
                name='confirmPassword'
                placeholder='Confirm Password'
                className='w-full placeholder:text-xs rounded-md px-2 py-[5px] outline-none'
                onKeyDown={(e) => e.key === "Enter" && GenarateNewPassword()}
              />
              {hide2 ? (
                <HiOutlineEye
                  size={20}
                  className='text-black text-opacity-80 cursor-pointer'
                  onClick={handleHide2}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  className='text-black text-opacity-80 cursor-pointer'
                  onClick={handleHide2}
                />
              )}
            </div>
          </div>
          <div className='pt-5'>
            <button
              onClick={GenarateNewPassword}
              className='gradient w-full rounded-md hover:scale-95 transition-all py-[3px]'
            >
              Reset and Sign In
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <Loader show={Load} />
    </>
  );
};

export default CreateNewPassword;
