import React, { useState, Fragment } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Bottomheader from "../home/Bottomheader";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Applycuponcode,
  GetPlanPayment,
  VerifyPayment,
  getChildProfiles,
  sendOrderPrice,
} from "../../api_config/Auth_Services";
import { toast } from "react-toastify";
import { Loader } from "../../utilitis/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { LoginPaymentStatus } from "../../redux/RoleSlice";
import { MdDelete } from "react-icons/md";
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import { ls } from "../../utilitis/SecureLocalStorage";


const CheckOut = () => {
  //Get Current Location and Used it as a props and passed in Header
  const location = useLocation();
  //Get Current Location and Used it as a props and passed in Header


  const phone = ls.get("phone"); //default phone number enterd by user on login or register time
  const Emailid = ls.get("email"); //default email enterd by user on login or register time
  const fullName = ls.get("fullname"); //default full name enterd by user on login or register time

  //Capture Payer Details
  const [StateCode, setStateCode] = useState({ Statecode: "", Citycode: "" }) //CountryWise State Filtering
  const [payeradd, setPayerAdd] = useState({
    Flatno: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
  });
  //Capture PayerDetails

  //Capture Payer address Value Filled By User
  const handlePayeradd = (e) => {
    //Targeting Payer Address
    let statecode = e.StateCode
    let citycode = e.CityCode
    setStateCode({ ...StateCode, Statecode: statecode, Citycode: citycode })
    if (!e.value) {
      let value = e.target.value;
      let Name = e.target.name;
      setPayerAdd({ ...payeradd, [Name]: value });
    } else {
      let value = e.value;
      let Name = e.name;
      setPayerAdd({ ...payeradd, [Name]: value });
    }
    // reactga.event({
    //   category: "User Filling Payer Details",
    //   action: "User Filling Payer Details",
    //   label: "User Filling Payer Details", 
    // })
  };
  //Capture Payer address Value Filled By User
  const [pateintName, setPatientName] = useState(""); //Auto fill payerName as Patient
  const [pateintEmail, setPateintEmail] = useState(""); //Auto fill payerEmail as Patient
  const [pateintPhone, setPateintPhone] = useState(""); //Auto fill payerPhone Number as Patient


  //Get True Status If Coupon Code Applyd Success Fully
  const [disstatus, setDisstatus] = useState(false);
  //Get True Status If Coupon Code Applyd Success Fully

  const [Load, setLoad] = useState(false); //Set State True If Api hit To Manage Loading Indigator

  let [isOpen, setIsOpen] = useState(false); //close and open modal if user is going to apply Discountn Code

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //Navigate
  const navigate = useNavigate();

  //Get Program Price By Plan and Plan Durations
  const data = useSelector((state) => state.userrole.Price); //Geting data from redux
  const id = ls.get("pid");
  const uId = ls.get("uId");
  const plan = ls.get("plan");
  const planDuration = ls.get("planDuration");

  const [price, setPrice] = useState({}); //Get Program Price as Plan Type and PlanDuration

  const planData = {
    programId: id,
    userId: uId,
    type: plan && plan,
    planDuration: planDuration && planDuration,
  };
  const handleProgramPrice = async () => {
    try {
      setLoad(true);
      const response = await GetPlanPayment(planData);
      if (response.status === true) {
        setPrice(response.discountedPrice);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  };

  useEffect(() => {
    handleProgramPrice();
  }, []);
  //Get Price By Plan And PlanDuration

  //Api for apply cupon code
  const [cupencode, setCupencode] = useState("");
  const cupondata = {
    programId: id,
    userId: uId,
    discountedprice: data.discountedPrice || price.discountedPrice,
    cupancode: cupencode,
    plan:plan,
    plantype:planDuration
  };

  const [showapply, setShowApply] = useState(true);
  const [newPrice, setNewprice] = useState({}); //Latest price after cuopon apply
  const handleApplycupoun = async () => {
    if (!cupencode) {
      toast("Enter Couponcode !", { type: "error", className: "error" });
    } else {
      try {
        setLoad(true);
        const response = await Applycuponcode(cupondata);
        if (response.status === true) {
          toast("Successfuly applied !", {
            type: "success",
            className: "success",
          });
          setDisstatus(true);
          setNewprice(response);
          setShowApply(false);
        } else {
          toast(response.message, { type: "error", className: "error" });
          setShowApply(true);
          setCupencode("");
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
      }
    }
    closeModal();
  };
  //Api for apply cupon code

  //Complete Form Validation is Here

  //Handle Dynamic Validations
  const [validAddress, setValidAddress] = useState("");
  //Handle Dynamic Validations
  useEffect(() => {
    setTimeout(() => setValidAddress(""), 6000);
  }, [validAddress]);
  //Complete Form Validation is Here

  //Handle Add Value If User Check Buying for myself
  const [check, setCheck] = useState(false);
  const handleCheck = (e) => {
    if (e.target.checked == true) {
      setPatientName(fullName);
      setPateintEmail(Emailid);
      setPateintPhone(phone);
      setCheck(true);
    } else {
      setPatientName("");
      setPateintEmail("");
      setPateintPhone("");
      setCheck(false);
    }
  };
  //Handle Add Value If User Check Buying for myself

  const regex =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/; //For Email Validation
  const handlePayment = async (amount) => {
    let isValid = true; // Flag to track validation status

    if (!payeradd.Flatno) { toast("Enter Payer Flate No/Street Name !", { type: 'error', className: 'error'}); isValid = false;}
    else if (!payeradd.country) { toast("Select Payer Country !", { type: 'error', className: 'error' }); isValid = false;}
    else if (!payeradd.state) { toast("Select Payer State !", { type: 'error', className: 'error' }); isValid = false;}
    else if (!payeradd.city) { toast("Select Payer City !", { type: 'error', className: 'error' }); isValid = false;}
    else if (!payeradd.pinCode) { toast("Enter Payer pincode !", { type: 'error', className: 'error' }); isValid = false;}
    else{
      dynamicPatient.forEach((item, index) => {
        if (check && index === 0) {
          if (dynamicPatient[index].age == "") {
            toast(`Enter Patient ${dynamicPatient.length>1?index+1:''} age !`,{type:'error',className:'error'});
  
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].age > 99) {
            toast(`Patient ${dynamicPatient.length>1?index+1:''} age is not morethan 99 !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].gender == "") {
            toast(`select patient ${dynamicPatient.length>1?index+1:''} gender !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          }
        }
        if (
          (check && index === 1) ||
          index === 2 ||
          index === 3 ||
          index === 4 ||
          index === 5
        ) {
          if (dynamicPatient[index]?.fullname === "") {
            toast(`Enter patient ${dynamicPatient.length>1?index+1:''} fullname !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (
            !dynamicPatient[index].email ||
            regex.test(dynamicPatient[index].email) === false
          ) {
            toast(`patient ${dynamicPatient.length>1?index+1:''} email is not valid !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].phoneNumber.length !== 10) {
            toast(`patient ${dynamicPatient.length>1?index+1:''} phone number is not valid !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].age == "") {
            toast(`Enter Patient  ${dynamicPatient.length>1?index+1:''} age !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].age > 99) {
            toast(`Patient ${dynamicPatient.length>1?index+1:''} age is not morethan 99 !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].gender == "") {
            toast(`select patient ${dynamicPatient.length>1?index+1:''} gender !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          }
          // else if (
          //   !dynamicPatient[index].Flat_streenNo ||
          //   !dynamicPatient[index].city ||
          //   !dynamicPatient[index].pincode ||
          //   !dynamicPatient[index].state ||
          //   !dynamicPatient[index].country
          // ) {
          //   setValidAddress("please fill this feild !");
          //   isValid = false;
          //   return; // Stop further execution if validation fails
          // }
  
        } else if (
          (check == false && index === 0) ||
          index === 1 ||
          index === 2 ||
          index === 3 ||
          index === 4 ||
          index === 5
        ) {
          if (dynamicPatient[index]?.fullname === "") {
            toast(`Enter patient ${dynamicPatient.length>1?index+1:''} fullname !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (
            !dynamicPatient[index].email ||
            regex.test(dynamicPatient[index].email) === false
          ) {
            toast(`patient ${dynamicPatient.length>1?index+1:''} email is not valid !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].phoneNumber.length !== 10) {
            toast(`patient ${dynamicPatient.length>1?index+1:''} phone number is not valid !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].age == "") {
            toast(`Enter Patient  ${dynamicPatient.length>1?index+1:''} age !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].age > 99) {
            toast(`Patient ${dynamicPatient.length>1?index+1:''} age is not morethan 99 !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          } else if (dynamicPatient[index].gender == "") {
            toast(`select patient ${dynamicPatient.length>1?index+1:''} gender !`,{type:'error',className:'error'});
            isValid = false;
            return; // Stop further execution if validation fails
          }
        }
      });
    }
    
    if (dynamicPatient.length + profile?.length != selectedPlanduration) {
      toast(
        `Click On Button Given below and add ${selectedPlanduration - (dynamicPatient?.length + profile?.length)
        } More Patients Form !`,
        {
          type: "error",
          className: "error",
          autoClose: 7000,
        }
      );
      isValid = false;
    }

    if (!isValid) {
      return null; // Stop further execution if validation fails
    }

    try {
      setLoad(true);
      const _amount_data = {
        userId: uId,
        programId: id,
        currency: "INR",
        amount: amount,
        couponCode: cupencode,
        planType: plan,
        planSubType: price.planDuration || data.planDuration,
      };
      const response = await sendOrderPrice(_amount_data);
      if (response.status === true) {
        handleOpenRazerpay(response.data);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }

    //Track If User is going to make payment
    // reactga.event({
    //   category: "Checkout page payment button",
    //   action: "Checkout page payment button clicked",
    //   label: "checkout Payment Button", 
    // })
    //Track If User is going to make payment

  };

  // handle Open Razorpay
  
  const dispatch = useDispatch() //Dispatch Reducer Function
  const handleOpenRazerpay = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
      amount: data.amount / 100,
      currency: data.currency,
      name: "Yellow Squash",
      order_id: data.id,
      prefill: {
        name: fullName,
        email: Emailid,
        contact: phone,
      },
      handler: async function (response) {
        const data = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          payerDetails: {
            fullName: fullName,
            emailId: Emailid,
            phoneNumber: phone,
          },
          patientDetails: combinedData,
          planType: plan,
          planSubType: planDuration,
        };
        try {
          setLoad(true);
          const Response = await VerifyPayment(data);
          if (Response.status == true) {
            navigate("/program-thankyou");
            dispatch(LoginPaymentStatus(true))
            ls.save("switchprofile", true);
            ls.save("PurcahsedIdProgram", pid);
          } else {
            toast(Response.message,{type:'error',className:'error'});
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

  //Post Payment Details Api is here

  const pid = ls.get("pid"); //Getting Program ID
  const Pimg = ls.get("pimg"); //Getting Program Image
  const Ptitle = ls.get("title"); //Getting Program Title

  const [dynamicPatient, setDynamicPatient] = useState([
    {
      fullname: "",
      email: "",
      phoneNumber: "",
      age: "",
      gender: ""
    },
  ]); //array for Capturing Pateint Form Data

  //Adding Patient Form dynamically
  const [errorifexceed, setErrorifexceed] = useState(false);
  const handleAdd = () => {
    if ((dynamicPatient.length + profile.length) >= selectedPlanduration) {
      setErrorifexceed(true);
    } else {
      setDynamicPatient([
        ...dynamicPatient,
        {
          fullname: "",
          email: "",
          phoneNumber: "",
          age: "",
          gender: "",
        },
      ]);
      toast("Patient form Added Below !", {
        type: "success",
        className: "success",
        autoClose: 3000,
      });
    }
  };
  //Delete Pateint Form Dynamically
  const handelDeleteForm = (ind) => {
    let dynaminForm = [...dynamicPatient]
    dynaminForm.splice(ind, 1)
    setDynamicPatient(dynaminForm)
  }
  //Adding Patient Form dynamically
  const handleDynamicDetail = (e, ind) => {
    //Get name:"Ashish" and value of every array of object
    if (!e.value) {
      let newData = [...dynamicPatient];
      newData[ind][e.target.name] = e.target.value;
      setDynamicPatient(newData);
    } else {
      let newData = [...dynamicPatient];
      newData[ind][e.name] = e.value;
      setDynamicPatient(newData);
    }

    //State Code
    let statecode = [...dynamicPatient]
    statecode[ind]["StateCode"] = e.StateCode
    setDynamicPatient(statecode)

    //CityCode
    let citycode = [...dynamicPatient]
    citycode[ind]["CityCode"] = e.CityCode
    setDynamicPatient(citycode)

    //Tracking via GA User filling Patient form
    // reactga.event({
    //   category: "Payer filling patient form",
    //   action: "Payer filling patient form",
    //   label: "Payer filling patient form", 
    // })
    //Tracking via GA User filling Patient form
  };

  //Get All Profile Which User is Goin To Purchase SecondTime
  const [profile, setProfile] = useState([])
  const handelProfileChange = (e) => {
    if (e.target.checked === true) {
      if ((selectedPlanduration) != (dynamicPatient.length + profile.length)) {
        setProfile([...profile, e.target.value])
      }else if(dynamicPatient?.length>0){
        toast(`Delete Pateint form to select  !`, { type: "error", className: "error", autoClose: 5000 })
      }else{
        setErrorifexceed(true); //If User Want to Select more Existing Patient
      }
    } else {
      const data = profile.filter((item) => item !== e.target.value)
      setProfile(data)
    }
  }
  //Get All Profile Which User is Goin To Purchase SecondTime

  const ddata = dynamicPatient.map((item, i) => ({
    isParant: check && i === 0 ? true : false,
    fullName: check && i === 0 ? fullName : item.fullname,
    emailId: check && i === 0 ? Emailid : item.email,
    phoneNumber: check && i === 0 ? phone : item.phoneNumber,
    age: item.age,
    gender: item.gender,
  }
  )
  );
  const pdata = profile.map((item) => ({ "profileId": item })) //Profile Ids Data
  const combinedData = [...ddata, ...pdata]

  const selectedPlanduration = ls.get("planNumeric"); //for Validation like only 2 pateint can be added if user is select 2 member plan and if 3,4,5 so validation ids applying on this

  //Get Child By UserId
  const [profiles, setProfiles] = useState([])
  const profileUid = {
    userId: uId,
    programId: id
  }
  const handelProfiles = async () => {
    try {
      const response = await getChildProfiles(profileUid)
      if (response.status === true) {
        setProfiles(response.data)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    handelProfiles()
  }, [uId])
  //Get Child By UserId

  //Countries wise state , city filter for payer
  const Countries = Country?.getAllCountries().map((item) => ({ value: item?.name, label: item?.name, name: "country", StateCode: item?.isoCode })) //Get All Country
  const AllStates = State?.getAllStates().filter((item) => (item?.countryCode === StateCode?.Statecode)) //Get All State
  const FilteredState = AllStates?.map((item) => ({ value: item?.name, label: item?.name, name: "state", CityCode: item?.isoCode, StateCode: item?.countryCode }))
  const AllCity = City?.getAllCities().filter((item) => (item?.stateCode === StateCode?.Citycode)) //Get All City
  const FilterdCity = AllCity?.map((item) => ({ value: item?.name, label: item?.name, name: "city", CityCode: item?.stateCode, StateCode: item?.countryCode }))

  const imgStyle = {
    boxSizing: 'border-box',
    fontWeight: 400,
    position: 'static',
    verticalAlign: 'middle',
    borderStyle: 'none',
    maxWidth: '100%',
    minWidth: 'auto',
    maxHeight: '100%',
    minHeight: 'auto',
    height: 'auto',
    width: '600.391px',
    borderRadius: '10px',
    filter: 'invert(0)',
  };

  return (
    <div className='bg-[#f1f1f1]'>
      <>
        <Header currentLocation={location.pathname} />
        <div className='container pb-10'>
          <div className='grid grid-cols-12 md:px-0 md:gap-x-3'>
            <div className='bg-white md:p-3 col-span-12 order-last pt-5 rounded-md md:pt-3 md:order-first md:col-span-7 hover:shadow-lg px-4'>
              <div>
                <div className='text-lg space-x-3  items-center md:flex hidden text-black font-semibold tracking-wide'>
                  <Link to={`/detail-page/${pid}`} className='inline-block'>
                    <FiArrowLeft size={25} />
                  </Link>
                  <span>Checkout</span>
                </div>
                <div className='pt-0 md:py-3'>
                  <div className='text-lg text-black font-semibold'>
                    PAYER DETAILS
                  </div>
                  <div className='pt-3 space-y-2'>
                    <div>
                      <label className='text-gray-500 text-sm block'>
                        Full name
                        <span className='text-red-500 text-2xl'>*</span>
                      </label>
                      <input
                        type={"text"}
                        name='payerName'
                        disabled
                        value={fullName}
                        className='outline-none w-full border text-sm border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]'
                      />
                    </div>
                    <div>
                      <label className='text-gray-500 text-sm block'>
                        Email id
                        <span className='text-red-500 text-2xl'>*</span>
                      </label>
                      <input
                        type={"email"}
                        name='payerEmail'
                        disabled
                        value={Emailid}
                        className='outline-none w-full border text-sm border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]'
                      />
                    </div>
                    <div>
                      <label className='text-gray-500 text-sm block'>
                        Phone number
                        <span className='text-red-500 text-2xl'>*</span>
                      </label>
                      <input
                        type={"number"}
                        name='payerPhone'
                        value={phone}
                        disabled
                        className='outline-none w-full border text-sm border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]'
                      />
                    </div>
                    <div>
                      <div className='py-3'>
                        <div className='text-sm text-black font-semibold'>
                          ADDRESS
                        </div>
                        <div className='pt-3 space-y-2'>
                          <div>
                            <label className='text-gray-500 text-sm block'>
                              Flat No./ Street Name
                              <span className='text-red-500 text-2xl'>*</span>
                            </label>
                            <input
                              onChange={(e) => handlePayeradd(e)}
                              value={payeradd.Flatno}
                              name='Flatno'
                              type={"text"}
                              className={`outline-none w-full border text-sm 
                                border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]`}
                            />
                          </div>
                          <div className='grid grid-cols-12 gap-x-5'>

                            <div className='col-span-6'>
                              <label className='text-gray-500 text-sm block'>
                                Country
                                <span className='text-red-500 text-2xl'>*</span>
                              </label>
                              <Select
                                id="country"
                                Value={payeradd.country}
                                onChange={(e) => handlePayeradd(e)}
                                options={Countries}
                              />
                            </div>
                            <div className='col-span-6'>
                              <label className='text-gray-500 text-sm block'>
                                State
                                <span className='text-red-500 text-2xl'>*</span>
                              </label>
                              <Select
                                Value={payeradd.state}
                                onChange={(e) => handlePayeradd(e)}
                                options={FilteredState}
                              />
                            </div>
                          </div>
                          <div className='grid grid-cols-12 gap-x-5'>

                            <div className='col-span-6'>
                              <label className='text-gray-500 text-sm block'>
                                City/ Town/ District
                                <span className='text-red-500 text-2xl'>*</span>
                              </label>
                              <Select
                                Value={payeradd.city}
                                onChange={(e) => handlePayeradd(e)}
                                options={FilterdCity}
                              />
                            </div>
                            <div className='col-span-6'>
                              <label className='text-gray-500 text-sm block'>
                                Pincode
                                <span className='text-red-500 text-2xl'>*</span>
                              </label>
                              <input
                                onChange={(e) => handlePayeradd(e)}
                                value={payeradd.pinCode}
                                name='pinCode'
                                type={"number"}
                                className={`outline-none w-full border text-sm 
                                border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="md:flex md:justify-between items-center">
                    {selectedPlanduration &&
                      (<div className='justify-center flex py-4'>
                        {selectedPlanduration===1?null:<button
                          onClick={handleAdd}
                          className='gradient hover:scale-95 transition-all animate-pulse hover:animate-none text-black px-5 md:px-12 tracking-wide font-semibold  py-2 rounded-md'
                        >
                          ADD{" "}
                          <span className='tracking-wide text-[1rem] md:text-[1.1rem]'>
                            {(dynamicPatient.length + profile?.length) == selectedPlanduration
                              ? 0
                              : selectedPlanduration - (dynamicPatient.length + profile?.length)}
                          </span>{" "}
                          {selectedPlanduration === 1 ? "" : "MORE"} PATIENT+ FORM
                        </button>}
                      </div>)
                    }
                    {/* List Of Pateint allready  available  */}
                    {profiles.length > 0 ? (<div>
                      <div className="">
                        <div className="text-black font-semibold pb-1">Want to purchase for existing patient's?</div>
                        <div className="h-[70px] overflow-y-scroll">
                          {
                            profiles?.map((item, ind) => (
                              <div className="flex items-center px-5 space-x-3"><input type="checkbox" checked={profile?.includes(item?.profileId)} value={item?.profileId} onChange={(e) => handelProfileChange(e)} className="scale-125 cursor-pointer" /><span>{item.fullname}</span></div>
                            ))
                          }
                        </div>
                      </div>
                    </div>) : null}
                  </div>
                  {/* List Of Pateint allready  available  */}
                  {/* Dynamic Patient detail is here */}
                  {dynamicPatient?.map((item, ind) => (
                    <>
                      <div className='text-lg md:pt-4 text-black font-semibold'>
                        ENTER PATIENT DETAIL{" "}
                        <span className={`${selectedPlanduration === 1 ? "hidden" : "inline-block"} text-lg`}>
                          {selectedPlanduration && ind + 1}
                        </span>
                        <span onClick={() => handelDeleteForm(ind)} className="pl-2 text-red-500"><MdDelete size={23} className="cursor-pointer hover:scale-110 transition-all inline-block" /></span>
                      </div>
                      <div>
                        <div>
                          <div className='flex items-center justify-between md:justify-start text-sm space-x-1 md:space-x-4'>
                            <div
                              className={`flex items-center space-x-2 pt-3 pb-2 ${ind == 0 ? "block" : "hidden"
                                }`}
                            >
                              <input
                                onClick={(e) => handleCheck(e)}
                                type='checkbox'
                                name='Type'
                                className={
                                  "larger-checkbox accent-yellow-400 cursor-pointer"
                                }
                              />
                              <label className='cursor-pointer text-lg'>
                                Buying for myself
                              </label>
                            </div>
                          </div>
                          <div className='space-y-3'>
                            <div>
                              <label className='text-gray-500 text-sm block'>
                                Full name
                                <span className='text-red-500 text-2xl'>*</span>
                              </label>

                              <input
                                value={
                                  (ind == 0 && pateintName) || item.fullname
                                }
                                onChange={(e) => handleDynamicDetail(e, ind)}
                                name='fullname'
                                disabled={pateintName && ind == 0}
                                type={"text"}
                                className={`outline-none w-full border text-sm 
                                border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]`}
                              />
                            </div>
                            <div>
                              <label className='text-gray-500 text-sm block'>
                                Email id
                                <span className='text-red-500 text-2xl'>*</span>
                              </label>
                              {/*  */}
                              <input
                                value={(ind == 0 && pateintEmail) || item.email}
                                onChange={(e) => handleDynamicDetail(e, ind)}
                                name='email'
                                disabled={pateintEmail && ind == 0}
                                type={"email"}
                                className={`outline-none w-full border text-sm border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]`}
                              />
                            </div>
                            <div>
                              <label className='text-gray-500 text-sm block'>
                                Phone Number
                                <span className='text-red-500 text-2xl'>*</span>
                              </label>
                              <input
                                value={
                                  (ind == 0 && pateintPhone) || item.phoneNumber
                                }
                                onChange={(e) => handleDynamicDetail(e, ind)}
                                disabled={pateintPhone && ind == 0}
                                name='phoneNumber'
                                type={"number"}
                                className={`outline-none w-full border text-sm border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]`}
                              />
                            </div>
                            <div className='grid grid-cols-12  gap-x-5'>
                              <div className='col-span-6'>
                                <label className='text-gray-500 text-sm block'>
                                  Age
                                  <span className='text-red-500 text-2xl'>
                                    *
                                  </span>
                                </label>
                                <input
                                  value={item.age}
                                  onChange={(e) => handleDynamicDetail(e, ind)}
                                  name='age'
                                  type={"number"}
                                  className={`outline-none w-full border text-sm border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]`}
                                />
                              </div>
                              <div className='col-span-6'>
                                <label className='text-gray-500 text-sm block'>
                                  Gender
                                  <span className='text-red-500 text-2xl'>
                                    *
                                  </span>
                                </label>
                                <select
                                  onChange={(e) => handleDynamicDetail(e, ind)}
                                  name='gender'
                                  className={`outline-none w-full border text-sm border-black border-opacity-50 px-2 py-[8px] rounded-[.4rem]`}
                                >
                                  <option>Select Gender</option>
                                  <option value={"Male"}>Male</option>
                                  <option value={"FeMale"}>Female</option>
                                  <option value={"Other"}>Other</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  {/* Dynamic Patient detail is here */}
                </div>
              </div>
            </div>
            <div
              className={
                "col-span-12  order-first md:order-last md:col-span-5 mb-4 md:mb-0"
              }
            >
              <div className='p-2 md:sticky md:top-[75px] bg-white rounded-md mx-auto w-full md:w-full border hover:shadow-lg'>
                <img
                  src={Pimg}
                  alt='error'
                  style={imgStyle}
                />
                <div className='py-3 px-2'>
                  <div className='text-black font-semibold text-sm'>
                    {Ptitle}
                  </div>
                  <div className='flex items-center py-2 space-x-3 border-b-[1px] border-black border-opacity-50'>
                    <div className='text-[#0FA654] font-semibold text-xl'>
                      <span className='pr-.5'>₹</span>{" "}
                      {data?.discountedPrice?.toLocaleString() || price?.discountedPrice?.toLocaleString()}
                    </div>
                    
                    {(data?.discount||price?.discount)==0?null:<del className='text-sm text-black tracking-wide'>
                      <span className='pr-.5'>₹</span>{" "}
                      {data?.price?.toLocaleString() || price?.price?.toLocaleString()}
                    </del>}
                    {(data?.discount||price?.discount)==0?null:<div className='text-sm tracking-wide text-[#0FA654] font-semibold'>
                      {data?.discount || price?.discount}% Off
                    </div>}
                  </div>
                  <div className='py-3 border-b-[1px] border-black border-opacity-50'>
                    <div className='flex text-black items-center justify-between text-lg w-full'>
                      <div>Total Price</div>
                      <div>
                        <span className='pr-.5'>₹</span>{" "}
                        {data?.price?.toLocaleString() || price?.price?.toLocaleString()}
                      </div>
                    </div>
                    {(data?.discount||price?.discount)==0?null:<div className='flex text-[#0FA654] items-center justify-between text-lg w-full'>
                      <div>Discount</div>
                      <div>
                        <span className='text-2xl'>-</span>{" "}
                        <span className='pr-.5'>₹</span>{" "}
                        {(data?.price - data?.discountedPrice) ||
                          (price?.price - price?.discountedPrice)}
                      </div>
                    </div>}
                    {disstatus ? (
                      <div className='flex text-[#0FA654] items-center justify-between text-lg w-full'>
                        <div>Coupon Discount</div>
                        <div>
                          <span className='text-2xl'>-</span>{" "}
                          <span className='pr-.5'>₹</span>{" "}
                          {(data?.discountedPrice || price?.discountedPrice) -
                            newPrice?.dicountedPrice}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className='text-black font-bold text-lg pt-1 flex items-center justify-between'>
                    <div>Grand Total</div>
                    {disstatus ? (
                      <div>
                        <span className='pr-.5'>₹</span>{" "}
                        {newPrice?.dicountedPrice?.toLocaleString()}
                      </div>
                    ) : (
                      <div>
                        <span className='pr-.5'>₹</span>{" "}
                        {data?.discountedPrice?.toLocaleString() || price?.discountedPrice?.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className='pt-3'>
                    <Link to='#'>
                      <div
                        onClick={() =>
                          handlePayment(
                            disstatus
                              ? newPrice?.dicountedPrice
                              : data?.discountedPrice || price?.discountedPrice
                          )
                        }
                        className='gradient text-center py-[4px] cursor-pointer hover:scale-95 transition-all rounded-md'
                      >
                        Pay Now
                      </div>
                    </Link>
                  </div>
                  <div className='pt-4'>
                    {showapply && (
                      <div className='justify-center space-x-1 text-lg flex items-center'>
                        <div>Have a discount code?</div>
                        <span
                          className='text-[#0FA654] font-semibold cursor-pointer'
                          onClick={openModal}
                        >
                          Apply
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* } */}
          </div>
        </div>
        <Footer />
        <Bottomheader currentLocation={location.pathname} />
        <Loader show={Load} />
        {/* Popup For applying Discount  */}
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
                        Please Enter Discount Code
                      </Dialog.Title>
                      <div>
                        <input
                          onChange={(e) => setCupencode(e.target.value)}
                          value={cupencode}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplycupoun()
                          }
                          type='text'
                          name='DiscountCode'
                          placeholder='discount code'
                          className='w-full outline-none py-2 rounded-md text-sm px-4 border border-black'
                        />
                      </div>

                      <div className='mt-4 pl-5 pr-3'>
                        <div className='flex items-center justify-between'>
                          <button
                            onClick={closeModal}
                            className='inline-block bg-red-500 text-white px-6 rounded-md font-semibold text-sm hover:scale-95 transition-all py-[4px]'
                          >
                            CANCEL
                          </button>
                          <button
                            onClick={handleApplycupoun}
                            className='inline-block gradient text-black px-8 font-semibold rounded-md text-sm hover:scale-95 transition-all py-[4px]'
                          >
                            APPLY
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
          <Transition appear show={errorifexceed} as={Fragment}>
            <Dialog
              as='div'
              className='relative z-10'
              onClose={() => setErrorifexceed(false)}
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
                <div className='flex min-h-full items-center justify-center text-center'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all'>
                      <div className='text-[70px] text-yellow-500 text-center'>
                        &#x26A0;
                      </div>
                      <Dialog.Title
                        as='h3'
                        className='text-lg text-center leading-6 tracking-wide text-black text-opacity-80 font-semibold'
                      >
                        {`You Have Selected only ${selectedPlanduration == 1 ? planDuration : selectedPlanduration} ${selectedPlanduration == 1 ? "" : "Members"} Plan !`}
                      </Dialog.Title>
                      <div className='mt-4 pl-5 pr-3'>
                        <div className='flex items-center justify-center'>
                          <button
                            onClick={() => setErrorifexceed(false)}
                            className='inline-block bg-red-500 text-white px-6 rounded-md font-semibold text-sm hover:scale-95 transition-all py-[4px]'
                          >
                            OK
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
      </>
    </div>
  );
};

export default CheckOut;
