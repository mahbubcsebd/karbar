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
                    8
                );
                setProducts(productsData.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [language]);

    return (
        <div className="mb-10 product-section pt-[30px] lg:pt-10">
            <div className="container">
                {loading ? (
                    <div className="min-h-[400px]">
                        <DaribProductLoader items={4} />
                    </div>
                ) : error ? (
                    <div className="min-h-[400px] grid place-items-center">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : (
                    <>
                        <SectionTitle title={sectionTitle} />
                        <div className="min-h-[400px]">
                            {products.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px]">
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
                                    <p className="text-xl text-gray-500">
                                        No products found
                                    </p>
                                </div>
                            )}
                        </div>

                        {products.length > 0 && (
                            <div className="mt-16 flex items-center justify-center">
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
                )}
            </div>
        </div>
    );
};

export default LatestProduct;
