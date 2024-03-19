import React from 'react'
import { BsSearch } from 'react-icons/bs'

const SearchBar = ({VALUE,ONCHANGE,TYPE}) => {
  return (
     <div>
        <div className='md:pb-5 pb-2 pt-2 px-5 md:px-0'>
            <div className='flex bg-white mx-auto border-[.5px] border-opacity-30 pt-1 pl-1 shadow-md rounded-md items-center w-full md:w-[450px]'>
              <input
                type={TYPE}
                value={VALUE}
                onChange={(e) => ONCHANGE(e.target.value)}
                placeholder='Search'
                className='text-sm rounded-md px-3 w-full outline-none py-[4px] md:py-[6px]'
              />
              <div className='inline px-4 rounded-br-md rounded-tr-md  text-gray-600 text-sm'>
                <BsSearch size={20} />
              </div>
            </div>
          </div>
     </div>
  )
}

export default SearchBar