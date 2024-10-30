'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { RxCross1, RxCrossCircled } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { ProductContext } from '../context/cartContext';
// import { ProductContext } from '../context/cartContext';



const HeaderCart = ({dictionary}) => {
    const { state, dispatch } = useContext(ProductContext);
    const { cartItems, cartTotal } = state;
    const { itemsNumber, cartEmpty, total, order, currency } = dictionary;

    const handleRemoveFromCart = (id) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: id,
        });
        const product = cartItems.find((item) => item.id === id);
        toast.success(`Removed ${product.name} from Cart!`, {
            position: 'bottom-right',
        });
    };

    const [show, setShow] = useState(false);
    const cartRef = useRef(null);

    const handleShow = () => {
        setShow(!show);
    };

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);

    return (
        <div
            className="relative"
            ref={cartRef}
        >
            <button
                type="button"
                className="relative flex items-center justify-center gap-1  text-lg md:text-[22px] text-gray-800 border border-[#D14BF8] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white"
                onClick={handleShow}
            >
                <BsCart3 />
                {state.cartItems.length > 0 && (
                    <span className="w-3 h-3 rounded-full bg-[#FF2848] text-[8px] text-white flex justify-center items-center absolute top-[9px] right-[10px]">
                        {state.cartItems.length}
                    </span>
                )}
            </button>
            {show && (
                <div
                    className={`absolute right-0 top-14 bg-white rounded-lg px-5 py-6 min-w-[300px] lg:min-w-[370px] z-50 shadow-md min-h-[250px] md:min-h-[360px] ${
                        cartItems.length === 0
                            ? 'flex justify-center items-center'
                            : ''
                    }`}
                >
                    {cartItems.length === 0 ? (
                        <p className="text-xl text-center">{cartEmpty}</p>
                    ) : (
                        <div>
                            <p className="text-xl font-semibold text-gray-700">
                                {state.cartItems.length} {itemsNumber}{' '}
                            </p>
                            <hr className="my-5 border-gray-400" />
                            <div className="grid gap-4">
                                {cartItems.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-start gap-[14px] border-b border-gray-400 pb-4"
                                    >
                                        <div>
                                            <div className="w-[72px] h-[72px] lg:w-[84px] lg:h-[90px] rounded-md overflow-hidden">
                                                <Image
                                                    className="object-cover w-full h-full"
                                                    src={product.preview_image}
                                                    alt={product.name}
                                                    width={84}
                                                    height={84}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex items-start justify-between">
                                                <h2 className="mb-2 text-sm font-medium text-gray-900 ellipsis-2 lg:text-lg lg:mb-3">
                                                    {product.name}
                                                </h2>
                                                <div className="pt-1">
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveFromCart(
                                                                product.id
                                                            )
                                                        }
                                                        type="button"
                                                        className="text-2xl text-gray-400"
                                                    >
                                                        <RxCrossCircled />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <p>{product.quantity}</p>
                                                    <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                        <RxCross1 />
                                                    </p>
                                                    <p className="text-sm lg:text-lg text-[#F93754] font-semibold">
                                                        {product.sale_price > 0
                                                            ? product.sale_price
                                                            : product.unit_price}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between pt-5">
                                <p className="text-lg font-semibold text-gray-700">
                                    {total} :
                                </p>
                                <p className="text-lg font-semibold text-gray-700">
                                    {cartTotal} {currency}
                                </p>
                            </div>
                            <div className="pt-5">
                                <Link
                                    href="/checkout"
                                    className="flex justify-center items-center text-center gap-2 px-[30px] py-4 text-base text-white bg-gray-900 rounded-md w-full"
                                    onClick={handleShow}
                                >
                                    {order}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeaderCart;
