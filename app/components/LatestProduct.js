/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import useDictionary from '../hooks/useDictionary';
import { getAllProduct } from '../utils/getProduct';
import KarbarButton from './KarbarButton';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';
import DaribProductLoader from './loader/DaribProductLoader';

// const SkeletonLoader = () => (
//     <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px] ">
//         {Array.from({ length: 8 }).map((_, index) => (
//             <div
//                 key={index}
//                 className="block w-full h-full overflow-hidden bg-white rounded-lg animate-pulse"
//             >
//                 <div className="block w-full h-[180px] sm:h-[373px] md:h-[232px] lg:h-[306px] xl:h-[281px] 1xl:h-[417px] 2xl:h-[337px] rounded-tl-lg rounded-tr-lg overflow-hidden relative"></div>
//                 <div className="p-4 bg-white">
//                     <div className="block h-4 mb-1 bg-gray-200"></div>
//                     <div className="h-4 mb-2 bg-gray-200"></div>
//                     <div className="h-10 bg-gray-200"></div>
//                 </div>
//             </div>
//         ))}
//     </div>
// );

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
        <div
            id="product-section"
            className="mb-10 product-section pt-[30px] lg:pt-10"
        >
            <div className="product-area">
                <div className="container">
                    {loading ? (
                        <DaribProductLoader items={8} />
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : (
                        <>
                            <SectionTitle title={sectionTitle} />
                            {products.length > 0 ? (
                                <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px] ">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center">
                                    No products found
                                </div>
                            )}
                        </>
                    )}

                    {!loading && (
                        <div className="flex justify-center pt-10 md:pt-[70px]">
                            <KarbarButton
                                asLink
                                href="/collections/all"
                                variant="outline"
                                className="text-base md:text-[20px] font-normal border md:border-2 px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-full"
                            >
                                {seeMore}
                            </KarbarButton>
                            {/* <Link
                                href="/collections/all"
                                className="text-base md:text-[20px] text-purple-900 font-normal border md:border-2 border-purple-900 px-6 py-[10px] md:px-[30px] md:py-4 hover:bg-purple-900 hover:text-white transition duration-150 rounded-full"
                            >
                                {seeMore}
                            </Link> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestProduct;
