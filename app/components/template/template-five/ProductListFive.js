/* eslint-disable react-hooks/exhaustive-deps */
// import products from "@/app/data/products.json";
'use client';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import useDictionary from '../../../hooks/useDictionary';
// import { getAllProduct } from './../../../utils/getProduct';
import { getAllProduct } from '../../../utils/getProduct';
// import ProductCard from './ProductCard';
// import { getAllCategories } from '../../../../../utils/categories';
// import ourProductsbg from '@/assets/images/our-product-bg-4.svg';
import useSiteSetting from '../../../hooks/useSiteSetting';
import { getAllCategories } from '../../../utils/categories';
import KarbarButton from '../../KarbarButton';
import SkeletonCard from '../../skeleton/SkeletonCard';
import ProductCardFive from './ProductCardFive';

const ProductListFive = () => {
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
    const {siteSetting} = useSiteSetting();

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
                    'all',
                    '',
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
            className="product-section"
        >
            <div className="relative pt-[60px] pb-20 product-area bg-[#F4F6FC]">
                {/* <Image
                    src={ourProductsbg}
                    alt="bg"
                    className="absolute top-0 left-0 z-[-1] w-full h-full object-cover object-center"
                /> */}
                <div className="container">
                    <div className="flex flex-col items-center gap-5 mb-10 lg:gap-10 product-filter">
                        <h2 className="text-2xl font-semibold text-gray-800 capitalize md:text-4xl">
                            {dictionary.TemplateFour.our}
                            <span
                                style={{ color: siteSetting?.btn_bg_color }}
                                // className="text-[#F3832D]"
                            >
                                {' '}
                                {dictionary.TemplateFour.product}
                            </span>
                        </h2>
                        <ul
                            ref={scrollContainerRef}
                            className="flex items-center gap-5 lg:gap-10 max-w-[100%] md:max-w-[500px] overflow-x-auto categories-scroll"
                        >
                            <li>
                                <button
                                    onClick={handleAllFilter}
                                    type="button"
                                    className={`whitespace-nowrap text-xs xl:text-2xl font-normal transition duration-150 ${
                                        selectedCategory == 'all'
                                            ? 'border-b border-[#2A51C6] text-[#2A51C6]'
                                            : 'text-gray-700'
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
                                        className={`whitespace-nowrap text-xs xl:text-2xl font-normal transition duration-150 ${
                                            selectedCategory == category.slug
                                                ? 'border-b border-[#2A51C6] text-[#2A51C6]'
                                                : 'text-gray-700'
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
                                    <ProductCardFive
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
                    <div className="flex justify-center md:pt-[70px] mt-6">
                        <KarbarButton
                            asLink
                            href={`/collections/${selectedCategory}`}
                            variant="default"
                            className="text-base md:text-[20px] font-normal px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-lg"
                            aria-label={`See category wise products in our collection`}
                            title="See category wise products in our collection"
                        >
                            {loading ? 'Loading...' : dictionary.Global.seeMore}
                        </KarbarButton>
                        {/* <Link
                            href={`/collections/${selectedCategory}`}
                            className="text-base md:text-[20px] text-[#F3832D] font-normal px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-lg bg-transparent hover:text-white hover:bg-[#F3832D] border border-[#F3832D]"
                        >
                            {loading ? 'Loading...' : dictionary.Global.seeMore}
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListFive;
