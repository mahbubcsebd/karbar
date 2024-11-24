/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useRouter } from 'next/navigation';
import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { usePathname, useSearchParams } from 'next/navigation';
import { IoOptions } from 'react-icons/io5';
import SortContext from '../context/SortContext';
import useDictionary from '../hooks/useDictionary';
import SearchContext from '../reducer/SearchContext';
import { getAllCategories } from '../utils/categories';
import { getAllProduct } from '../utils/getProduct';
import CategoryWiseFilter from './CategoryWiseFilter';
import GlobalProductCard from './GlobalProductCard';
import SkeletonCard from './skeleton/SkeletonCard';

const ProductList = ({ category }) => {
    // const [selectedCategory, setSelectedCategory] = useState(category);
    // const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [showProduct, setShowProduct] = useState(12);
    const [productItem, setProductItem] = useState([]);
    const [page, setPage] = useState(1);
    const [totalProduct, setTotalProduct] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState();
    const [loading, setLoading] = useState(false);
    const [isSeeMoreClick, setIsSeeMoreClick] = useState(false);
    const { searchQuery, setSearchQuery } = useContext(SearchContext);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const { language, dictionary } = useDictionary();
    const router = useRouter();
    const { sortQuery, setSortQuery } = useContext(SortContext);
    const [sortValue, setSortValue] = useState(sortQuery);

    // ----------------------------
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Ensure this code runs only on the client
        setIsClient(true);
    }, []);

    // Extract category and subcategory from URL
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentCategory = pathSegments[1]; // After 'collections'
    const currentSubCategory = searchParams.get('sub_category');

    const [selectedCategory, setSelectedCategory] = useState(
        currentCategory || ''
    );
    const [selectedSubCategory, setSelectedSubCategory] = useState(
        currentSubCategory || ''
    );
    const [subCategories, setSubCategories] = useState([]);
    // ----------------------------

    const { sortBy, all, newArrival, bestSelling, discount } =
        dictionary.ProductCard.SortBy;

    const memoizedProductsArray = useMemo(() => {
        return productItem;
    }, [productItem]);

    const handleCategory = async (categoryName) => {
        setSelectedCategory(categoryName);
        setSortQuery('all');
        router.push(`/collections/${categoryName}`);
    };

    const handleAllFilter = async (categoryName) => {
        router.push(`/collections/all`);
        setSelectedCategory('all');
        setSortQuery('all');
    };

    const handleSortChange = (event) => {
        setSortValue(event.target.value);
        setSortQuery(event.target.value);
    };

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
                    selectedSubCategory,
                    sortQuery,
                    searchQuery,
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
    }, [
        language,
        selectedCategory,
        sortQuery,
        searchQuery,
        selectedSubCategory,
        page,
    ]);

    const options = [
        { value: null, label: all },
        { value: 'new_arrival', label: newArrival },
        { value: 'best_selling', label: bestSelling },
        { value: 'discount', label: discount },
    ];

    const handleSeeMore = useCallback(() => {
        setPage((prevPage) => prevPage + 1);
        setIsSeeMoreClick(true);
    }, []);

    useEffect(() => {
        if (productItem.length >= totalProduct) {
            if (loaderRef.current) {
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        observer.unobserve(loaderRef.current);
                    }
                });
            }
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                handleSeeMore();
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loading, productItem.length, totalProduct, handleSeeMore]);

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

    if (!isClient) {
        // Return null or a fallback during SSR
        return null;
    }

    return (
        <div
            id="product-section"
            className="mb-20 pt-[60px] product-section"
        >
            <div className="product-area">
                <div className="container">
                    <div className="product-filter flex flex-col lg:flex-row justify-between gap-4 mb-[30px]">
                        <div className="flex gap-4">
                            <div className="flex gap-2 text-lg md:text-[20px] font-normal text-gray-800 md:hidden mt-2">
                                <IoOptions />
                            </div>
                            <div className="mt-[5px] hidden md:block">
                                <p className="text-base text-gray-700 font-normal">
                                    Filter by:
                                </p>
                            </div>
                            <CategoryWiseFilter
                                categories={categories}
                                subCategories={subCategories}
                                setSubCategories={setSubCategories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                selectedSubCategory={selectedSubCategory}
                                setSelectedSubCategory={setSelectedSubCategory}
                                setSortQuery={setSortQuery}
                                router={router}
                            />
                            {/* <ul
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
                                                selectedCategory ==
                                                category.slug
                                                    ? 'bg-gray-700 text-white'
                                                    : ''
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 min-w-[250px]">
                                <p className="text-xs font-normal text-gray-700 lg:text-base">
                                    {sortBy} :
                                </p>
                                <div className="">
                                    <select
                                        className="py-1 px-2 text-xs lg:py-[7px] lg:px-[10px] lg:text-base text-gray-600 border-0 rounded-md focus:outline-none focus:ring-0 mr-4 bg-gray-300 cursor-pointer"
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
                        <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px] items-stretch">
                            {memoizedProductsArray.map((product) => (
                                <GlobalProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        (searchQuery || sortQuery !== 'all') && (
                            <div className="flex justify-center pt-10 text-gray-600">
                                <h2 className="text-2xl font-normal">
                                    {dictionary.Global.noFound}
                                </h2>
                            </div>
                        )
                    )}

                    {/* Loader element for infinite scroll */}
                    <div
                        ref={loaderRef}
                        className="flex justify-center pt-5"
                    >
                        {loading && productItem.length < totalProduct && (
                            <div className="loader"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
