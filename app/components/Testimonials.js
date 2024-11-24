'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './hero.css';

// Import required modules
import latestbg from '@/assets/images/latest-bg.svg';
import { getTestimonials } from '@/utils/getTestimonial';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Autoplay, Pagination, Thumbs } from 'swiper/modules';
import useDictionary from '../hooks/useDictionary';
import SectionTitle from './SectionTitle';
import TestimonialCard from './TestimonialCard';

const Testimonials = ({ bg }) => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { dictionary } = useDictionary();

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
        return null
    }

    if (error) {
        return <div className="py-10 text-center text-red-500">{error}</div>;
    }

    if (testimonials.length < 3) {
        return null;
    }

    return (
        <div className={`${bg ? '' : 'mb-10'} review-section`}>
            <div className={`relative review-area ${bg ? 'py-16' : ''}`}>
                {bg && (
                    <Image
                        src={latestbg}
                        alt="bg"
                        className="absolute top-0 left-0 z-[-1] w-full h-full object-cover object-center"
                    />
                )}
                <div className="container">
                    <SectionTitle
                        title={dictionary.Testimonial.testimonialTitle}
                    />
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
                            modules={[Pagination, Autoplay, Thumbs]}
                            className="testimonialsSwiper"
                        >
                            {testimonials.map((testimonial, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="h-full"
                                >
                                    <div className="h-full pb-12">
                                        <TestimonialCard
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

export default Testimonials;
