import React, { useState } from "react";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsPencil } from "react-icons/bs";
import OTPInput from "otp-input-react";
import { OtpEnter, OtpPhoneVerify } from "../../api_config/Auth_Services";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCallback } from "react";
import { Loader } from "../../utilitis/Loader";
import ConnectionStatus from "../../error/ConnectionStatus";
import { ls } from "../../utilitis/SecureLocalStorage";

const OtpVerify = () => {
  const [Load, setLoad] = useState(false); //make state true if req is send to api & make it true if response is recieved

  const navigate = useNavigate(); //Navigation Function for Automatic Routing From One Page to Another

  //State for Resend otp after 30 seconds is completed
  const [timer, setTimer] = useState(30);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    //Timer Start Automatically When Page First time Load
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = function () {
    //Restart Timer Function
    if (!timer) {
      setTimer(30);
    }
  };

  const PhoneNumber = ls.get("phoneNumber"); //Recieved OTP from localStorage

  const [OTP, setOTP] = useState(""); //Targeting Otp Value

  //Enterd Otp async OnClick Function
  const data = {
    mobile: PhoneNumber,
    otp: OTP,
  };
  const handleEnterdOtp = async () => {
    if (!OTP) {
      toast("Enter otp", { type: "error", className: "error" });
    } else {
      try {
        setLoad(true);
        const response = await OtpEnter(data);
        if (response.status===true) {
          toast( "OTP verified successfully", { type: "success", className: "success" });
          navigate("/signup");
        } else {
          toast(response.message);
        }
        setLoad(false);
      } catch (error) {
        toast("Oops! Some error occured", {
          type: "error",
          className: "error",
        });
        setLoad(false);
      }
    }
  };
  //Enterd Otp async OnClick Function

  const phonenum = ls.get("phoneNumber"); //Geting Phone Number in Local Stortage
  const phonenumber = { phone: phonenum };
  const HandleOtp = async () => {
    //Send Otp onClick Function Is Trigerd
    try {
      setLoad(true);
      const response = await OtpPhoneVerify(phonenumber);
      if (response.status == true) {
        toast("Otp send successfuly", {
          type: "success",
          className: "success",
        });
      } else {
        toast(response.message, { type: "error", className: "error" });
      }
      setLoad(false);
    } catch (error) {
      toast("Ops! Some error occured", { type: "error", className: "error" });
      setLoad(false);
    }
  };
  //Api Function For Otp Sending on Mobile Number

  const HandelResendOtp = () => {
    //Managing OnClick Function For Resend Otp And Restatart Timer again
    HandleOtp();
    resetTimer();
  };

  return (
    <>
      <div className='relative h-screen w-full pt-10 space-y-5 container'>
        <Link to={"/verify-phone"}>
          <BsArrowLeft size={25} className='absolute left-4' />
        </Link>
        <img src='/assets/images/logo.png' alt='erorr' className='mx-auto md:block hidden' />
        <div className='absolute md:shadow-xl md:rounded-xl px-4 py-5 top-[40%] md:top-[50%]  left-[50%] translate-y-[-50%] translate-x-[-50%] md:w-[35%] w-[90%] md:h-[50%] md:border'>
        <img src='/assets/images/logo.png' alt='erorr' className='mx-auto md:hidden block' />
          <div className='text-xl text-center text-[#444] font-semibold pt-6 md:pt-0'>Enter Otp</div>
          <div className='space-y-1 pt-5 pb-3'>
            <div className='text-sm tracking-wide text-center'>
              Please enter the 6-digit OTP sent to your phone number
            </div>
            <span className='flex items-center justify-center text-sm'>
              <span className='pr-1'>{PhoneNumber}</span>
              <Link to='/verify-phone'>
                <BsPencil size={18} className='text-[#0DBF5F] cursor-pointer' />
              </Link>
            </span>
            <div className='w-full text-sm'>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                inputClassName={"border-b custom border-black outline-none"}
                OTPLength={6}
                otpType='number'
                disabled={false}
                onKeyDown={(e) => e.key == "Enter" && handleEnterdOtp()}
              />
            </div>
          </div>
          <div className='pt-5'>
            <button
              onClick={handleEnterdOtp}
              className='gradient w-full rounded-md hover:scale-95 transition-all py-[6px]'
            >
              Verify
            </button>
          </div>
          <div className='pt-5'>
            <div className='flex items-center space-x-1'>
              <div className='tracking-wide'>Didn't Recieved Otp?</div>
              {timer > 0 ? (
                <div className='text-[#0DBF5F] tracking-wide'>
                  {timer} Seconds
                </div>
              ) : (
                <div
                  onClick={HandelResendOtp}
                  className='cursor-pointer text-[#0DBF5F] tracking-wide'
                >
                  Resend Otp
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Loader show={Load} />
      <ConnectionStatus />
    </>
  );
};

export default OtpVerify;
