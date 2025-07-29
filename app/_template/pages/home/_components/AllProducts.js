/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import KarbarButton from '@/_components/KarbarButton';
import useDictionary from '@/_hooks/useDictionary';
import useUser from '@/_hooks/useUser';
import { getAllCategories } from '@/_utils/categories';
import { getAllProduct } from '@/_utils/getProduct';
import Cookies from 'js-cookie';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import ProductCard from '../../../_components/ProductCard';
import SkeletonCard from '../../../_components/SkeletonCard';

const AllProducts = () => {
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
  const { user } = useUser();
  const token = Cookies.get('userToken');

  const isRetailer = user?.retailer_role_yn === 'yes';

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
          showProduct,
          'all',
          token,
          isRetailer
        );
        const newProducts = productsData.data;
        setTotalProduct(productsData.meta.total);

        if (page === 1) {
          setProductItem(newProducts);
        } else {
          setProductItem((prevItems) => [...prevItems, ...newProducts]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [language, selectedCategory, page, token, user, isRetailer]);

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
    <div id="product-section" className="product-section">
      <div className="relative pb-20 product-area">
        <div className="container">
          <div className="flex justify-center md:mb-[70px] mb-6"></div>
          <div className="product-filter flex flex-col md:flex-row justify-between md:items-center gap-2 mb-[30px]">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize md:text-4xl">
              {dictionary.Global.ourProduct}
            </h2>
            <ul
              ref={scrollContainerRef}
              className="flex items-center gap-3 max-w-[100%] md:max-w-[750px] overflow-x-auto categories-scroll"
            >
              <li>
                <button
                  onClick={handleAllFilter}
                  type="button"
                  className={`whitespace-nowrap px-4 py-1 md:px-4 md:py-2 md:text-sm xl:px-5 xl:py-2 text-xs xl:text-base font-normal text-gray-800 border rounded-lg hover:bg-[#17AF26] hover:border-[#17AF26] hover:text-white transition duration-150 ${
                    selectedCategory === 'all'
                      ? 'bg-[#17AF26] text-white border-[#17AF26]'
                      : 'border-gray-800 hover:border-[#17AF26]'
                  }`}
                >
                  {dictionary?.Global?.all || 'All'}
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategory(category.slug)}
                    type="button"
                    className={`whitespace-nowrap px-4 py-1 md:px-4 md:py-2 md:text-sm xl:px-5 xl:py-2 text-xs xl:text-base font-normal text-gray-800 border border-gray-800 rounded-lg hover:bg-[#17AF26] hover:border-[#17AF26] hover:text-white transition duration-150 ${
                      selectedCategory === category.slug
                        ? 'bg-[#17AF26] text-white border-[#17AF26] hover:border-[#17AF26]'
                        : 'border-gray-800'
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
              <div className="grid grid-cols-2 gap-4 product-list sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : memoizedProductsArray.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 product-list sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {memoizedProductsArray.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center pt-10 text-gray-600">
                {memoizedProductsArray.length < 1 && !loading && (
                  <h2 className="text-2xl font-normal">
                    {dictionary.Global.noFound}
                  </h2>
                )}
              </div>
            )}
          </Suspense>
          <div className="flex justify-center mt-6 md:pt-6">
            <KarbarButton
              asLink
              href={`/collections/${selectedCategory}`}
              className="text-base md:text-lg text-white font-normal border md:border-2 px-6 py-[10px] md:px-6 md:py-3 transition duration-150 rounded-full bg-[#17AF26] border-[#17AF26"
            >
              {dictionary.Global.seeMore}
            </KarbarButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
