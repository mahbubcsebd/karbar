'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './hero.css';



// import required modules

import { useRef } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import useDictionary from '../hooks/useDictionary';
import ProductCard from './ProductCard';

const SingleHomeCategories = ({ category }) => {
    const {dictionary} = useDictionary();
    const swiperRef = useRef();

    // const handleNextClick = () => {
    //     swiper.slideNext();
    // };

    // const handlePrevClick = () => {
    //     swiper.slidePrev();
    // };
    const { key, categories } = category;
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-[50px]">
                <h2 className="text-2xl font-semibold text-gray-800 capitalize md:text-4xl">
                    {key}
                </h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        type="button"
                        className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-base rounded-full flex justify-center items-center text-gray-900 bg-[#D9D9D9] ${`swiper-button-prev-${key}`}`}
                    >
                        <FaArrowLeftLong />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        type="button"
                        className="w-8 h-8 sm:w-10 sm:h-10 r text-xs sm:text-base rounded-full flex justify-center items-center text-gray-900 bg-[#D9D9D9] ${`swiper-button-next-${key}`}"
                    >
                        <FaArrowRightLong />
                    </button>
                </div>
            </div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                // modules={[Pagination]}
                navigation={{
                    nextEl: `.swiper-button-next-${key}`,
                    prevEl: `.swiper-button-prev-${key}`,
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {categories.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SingleHomeCategories;
