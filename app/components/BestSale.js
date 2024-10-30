import Image from 'next/image'
import React from 'react'

import BestSaleImage from "../assets/images/best-sale.png"

const BestSale = () => {
  return (
    <div className='w-full h-[240px]'>
        <Image src={BestSaleImage} alt="" className='object-cover w-full h-full' />
    </div>
  )
}

export default BestSale