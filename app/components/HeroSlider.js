'use client';

import { getHeroImage } from '@/utils/getHeroImage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic'; // Lazy load Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
    ssr: false,
});
const SwiperSlide = dynamic(
    () => import('swiper/react').then((mod) => mod.SwiperSlide),
    { ssr: false }
);
const Autoplay = dynamic(
    () => import('swiper/modules').then((mod) => mod.Autoplay),
    { ssr: false }
);
const EffectFade = dynamic(
    () => import('swiper/modules').then((mod) => mod.EffectFade),
    { ssr: false }
);
const Navigation = dynamic(
    () => import('swiper/modules').then((mod) => mod.Navigation),
    { ssr: false }
);
const Pagination = dynamic(
    () => import('swiper/modules').then((mod) => mod.Pagination),
    { ssr: false }
);

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
                        <div className="w-full h-[300px] bg-gray-200 animate-pulse"></div>
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
                            pagination={{ clickable: true }}
                            modules={[
                                EffectFade,
                                Navigation,
                                Pagination,
                                Autoplay,
                            ]}
                            className="mySwiper"
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={img.id}>
                                    <Link
                                        href={img.url}
                                        aria-label={`View details for ${img.title}`}
                                    >
                                        <div className="relative w-full h-[500px]">
                                            <Image
                                                src={img.image_url}
                                                alt={img.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover"
                                                priority={index === 0} // Preload only first image
                                                loading={
                                                    index === 0
                                                        ? 'eager'
                                                        : 'lazy'
                                                }
                                                quality={80}
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
