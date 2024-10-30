'use client';

import Image from 'next/image';
// Import Swiper React components
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './hero.css';

// import required modules
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

const HeroSliderThree = ({ images }) => {
    const swiperRef = useRef();
    return (
        <div
            id="hero"
            className="hero py-[30px] lg:py-[60px]"
        >
            <div className="container">
                <div className="hero-area-3 relative">
                    <div className="items-center gap-3 hidden xl:flex">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            type="button"
                            className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-base rounded-full flex justify-center items-center text-gray-900 bg-white swiper-button-prev-three absolute -left-12 top-1/2 -translate-y-1/2"
                        >
                            <FaArrowLeftLong />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            type="button"
                            className="w-8 h-8 sm:w-10 sm:h-10 r text-xs sm:text-base rounded-full flex justify-center items-center text-gray-900 bg-white swiper-button-next-three absolute -right-12 top-1/2 -translate-y-1/2"
                        >
                            <FaArrowRightLong />
                        </button>
                    </div>
                    <div className="w-full h-[160px] md:h-[380px] rounded-xl overflow-hidden">
                        <Swiper
                            spaceBetween={30}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            effect={'fade'}
                            // navigation={true}
                            // pagination={{
                            //     clickable: true,
                            // }}
                            modules={[
                                EffectFade,
                                Navigation,
                                Pagination,
                                // Autoplay,
                            ]}
                            navigation={{
                                nextEl: `.swiper-button-next-three`,
                                prevEl: `.swiper-button-prev-three`,
                            }}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            className="mySwiper"
                        >
                            {images.map((img) => (
                                <SwiperSlide key={img.id}>
                                    <Image
                                        src={img.image_url}
                                        alt={img.title}
                                        width={900}
                                        height={500}
                                        className="object-cover w-full h-full"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSliderThree;
