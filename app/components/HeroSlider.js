'use client';

import { getHeroImage } from '@/utils/getHeroImage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './hero.css';

import Head from 'next/head';

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
        <>
            <Head>
                {images?.map((img) => (
                    <link
                        key={img.id}
                        rel="preload"
                        href={img.image_url}
                        as="image"
                    />
                ))}
            </Head>
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
                                                placeholder="blur"
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNFMEUwRTAiIC8+PC9zdmc+"
                                            />
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSlider;