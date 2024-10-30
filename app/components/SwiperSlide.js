"use client"

import { useRef } from 'react';
// For Typescript
// import SwiperCore from "swiper";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const SliderComponent = () => {
    const swiperRef = useRef();

    // For Typescript!
    // const swiperRef = useRef<SwiperCore>();

    const sliderSettings = {
        440: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        680: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    };

    return (
        <div>
            <button onClick={() => swiperRef.current?.slidePrev()}>Prev</button>

            <Swiper
                slidesPerView={3}
                breakpoints={sliderSettings}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
            </Swiper>

            <button onClick={() => swiperRef.current?.slideNext()}>Next</button>
        </div>
    );
};

export default SliderComponent;
