"use client"

import Link from "next/link";
import { useContext, useEffect, useRef, useState } from 'react';
// import { useContext } from "react";
import useSiteSetting from "@/hooks/useSiteSetting";
import Image from "next/image";
import { toast } from "react-toastify";
import noAvailableImg from "../assets/icons/no-available.svg";
import { ProductContext } from "../context/cartContext";
import useDictionary from "../hooks/useDictionary";
import KarbarButton from "./KarbarButton";
// import { ProductContext } from "../context/cartContext";


const ProductCard = ({ product, isPriority }) => {
    const productCardRef = useRef(null);
    const [width, setWidth] = useState(0);
    const { dictionary } = useDictionary();
    const { siteSetting, loading, error } = useSiteSetting();

    const { priceCurrency, seeDetails } = dictionary.ProductCard;

    useEffect(() => {
        if (productCardRef.current) {
            setWidth(productCardRef.current.offsetWidth);
        }
    }, []);

    const { uuid, name, preview_image, sale_price, unit_price, stock, slug } =
        product;

    const { state, dispatch } = useContext(ProductContext);

    // const isInCart = state.cartItems.some((item) => item.id === product.id);

    const selectedProduct = { ...product, quantity: 1 };

    // Handle Add To Cart
    const handleAddToCart = () => {
        if (!isInCart) {
            dispatch({
                type: 'ADD_TO_CART',
                payload: selectedProduct,
            });
            toast.success(`Added ${product.name} to Cart!`, {
                position: 'bottom-right',
            });
        } else {
            toast.error(
                `The product ${product.name} has already been added to the cart`,
                {
                    position: 'bottom-right',
                }
            );
        }
    };

    return (
        <div
            ref={productCardRef}
            className="h-full overflow-hidden bg-white rounded-lg product-card"
        >
            {/* Fixed aspect ratio container for image */}
            <div className="relative pt-[100%] w-full">
                {' '}
                {/* 1:1 aspect ratio */}
                <Link
                    href={`/products/${slug}`}
                    className="absolute inset-0 block overflow-hidden rounded-tl-lg rounded-tr-lg"
                >
                    <div className="w-full h-full bg-gray-100">
                        {' '}
                        {/* Placeholder background */}
                        <Image
                            src={preview_image ? preview_image : noAvailableImg}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover w-full h-full"
                            loading={isPriority ? 'eager' : 'lazy'}
                            priority={isPriority}
                            quality={75}
                        />
                    </div>
                    {stock < 1 && (
                        <div className="absolute inset-0 flex items-center justify-center text-xl text-white bg-black bg-opacity-80">
                            Out of stock
                        </div>
                    )}
                </Link>
            </div>

            {/* Fixed height content area */}
            <div className="flex flex-col justify-between p-[10px] md:p-[18px] bg-white">
                <div>
                    <Link
                        href={`/products/${slug}`}
                        className="block mb-1 text-xs font-medium text-gray-900 capitalize sm:text-base lg:text-base xl:text-lg
                    md:mb-2 product-title ellipsis-2 xl:min-h-14"
                    >
                        {name}
                    </Link>
                    <p className="product-price text-xs sm:text-base xl:text-lg font-semibold text-gray-900">
                        {priceCurrency} :{' '}
                        {sale_price > 0 && <span>৳{sale_price}</span>}{' '}
                        <span
                            className={`inline-block ${
                                sale_price > 0
                                    ? 'line-through text-red-700 text-sm'
                                    : ''
                            }`}
                        >
                            ৳{unit_price}
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <KarbarButton
                        asLink
                        href={`/products/${slug}`}
                        className="w-full block text-center py-[10px] px-5 md:py-4 text-[10px] sm:text-base md:text-xs lg:text-base font-normal rounded-[4px] capitalize"
                    >
                        {siteSetting.button_text
                            ? siteSetting.button_text
                            : 'Order Now'}
                    </KarbarButton>
                </div>
            </div>
        </div>
    );
};

export default ProductCard