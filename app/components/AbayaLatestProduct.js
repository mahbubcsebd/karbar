/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import useDictionary from '../hooks/useDictionary';
import { getAllProduct } from '../utils/getProduct';
import AbayaProductCard from './AbayaProductCard';
import SectionTitle from './SectionTitle';

const AbayaLatestProduct = () => {
    const { language, dictionary } = useDictionary();
    const { sectionTitle, seeMore } = dictionary.ProductCard;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productsData = await getAllProduct(language);
                setProducts(productsData.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProduct();
    }, [language]);

    return (
        <div
            id="product-section"
            className="mb-10 product-section"
        >
            <div className="product-area">
                <div className="container">
                    <SectionTitle title={sectionTitle} />
                    {products.length > 0 ? (
                        <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px] ">
                            {products.map((product) => {
                                return (
                                    <AbayaProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div>No products found</div>
                    )}
                    <div className="flex justify-center pt-10 md:pt-[70px]">
                        <Link
                            href="/collections/all"
                            className="text-base md:text-[20px] text-gray-900 font-normal border md:border-2 border-gray-900 px-6 py-[10px] md:px-[30px] md:py-4 hover:bg-gray-900 hover:text-white transition duration-150 rounded-full"
                            aria-label={`See more products in our collection`}
                        >
                            {seeMore ?? 'See More'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbayaLatestProduct;
