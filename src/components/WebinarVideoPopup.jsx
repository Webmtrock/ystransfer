import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

const WebinarVideoPopup = (props) => {
  let [isOpen, setIsOpen] = useState(true); //close and open modal if user is going to apply Discountn Code

  function closeModal() {
    setIsOpen(false);
    props.closeModal(false);
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
                <Dialog.Panel>
                  <div className='mt-2 p-5 py-5 w-full h-full md:w-[500px] md:h-[300px]'>
                    <video
                      controls
                      controlsList='nodownload'
                      className='cursor-pointer w-full h-full'
                    >
                      <source src={props.webinarIndVideo} type='video/mp4' />
                    </video>
                    <RiCloseFill
                      onClick={closeModal}
                      size={35}
                      className='text-white cursor-pointer absolute right-0  top-0'
                    />
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

export default WebinarVideoPopup;
