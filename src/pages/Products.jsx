import React from 'react'
import DetailCard from '../DetailCard'
import ProductCard from '../ProductCard'
import Header from '../Header'

const Products = () => {


  return (
   <>
   <Header />
   <DetailCard header={'our Products'} des={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati cumque eaque recusandae.'}/>
   <div className='flex flex-wrap gap-5 p-5 justify-center'>
    <ProductCard />

   </div>
   </>
  )
}

export default Products