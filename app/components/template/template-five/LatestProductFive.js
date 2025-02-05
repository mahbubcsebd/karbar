/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import latestBg from '@/assets/images/latest-product-bg-4.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useDictionary from '../../../hooks/useDictionary';
import { getAllProduct } from '../../../utils/getProduct';
import ProductCardFive from './ProductCardFive';

import KarbarButton from '../../KarbarButton';
import SectionTitleFive from '../../SectionTitleFive';
const LatestProductFive = () => {
    const { language, dictionary } = useDictionary();
    const { seeMore } = dictionary.ProductCard;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
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
            }
        };

        fetchProduct();
    }, [language]);

    return (
        <div
            id="product-section"
            className="product-section"
        >
            <div className="relative pt-10 pb-20 product-area">
                <Image
                    src={latestBg}
                    alt="bg"
                    className="absolute top-0 left-0 z-[-1] w-full h-full object-cover object-center"
                />
                <div className="container">
                    <SectionTitleFive
                        preTitle={dictionary.TemplateFour.latest}
                        postTitle={dictionary.TemplateFour.products}
                    />
                    {products.length > 0 ? (
                        <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px] ">
                            {products.map((product) => {
                                return (
                                    <ProductCardFive
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
                        <KarbarButton
                            asLink
                            href="/collections/all"
                            variant="default"
                            className="text-base md:text-[20px] font-normal px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-lg"
                            aria-label={`See more ${seeMore} products in our collection`}
                        >
                            {seeMore}
                        </KarbarButton>
                        {/* <Link
                            href="/collections/all"
                            className="text-base md:text-[20px] text-white font-normal px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-lg  bg-[#F3832D] hover:bg-transparent hover:text-[#F3832D] border border-[#F3832D]"
                        >
                            {seeMore}
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestProductFive;
