import React from 'react'

const DetailCard = ({ header, des }) => {
    return (
        <>
            <div className='max-w-[992px] mt-20 relative m-auto text-center p-[5%] flex flex-col gap-3 items-center justify-center'>
                <h1 className='md:text-4xl text-2xl text-red-700  font-bold capitalize'>Welcome to {header}</h1>
                <p className='text-[18px] leading-8'>{des}</p>
            </div>

        </>
    )
}

export default DetailCard