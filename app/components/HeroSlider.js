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

const HeroSlider = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dynamicClass, setDynamicClass] = useState('h-[350px]');

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const heroImages = await getHeroImage();
                setImages(heroImages.data);
            } catch {
                console.log('hero slide image fetch failed');
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setDynamicClass('h-auto');
                }, 2000);
            }
        };
        fetchHero();
    }, []);

    if (!images) {
        return null;
    }

    return (
        <div
            id="hero"
            className="hero"
        >
            <div className="hero-area">
                <div className={`w-full overflow-hidden ${dynamicClass}`}>
                    {loading ? (
                        <div className="w-full overflow-hidden h-[150px] lg:h-[350px]"></div>
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
                            {images?.map((img) => (
                                <SwiperSlide key={img.id}>
                                    <Link href={img.url}>
                                        <Image
                                            src={img.image_url}
                                            alt={img.title}
                                            width={900}
                                            priority
                                            height={500}
                                            className="object-cover w-full h-full"
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
