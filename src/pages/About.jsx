import React from 'react'
import Home from './Home'
import { Link } from 'react-router-dom'
import DetailCard from '../DetailCard'
import Header from '../Header'
const About = () => {
    return (
        <>


            {/* <Home  /> */}
            <Header />
            <DetailCard header={'About'} des={'Lorem ipsum dolor siasdt amet consectetur adipisicing elit. Autem repellat iste debitis doloremque amet perspiciatis enim animi veniam vitae dolor.'} />
            <Link to='/about/moreInfo'>  <button className='bg-black text-white p-2 m-auto block rounded-md cursor-pointer hover:bg-white hover:text-black border-black  transition-all border-2 '>Click me for more info</button></Link>
        </>
    )
}

export default About