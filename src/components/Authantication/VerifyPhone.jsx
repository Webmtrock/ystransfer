import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsFillTelephoneFill } from "react-icons/bs";
import { OtpPhoneVerify } from "../../api_config/Auth_Services";
import { toast } from "react-toastify";
import { Loader } from "../../utilitis/Loader";
import { ls } from "../../utilitis/SecureLocalStorage";
import ReCAPTCHA from "react-google-recaptcha";

const VerifyPhone = () => {
  const [phoneValid, setPhoneValid] = useState(""); //Validate phone Number is Valid or Not
  const [Load, setLoad] = useState(false);
  const navigate = useNavigate(); //Navigation Function for Automatic Routing From One Page to Another

  const [phone, setPhone] = useState("");
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => setPhoneValid(""), 4000); //Make Empty Valid phone number state after 4 second
  }, [phoneValid]);

  //Handel Google ReCaptcha 
  const [captcha,setCaptcha]=useState(false)
  const handelCaptchaSuccessfull=(state)=>{
     if(!state){
       setCaptcha(false)
     }else{
      setCaptcha(true)
     }
  }
  //Handel Google ReCaptcha

  //Api Function For Otp Sending on Mobile Number
  const data = { phone: phone };
  const HandleOtp = async () => {
    //Send Otp onClick Function Is Trigerd
    if (!phone) {
      setPhoneValid("Enter phone number !", {
        type: "error",
        className: "error",
      });
    } else if (phone.length > 10) {
      setPhoneValid("Phone number not greater than 10 !", {
        type: "error",
        className: "error",
      });
    } else if (phone.length < 10) {
      setPhoneValid("Enter valid number !", {
        type: "error",
        className: "error",
      });
    }else if(!captcha){
     toast("Before you proceed, please complete the captcha below!",{type:'error',className:'error',autoClose:5000})
    } else {
      try {
        setLoad(true);
        const response = await OtpPhoneVerify(data);
        if (response.status == true) {
          toast("Otp send successfuly", {
            type: "success",
            className: "success",
          });
          navigate("/otp-verify");
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
  //Api Function For Otp Sending on Mobile Number

  return (
    <>
      <div className='relative h-screen w-full pt-10 space-y-5 container'>
        <Link to={"/login"}>
          <BsArrowLeft size={25} className='absolute left-5 md:left-0' />
        </Link>
        <img src='/assets/images/logo.png' alt='erorr' className='mx-auto hidden md:block' />
        <div className='absolute md:shadow-xl md:rounded-xl px-8 py-5 top-[40%] md:top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[90%] md:w-[35%] md:h-auto md:border'>
           <img src='/assets/images/logo.png' alt='erorr' className='mx-auto md:hidden block' />
          <div className='text-xl text-[#444] pt-6 md:pt-0 text-center'>Verify Phone Number</div>
          <div className='space-y-2 pt-5'>
            <div className='w-full flex items-center border-b border-black border-opacity-30 text-sm placeholder:text-xs  shadow-sm '>
              <BsFillTelephoneFill className="text-[#444] text-opacity-50" size={20} />
              <input
                type={"number"}
                value={phone}
                name='phonenumber'
                onChange={(e) => handlePhone(e)}
                onKeyDown={(e) => e.key === "Enter" && HandleOtp()}
                placeholder='Enter Whatsapp Number'
                className='w-full rounded-md placeholder:text-sm  px-2 py-[5px] outline-none'
              />
            </div>
            <div className='text-red-500 text-[13px]'>{phoneValid}</div>

            {/* ReCaptcha is Here I am Not a Robot By Google */}
            <div className="pt-4">
              <ReCAPTCHA
                  sitekey={process.env.REACT_APP_GOOGLE_SITE_RECAPTCHA_KEY}
                  onChange={handelCaptchaSuccessfull}
                  theme="light"
                  size="compact"
                />
            </div>
            {/* ReCaptcha is Here I am Not a Robot By Google */}
          </div>
          <div className='pt-5'>
            <button
              onClick={HandleOtp}
              className='gradient w-full rounded-md hover:scale-95 transition-all py-[6px]'
            >
              Send Otp
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <Loader show={Load} />
    </>
  );
};

export default VerifyPhone;
