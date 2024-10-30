/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react";
import { getAllProduct } from "../utils/getProduct";
import ProductCard from "./ProductCard";

const Products = ({ lang, dictionary, categories }) => {
    const [loading, setLoading] = useState(false);
    const [productItem, setProductItem] = useState([]);
    const [page, setPage] = useState(1);
    const [showProduct, setShowProduct] = useState(12);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const productsData = await getAllProduct();
                const newProducts = productsData.data;

                console.log(newProducts);
                // setTotalProduct(productsData.meta.total);
                setProductItem(newProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [lang]);
    return (
        <div>
            {productItem.map((product) => (
                <ProductCard
                    dictionary={dictionary}
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default Products