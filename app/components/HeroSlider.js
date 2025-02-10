'use client';

import { getHeroImage } from '@/utils/getHeroImage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'swiper/css/bundle'; // All necessary Swiper CSS in one import
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './hero.css';

const HeroSlider = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const heroImages = await getHeroImage();
                setImages(heroImages.data);
            } catch {
                console.log('hero slide image fetch failed');
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, []);

    return (
            <div
                id="hero"
                className="hero h-[370px] overflow-hidden"
            >
                <div className="hero-area">
                    <div className="hero-slider-container">
                        {loading ? (
                            <div className="w-full h-[370px] bg-gray-200 animate-pulse"></div>
                        ) : (
                            <Swiper
                                spaceBetween={30}
                                loop={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                effect={'fade'}
                                navigation={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[
                                    EffectFade,
                                    Navigation,
                                    Pagination,
                                    Autoplay,
                                ]}
                                className="mySwiper"
                            >
                                {images?.map((img, index) => (
                                    <SwiperSlide key={img.id}>
                                        <Link
                                            className='w-full h-[370px] overflow-hidden'
                                            href={img.url}
                                            aria-label={`View details for ${img.title}`}
                                        >
                                            <Image
                                                src={img.image_url}
                                                alt={img.title}
                                                width={900}
                                                height={500}
                                                className="object-cover w-full h-auto"
                                                priority={index === 0}
                                                loading={
                                                    index === 0
                                                        ? 'eager'
                                                        : 'lazy'
                                                }
                                                quality={100}
                                            />
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default HeroSlider;
