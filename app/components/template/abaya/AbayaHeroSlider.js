'use client';

import { getHeroImage } from '@/utils/getHeroImage';
import Image from 'next/image';
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
            className="hero pt-4 md:pt-6 lg:pt-16 pb-[30px] lg:pb-20"
        >
            <div className="hero-area">
                <div className="container">
                    <div className="w-full overflow-hidden rounded-[20px]">
                        {loading ? (
                            <div className="w-full overflow-hidden h-[150px] lg:h-[350px]"></div>
                        ) : (
                            <Swiper
                                spaceBetween={30}
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
                                {images?.map((img) => (
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbayaHeroSlider;
