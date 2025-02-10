/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import latestBg from '@/assets/images/latest-product-bg-4.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useDictionary from '../../../hooks/useDictionary';
import { getAllProduct } from '../../../utils/getProduct';
import KarbarButton from '../../KarbarButton';
import SectionTitleFour from '../../SectionTitleFour';
import DaribProductLoader from '../../loader/DaribProductLoader';
import ProductCardFour from './ProductCardFour';

const LatestProductFour = () => {
    const { language, dictionary } = useDictionary();
    const { seeMore } = dictionary.ProductCard;

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
                    '',
                    'new_arrival',
                    '',
                    1,
                    4
                );
                setProducts(productsData.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [language]);

    return (
        <div
            id="product-section"
            className="product-section min-h-[820px]"
        >
            <div className="relative pt-10 pb-20 product-area">
                <Image
                    src={latestBg}
                    alt="bg"
                    className="absolute top-0 left-0 z-[-1] w-full h-full object-cover object-center"
                />
                <div className="container">
                    <SectionTitleFour
                        preTitle={dictionary.TemplateFour.latest}
                        postTitle={dictionary.TemplateFour.products}
                    />

                    {/* লোডিং অবস্থায় Skeleton Loader দেখাবে */}
                    {loading ? (
                        <div className="">
                            <DaribProductLoader items={4} />
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center">{error}</div>
                    ) : products.length > 0 ? (
                        <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px]">
                            {products.map((product) => (
                                <ProductCardFour
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center">
                            No products found
                        </div>
                    )}

                    <div className="flex justify-center pt-10 md:pt-[70px]">
                        <KarbarButton
                            asLink
                            href="/collections/all"
                            preserveHover={true}
                            variant="default"
                            className="text-base md:text-[20px] font-medium border md:border-2 px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-full"
                            aria-label={`See more products in our collection`}
                            title="Browse all products in our collection"
                        >
                            {seeMore ?? 'See More'}
                        </KarbarButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestProductFour;
