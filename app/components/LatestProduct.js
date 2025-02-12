/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import useDictionary from '../hooks/useDictionary';
import { getAllProduct } from '../utils/getProduct';
import KarbarButton from './KarbarButton';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import DaribProductLoader from './loader/DaribProductLoader';

const LatestProduct = () => {
    const { language, dictionary } = useDictionary();
    const { sectionTitle, seeMore } = dictionary.ProductCard;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const { data } = await getAllProduct(
                    language,
                    'all',
                    '',
                    'new_arrival',
                    '',
                    1,
                    8
                );
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch products:', err.message);
                setError('Failed to fetch products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [language]);

    return (
        <div className="product-section min-h-[820px]">
            <div className="relative pt-10 pb-20 product-area">
                <div className="container">
                    <SectionTitle title={sectionTitle} />

                    {loading ? (
                        <DaribProductLoader items={8} />
                    ) : error ? (
                        <div className="text-red-500 text-center min-h-[300px] flex items-center justify-center">
                            {error}
                        </div>
                    ) : products.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px]">
                                {products.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        isPriority={index < 4}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-center pt-10 md:pt-[70px]">
                                <KarbarButton
                                    asLink
                                    href="/collections/all"
                                    preserveHover
                                    variant="default"
                                    className="text-base md:text-[20px] font-medium border md:border-2 px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-full"
                                    aria-label="See more products in our collection"
                                    title="Browse all products in our collection"
                                >
                                    {seeMore ?? 'See More'}
                                </KarbarButton>
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-500 text-center min-h-[300px] flex items-center justify-center">
                            No products found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestProduct;
