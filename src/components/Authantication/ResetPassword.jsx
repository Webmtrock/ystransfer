import React, { useState } from "react";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { ForGotOtp } from "../../api_config/Auth_Services";
import { toast } from "react-toastify";
import { Loader } from "../../utilitis/Loader";
import { ls } from "../../utilitis/SecureLocalStorage";

const ResetPassword = () => {
  const navigate = useNavigate(); //Navigating the Routes From one Page To another
  const [phone, setPhone] = useState(""); //Capture PhoneNumber value to verify before Reset Password
  const [Load, setLoad] = useState(false); //hit api if req is send and stop if res is recieved

  const data = {
    //Data to post via APi
    phone: phone,
  };
  const HandleForgotOtp = async () => {
    //Send Otp onClick Function Is Trigerd
    if (!phone) {
      toast("Enter phone number", { type: "error", className: "error" });
    } else if (phone.length > 10) {
      toast("Phone number not greater than 10", {
        type: "error",
        className: "error",
      });
    } else if (phone.length < 10) {
      toast("Phone number not smaller than 10", {
        type: "error",
        className: "error",
      });
    } else {
      try {
        setLoad(true);
        const response = await ForGotOtp(data);
        if (response.status == true) {
          toast("Otp send successfuly", {
            type: "success",
            className: "success",
          });
          navigate("/reset-password-otp");
        } else {
          toast(response.message, { type: "error", className: "error" });
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
        toast("Ops! Some error occured", { type: "error", className: "error" });
      }
    }

    ls.save("phoneNumber", phone); //Saveing Phone Number in Local Storage
  };

  return (
    <>
      <div className='relative h-screen w-full pt-10 space-y-5 container'>
        <Link to={"/login"}>
          <BsArrowLeft size={25} className='absolute left-5' />
        </Link>
        <img src='/assets/images/logo.png' alt='erorr' className='mx-auto' />
        <div className='absolute shadow-xl rounded-xl px-8 py-5 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[35%] md:h-[42%] border'>
          <div className='text-xl md:text-xl text-black'>
            Enter Registered Whatsapp Number
          </div>
          <div className='space-y-4 pt-5 pb-3'>
            <div className='text-xs tracking-wide'>
              Enter your registered phone number associated with your
              YellowSquash account
            </div>
            <div className='w-full  border border-black border-opacity-30 text-sm placeholder:text-xs  rounded-md shadow-sm '>
              <input
                type={"number"}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && HandleForgotOtp()}
                value={phone}
                name='PhoneNumber'
                placeholder='Registered Whatsapp Number'
                className='w-full rounded-md placeholder:text-xs px-2 py-[5px] outline-none'
              />
            </div>
          </div>
          <div className='pt-5'>
            <button
              onClick={HandleForgotOtp}
              className='gradient w-full rounded-md hover:scale-95 transition-all py-[3px]'
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <Loader show={Load} />
    </>
  );
};

export default ResetPassword;
