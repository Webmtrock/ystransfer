import "./App.css";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import React, { Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./hooks/ScrollToTop";
import { LazyLoadSpinner } from "./utilitis/LazyLoadSpinner";
import { useState } from "react";
import { useEffect } from "react";
import { ls } from "./utilitis/SecureLocalStorage";

const Program_Thankyou = React.lazy(() => import("./components/thankyou/ProgramThankyou"))
const Bottomheader = React.lazy(() => import("./components/home/Bottomheader"))
const SwitchProfile = React.lazy(() => import("./components/switch_child/SwitchProfile"))
const Account = React.lazy(() => import("./components/user_account/Account"))
const Webinar_Thankyou = React.lazy(() => import("./components/thankyou/Webinar_Thankyou"))
const My_Purchased_Webinar = React.lazy(() => import("./components/purchasing/My_Purchased_Webinar"))
const My_Purchased_Program = React.lazy(() =>
  import("./components/purchasing/My_Purchased_Program")
);
const Home = React.lazy(() => import("./components/pages/Home"));
const Error404 = React.lazy(() => import("./error/Error404"));
const Login = React.lazy(() => import("./components/Authantication/Login"));
const Signup = React.lazy(() => import("./components/Authantication/Signup"));
const OtpVerify = React.lazy(() =>
  import("./components/Authantication/OtpVerify")
);
const ResetPassword = React.lazy(() =>
  import("./components/Authantication/ResetPassword")
);
const CreateNewPassword = React.lazy(() =>
  import("./components/Authantication/CreateNewPassword")
);
const HomeProgram = React.lazy(() => import("./components/HomeProgram"));
const Homewebinars = React.lazy(() => import("./components/Homewebinars"));
const ExpertHome = React.lazy(() => import("./components/ExpertHome"));
const HealthPediaHome = React.lazy(() =>
  import("./components/HealthPediaHome")
);
const Readartical = React.lazy(() => import("./components/Readartical"));
const CheckOut = React.lazy(() => import("./components/purchasing/CheckOut"));
const WebinarstartTimer = React.lazy(() =>
  import("./components/purchasing/WebinarstartTimer")
);
const StaticAbout = React.lazy(() => import("./staticpages/StaticAbout"));
const VerifyPhone = React.lazy(() =>
  import("./components/Authantication/VerifyPhone")
);
const PrivacyPolicy = React.lazy(() => import("./staticpages/PrivacyPolicy"));
const Faqs = React.lazy(() => import("./staticpages/Faqs"));
const ProgramDetail = React.lazy(() =>
  import("./components/purchasing/ProgramDetail")
);
const ConnectionStatus = React.lazy(() => import("./error/ConnectionStatus"));
const HomeAboutExpert = React.lazy(() =>
  import("./components/purchasing/HomeAboutExpert")
);
const ResetPasswordOtp = React.lazy(() =>
  import("./components/Authantication/ResetPasswordOtp")
);
const HealthPediaVideo = React.lazy(() =>
  import("./components/HealthPediaVideo")
);

function App() {

  // Send pageview with a custom path
    //  reactga.send({ hitType: "pageview", page:window.location.pathname});
  // Send pageview with a custom path

  const data = useSelector((state) => {
    return state.userrole.counter;
  });
  const Roledata = ls.get("UserRole");

  //Session Expired Logic is Here
  const logedinTime = ls.get("logindate")
  const log = new Date(logedinTime)
  const expirationTime = new Date(log.getTime() + 12 * 60 * 60 * 1000) //Expiration Time is Here

  const [currentTime, setCurrentTime] = useState(new Date()); //Current Running Timer is Here

  //Logic To Do if timer is equal to 12HR Session Expired 
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //Logic To Do if timer is equal to 12HR Session Expired
  if (logedinTime) {
    if (expirationTime <= currentTime) {
      toast("session expired login now", { type: "info", autoClose: 10000, className: "information" })
      ls.clear();

    }
  }
  //Session Expred Logic is Here

  //Team Auth
  return (
    <>
      <ConnectionStatus />
      <SwitchProfile />
      <BrowserRouter>
        <ScrollToTop>
          <ToastContainer
            position='top-center'
            autoClose={1500}
            hideProgressBar={false}
            rtl={false}
            pauseOnHover={false}
          />
          <Suspense fallback={<LazyLoadSpinner />}>
            <Routes>
              <Route path='*' element={<Error404 />} />

              {data || Roledata === "user" ? (
                <>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/otp-verify' element={<OtpVerify />} />
                  <Route path='/reset-password' element={<ResetPassword />} />
                  <Route
                    path='/healthpedia-video'
                    element={<HealthPediaVideo />}
                  />
                  <Route
                    path='/reset-password-otp'
                    element={<ResetPasswordOtp />}
                  />
                  <Route
                    path='/create-new-password'
                    element={<CreateNewPassword />}
                  />
                  <Route path='/home-program' element={<HomeProgram />} />
                  <Route path='/home-webinar' element={<Homewebinars />} />
                  <Route path='/experts/ExpertListing' element={<ExpertHome />} />
                  <Route
                    path='/home-healthpedia'
                    element={<HealthPediaHome />}
                  />
                  <Route path='/articles/:slug' element={<Readartical />} />
                  <Route path='/AboutUs' element={<StaticAbout />} />
                  <Route path='/verify-phone' element={<VerifyPhone />} />
                  <Route
                    path='/webinar-timer/:id'
                    element={<WebinarstartTimer />}
                  />
                  {/* <Route path='/detail-page/:id' element={<DetailPage/>}/> */}
                  <Route path='/detail-page/:id' element={<ProgramDetail />} />
                  <Route path='/check-out' element={<CheckOut />} />
                  <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                  <Route path='/faq' element={<Faqs />} />
                  <Route
                    path='/home-about-expert'
                    element={<HomeAboutExpert />}
                  />
                  <Route
                    path='/my_program'
                    element={<My_Purchased_Program />}
                  />
                  <Route path="/my_webinar" element={<My_Purchased_Webinar />} />
                  <Route path="/webinar-thankyou" element={<Webinar_Thankyou />} />
                  <Route path="/program-thankyou" element={<Program_Thankyou />} />
                  <Route path="/account" element={<Account />} />
                </>
              ) : (
                <>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/otp-verify' element={<OtpVerify />} />
                  <Route path='/reset-password' element={<ResetPassword />} />
                  <Route
                    path='/reset-password-otp'
                    element={<ResetPasswordOtp />}
                  />
                  <Route path="/webinar-thankyou" element={<Webinar_Thankyou />} />
                  <Route
                    path='/create-new-password'
                    element={<CreateNewPassword />}
                  />
                  <Route path='/home-program' element={<HomeProgram />} />
                  <Route path='/home-webinar' element={<Homewebinars />} />
                  <Route path='/experts/ExpertListing' element={<ExpertHome />} />
                  <Route
                    path='/home-healthpedia'
                    element={<HealthPediaHome />}
                  />
                  <Route path='/articles/:slug' element={<Readartical />} />
                  <Route path='/AboutUs' element={<StaticAbout />} />
                  <Route path='/verify-phone' element={<VerifyPhone />} />
                  <Route
                    path='/webinar-timer/:id'
                    element={<WebinarstartTimer />}
                  />
                  <Route
                    path='/home-about-expert'
                    element={<HomeAboutExpert />}
                  />
                  <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                  <Route path='/faq' element={<Faqs />} />
                  <Route path='/detail-page/:id' element={<ProgramDetail />} />
                  <Route
                    path='/healthpedia-video'
                    element={<HealthPediaVideo />}
                  />
                  <Route
                    path='/webinar-timer/:id'
                    element={<WebinarstartTimer />}
                  />
                </>
              )}
            </Routes>
            <Bottomheader />
          </Suspense>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;