import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

import quote from '@/assets/icons/quote-six.svg';
import RatingReadOnly from '../../RatingReadOnly';

const TestimonialCardSix = ({ testimonial }) => {
    const { name, rating, review } = testimonial;
    return (
        <div className="single-review-card h-full bg-transparent rounded-[20px] px-5 py-10 border border-[#9FA3B3] relative">
            <div className="">
                <div className="min-w-[140px] mb-2">
                    <RatingReadOnly rating={rating} />
                </div>
                <p className="text-base font-medium text-white">{review}</p>
            </div>
            <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                    <div>
                        <div className="w-10 h-10 text-white rounded-full">
                            <FaUserCircle size="40" />
                        </div>
                    </div>
                    <div className="w-full">
                        <h2 className="text-base font-medium text-white capitalize">
                            {name}
                        </h2>
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-normal text-white">
                                Customer
                            </p>
                        </div>
                    </div>
                </div>
                <Image
                    className="w-14 h-14"
                    src={quote}
                    alt="quote"
                />
            </div>
        </div>
    );
};

export default TestimonialCardSix;
