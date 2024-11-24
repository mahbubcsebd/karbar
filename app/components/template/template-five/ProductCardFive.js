'use client';

import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
// import { useContext } from "react";
import Image from 'next/image';
import { toast } from 'react-toastify';
import noAvailableImg from '../../../assets/icons/no-available.svg';
import { ProductContext } from '../../../context/cartContext';
import useDictionary from '../../../hooks/useDictionary';
// import { ProductContext } from "../context/cartContext";

const  ProductCardFive = ({ product }) => {
    const productCardRef = useRef(null);
    const [width, setWidth] = useState(0);
    const { dictionary } = useDictionary();

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
            className="h-full overflow-hidden product-card group rounded-lg bg-transparent hover:bg-white border border-[rgba(0, 0, 0, 0.30)] p-3"
        >
            <Link
                href={`/products/${slug}`}
                className="block product-image h-[120px] sm:h-[160px] lg:h-[220px] xl:h-[230px] 2xl:[240px] rounded-lg overflow-hidden relative"
            >
                <Image
                    src={preview_image ? preview_image : noAvailableImg}
                    alt={name}
                    width={270}
                    height={320}
                    className="object-cover w-full h-full"
                />
                <div
                    className={`absolute top-2 left-2 lg:top-3 lg:left-3 px-[10px] py-[6px] lg:px-[14px] lg:py-[10px] rounded text-[10px] bg-white shadow-md`}
                >
                    <p className="text-[#DC2626] text-semibold">20% Off</p>
                </div>
                {stock < 1 && (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-center text-white text-xl bg-black z-[99] opacity-80">
                        স্টক আউট
                    </div>
                )}
            </Link>
            <div className="product-content pt-[10px] md:pt-[18px]">
                <Link
                    href={`/products/${slug}`}
                    className="block mb-1 text-sm font-medium text-gray-900 sm:text-base lg:text-base xl:text-2xl md:mb-2 product-title ellipsis-2 xl:min-h-16 hover:text-[#F3832D] transition-all duration-150 capitalize"
                >
                    {name}
                </Link>
                <p className="product-price text-xs sm:text-base xl:text-lg font-semibold text-gray-900 mb-[18px]">
                    {priceCurrency} :{' '}
                    {sale_price > 0 && <span>৳{sale_price}</span>}{' '}
                    <span
                        className={`inline-block ${
                            sale_price > 0
                                ? 'line-through text-red-500 text-[10px]'
                                : ''
                        }`}
                    >
                        ৳{unit_price}
                    </span>
                </p>
                <div className="flex items-center">
                    <Link
                        href={`/products/${slug}`}
                        className="w-full block text-center py-[10px] px-5 md:py-3 text-[10px] sm:text-base md:text-xs lg:text-base font-normal text-gray-600 bg-transparent hover:bg-[#2A51C6] border border-gray-600 hover:border-[#2A51C6] hover:text-white rounded-lg product-button"
                    >
                        {seeDetails}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCardFive;
