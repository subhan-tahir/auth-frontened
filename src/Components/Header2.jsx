import React from 'react'

const Header2 = () => {
  return (
    <>
    <div className='flex gap-3 items-center justify-end w-full'>
        <button className='cursor-pointer hover:text-gray-400 transition-all duration-300 ease-in-out font-bold rounded-[35px] py-3 px-5 border bg-white text-black hover:bg-gray-100'>Log in</button>
        <button className='cursor-pointer hover:text-gray-400 transition-all duration-300 ease-in-out font-bold rounded-[35px] py-3 px-5 border '>Sign up</button>
    </div>
    
    
    </>
  )
}

export default Header2