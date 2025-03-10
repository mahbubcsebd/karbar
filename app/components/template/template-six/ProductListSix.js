'use client';
import {
    Suspense,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import useDictionary from '../../../hooks/useDictionary';
import useSiteSetting from '../../../hooks/useSiteSetting';
import { getAllCategories } from '../../../utils/categories';
import { getAllProduct } from '../../../utils/getProduct';
import KarbarButton from '../../KarbarButton';
import SkeletonCard from '../../skeleton/SkeletonCard';
import ProductCardSix from './ProductCardSix';

const ProductListSix = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [productItem, setProductItem] = useState([]);
    const [page, setPage] = useState(1);
    const [totalProduct, setTotalProduct] = useState(0);
    const [loading, setLoading] = useState(false);
    const { language, dictionary } = useDictionary();
    const [categories, setCategories] = useState([]);
    const { siteSetting } = useSiteSetting();

    const memoizedProductsArray = useMemo(() => productItem, [productItem]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoriesData = await getAllCategories(language);
                setCategories(categoriesData.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategory();
    }, [language]);

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        try {
            const productsData = await getAllProduct(
                language,
                selectedCategory,
                '',
                'all',
                '',
                page,
                12
            );
            const newProducts = productsData.data;
            setTotalProduct(productsData.meta.total);
            setProductItem((prevItems) =>
                page === 1 ? newProducts : [...prevItems, ...newProducts]
            );
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    }, [language, selectedCategory, page]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleCategory = (categoryName) => {
        setSelectedCategory(categoryName);
        setPage(1);
    };

    const handleAllFilter = () => {
        setPage(1);
        setSelectedCategory('all');
    };

    const scrollContainerRef = useRef(null);
    useEffect(() => {
        const container = scrollContainerRef.current;
        const handleWheel = (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };
        if (container)
            container.addEventListener('wheel', handleWheel, {
                passive: false,
            });
        return () => container?.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <div
            id="product-section"
            className="product-section"
        >
            <div className="relative pt-[60px] pb-20 product-area bg-[#F4F6FC]">
                <div className="container">
                    <div className="flex flex-col items-center gap-5 mb-10 lg:gap-10 product-filter">
                        <div className="max-w-[430px] text-center">
                            <h2 className="text-2xl font-bold text-[#0E1941] capitalize md:text-[58px] font-cormorant mb-6">
                                {dictionary.TemplateSix.ourFoodMenuTitle}
                            </h2>
                            <p className="text-base font-normal text-[#6E758D]">
                                Enjoy a symphony of flavors with our superb food
                                menu!
                            </p>
                        </div>
                        <ul
                            ref={scrollContainerRef}
                            className="flex items-center gap-5 lg:gap-10 max-w-[100%] md:max-w-[500px] overflow-x-auto categories-scroll"
                        >
                            <li>
                                <button
                                    onClick={handleAllFilter}
                                    type="button"
                                    className={`whitespace-nowrap text-xs xl:text-2xl font-normal transition duration-150 ${
                                        selectedCategory === 'all'
                                            ? 'border-b border-[#982121] text-[#982121]'
                                            : 'text-gray-500'
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
                                            selectedCategory === category.slug
                                                ? 'border-b border-[#982121] text-[#982121]'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Suspense fallback={<h2></h2>}>
                        {loading && memoizedProductsArray.length === 0 ? (
                            <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px]">
                                {[...Array(4)].map((_, index) => (
                                    <SkeletonCard key={index} />
                                ))}
                            </div>
                        ) : memoizedProductsArray.length > 0 ? (
                            <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[30px]">
                                {memoizedProductsArray.map((product) => (
                                    <ProductCardSix
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center pt-10 text-gray-600">
                                <h2 className="text-2xl font-normal">
                                    {dictionary.Global.noFound}
                                </h2>
                            </div>
                        )}
                    </Suspense>
                    <div className="flex justify-center md:pt-[70px] mt-6">
                        <KarbarButton
                            asLink
                            href={`/collections/${selectedCategory}`}
                            // variant="outline"
                            className="text-base md:text-[20px] font-normal border md:border-2 px-6 py-[10px] md:px-[30px] md:py-4 transition duration-150 rounded-lg hover:shadow-lg"
                        >
                            {loading ? 'Loading...' : dictionary.Global.seeMore}
                        </KarbarButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListSix;
