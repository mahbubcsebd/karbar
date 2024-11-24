'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useSiteSetting from '../hooks/useSiteSetting';
import { getSingleBanner } from '../utils/getBanner';

const SingleCampain = () => {
    const [banner, setBanner] = useState(null);

const { siteSetting, loading, error } = useSiteSetting();

    useEffect(() => {
        if (siteSetting.single_banner === 'active') {
            const fetchSingleBanner = async () => {
                const bannerData = await getSingleBanner();

                setBanner(bannerData.data);
            };

            fetchSingleBanner();
        }
    }, [siteSetting]);

    console.log(banner)

    if(!banner) {
        return null
    }

    // if (!banner) null

        return (
            <Link
                href={banner[0].url}
                className="block w-full"
            >
                <Image
                    src={banner[0].image_url}
                    alt="single banner"
                    width={1920}
                    height={400}
                    className="object-cover w-full h-full"
                />
            </Link>
        );
};

export default SingleCampain;
