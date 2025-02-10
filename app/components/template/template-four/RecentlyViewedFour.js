import latestbg from '@/assets/images/latest-bg.svg';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import useDictionary from '../../../hooks/useDictionary';
import SectionTitle from '../../SectionTitle';
import ProductCardFour from './ProductCardFour';

const RecentlyViewedFour = () => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const { language, dictionary } = useDictionary();

    // Memoize the recently viewed products to avoid reprocessing
    const memoizedProducts = useMemo(() => {
        return recentlyViewed;
    }, [recentlyViewed]);

    // Fetch recently viewed products on component mount
    useEffect(() => {
        const viewedProducts =
            JSON.parse(sessionStorage.getItem('recentlyViewed')) || [];
        setRecentlyViewed(viewedProducts);
    }, []);

    // Display a message when no products are available
    if (memoizedProducts.length === 0) return null;

    return (
        <div
            id="product-section"
            className="product-section"
        >
            <div className="relative py-16 product-area">
                <Image
                    src={latestbg}
                    alt="bg"
                    className="absolute top-0 left-0 z-[-1] w-full h-full object-cover object-center"
                    loading="lazy" // Lazy load background image
                />
                <div className="container">
                    <SectionTitle title={dictionary.RecentViewed.recentTitle} />
                    <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px]">
                        {memoizedProducts.map((product) => (
                            <ProductCardFour
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentlyViewedFour;
