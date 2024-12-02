import latestbg from '@/assets/images/latest-bg.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import useDictionary from '../../hooks/useDictionary';
import useDictionary from '../../../hooks/useDictionary';
import SectionTitle from '../../SectionTitle';
import ProductCardFour from './ProductCardFour';
// import SectionTitle from './SectionTitle';

const RecentlyViewedFour = () => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const { language, dictionary } = useDictionary();

    // Fetch recently viewed products on component mount
    useEffect(() => {
        const viewedProducts =
            JSON.parse(sessionStorage.getItem('recentlyViewed')) || [];
        setRecentlyViewed(viewedProducts);
    }, []);

    // If no recently viewed products, display a message
    if (recentlyViewed.length === 0) {
        return null;
    }

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
                />
                <div className="container">
                    <SectionTitle title={dictionary.RecentViewed.recentTitle} />
                    <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px]">
                        {recentlyViewed.map((product) => (
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
