import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const VideoPopup = (props) => {
  let [isOpen, setIsOpen] = useState(true); //close and open modal if Expert Add team Member

  function closeModal() {
    setIsOpen(false);
    props.closeVideo(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
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
            <div className='flex min-h-full  items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full md:w-[45%] transform  text-left align-middle shadow-xl transition-all'>
                  <div className='relative'>
                    <video controls controlsList='nodownload' className="mx-auto">
                      <source src={props.healthpediaVideo} type='video/mp4' />
                    </video>
                    <div
                      onClick={closeModal}
                      className='absolute right-0 top-0  md:-top-6 md:-right-2 bg-white text-black p-1 rounded-full cursor-pointer hover:scale-105 transition-all'
                    >
                      <AiOutlineClose size={18} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default VideoPopup;
