"use client"

import { useContext, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { ProductContext } from '../context/cartContext';


const ProductCounter = ({
    id,
    productCount,
    setProductCount,
    stock,
    setShowStockMsg,
    productStock,
    showStock,
    incrementDisable,
    setIncrementDisable,
    variants,
}) => {
    // const [incrementDisable, setIncrementDisable] = useState(false);
    const [decrementDisable, setDecrementDisable] = useState(false);

    const { state, dispatch } = useContext(ProductContext);

    const handleRemoveFromCart = (id) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: id,
        });
        const product = cartItems.find((item) => item.id === id);
        toast.success(`Removed ${product.title} from Cart!`, {
            position: 'bottom-right',
        });
    };

    const handleIncrementQuantity = (id) => {
        setProductCount((prevProductCount) => {
            const newProductCount = prevProductCount + 1;
            if (newProductCount > productStock) {
                return productStock;
            }
            return newProductCount;
        });

        if (productCount === productStock) {
            setShowStockMsg(true);
            setIncrementDisable(true);
        }
    };

    const handleDecrementQuantity = (id) => {
        if (productCount > 1) {
            setProductCount(productCount - 1);
        }

        if (productCount <= productStock) {
            setShowStockMsg(false);
            setIncrementDisable(false);
        }

        // dispatch({
        //     type: 'DECREMENT_QUANTITY',
        //     payload: id,
        // });
    };

    const handleClearCart = () => {
        dispatch({
            type: 'CLEAR_CART',
        });
        toast.success(`Removed all product from Cart!`, {
            position: 'bottom-right',
        });
    };

    return (
        <>
            <div className="flex justify-between items-center w-[112px] h-14 border border-gray-400 rounded-md">
                <button
                    type="button"
                    onClick={() => handleDecrementQuantity(id)}
                    disabled={decrementDisable}
                    className="h-full px-[14px] text-gray-600 quantity-decrement"
                >
                    <FaMinus />
                </button>
                <div className="text-gray-600 text base quantity">
                    {productCount}
                </div>
                <button
                    type="button"
                    onClick={() => handleIncrementQuantity(id)}
                    disabled={
                        variants.length > 0
                            ? incrementDisable ||
                              stock < 1 ||
                              (productStock < 1 && showStock)
                            : false
                    }
                    className="h-full px-[14px] text-gray-600 quantity-increment"
                >
                    <FaPlus />
                </button>
            </div>
        </>
    );
};

export default ProductCounter