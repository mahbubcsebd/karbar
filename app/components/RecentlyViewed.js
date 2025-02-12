import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useDictionary from '../hooks/useDictionary';

// Dynamically import ProductCard to reduce initial bundle size
const ProductCard = dynamic(() => import('./ProductCard'), {
    loading: () => <p>Loading products...</p>,
    ssr: false,
});

import SectionTitle from './SectionTitle';

const RecentlyViewed = () => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const { language, dictionary } = useDictionary();

    // Fetch recently viewed products on component mount
    useEffect(() => {
        const viewedProducts =
            JSON.parse(sessionStorage.getItem('recentlyViewed')) || [];

        // Limit the recently viewed products to a max of 4
        setRecentlyViewed(viewedProducts.slice(0, 4));
    }, []);

    // If no recently viewed products, display a message
    if (recentlyViewed.length === 0) {
        return (
            <div
                id="product-section"
                className="mb-10 product-section"
            >
                <div className="product-area">
                    <div className="container">
                        <SectionTitle title={dictionary.RecentViewed.recentTitle} />
                        <p>No recently viewed products.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            id="product-section"
            className="mb-10 product-section"
        >
            <div className="product-area">
                <div className="container">
                    <SectionTitle title={dictionary.RecentViewed.recentTitle} />
                    <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px]">
                        {recentlyViewed.map((product) => (
                            <ProductCard
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

export default RecentlyViewed;
