/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import latestbg from '@/assets/images/latest-bg.svg';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useDictionary from '../hooks/useDictionary';
import { getAllProduct } from '../utils/getProduct';
import ProductCardThree from './ProductCardThree';

// Import Swiper styles
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LatestProductThree = () => {
    const { language, dictionary } = useDictionary();
    const { sectionTitle, seeMore } = dictionary.ProductCard;
    const [products, setProducts] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productsData = await getAllProduct(
                    language,
                    'all',
                    null,
                    'new_arrival',
                    '',
                    1,
                    20
                );
                setProducts(productsData.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProduct();
    }, [language]);

    return (
        <div id="product-section" className="product-section">
            <div className="relative pt-16 pb-20 product-area">
                <Image
                    src={latestbg}
                    alt="bg"
                    className="absolute top-0 left-0 z-[-1] w-full h-full object-cover object-center"
                />
                <div className="container">
                    <div className="flex items-center justify-between mb-[50px]">
                        <h2 className="text-2xl font-semibold text-gray-800 capitalize md:text-4xl">
                            {sectionTitle}
                        </h2>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => swiperRef.current?.slidePrev()}
                                type="button"
                                className="flex items-center justify-center w-8 h-8 text-xs text-gray-900 bg-white rounded-full sm:w-10 sm:h-10 sm:text-base swiper-button-prev-latest"
                                aria-label="slider prev button"
                            >
                                <FaArrowLeftLong />
                            </button>
                            <button
                                onClick={() => swiperRef.current?.slideNext()}
                                type="button"
                                className="flex items-center justify-center w-8 h-8 text-xs text-gray-900 bg-white rounded-full sm:w-10 sm:h-10 sm:text-base swiper-button-next-latest"
                                aria-label="slider next button"
                            >
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>

                    {products.length > 0 ? (
                        <Swiper
                            slidesPerView={Math.min(products.length, 4)}
                            spaceBetween={30}
                            pagination={{ clickable: true }}
                            navigation={{
                                nextEl: `.swiper-button-next-latest`,
                                prevEl: `.swiper-button-prev-latest`,
                            }}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            breakpoints={{
                                375: {
                                    slidesPerView: Math.min(products.length, 2),
                                    spaceBetween: 16,
                                },
                                768: {
                                    slidesPerView: Math.min(products.length, 3),
                                    spaceBetween: 20,
                                },
                                1280: {
                                    slidesPerView: Math.min(products.length, 4),
                                    spaceBetween: 30,
                                },
                            }}
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductCardThree product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="text-center text-gray-600">
                            No products found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestProductThree;
