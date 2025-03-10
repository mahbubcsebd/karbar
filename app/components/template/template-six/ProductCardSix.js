'use client';

import cartIcon from '@/assets/icons/cartIcon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import noAvailableImg from '../../../assets/icons/no-available.svg';
import { ProductContext } from '../../../context/cartContext';
import useDictionary from '../../../hooks/useDictionary';
import useSiteSetting from '../../../hooks/useSiteSetting';
import RatingReadOnly from '../../RatingReadOnly';

const ProductCardSix = ({ product }) => {
    const productCardRef = useRef(null);
    const [width, setWidth] = useState(0);
    const { dictionary } = useDictionary();
    const { siteSetting } = useSiteSetting();
    const { priceCurrency } = dictionary.ProductCard;

    useEffect(() => {
        if (productCardRef.current) {
            setWidth(productCardRef.current.offsetWidth);
        }
    }, []);

    const { uuid, name, preview_image, sale_price, unit_price, stock, slug } =
        product;
    const { state, dispatch } = useContext(ProductContext);

    // Check if product is already in cart
    const isInCart = state.cartItems.some((item) => item.id === product.id);

    // Handle Add To Cart
    const handleAddToCart = () => {
        if (!isInCart) {
            dispatch({
                type: 'ADD_TO_CART',
                payload: { ...product, quantity: 1 },
            });
            toast.success(`Added ${product.name} to Cart!`, {
                position: 'bottom-right',
            });
        } else {
            dispatch({
                type: 'REMOVE_FROM_CART',
                payload: product.id,
            });
            toast.error(
                `The product ${product.name} is remove from cart`,
                {
                    position: 'bottom-right',
                }
            );
        }
    };

    // Calculate Discount
    const calculateDiscount = (unitPrice, salePrice) => {
        return Math.round(((unitPrice - salePrice) / unitPrice) * 100);
    };

    return (
        <div className="h-full overflow-hidden product-card group rounded-lg bg-white">
            <Link
                href={`/products/${slug}`}
                className="block product-image h-[250px] sm:h-[280px] lg:h-[300px] xl:h-[350px] 2xl:[400px] rounded-lg overflow-hidden relative"
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
                        className={`absolute top-2 left-2 lg:top-3 lg:left-3 px-[10px] py-[6px] lg:px-[14px] lg:py-[10px] rounded text-[10px] bg-white shadow-md`}
                    >
                        <p className="text-[#DC2626] text-semibold">
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
            <div className="product-content pt-[10px] md:pt-[18px] p-3">
                <RatingReadOnly rating={4.5} />
                <Link
                    href={`/products/${slug}`}
                    className="block mb-1 text-base sm:text-base lg:text-base xl:text-2xl md:mb-2 product-title ellipsis-2 xl:min-h-16 hover:text-[#2A333E] font-cormorant font-bold transition-all duration-150 capitalize"
                >
                    {name}
                </Link>
                <p className="text-xs sm:text-base text-[#6E758D] font-normal mb-4">
                    Spaghetti, rice, latus, shrimp, onion, lemon, garlic,
                    coriander, and garlic powder
                </p>
                <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
                <div className="flex justify-between items-center gap-4 pt-1 md:pt-3">
                    <p className="product-price text-xs sm:text-base xl:text-2xl font-normal text-[#263054]">
                        {sale_price > 0 && (
                            <span>{`${siteSetting.currency_icon || "৳"}${sale_price}`}</span>
                        )}{' '}
                        <span
                            className={`inline-block ${
                                sale_price > 0
                                    ? 'line-through text-red-500 text-[10px] sm:text-sm'
                                    : ''
                            }`}
                        >
                            {`${siteSetting.currency_icon || "৳"}${unit_price}`}
                        </span>
                    </p>
                    <button
                        className={`w-[44px] h-[44px] text-lg flex justify-center items-center rounded-md hover:bg-[#FD9C02] hover:text-white cart-btn ${
                            isInCart
                                ? 'bg-[#FD9C02] text-white cart-btn-active'
                                : 'text-[#6E758D]'
                        }`}
                        onClick={handleAddToCart}
                    >
                        <Image
                            src={cartIcon}
                            alt="cart icon"
                            className="cart-icon"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSix;
