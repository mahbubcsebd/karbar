'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { ProductContext } from '../context/cartContext';
import useAdManager from '../hooks/useAdManager';
import { trackEvent } from '../utils/facebookPixel';
import { getProductStock } from '../utils/getProductStock';
import KarbarButton from './KarbarButton';
import ProductCounter from './ProductCounter';

const ProductOrder = ({ product, dictionary }) => {
    const [showStockMsg, setShowStockMsg] = useState(false);
    const { id, variants, stock } = product;
    const [productStock, setProductStock] = useState(0);
    const [buttonActive, setButtonActive] = useState(false);
    const [showStock, setShowStock] = useState(false);
    const [unselectedFields, setUnselectedFields] = useState([]);
    const [incrementDisable, setIncrementDisable] = useState(false);
    const [selectedValues, setSelectedValues] = useState({});
    const [availableSizeOptions, setAvailableSizeOptions] = useState(variants);
    const [productCount, setProductCount] = useState(1);
    const [attributes, setAttributes] = useState('');
    const { adManager } = useAdManager();

    const router = useRouter();
    const { state, dispatch } = useContext(ProductContext);
    const isInCart = state.cartItems.some((item) => item.id === product.id);
    const {
        order,
        addToCart,
        limitation,
        max,
        stockOut,
        productVarientSelect,
    } = dictionary;

    useEffect(() => {
        if (variants.length < 1) {
            setProductStock(stock);
        }
    }, [productStock, variants, stock]);

    const handleChange = async (key, variantIndex, value) => {
        setSelectedValues((prevSelectedValues) => ({
            ...prevSelectedValues,
            [key]: value,
        }));

        setUnselectedFields([]);
        setIncrementDisable(false);

        let newAttributes = attributes;
        const encodedValue = encodeURIComponent(value);
        const attributeKey = `attribute_${variantIndex + 1}`;

        if (newAttributes.includes(attributeKey)) {
            newAttributes = newAttributes.replace(
                new RegExp(`${attributeKey}=[^&]+`),
                `${attributeKey}=${encodedValue}`
            );
        } else {
            newAttributes = newAttributes
                ? `${newAttributes}&${attributeKey}=${encodedValue}`
                : `${attributeKey}=${encodedValue}`;
        }

        setAttributes(newAttributes);

        setTimeout(() => {
            setShowStock(true);
        }, 2000);

        let productStock = await getProductStock(id, newAttributes);
        setProductStock(productStock.stock);
    };

    const checkUnselectedFields = () => {
        const unselected = variants
            .map(variant => {
                const key = Object.keys(variant)[0];
                if (!selectedValues[key]) {
                    return key;
                }
                return null;
            })
            .filter(Boolean);

        setUnselectedFields(unselected);
        return unselected.length === 0;
    };

    const handleAddToCart = (event) => {
        if (event.type === 'submit') {
            event.preventDefault();
        }

        const allFieldsSelected = checkUnselectedFields();
        if (!allFieldsSelected) {
            return;
        }

        const selectedProduct = {
            ...product,
            quantity: productCount,
            attributes: selectedValues,
        };

        if (!isInCart) {
            dispatch({
                type: 'ADD_TO_CART',
                payload: selectedProduct,
            });
            toast.success(`Added ${product.name} to Cart!`, {
                position: 'bottom-right',
            });

            if (adManager?.tag_managers) {
                window.dataLayer.push({
                    event: 'add_to_cart',
                    ecommerce: {
                        items: selectedProduct,
                    },
                });
            }

            trackEvent('Add To Cart', selectedProduct);
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
        <form onSubmit={handleAddToCart}>
            <div>
                {variants.map((variant, variantIndex) => {
                    const key = Object.keys(variant)[0];
                    const values = variant[key];

                    return (
                        <div key={variantIndex} className="flex flex-col gap-2 mb-8 lg:mb-5">
                            <div className="flex items-center gap-[10px] md:gap-0">
                                <div className="md:min-w-[90px]">
                                    <p className="text-base font-semibold text-gray-700 capitalize">
                                        {key}:
                                    </p>
                                </div>
                                <ul className="flex items-center gap-2 lg:gap-[18px] flex-wrap">
                                    {values.map((value, index) => (
                                        <li key={index}>
                                            <input
                                                type="radio"
                                                name={key}
                                                id={`${key}-${value}`}
                                                value={value}
                                                className="hidden"
                                                checked={selectedValues[key] === value}
                                                onChange={() => handleChange(key, variantIndex, value)}
                                            />
                                            {key.toLowerCase() === 'color' ? (
                                                <label
                                                    htmlFor={`${key}-${value}`}
                                                    className={`cursor-pointer rounded-full p-[2px] flex items-center justify-center shadow-lg ${
                                                        selectedValues[key] === value
                                                            ? 'border-red-500 border-3'
                                                            : 'border-gray-900 border-1'
                                                    }`}
                                                >
                                                    <div
                                                        style={{
                                                            backgroundColor: `#${value}`,
                                                        }}
                                                        className="w-5 h-5 rounded-full"
                                                    ></div>
                                                </label>
                                            ) : (
                                                <label
                                                    htmlFor={`${key}-${value}`}
                                                    className={`px-2 py-1 text-base font-medium rounded block cursor-pointer border border-gray-900 ${
                                                        selectedValues[key] === value
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-600 hover:text-white hover:bg-gray-900'
                                                    }`}
                                                >
                                                    {value}
                                                </label>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {unselectedFields.includes(key) && (
                                <p className="text-sm text-red-500">
                                    Please select a {key.toLowerCase()}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {productStock < 1 && showStock && (
                <p className="text-red-500">{stockOut}</p>
            )}

            <hr className="my-6 border-gray-400" />
            <div className="flex items-center gap-[12px] mb-[30px]">
                <ProductCounter
                    id={product.id}
                    productCount={productCount}
                    setProductCount={setProductCount}
                    stock={productStock}
                    setShowStockMsg={setShowStockMsg}
                    buttonActive={buttonActive}
                    showStock={showStock}
                    productStock={productStock}
                    incrementDisable={incrementDisable}
                    setIncrementDisable={setIncrementDisable}
                    variants={variants}
                />
                <KarbarButton
                    type="submit"
                    className={`flex items-center gap-2 px-[19px] md:px-[30px] py-[19px] md:py-[18px] transition duration-150 rounded-md capitalize`}
                    disabled={stock < 1 || (productStock < 1 && showStock)}
                    area-label="add to cart button"
                >
                    <BsCart3 />
                    <span className="hidden md:inline-block">{addToCart}</span>
                </KarbarButton>
                <KarbarButton
                    type="submit"
                    onClick={() => {
                        if (productStock >= 1 && checkUnselectedFields()) {
                            router.push('/checkout');
                        }
                    }}
                    className="flex items-center gap-2 px-[19px] md:px-[30px] py-[17px] md:py-[18px] transition duration-150 rounded-md capitalize"
                    disabled={stock < 1 || (productStock < 1 && showStock)}
                    area-label="order now button"
                >
                    {order}
                </KarbarButton>
            </div>
            {showStockMsg && stock >= 1 && (
                <p className="text-red-500">
                    {max} {productStock} {limitation}
                </p>
            )}
        </form>
    );
};

export default ProductOrder;