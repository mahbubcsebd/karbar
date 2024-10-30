/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import Modal from '../components/modal/Modal';
import ProductOrder from '../components/ProductOrder';
import ProductSlider from '../components/ProductSlider';
import ReviewBox from '../components/ReviewBox';
import SocialShare from '../components/SocialShare';
import useDictionary from '../hooks/useDictionary';
import useFetchData from '../hooks/useFetchData';
import { getProduct } from '../utils/getProduct';
import PreLoader from './PreLoader';

const ProductDetailsPage = ({ slug }) => {
    const { language, dictionary } = useDictionary();

    // Fetching product data
    const {
        data: product,
        loading: productLoading,
        error: productError,
    } = useFetchData(getProduct, [language, slug]);

    // Use useEffect to save the product to localStorage
    useEffect(() => {
        if (product) {
            // Retrieve existing recently viewed products from sessionStorage
            const viewedProducts =
                JSON.parse(sessionStorage.getItem('recentlyViewed')) || [];

            // Check if the current product already exists in the list
            const productExists = viewedProducts.some(
                (item) => item.id === product.id
            );

            if (!productExists) {
                // Add the current product to the beginning of the array
                const updatedViewedProducts = [product, ...viewedProducts];

                // Limit to a maximum of 4 products
                if (updatedViewedProducts.length > 4) {
                    updatedViewedProducts.pop();
                }

                // Save the updated array to sessionStorage
                sessionStorage.setItem(
                    'recentlyViewed',
                    JSON.stringify(updatedViewedProducts)
                );
            }
        }
    }, [product]);



    // Destructuring dictionary data
    const {
        order,
        addToCart,
        currency,
        price,
        outOfStock,
        productDetails,
        detailsFabrics,
        detailsProductCode,
        detailsCategory,
    } = dictionary.ProductDetails;

    const { ratingAndReview, totalRating, writeReview, productReview } =
        dictionary.ProductReview;

    // Handle loading, error, and empty product
    if (productLoading) return <PreLoader />;
    if (productError) return <p>Error loading product: {productError}</p>;
    if (!product) return <p>No product found</p>;

    // Destructure product safely with optional chaining
    const {
        id,
        name,
        sale_price,
        unit_price,
        category,
        stock,
        attributes,
        sku_code,
        description,
        reviews,
        summary,
        video_link,
        total_ratings,
        average_rating,
        total_five_stars,
        total_four_stars,
        total_three_stars,
        total_two_stars,
        total_one_stars,
        variants,
        fabrics,
    } = product || {};
    return (
        <div>
            <div className="py-6 md:py-20 product-details-page">
                <div className="product-details-area">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                            <div className="lg:pr-10 xl:pr-16 xxl:pr-20 product-details-gallery">
                                <ProductSlider product={product} />
                            </div>
                            <div className="product-details-content">
                                <div>
                                    <h2 className="text-2xl lg:text-4xl leading-snug text-gray-900 font-medium mb-[24px] lg:mb-[40px] capitalize">
                                        {name}
                                    </h2>
                                    <p className="mb-5 font-semibold text-gray-800 lg:mb-10 text-2x lg:text-3xl product-price">
                                        {price} :{' '}
                                        <span
                                            className={`inline-block ${
                                                sale_price > 0
                                                    ? 'line-through text-2xl'
                                                    : ''
                                            }`}
                                        >
                                            {currency}
                                            {unit_price}
                                        </span>{' '}
                                        {sale_price > 0 && (
                                            <span>৳{sale_price}</span>
                                        )}
                                    </p>
                                    {stock < 1 && (
                                        <p className="mb-5 text-red-500">
                                            {outOfStock}
                                        </p>
                                    )}
                                </div>
                                <ProductOrder
                                    product={product}
                                    dictionary={dictionary.ProductDetails}
                                />
                                <hr className="my-6 border-gray-400" />
                                <div>
                                    <h3 className="mb-6 text-[20px] font-normal text-gray-900">
                                        {productDetails} :
                                    </h3>
                                    <ul className="flex flex-col">
                                        <li className="flex items-center gap-[30px] border-b border-gray-500 py-[18px]">
                                            <p className="text-xl font-normal text-gray-700 w-[150px]">
                                                {detailsCategory} :
                                            </p>
                                            <p className="text-xl font-medium text-gray-600">
                                                {category}
                                            </p>
                                        </li>
                                        <li className="flex items-center gap-[30px] border-b border-gray-500 py-[18px]">
                                            <p className="text-xl font-normal text-gray-700 w-[150px]">
                                                {detailsProductCode} :
                                            </p>
                                            <p className="text-xl font-medium text-gray-600">
                                                {sku_code}
                                            </p>
                                        </li>
                                        {/* <li className="flex items-center gap-[30px] border-b border-gray-500 py-[18px]">
                                            <p className="text-xl font-normal text-gray-700 w-[150px]">
                                                {detailsFabrics} :
                                            </p>
                                            <p className="text-xl font-medium text-gray-600">
                                                {fabrics}
                                            </p>
                                        </li> */}
                                    </ul>
                                    {summary && (
                                        <div
                                            className="pt-[30px]"
                                            dangerouslySetInnerHTML={{
                                                __html: summary,
                                            }}
                                        ></div>
                                    )}
                                </div>
                                <div className="mt-5">
                                    <SocialShare
                                        dictionary={dictionary.ProductDetails}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className="pt-10 text-lg font-medium text-gray-800"
                            dangerouslySetInnerHTML={{ __html: description }}
                        ></div>
                    </div>
                    <ReviewBox
                        dictionary={dictionary.ProductReview}
                        reviews={reviews}
                        id={id}
                        ratings={{
                            total_ratings,
                            average_rating,
                            total_five_stars,
                            total_four_stars,
                            total_three_stars,
                            total_two_stars,
                            total_one_stars,
                        }}
                    />
                </div>
                <Modal videoUrl={video_link} />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
