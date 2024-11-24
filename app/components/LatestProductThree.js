/* eslint-disable react-hooks/exhaustive-deps */
'use client';

// Import Swiper React components
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
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './hero.css';

const LatestProductThree = () => {
    const { language, dictionary } = useDictionary();
    const { sectionTitle, seeMore } = dictionary.ProductCard;
    const [products, setProducts] = useState([]);
    const swiperRef = useRef();

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
        <div
            id="product-section"
            className="product-section"
        >
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
                                className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-base rounded-full flex justify-center items-center text-gray-900 bg-white ${`swiper-button-prev-latest"
                            >
                                <FaArrowLeftLong />
                            </button>
                            <button
                                onClick={() => swiperRef.current?.slideNext()}
                                type="button"
                                className="w-8 h-8 sm:w-10 sm:h-10 r text-xs sm:text-base rounded-full flex justify-center items-center text-gray-900 bg-white swiper-button-next-latest"
                            >
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <Swiper
                        slidesPerView={
                            products.length < 4 ? products.length : 4
                        }
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        // modules={[Pagination]}
                        navigation={{
                            nextEl: `.swiper-button-next-latest`,
                            prevEl: `.swiper-button-prev-latest`,
                        }}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {products.length > 0 ? (
                            <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px] ">
                                {products.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <ProductCardThree
                                            key={product.id}
                                            product={product}
                                        />
                                    </SwiperSlide>
                                ))}
                            </div>
                        ) : (
                            <div>No products found</div>
                        )}
                    </Swiper>
                </div>
                {/* <div className="container">
                    <SectionTitle title={sectionTitle} />
                    {products.length > 0 ? (
                        <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px] ">
                            {products.map((product) => {
                                return (
                                    <ProductCardThree
                                        key={product.id}
                                        product={product}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div>No products found</div>
                    )}
                    <div className="flex justify-center pt-10 md:pt-[70px]">
                        <Link
                            href="/collections/all"
                            className="text-base md:text-[20px] text-white font-normal px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-full bg-[linear-gradient(87deg,_#D14BF8_-6.96%,_#4C20CD_115.83%)]"
                        >
                            {seeMore}
                        </Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default LatestProductThree;
