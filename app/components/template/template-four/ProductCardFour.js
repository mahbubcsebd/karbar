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

const  ProductCardFour = ({ product }) => {
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

    function calculateDiscount(unitPrice, salePrice) {
    const discount = ((unitPrice - salePrice) / unitPrice) * 100;
    return Math.round(discount);
    // return discount % 1 === 0 ? discount.toFixed(0) : discount.toFixed(2);
}

    return (
        <div
            ref={productCardRef}
            className="h-full overflow-hidden product-card group rounded-lg bg-white border border-[rgba(0, 0, 0, 0.30)]"
        >
            <Link
                href={`/products/${slug}`}
                className="block product-image h-[180px] sm:h-[373px] md:h-[286px] lg:h-[270px] xl:h-[344px] 1xl:h-[270px] 2xl:h-[320px] rounded-tl-lg rounded-tr-lg overflow-hidden relative"
            >
                <Image
                    src={preview_image ? preview_image : noAvailableImg}
                    alt={name}
                    width={270}
                    height={320}
                    className="object-cover w-full h-full"
                />
                {sale_price > 0 && (
                    <div
                        className={`absolute top-3 left-3 px-[14px] py-[10px] rounded-full text-[10px] bg-white shadow-md`}
                    >
                        <p className="text-[#484848]">
                            {calculateDiscount(unit_price, sale_price)}% Off
                        </p>
                    </div>
                )}
                {stock < 1 && (
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-center text-white text-xl bg-black z-99 opacity-80">
                        Out of stock
                    </div>
                )}
            </Link>
            <div className="product-content p-[10px] md:p-[18px] text-center">
                <Link
                    href={`/products/${slug}`}
                    className="block mb-1 text-xs font-medium text-gray-900 sm:text-base lg:text-base xl:text-lg md:mb-2 product-title ellipsis-2 xl:min-h-14 hover:text-[#348E29] transition-all duration-150 capitalize"
                >
                    {name}
                </Link>
                <p className="product-price text-xs sm:text-base xl:text-lg font-semibold text-gray-900 mb-[18px]">
                    {sale_price > 0 && (
                        <span>{`${siteSetting.currency_icon || "৳"}${sale_price}`}</span>
                    )}{' '}
                    <span
                        className={`inline-block ${
                            sale_price > 0
                                ? 'line-through text-red-700 text-sm'
                                : ''
                        }`}
                    >
                        {`${siteSetting.currency_icon || "৳"}${unit_price}`}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ProductCardFour;
