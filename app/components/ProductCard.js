"use client"

import Link from "next/link";
import { useContext, useEffect, useRef, useState } from 'react';
// import { useContext } from "react";
import useSiteSetting from "@/hooks/useSiteSetting";
import Image from "next/image";
import { toast } from "react-toastify";
import { ProductContext } from "../context/cartContext";
import useDictionary from "../hooks/useDictionary";
// import { ProductContext } from "../context/cartContext";


const ProductCard = ({ product, isPriority = false }) => {
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
        <div className="product-card relative">
            {/* Fixed aspect ratio container for image */}
            <div className="relative aspect-[3/4] w-full bg-gray-100">
                <Link href={`/products/${product.slug}`}>
                    <Image
                        src={product.product_images[0]?.original_url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center"
                        priority={isPriority}
                    />
                </Link>
            </div>

            {/* Fixed height content area */}
            <div className="product-content h-[120px] flex flex-col justify-between p-3">
                <h3 className="product-title text-sm font-medium text-gray-700 line-clamp-2">
                    {product.name}
                </h3>

                <div className="price-area">
                    <div className="flex items-center gap-2">
                        <p className="text-base font-semibold text-gray-900">
                            ৳{product.sale_price || product.unit_price}
                        </p>
                        {product.sale_price && (
                            <p className="text-sm text-gray-500 line-through">
                                ৳{product.unit_price}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard