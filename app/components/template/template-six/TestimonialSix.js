'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../hero.css';

// Import required modules
import chefIcon from '@/assets/icons/chef.svg';
import useDictionary from '@/hooks/useDictionary';
import { getTestimonials } from '@/utils/getTestimonial';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { Pagination, Thumbs } from 'swiper/modules';
import TestimonialCardSix from './TestimonialCardSix';

const TestimonialSix = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { dictionary } = useDictionary();
    const swiperRef = useRef();

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const testimonialsData = await getTestimonials();
                setTestimonials(testimonialsData.data);
            } catch (err) {
                setError(
                    'Failed to load testimonials. Please try again later.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return null;
    }

    if (error) {
        return <div className="py-10 text-center text-red-500">{error}</div>;
    }

    if (testimonials.length < 3) {
        return null;
    }

    return (
        <div className="review-section">
            <div className={`relative review-area py-16 bg-[#0E1941]`}>
                <div className="container">
                    <div className="flex justify-between items-center md:mb-[60px] mb-6">
                        <div>
                            <p className="flex items-center gap-2 text-base font-semibold text-[#FD9C02] mb-3">
                                <span>
                                    <Image
                                        src={chefIcon}
                                        alt="chef"
                                    />
                                </span>
                                Testimonials
                            </p>
                            <h2 className="text-2xl font-semibold text-white capitalize font-cormorant md:text-5xl">
                                {dictionary.Testimonial.customerSay}
                            </h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => swiperRef.current?.slidePrev()}
                                type="button"
                                className="w-8 h-8 sm:w-10 sm:h-10 r text-xs sm:text-base rounded-full flex justify-center items-center text-[#FD9C02] bg-white ${`swiper-button-prev`}"
                            >
                                <FaArrowLeftLong />
                            </button>
                            <button
                                onClick={() => swiperRef.current?.slideNext()}
                                type="button"
                                className="w-8 h-8 sm:w-10 sm:h-10 r text-xs sm:text-base rounded-full flex justify-center items-center text-[#FD9C02] bg-white ${`swiper-button-next`}"
                            >
                                <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-stretch review-slider-wrapper">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={
                                testimonials.length < 3
                                    ? testimonials.length
                                    : 3
                            }
                            loop={testimonials.length >= 3}
                            autoplay={{
                                delay: 4000,
                                pauseOnMouseEnter: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={{
                                nextEl: `.swiper-button-next`,
                                prevEl: `.swiper-button-prev`,
                            }}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            breakpoints={{
                                375: {
                                    slidesPerView: Math.min(
                                        testimonials.length,
                                        1
                                    ),
                                    spaceBetween: 16,
                                },
                                768: {
                                    slidesPerView: Math.min(
                                        testimonials.length,
                                        2
                                    ),
                                    spaceBetween: 20,
                                },
                                1280: {
                                    slidesPerView: Math.min(
                                        testimonials.length,
                                        3
                                    ),
                                    spaceBetween: 30,
                                },
                            }}
                            // modules={[Pagination, Autoplay, Thumbs]}
                            modules={[Pagination, Thumbs]}
                            className="testimonialsSwiper testimonial-six"
                        >
                            {testimonials.map((testimonial, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="h-full"
                                >
                                    <div className="h-full pb-12">
                                        <TestimonialCardSix
                                            testimonial={testimonial}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSix;
