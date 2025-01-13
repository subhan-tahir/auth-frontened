import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import errorPic from '../assets/notFound.png'
const ErrorPage = () => {
  return (
    <>
    <div className='flex flex-col justify-center items-center gap-2 h-[80vh] notfound relative  max-w-[1100px] m-auto'> 
        <img src={errorPic} alt="" className='absolute left-0 -rotate-12 top-20'/>
        <h1 className='text-[128px] font-[400]  text-[#ff3c81]'>404</h1>
        <h2 className=''>Oops, The Page you are looking for can't be found!</h2>
        <Link to={'/'}>Back to home</Link>
    </div>
    
    
    </>
  )
}

export default ErrorPage