/* eslint-disable react-hooks/exhaustive-deps */
// import products from "@/app/data/products.json";
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { IoOptions } from 'react-icons/io5';
import useDictionary from '../hooks/useDictionary';
import SearchContext from '../reducer/SearchContext';
import { getAllCategories } from '../utils/categories';
import { getAllProduct } from '../utils/getProduct';
import ProductCard from './ProductCard';
import SkeletonCard from './skeleton/SkeletonCard';

const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showProduct, setShowProduct] = useState(12);
    const [productItem, setProductItem] = useState([]);
    const [page, setPage] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState();
    const [loading, setLoading] = useState(false);
    const [isSeeMoreClick, setIsSeeMoreClick] = useState(false);
    const [sortValue, setSortValue] = useState();
    const { searchQuery, setSearchQuery } = useContext(SearchContext);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const { language, dictionary } = useDictionary();
    const searchParams = useSearchParams();
    const router = useRouter();

    const sortQuery = searchParams.get('sort');

    const { sortBy, newArrival, bestSelling, discount } =
        dictionary.ProductCard.SortBy;

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
        const fetchProducts = async () => {
            try {
                if (!searchQuery && selectedCategory === 'all') {
                    const productsData = await getAllProduct(
                        language,
                        null,
                        null,
                        page,
                        showProduct,
                        null
                    );
                    const newProducts = productsData.data;
                    setTotalProduct(productsData.meta.total);
                    setProductItem([...productItem, ...newProducts]);
                } else if (searchQuery && searchQuery !== '') {
                    setPage(1);
                    const productsData = await getAllProduct(
                        language,
                        searchQuery,
                        null,
                        page,
                        200,
                        null
                    );
                    const newProducts = productsData.data;
                    setTotalProduct(productsData.meta.total);
                    setProductItem([...newProducts]);
                } else if (selectedCategory !== 'all') {
                    const productsData = await getAllProduct(
                        language,
                        null,
                        selectedCategory,
                        page,
                        showProduct,
                        null
                    );
                    const newProducts = productsData.data;
                    setTotalProduct(productsData.meta.total);
                    setProductItem([...productItem, ...newProducts]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

        // Infinite Scroll
        // let hasTriggered = false;

        // const onIntersection = (items) => {
        //     const loaderItem = items[0];

        //     if (loaderItem.isIntersecting && hasMore && !hasTriggered) {
        //         setPage(page + 1);
        //         setIsSeeMoreClick(true);
        //         hasTriggered = true;
        //         alert('Visible inner');
        //     }
        // };

        // const observer = new IntersectionObserver(onIntersection);

        // if (observer && loaderRef.current) {
        //     observer.observe(loaderRef.current);
        // }

        // // cleanup
        // return () => {
        //     if (observer) observer.disconnect();
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchQuery, selectedCategory, language]);

    useEffect(() => {
        router.push(`/product?category=${'categoryName'}`);
    }, []);

    const handleCategory = async (categoryName) => {
        setIsSeeMoreClick(false);
        setSearchQuery('');
        setSelectedCategory(categoryName);
        setPage(1);
        setProductItem([]);
    };

    const handleAllFilter = async (categoryName) => {
        setSearchQuery('');
        setPage(1);
        setProductItem([]);
        setSelectedCategory('all');
    };

    const handleSeeMore = () => {
        setPage(page + 1);
        setIsSeeMoreClick(true);
    };

    const handleSortChange = (event) => {
        setSortValue(event.target.value);
    };
    const options = [
        { value: 'new_arrival', label: newArrival },
        { value: 'best_selling', label: bestSelling },
        { value: 'discount', label: discount },
    ];

    return (
        <div
            id="product-section"
            className="mb-20 pt-[60px] product-section"
        >
            <div className="product-area">
                <div className="container">
                    <div className="product-filter flex justify-between gap-4 mb-[30px]">
                        <div className="flex items-start gap-4 sm:gap-5">
                            <div className="flex items-center gap-2 mt-2 text-lg md:text-[20px] font-normal text-gray-800">
                                <IoOptions />
                            </div>
                            <ul className="flex items-center flex-wrap gap-2 sm:gap-3 md:gap-[18px]">
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
                                        সবগুলো
                                    </button>
                                </li>
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <button
                                            onClick={() =>
                                                handleCategory(category.name)
                                            }
                                            type="button"
                                            className={`whitespace-nowrap px-3 py-1 md:px-6 md:py-[6px] text-xs sm:text-base font-normal text-gray-700 border border-gray-700 rounded-md hover:bg-gray-700 hover:text-white transition duration-150 ${
                                                selectedCategory ==
                                                category.name
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
                        <div>
                            <div className="flex items-center gap-2 min-w-[200px]">
                                <p className="text-base font-normal text-gray-700">
                                    {sortBy} :
                                </p>
                                <div className="">
                                    <select
                                        className="py-[7px] px-[10px] text-base text-gray-600 border-0 rounded-md focus:outline-none focus:ring-0 mr-4 bg-gray-300 cursor-pointer"
                                        value={sortValue}
                                        onChange={handleSortChange}
                                    >
                                        {options.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center pt-10 text-gray-600">
                            {searchQuery && (
                                <h2 className="text-2xl font-normal">
                                    দুঃখিত{' '}
                                    <span className="font-semibold">{`"${searchQuery}"`}</span>{' '}
                                    প্রোডাক্ট টি পাওয়া যায় নি।
                                </h2>
                            )}
                        </div>
                    )}
                    <div className="flex justify-center md:pt-[70px] mt-6">
                        {memoizedProductsArray.length >= 8 &&
                            memoizedProductsArray.length < totalProduct &&
                            memoizedProductsArray.length !== totalProduct && (
                                <button
                                    onClick={() => handleSeeMore(4)}
                                    disabled={loading}
                                    type="button"
                                    className="text-base md:text-[20px] text-purple-900 font-normal border-2 border-purple-900 px-6 py-3 rounded-lg md:px-[30px] md:py-4 hover:bg-purple-900 hover:text-white transition duration-150"
                                >
                                    {loading
                                        ? 'Loading...'
                                        : dictionary.ProductCard.seeMore}
                                </button>
                            )}
                    </div>
                    {/* {hasMore && (
                        <div className='flex justify-center pt-5'>
                            <div
                                ref={loaderRef}
                                className="loader"
                            ></div>
                        </div>
                    )} */}
                    {/* {hasMore && (
                        <div
                            ref={loaderRef}
                            className="flex justify-center md:pt-[70px] mt-6"
                        >
                            <button
                                type="button"
                                className="text-base md:text-[20px] text-gray-900 font-normal border-2 border-gray-900 px-6 py-3 rounded-lg md:px-[30px] md:py-4 hover:bg-gray-900 hover:text-white transition duration-150"
                            >
                                {loading ? 'Loading...' : 'Loading...'}
                            </button>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
