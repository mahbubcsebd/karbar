/* eslint-disable react-hooks/exhaustive-deps */
// import products from "@/app/data/products.json";
'use client';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { IoOptions } from 'react-icons/io5';
import useDictionary from '../../../hooks/useDictionary';
// import { getAllProduct } from './../utils/getProduct';
import { getAllProduct } from '../../../utils/getProduct';
// import ProductCard from './ProductCard';
// import { getAllCategories } from '../../../utils/categories';
import Link from 'next/link';
import { getAllCategories } from '../../../utils/categories';
import AbayaProductCard from '../../AbayaProductCard';
import SkeletonCard from '../../skeleton/SkeletonCard';

const AbayaAllProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showProduct, setShowProduct] = useState(12);
    const [productItem, setProductItem] = useState([]);
    const [page, setPage] = useState(1);
    const [totalProduct, setTotalProduct] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState();
    const [loading, setLoading] = useState(false);
    const [isSeeMoreClick, setIsSeeMoreClick] = useState(false);
    const { language, dictionary } = useDictionary();
    const [categories, setCategories] = useState([]);

    const memoizedProductsArray = useMemo(() => {
        return productItem;
    }, [productItem]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoriesData = await getAllCategories(language);
                setCategories(categoriesData.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchCategory();
    }, [language]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const productsData = await getAllProduct(
                    language,
                    selectedCategory,
                    '',
                    "all",
                    "",
                    page,
                    showProduct
                );
                const newProducts = productsData.data;
                setTotalProduct(productsData.meta.total);

                if (page === 1) {
                    setProductItem(newProducts);
                } else {
                    setProductItem((prevItems) => [
                        ...prevItems,
                        ...newProducts,
                    ]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [language, selectedCategory, page]);

    const handleCategory = async (categoryName) => {
        setIsSeeMoreClick(false);
        setSelectedCategory(categoryName);
        setPage(1);
    };

    const handleAllFilter = async (categoryName) => {
        setPage(1);
        setProductItem([]);
        setSelectedCategory('all');
    };

    const handleSeeMore = () => {
        setPage(page + 1);
        setIsSeeMoreClick(true);
    };

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;

        const handleWheel = (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        if (container) {
            container.addEventListener('wheel', handleWheel, {
                passive: false,
            });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div
            id="product-section"
            className="mb-20 product-section"
        >
            <div className="product-area">
                <div className="container">
                    <div className="flex justify-center md:mb-[70px] mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 capitalize md:text-4xl">
                            {dictionary.Global.latestProduct}
                        </h2>
                    </div>
                    <div className="product-filter items-start flex lg:items-center gap-4 sm:gap-5 mb-[30px]">
                        <div className="flex items-center gap-2 mt-1 lg:mt-0 text-lg md:text-[20px] font-normal text-gray-800">
                            <IoOptions />
                        </div>
                        <ul
                            ref={scrollContainerRef}
                            className="flex items-center md:flex-wrap gap-2 sm:gap-3 md:gap-[18px] max-w-[calc(100% - 60px)] overflow-x-auto categories-scroll"
                        >
                            <li>
                                <button
                                    onClick={handleAllFilter}
                                    type="button"
                                    className={`whitespace-nowrap px-3 py-1 md:px-6 md:py-[6px] text-xs sm:text-base font-normal text-gray-700 border border-gray-700 rounded-md hover:bg-gray-700 hover:text-white transition duration-150 ${
                                        selectedCategory == 'all'
                                            ? 'bg-gray-700 text-white'
                                            : ''
                                    }`}
                                >
                                    {dictionary.Global.all}
                                </button>
                            </li>
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <button
                                        onClick={() =>
                                            handleCategory(category.slug)
                                        }
                                        type="button"
                                        className={`whitespace-nowrap px-3 py-1 md:px-6 md:py-[6px] text-xs sm:text-base font-normal text-gray-700 border border-gray-700 rounded-md hover:bg-gray-700 hover:text-white transition duration-150 ${
                                            selectedCategory == category.slug
                                                ? 'bg-gray-700 text-white'
                                                : ''
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Suspense fallback={<h2></h2>}>
                        {loading && !isSeeMoreClick ? (
                            <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px]">
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </div>
                        ) : memoizedProductsArray.length > 0 ? (
                            <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px]">
                                {memoizedProductsArray.map((product) => (
                                    <AbayaProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center pt-10 text-gray-600">
                                {memoizedProductsArray.length < 1 &&
                                    !loading && (
                                        <h2 className="text-2xl font-normal">
                                            {dictionary.Global.noFound}
                                        </h2>
                                    )}
                            </div>
                        )}
                    </Suspense>

                    {/* <div className="flex justify-center md:pt-[70px] mt-6">
                        {memoizedProductsArray.length >= 12 &&
                            memoizedProductsArray.length < totalProduct &&
                            memoizedProductsArray.length !== totalProduct && (
                                <button
                                    onClick={() => handleSeeMore(4)}
                                    disabled={loading}
                                    type="button"
                                    className="text-base md:text-[20px] text-gray-900 font-normal border-2 border-gray-900 px-6 py-3 rounded-lg md:px-[30px] md:py-4 hover:bg-gray-900 hover:text-white transition duration-150"
                                >
                                    {loading ? 'Loading...' : dictionary.Global.seeMore}
                                </button>
                            )}
                    </div> */}
                    <div className="flex justify-center md:pt-[70px] mt-6">
                        <Link
                            href={`/collections/${selectedCategory}`}
                            className="text-base md:text-[20px] text-gray-900 font-normal border-2 border-gray-900 px-6 py-3 rounded-lg md:px-[30px] md:py-4 hover:bg-gray-900 hover:text-white transition duration-150"
                        >
                            {loading ? 'Loading...' : dictionary.Global.seeMore}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbayaAllProducts;
