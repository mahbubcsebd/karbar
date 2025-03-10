'use client';

import { getHeroImage } from '@/utils/getHeroImage';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './hero.css';

const HeroSliderThree = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const heroImages = await getHeroImage();
                setImages(heroImages.data);
            } catch {
                console.error('Hero slide image fetch failed');
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, []);

    const handlePrevSlide = useCallback(() => {
        swiperRef.current?.slidePrev();
    }, []);

    const handleNextSlide = useCallback(() => {
        swiperRef.current?.slideNext();
    }, []);

    if (loading) return <div className="w-full h-[220px] lg:h-[380px] bg-gray-200 animate-pulse mb-10"></div>; // Avoid rendering if loading

    return (
        <div
            id="hero"
            className="hero py-[30px] lg:py-[60px]"
        >
            <div className="container">
                <div className="relative hero-area-3">
                    <div className="items-center hidden gap-3 xl:flex">
                        <button
                            onClick={handlePrevSlide}
                            type="button"
                            className="absolute flex items-center justify-center w-8 h-8 text-xs text-gray-900 -translate-y-1/2 bg-white rounded-full sm:w-10 sm:h-10 sm:text-base swiper-button-prev-three -left-12 top-1/2"
                        >
                            <FaArrowLeftLong />
                        </button>
                        <button
                            onClick={handleNextSlide}
                            type="button"
                            className="absolute flex items-center justify-center w-8 h-8 text-xs text-gray-900 -translate-y-1/2 bg-white rounded-full sm:w-10 sm:h-10 sm:text-base swiper-button-next-three -right-12 top-1/2"
                        >
                            <FaArrowRightLong />
                        </button>
                    </div>

                    <div className="w-full">
                        <Swiper
                            spaceBetween={30}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            effect="fade"
                            modules={[EffectFade, Navigation, Pagination]}
                            navigation={{
                                nextEl: `.swiper-button-next-three`,
                                prevEl: `.swiper-button-prev-three`,
                            }}
                            onBeforeInit={(swiper) =>
                                (swiperRef.current = swiper)
                            }
                            className="mySwiper"
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={img.id}>
                                    <Link
                                        href={img.url}
                                        className="h-[160px] md:h-[380px] rounded-xl overflow-hidden block"
                                    >
                                        <Image
                                            src={img.image_url}
                                            alt={img.title}
                                            fill
                                            className="object-cover w-full h-full rounded-xl"
                                            priority={index === 0}
                                            loading={
                                                index === 0 ? 'eager' : 'lazy'
                                            }
                                            quality={100}
                                        />
                                    </Link>
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
