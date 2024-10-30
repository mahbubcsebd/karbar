import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import campainBannerOne from '../assets/images/campain-banner-1.png';
import campainBannerTwo from '../assets/images/campain-banner-2.png';

const Campain = () => {
    return (
        <div className="grid grid-cols-1 gap-3 weekly-campaign lg:grid-cols-2 lg:gap-0">
            <Link
                href="/"
                className="inline-block h-[143px] sm:h-[213px] md:h-[257px] lg:h-[169px] xl:h-[242px] w-full"
            >
                <Image
                    src={campainBannerOne}
                    alt="banner-one"
                    className="object-cover w-full h-full"
                />
            </Link>
            <Link
                href="/"
                className="relative block h-[143px] sm:h-[213px] md:h-[257px] lg:h-[169px] xl:h-[242px] w-full">
                <Image
                    src={campainBannerTwo}
                    alt="banner-two"
                    className="object-cover w-full h-full"
                />
            </Link>
        </div>
    );
};

export default Campain;
