'use client';

import { useEffect, useState } from 'react';
import useDictionary from '../hooks/useDictionary';
import { getAllProduct } from '../utils/getProduct';
import KarbarButton from './KarbarButton';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import DaribProductLoader from './loader/DaribProductLoader';

const ITEMS_PER_PAGE = 8;
const MIN_HEIGHT = '400px';

const LatestProduct = () => {
    const { language, dictionary } = useDictionary();
    const { sectionTitle, seeMore } = dictionary.ProductCard;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProduct = async () => {
            if (!isMounted) return;

            setLoading(true);
            setError(null);

            try {
                const productsData = await getAllProduct(
                    language,
                    'all',
                    null,
                    'new_arrival',
                    '',
                    1,
                    ITEMS_PER_PAGE
                );

                if (isMounted) {
                    setProducts(productsData.data || []);
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Failed to fetch products:', err);
                    setError('Failed to fetch products. Please try again later.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProduct();

        return () => {
            isMounted = false;
        };
    }, [language]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="min-h-[400px] grid place-items-center" style={{ minHeight: MIN_HEIGHT }}>
                    <DaribProductLoader items={ITEMS_PER_PAGE} />
                </div>
            );
        }

        if (error) {
            return (
                <div className="min-h-[400px] grid place-items-center" style={{ minHeight: MIN_HEIGHT }}>
                    <p className="text-red-500">{error}</p>
                </div>
            );
        }

        return (
            <>
                <SectionTitle title={sectionTitle} />
                <div className="min-h-[400px]" style={{ minHeight: MIN_HEIGHT }}>
                    {products.length > 0 ? (
                        <div
                            className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px]"
                            style={{ contain: 'layout style' }}
                        >
                            {products.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isPriority={index < 4}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="grid place-items-center h-[400px]">
                            <p className="text-xl text-gray-500">No products found</p>
                        </div>
                    )}
                </div>

                {products.length > 0 && (
                    <div
                        className="h-[100px] flex items-center justify-center"
                        style={{ contain: 'layout style' }}
                    >
                        <KarbarButton
                            asLink
                            href="/collections/all"
                            className="text-base md:text-[20px] font-normal border md:border-2 px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-full"
                        >
                            {seeMore}
                        </KarbarButton>
                    </div>
                )}
            </>
        );
    };

    return (
        <div
            className="mb-10 product-section pt-[30px] lg:pt-10"
            style={{ contain: 'content' }}
        >
            <div className="container">
                {renderContent()}
            </div>
        </div>
    );
};

export default LatestProduct;