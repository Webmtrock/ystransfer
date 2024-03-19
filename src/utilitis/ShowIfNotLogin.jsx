import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const ShowIfNotLogin = (props) => {
  let [isOpen, setIsOpen] = useState(true); //close and open modal if User Not Login

  function closeModal() {
    setIsOpen(false);
    props.handleClosefun(false);
  }

  return (
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
            <div className='flex min-h-full items-center justify-center p-2 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md text-xl transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all'>
                  <div className='mt-2 px-4 text-center font-semibold tracking-wide'>
                    Oops! It Seems you have not login Yet
                  </div>

                  <div className='mt-4 pl-5 pr-3'>
                    <div className='flex items-center justify-between'>
                      <button
                        onClick={closeModal}
                        className='inline-block bg-red-500 text-white px-6 rounded-md font-semibold text-sm hover:scale-95 transition-all py-[4px]'
                      >
                        CANCEL
                      </button>
                      <Link to='/login'>
                        <button className='inline-block gradient text-black px-8 font-semibold rounded-md text-sm hover:scale-95 transition-all py-[4px]'>
                          Login now
                        </button>
                      </Link>
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

export default ShowIfNotLogin;
