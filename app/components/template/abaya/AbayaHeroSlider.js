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

const AbayaHeroSlider = () => {
    const [images, setImages] = useState(null);
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
            className="pb-[30px] lg:pb-20"
        >
            <div className="hero-area">
                {loading ? (
                    <div className="w-full overflow-hidden h-[220px] lg:h-[650px] animate-pulse"></div>
                ) : (
                    <Swiper
                        spaceBetween={0}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        effect={'fade'}
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[EffectFade, Navigation, Pagination, Autoplay]}
                        className="w-full h-full mySwiper"
                    >
                        {images?.map((img) => (
                            <SwiperSlide key={img.id}>
                                <Link
                                    href={img.url}
                                    className="w-full overflow-hidden h-[220px] lg:h-[650px] block"
                                >
                                    <Image
                                        src={img.image_url}
                                        alt={img.title}
                                        width={1440}
                                        height={650}
                                        className="object-cover w-full h-full"
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default AbayaHeroSlider;
