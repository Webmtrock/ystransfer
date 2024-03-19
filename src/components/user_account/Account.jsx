import { React } from "react"
import Footer from '../common/Footer'
import Header from '../common/Header'
import { useState } from "react"
import { MdAddPhotoAlternate } from 'react-icons/md'
import { AiFillCaretDown, AiFillCloseCircle } from 'react-icons/ai'
import { useSelector } from "react-redux"
import { Loader } from "../../utilitis/Loader"
import { Disclosure, Transition } from "@headlessui/react"
import { toast } from "react-toastify"
import { UpdateChild, UpdateUser } from "../../api_config/Auth_Services"

const Account = () => {

  //Set Loader True If Api Hit 
  const [load, setLoad] = useState(false)

  //function for dispatch reducer function
  const Parant = useSelector((state) => state.userrole.ParantData)
  //Container 1
  //Capture Parant Image
  const [parantimg, setParantImg] = useState(Parant?.profilePicture)
  const [sendparantimg, setSendParantimg] = useState(Parant?.profilePicture)
  const handelParantFile = (e) => {
    setParantImg(URL.createObjectURL(e.target.files[0]))
    setSendParantimg(e.target.files[0])
  }
  //Capture Parant Image 

  //Capture Parant Details
  const [parant, setParant] = useState({
    fullName: Parant.fullName,
    age: Parant.age,
    email: Parant.email,
    gender: Parant.gender,
  })

  const handelChange = (e) => {
    setParant({ ...parant, [e.target.name]: e.target.value })
  }

  //Handel Edit User Profile
  const handelEditUser = async () => {
    const formdata = new FormData()
    formdata.append("userId", Parant?._id);
    formdata.append("fullName", parant?.fullName)
    formdata.append("email", parant?.email)
    formdata.append("age", Number(parant?.age))
    formdata.append("gender", parant?.gender)
    formdata.append("profilePicture", sendparantimg)

    try {
      setLoad(true)
      const response = await UpdateUser(formdata)
      if (response.status === true) {
        toast("Parent Updated Successfuly !", { type: "success", className: "success" })
      }
      setLoad(false)
    } catch (error) {
      setLoad(false)
    }
  }

  //Handel Edit User Profile
  //Capture Parant Details



  //Handel Dynamic Child Form
  const [childform, setChildForm] = useState(
    Parant?.patientDetails?.map((item) => (
      {
        fullName: item?.fullName,
        ProfilePic: item?.image,
        childAge: Number(item?.age),
        ChildGender: item?.gender,
        Flatno: item?.address?.flatNo,
        email: item?.emailId,
        mobileno: item?.phoneNumber,
        City: item?.address?.City,
        PinCode: item?.address?.pincode,
        State: item?.address?.state,
        Country: item?.address?.country,
        // Map 'condition' property if it exists, otherwise use an empty array
        condtion: item.condition ? (item?.condition.map((item) => item)) : [],
        // Map 'interests' property if it exists, otherwise use an empty array
        interest: item.interests ? (item?.interests.map((item) => item)) : [],
        profileId: item?.profileId
      }
    ))
  )

  // console.log(parant,ChildData)

  //Capture Dynamic Child Details

  const [profilePicturePreviews, setProfilePicturePreviews] = useState([]);
  const handelChildFile = (e, ind) => {
    const childData = [...childform]
    const file = e.target.files[0]
    childData[ind].ProfilePic = file

    // Generate a URL for the selected image and store it in the previews state
    const imgUrl = URL.createObjectURL(file);
    const updatedPreviews = [...profilePicturePreviews];
    updatedPreviews[ind] = imgUrl;

    setChildForm(childData);
    setProfilePicturePreviews(updatedPreviews);

    setChildForm(childData)
  }

  const handelOnChange = (e, ind) => {
    const childData = [...childform]
    childData[ind][e.target.name] = e.target.value
    setChildForm(childData)
  }
  //Capture Dynamic Child Details

  //Child Condition
  const handleChildCondition = (e, ind) => {
    const childData = [...childform]
    childData[ind].condtion.push(e.target.value)
    setChildForm(childData)
  }

  const handleDeleteChildCondition = (ind, cind) => {
    const childData = [...childform]
    childData[ind].condtion.splice(cind, 1)
    setChildForm(childData)
  }

  //Child Interest
  const handleChildIntirests = (e, ind) => {
    const childData = [...childform]
    childData[ind].interest.push(e.target.value)
    setChildForm(childData)
  }

  const handleDeleteChildInterest = (ind, iind) => {
    const childData = [...childform]
    childData[ind].interest.splice(iind, 1)
    setChildForm(childData)
  }

  //All Condition is Here
  const allconditonchild = [
    "High BP",
    "Diabetes"
  ]
  //All Condition is Here
  //All Intirests is Here
  const childallintirests = [
    "Nutrition",
    "Diabetes"
  ]
  //All Condition is Here

  //Send Data Api is Here
  const handelSendData = async (ind) => {
    const formData = new FormData();

    const profileAddress = {
      flatNo: childform[ind]?.Flatno,
      City: childform[ind]?.City,
      pincode: childform[ind]?.PinCode,
      state: childform[ind]?.State,
      country: childform[ind]?.Country,
    }

    formData.append("userId", Parant?._id);
    formData.append("profileId", childform[ind].profileId);
    formData.append("fullName", childform[ind].fullName);
    formData.append("age", childform[ind].childAge);
    formData.append("gender", childform[ind].ChildGender);
    formData.append("address", JSON.stringify(profileAddress));
    formData.append("image", childform[ind].ProfilePic);
    formData.append("condition", JSON.stringify(childform[ind].condtion ? childform[ind].condtion.map((item) => item) : []));
    formData.append("interests", JSON.stringify(childform[ind].interest ? childform[ind].interest.map((item) => item) : []));

    try {
      setLoad(true)
      const response = await UpdateChild(formData)
      if (response.status === true) {
        toast("Profile Updated Successfuly!", { type: "success", className: "success" })
      }
      setLoad(false)
    } catch (error) {
      setLoad(false)
    }
  }
  //Send Data api is Here

  return (
    <>
      <div className='bg-[#f5f5f5]'>
        <Header runwhenReload={load} />
        <div className='container pb-8 md:pb-14'>
          <div className='pt-2'>
            <div className='w-full md:w-[65%] md:mx-auto'>
              {/* Parant Details is Here */}

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex bg-yellow-100 px-2 py-[9px] rounded-md w-full  justify-between border border-black border-opacity-25 text-left text-[1rem] font-semibold text-black text-opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                      <div className='flex justify-between  w-[100%] items-center md:space-x-4'>
                        Parent Detail
                        <AiFillCaretDown
                          className={`${open ? "rotate-180 transform" : ""
                            } md:h-5 h-3 w-3 md:w-5 text-black`}
                        />
                      </div>

                    </Disclosure.Button>
                    <Transition
                      enter='transition duration-50 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-45 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel className='px-5  pb-5 shadow-2xl rounded-2xl w-full  text-[14px] md:text-[16px] text black'>
                        <div className='bg-white shadow-md'>
                          <div className='bg-[#F9D121] text-center py-2 rounded-tl-md rounded-tr-md tracking-wide'>Parent Details</div>
                          <div className='p-5'>
                            <div className='flex justify-center pt-4'>
                              <label className='relative cursor-pointer'>
                                <div className='w-[80px] h-[80px]'>
                                  <img src={parantimg} alt='src' className='bg-gray-200 p-2 h-full rounded-full' />
                                  <MdAddPhotoAlternate size={30} className='absolute text-[#0FA654] -top-1 -right-1' />
                                  <input disabled={Parant?.patientDetails[0].isParant} type='file' className='hidden' onChange={(e) => handelParantFile(e)} />
                                </div>
                              </label>
                            </div>
                            <div className='space-y-1 pt-3'>
                              <label className='text-black tracking-wide'>Full Name</label>
                              <input type='text' value={parant.fullName} disabled={Parant?.patientDetails[0].isParant} onChange={(e) => handelChange(e)} name='fullName' className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                            </div>
                            <div className='grid grid-cols-12 pt-3 space-x-5'>
                              <div className='col-span-6 space-y-1'>
                                <label className='text-black tracking-wide'>Age</label>
                                <input type='number' name='age' disabled={Parant?.patientDetails[0].isParant} value={parant.age} onChange={(e) => handelChange(e)} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                              </div>
                              <div className='col-span-6 space-y-1'>
                                <label className='text-black tracking-wide'>Gender</label>
                                <select name="gender" value={parant?.gender} disabled={Parant?.patientDetails[0].isParant} onChange={(e) => handelChange(e)} className='outline-none w-full text-sm py-[4.2px] rounded-sm px-2 border border-black'>
                                  <option>Select Gender</option>
                                  <option value={"Male"}>Male</option>
                                  <option value={"feMale"}>Female</option>
                                  <option value={"Other"}>Other</option>
                                </select>
                              </div>
                            </div>
                            <div className='space-y-1 pt-3'>
                              <label className='text-black tracking-wide'>Email id</label>
                              <input disabled value={Parant?.email} type='email' className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                            </div>
                            <div className='space-y-1 pt-3'>
                              <label className='text-black tracking-wide'>Mobile number</label>
                              <input disabled type='number' value={Parant?.phone} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                            </div>
                          </div>
                          <div className="flex justify-end pr-4 pb-4 ml-auto">
                            <button onClick={() => handelEditUser()} className="gradient hover:scale-90 transition-all px-6 tracking-wide py-[4px] rounded-lg text-[1rem] font-semibold">Save</button>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                    {
                      childform?.map((nesitem, ind) => (
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className='flex w-[97%] mt-[8px] bg-yellow-100 px-2 py-[9px] rounded-md ml-[3%]  justify-between border border-black border-opacity-25 text-left text-[1rem] font-semibold text-black text-opacity-90 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'>
                                <div className='flex justify-between w-[100%]  items-center md:space-x-4'>
                                 {nesitem.fullName}
                                  <AiFillCaretDown
                                    className={`${open ? "rotate-180 transform" : ""
                                      } md:h-5 h-3 w-3 md:w-5 text-black`}
                                  />
                                </div>

                              </Disclosure.Button>
                              <Transition
                                enter='transition duration-50 ease-out'
                                enterFrom='transform scale-95 opacity-0'
                                enterTo='transform scale-100 opacity-100'
                                leave='transition duration-45 ease-out'
                                leaveFrom='transform scale-100 opacity-100'
                                leaveTo='transform scale-95 opacity-0'
                              >
                                <Disclosure.Panel className='px-5  pb-5 shadow-2xl rounded-2xl w-full  text-[14px] md:text-[16px] text black'>
                                  {/* Child Details Form is Here */}
                                  <div className='bg-white shadow-md'>
                                    {/* Dynamic Name is Coming Here */}
                                    <div className='bg-[#F9D121] text-center py-2 rounded-tl-md rounded-tr-md tracking-wide'>Pateint Details</div>
                                    <div className='p-5'>
                                      <div className='flex justify-center pt-4'>
                                        <label className='relative cursor-pointer'>
                                          <div className='w-[80px] h-[80px]'>
                                            <img src={(profilePicturePreviews[ind]) || (nesitem?.ProfilePic)} alt='src' className='bg-gray-200 p-2 h-full rounded-full' />
                                            <MdAddPhotoAlternate size={30} className='absolute text-[#0FA654] -top-1 -right-1' />
                                            <input type='file' name={"ProfilePic"} className='hidden' onChange={(e) => handelChildFile(e, ind)} />
                                          </div>
                                        </label>
                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label className='text-black tracking-wide'>Full Name</label>
                                        <input type='text' name='fullName' value={nesitem.fullName} onChange={(e) => handelOnChange(e, ind)} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                                      </div>
                                      <div className='grid grid-cols-12 pt-3 space-x-5'>
                                        <div className='col-span-6 space-y-1'>
                                          <label className='text-black tracking-wide'>Age</label>
                                          <input type='number' name='childAge' value={nesitem.childAge} onChange={(e) => handelOnChange(e, ind)} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                                        </div>
                                        <div className='col-span-6 space-y-1'>
                                          <label className='text-black tracking-wide'>Gender</label>
                                          <select name="ChildGender" value={nesitem.ChildGender} onChange={(e) => handelOnChange(e, ind)} className='outline-none w-full text-sm py-[4.2px] rounded-sm px-2 border border-black'>
                                            <option>Select Gender</option>
                                            <option value={"Male"}>Male</option>
                                            <option value={"female"}>Female</option>
                                            <option value={"Other"}>Other</option>
                                          </select>
                                        </div>

                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label className='text-black tracking-wide'>Email id</label>
                                        <input type='email' value={nesitem?.email} disabled className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label className='text-black tracking-wide'>Mobile number</label>
                                        <input type='number' disabled value={nesitem?.mobileno} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label className='text-black tracking-wide'>Flat/Street No</label>
                                        <input type='text' name='Flatno' value={nesitem?.Flatno} onChange={(e) => handelOnChange(e, ind)} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label className='text-black tracking-wide'>City/Town/District</label>
                                        <input type='text' name='City' value={nesitem.City} onChange={(e) => handelOnChange(e, ind)} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label className='text-black tracking-wide'>PinCode</label>
                                        <input type='text' name='PinCode' value={nesitem.PinCode} onChange={(e) => handelOnChange(e, ind)} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label className='text-black tracking-wide'>State</label>
                                        <input type='text' name='State' value={nesitem.State} onChange={(e) => handelOnChange(e, ind)} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label className='text-black tracking-wide'>Country</label>
                                        <input type='text' name='Country' value={nesitem.Country} onChange={(e) => handelOnChange(e, ind)} className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black' />
                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label>Conditions</label>
                                        <select
                                          onChange={(e) => handleChildCondition(e, ind)}
                                          className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black'
                                        >
                                          <option>Select Condition</option>
                                          {allconditonchild?.map((item, cindx) => {
                                            if (!nesitem.condtion.includes(item)) {
                                              return (
                                                <option key={cindx} value={item}>
                                                  {item}
                                                </option>
                                              );
                                            }
                                            return null; // Exclude already selected options
                                          })}
                                        </select>
                                        <div className='pt-1 space-x-1'>
                                          {
                                            nesitem?.condtion?.map((item, cind) => (
                                              <span key={ind} className='bg-gray-100 text-black tracking-wide px-2 py-[3px] text-sm rounded-md'>{item} <AiFillCloseCircle onClick={() => handleDeleteChildCondition(ind, cind)} size={20} className="cursor-pointer ml-1 inline-block text-red-500" /></span>
                                            ))
                                          }
                                        </div>
                                      </div>
                                      <div className='space-y-1 pt-3'>
                                        <label>Interests</label>
                                        <select
                                          onChange={(e) => handleChildIntirests(e, ind)}
                                          className='outline-none w-full text-sm py-[6px] rounded-sm px-2 border border-black'
                                        >
                                          <option>Select intirest</option>
                                          {childallintirests?.map((item, iindx) => {
                                            if (!nesitem?.interest.includes(item)) {
                                              return (
                                                <option key={iindx} value={item}>
                                                  {item}
                                                </option>
                                              );
                                            }
                                            return null; // Exclude already selected options
                                          })}
                                        </select>
                                        <div className='pt-1 space-x-1'>
                                          {
                                            nesitem?.interest?.map((item, iind) => (
                                              <span key={ind} className='bg-gray-100 text-black tracking-wide px-2 py-[3px] text-sm rounded-md'>{item} <AiFillCloseCircle onClick={() => handleDeleteChildInterest(ind, iind)} className="cursor-pointer ml-1 inline-block text-red-500" /></span>
                                            ))
                                          }
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex justify-end pr-4 pb-4 ml-auto">
                                      <button onClick={() => handelSendData(ind)} className="gradient hover:scale-90 transition-all px-6 tracking-wide py-[4px] rounded-lg text-[1rem] font-semibold">Save</button>
                                    </div>
                                  </div>
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>
                      ))
                    }
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
        <Footer />
        <Loader show={load} />
      </div>
    </>
  )
}

export default Account 