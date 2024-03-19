import React, { Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { useState } from 'react';
import {IoMdSettings} from "react-icons/io"


const ChildNotPurchase = ({ closeavoidmodal }) => {

    const [open, setOpen] = useState(true)
    const closeModal = () => {
        closeavoidmodal(false)
    }

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-[99]'
                    onClose={closeModal}
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
                        <div className='flex min-h-full items-center justify-center p-1 md:p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full md:w-auto transform overflow-hidden rounded-2xl bg-yellow-50 p-5 text-left align-middle shadow-xl transition-all'>
                                    <div className='mt-2 md:p-5 md:py-5'>
                                        <div className='text-center tracking-wide pb-4'>
                                            Go to <span className='text-black font-semibold tracking-wide'>Setting <IoMdSettings className='inline-block' size={20}/></span> & Switch To Parent For Subscribe.
                                        </div> 
                                        <div className='flex items-center justify-center'>
                                            <button
                                                onClick={closeModal}
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
    )
}

export default ChildNotPurchase