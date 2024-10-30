"use client"

import bannerBg from '@/assets/images/banner-bg.svg';
import Image from 'next/image';
import useDictionary from '../hooks/useDictionary';

const Banner = () => {
    const {dictionary} = useDictionary();
  return (
      <div className="banner">
          <div className="relative w-full banner-area">
              <Image src={bannerBg} alt='banner page' className='absolute top-0 left-0 z-10 object-cover w-full h-full' />
              <div className="container">
                  <div className="flex justify-center items-center h-[150px] relative z-20">
                      <h2 className="text-2xl font-semibold text-white md:text-4xl product-title">
                          {dictionary.Banner.shopBanner}
                      </h2>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Banner