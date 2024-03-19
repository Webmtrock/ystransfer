import React, { useEffect, useState } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GetUserandChild } from '../../api_config/Auth_Services';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { LoginPaymentStatus, ProfileID } from '../../redux/RoleSlice';
import { ls } from '../../utilitis/SecureLocalStorage';

const SwitchProfile = () => {

      //Switch Profile if User is Purchased New Program Other Wise Login
       const loginPaymentStatus=ls.get("switchprofile")
       const loginPaymentstatusRedux=useSelector((state)=>state?.userrole?.loginAndpaymentstatus)
       const UserId=ls.get("uId")
     //Switch Profile if User is Purchased New Program Other Wise Login

     //Get User Along With Child
     const [user,setUser]=useState([])
     const handelUserWithChild=async()=>{
        if(!UserId){
            return null
        }else{
            try {
                const response=await GetUserandChild(UserId)
                if(response.status===true){
                 setUser(response.data)
                }else{
                    toast(response.message,{type:"error",className:"error"})
                }
            } catch (error) {
                
            }
        }
     }

     useEffect(()=>{
       handelUserWithChild()
     },[loginPaymentstatusRedux || loginPaymentStatus])
     //Get User Along With Child 
    
     //Switch Profile While User is Purchased new Program or Login
     const dispatch=useDispatch()
     const handelClose=()=>{ } //Normal Empty Function for Non Closing Modal
     const handelSwitchProfile=(item,pic)=>{
        ls.save("switchname",item.fullName)
        ls.save("switchemail",item.emailId)
        ls.save("switchphoto",pic)
        ls.save("switchid",item.profileId)
        ls.save("switchprofile",false)
        dispatch(ProfileID(item.profileId))
        dispatch(LoginPaymentStatus(false))
     }
     //Switch Profile While User is Purchased new Program or Login

    return (
        <>
            <Transition appear show={(loginPaymentStatus||loginPaymentstatusRedux)&&user?.patientDetails?.length>0? true : false} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-[99]'
                    onClose={handelClose}
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
                        <div className='flex min-h-full items-center justify-center md:p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full md:w-auto md:h-[400px] h-screen overflow-y-scroll transform  md:rounded-md bg-white text-left align-middle Shadow2xl transition-all'>
                                   <div>
                                      <div className='flex items-center space-x-4 border-b border-black p-5 border-opacity-5'>
                                         <div className='w-[70px] h-[70px] border rounded-full'>
                                            <img src={user?.profilePicture?user?.profilePicture:"/assets/images/Male.png"} alt='img' className='rounded-full w-full h-full'/>
                                         </div>
                                         <div>
                                            <div className='leading-tight font-semibold text-opacity-90 text-black tracking-wide text-[1rem]'>{user?.fullName}</div>
                                            <div className='text-blue-500 leading-tight tracking-wide text-[.9rem]'>{user?.email?.substring(0,12)}...</div>
                                         </div>
                                      </div>
                                      <div className='bg-gray-50'>
                                        <div className='text-[1rem] text-black pl-5 text-center font-bold py-[4px] tracking-wide text-opacity-80'>SWITCH PATEINT'S</div>
                                        <div className='space-y-3'>
                                            {
                                                user?.patientDetails?.map((item,ind)=>(
                                                    <>
                                                        <div className='border-b justify-between pr-5 flex items-center'>
                                                            <div className='flex items-center space-x-4 pb-[10px] pt-[5px] px-5'>
                                                                <div className='w-[50px] h-[50px] border rounded-full'>
                                                                    <img src={item?.image ? item.image : item?.gender === "Male" ? "/assets/images/Male.png" : item?.gender === "FeMale" ? "/assets/images/femaile.png" : "/assets/images/Male.png"} alt='img' className='w-full rounded-full h-full'/>
                                                                </div>
                                                                <div>
                                                                    <div className='leading-tight font-normal text-black tracking-wide text-[.95rem]'>{item?.fullName}</div>
                                                                    <div className='text-gray-400 leading-tight tracking-wide text-[.85rem]'>{item?.emailId?.substring(0,12)}...</div>
                                                                </div>
                                                            </div>
                                                            <button onClick={()=>handelSwitchProfile(item,item?.image ? item.image : item?.gender == "Male" ? "/assets/images/Male.png" : item?.gender == "FeMale" ? "/assets/images/femaile.png" : "/assets/images/Male.png")} className='bg-blue-500 text-white tracking-wide px-5 py-[4px] rounded-[5px] shadow-sm cursor-pointer hover:scale-90 transition-all hover:bg-blue-700 text-[.9rem]'>Switch</button>
                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </div>
                                      </div>
                                   </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default SwitchProfile