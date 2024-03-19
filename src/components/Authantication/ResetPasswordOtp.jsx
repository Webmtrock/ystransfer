import React, { useState } from "react";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsPencil } from "react-icons/bs";
import OTPInput from "otp-input-react";
import { ForGotOtp, ForgotOtpEnter } from "../../api_config/Auth_Services";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCallback } from "react";
import { Loader } from "../../utilitis/Loader";
import { ls } from "../../utilitis/SecureLocalStorage";

const ResetPasswordOtp = () => {
  const [Load, setLoad] = useState(false);
  const navigate = useNavigate(); //Navigation Function for Automatic Routing From One Page to Another
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
      setTimer(60);
    }
  };

  const PhoneNumber = ls.get("phoneNumber");

  const [OTP, setOTP] = useState(""); //Targeting Otp Value

  //Enterd forgot Otp async OnClick Function
  const data = {
    mobile: PhoneNumber,
    otp: OTP,
  };
  const EnterdForgotOtp = async () => {
    if (!OTP) {
      toast("Enter otp", { type: "error", className: "error" });
    } else {
      try {
        setLoad(true);
        const response = await ForgotOtpEnter(data);
        if (response.message == "OTP verified successfully") {
          toast(response.message, { type: "success", className: "success" });
          navigate("/create-new-password");
          ls.save("userid", response.userId);
        } else {
          toast(response.message);
        }
        setLoad(false);
      } catch (error) {
        toast("Ops! Some error occured", { type: "error", className: "error" });
        setLoad(false);
      }
    }
  };
  //Enterd forgot Otp async OnClick Function

  const phonenum = ls.get("phoneNumber"); //Geting Phone Number in Local Stortage
  const phonenumber = { phone: phonenum };
  const HandleOtp = async () => {
    //Send Otp onClick Function Is Trigerd
    try {
      setLoad(true);
      const response = await ForGotOtp(phonenumber);
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
        <Link to={"/reset-password"}>
          <BsArrowLeft size={25} className='absolute' />
        </Link>
        <img src='/assets/images/logo.png' alt='erorr' className='mx-auto' />
        <div className='absolute shadow-xl rounded-xl px-4 py-5 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] md:w-[35%] w-[90%] md:h-[50%] border'>
          <div className='text-xl text-black'>Enter Otp</div>
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
                onKeyDown={(e) => e.key === "Enter" && EnterdForgotOtp()}
              />
            </div>
          </div>
          <div className='pt-5'>
            <button
              onClick={EnterdForgotOtp}
              className='gradient w-full rounded-md hover:scale-95 transition-all py-[3px]'
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
    </>
  );
};

export default ResetPasswordOtp;
