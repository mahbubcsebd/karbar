import getTemplate from '@/utils/getTemplate';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useSiteSetting from '../hooks/useSiteSetting';
import { getMultipleBanner } from '../utils/getBanner';

const MultipleCampain = () => {
    const [banner, setBanner] = useState(null);
    const [template, setTemplate] = useState(null);
    const { siteSetting, loading, error } = useSiteSetting();

    useEffect(() => {
        if (siteSetting.multiple_banner === 'active') {
            const fetchMultipleBanner = async () => {
                const bannerData = await getMultipleBanner();
                const template = await getTemplate();

                setBanner(bannerData.data);
                setTemplate(template.template_name);
            };

            fetchMultipleBanner();
        }
    }, [siteSetting]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!banner) {
        return null;
    }

    if (banner.length === 2) {
        return (
            <div
                className={`grid grid-cols-1 gap-3 weekly-campaign lg:grid-cols-2 lg:gap-0 multiple-banner ${template.toLowerCase()}`}
            >
                {banner.map((bannerData) => (
                    <Link
                        key={bannerData.id}
                        href={bannerData.url}
                        className="inline-block h-[143px] sm:h-[213px] md:h-[257px] lg:h-[169px] xl:h-[242px] w-full"
                    >
                        <Image
                            src={bannerData.image_url}
                            alt={bannerData.title}
                            className="object-cover w-full h-full"
                        />
                    </Link>
                ))}
            </div>
        );
    }

    if (banner.length === 3) {
        return (
            <div className="container">
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 multiple-banner ${template.toLowerCase()}`}
                >
                    {banner.map((bannerData) => (
                        <Link
                            key={bannerData.id}
                            href={bannerData.url}
                            className="block w-full overflow-hidden rounded-2xl"
                            // className="block w-full h-[210px] md:[190px] lg:h-[165px] xl:h-[210px] 2xl:h-[245px] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={bannerData.image_url}
                                alt={bannerData.title}
                                width={400}
                                height={210}
                                className="object-cover w-full h-full"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
    if (banner.length > 3) {
        return (
            <div className="container">
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 multiple-banner ${template.toLowerCase()}`}
                >
                    {banner.map((bannerData) => (
                        <Link
                            key={bannerData.id}
                            href={bannerData.url}
                            className="block w-full overflow-hidden rounded-2xl"
                            // className="block w-full h-[210px] md:[190px] lg:h-[165px] xl:h-[210px] 2xl:h-[245px] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={bannerData.image_url}
                                alt={bannerData.title}
                                width={400}
                                height={210}
                                className="object-cover w-full h-full"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
};

export default MultipleCampain;
