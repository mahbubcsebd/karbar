'use client';

import { getHeroImage } from '@/utils/getHeroImage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'swiper/css/bundle';
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
                console.log('Hero slide image fetch failed');
            } finally {
                setLoading(false);
            }
        };
        fetchHero();
    }, []);

    return (
        <div
            id="hero"
            className="hero"
        >
            <div className="hero-area">
                <div className="hero-slider-container">
                    {loading ? (
                        <div className="w-full h-[220px] lg:h-[370px] bg-gray-200 animate-pulse mb-10"></div>
                    ) : (
                        <Swiper
                            spaceBetween={0}
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
                                        href={img.url}
                                        aria-label={`View details for ${img.title}`}
                                    >
                                        <div className="relative w-full h-[100px] md:h-[220px] lg:h-[370px]">
                                            <Image
                                                src={img.image_url}
                                                alt={img.title}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                                loading={
                                                    index === 0
                                                        ? 'eager'
                                                        : 'lazy'
                                                }
                                                quality={100}
                                            />
                                        </div>
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
