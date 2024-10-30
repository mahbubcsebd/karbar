import { useEffect, useState } from 'react';
import useDictionary from '../hooks/useDictionary';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';

const RecentlyViewed = () => {
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
