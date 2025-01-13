import React from 'react'
import { Link } from 'react-router-dom'
import DetailCard from '../DetailCard'
import Header from '../Header'
import Sidebar from '../Components/Sidebar'

const Home = () => {
    return (
        <>
        <Sidebar />
            <Header />
            <DetailCard header={'Home'} des={'Lorem ipsum dolor siasdt amet consectetur adipisicing elit. Autem repellat iste debitis doloremque amet perspiciatis enim animi veniam vitae dolor.'} />
        </>
    )
}

export default Home