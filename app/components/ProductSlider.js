'use client';

import { useContext, useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import noAvailable from '../assets/icons/no-available.svg';
import youtube from '../assets/icons/youtube-lg.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './productSlider.css';

// import required modules
import Image from 'next/image';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ModalContext } from '../context/ModalContext';
import { trackEvent } from '../utils/facebookPixel';
import ImageMagnifier from './ImageMagnifier';

const ProductSlider = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { isOpen, setIsOpen } = useContext(ModalContext);
    const { product_images, video_link } = product;

    // For Google tag manager
    useEffect(() => {
        window.dataLayer.push({
            event: 'view_item',
            ecommerce: {
                items: product,
            },
        });

        // For Facebook Pixels
        trackEvent('View Item', product);
    }, [product]);



    return (
        <div className="product-slider">
            {product_images && product_images.length > 0 ? (
                <div className="w-full h-[460px] sm:h-[600px] md:h-[880px] lg:h-[550px] xl:h-[530px]: 2xl:h-[620px] lg:rounded-[30px] overflow-hidden mb-4">
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        passiveListeners={true}
                        className="w-full h-full"
                    >
                        {product_images.map((originalImg, index) => (
                            <SwiperSlide
                                key={index}
                                className="relative"
                            >
                                <div className="relative w-full h-full overflow-hidden">
                                    <ImageMagnifier
                                        src={originalImg.original_url}
                                        width={400}
                                        height={550}
                                        zoomLevel={2.5}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <Image
                    src={noAvailable}
                    alt="hero slider"
                    width={100}
                    height={100}
                    className="w-full h-full"
                />
            )}
            {product_images && (
                <div className="slider-thumb">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        navigation={true}
                        watchSlidesProgress={true}
                        passiveListeners={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {video_link && (
                            <SwiperSlide>
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="w-full h-full"
                                >
                                    <Image
                                        src={youtube}
                                        alt="youtube"
                                        width={100}
                                        height={100}
                                        className="object-contain w-full h-full"
                                    />
                                </button>
                            </SwiperSlide>
                        )}
                        {product_images.map((thumbImg, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={thumbImg.preview_url}
                                    alt="preview slider"
                                    width={150}
                                    height={150}
                                    className="w-full h-full"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default ProductSlider;
