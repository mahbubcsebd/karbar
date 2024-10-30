'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import bkash from '../assets/icons/checkout-bkash.svg';
import cod from '../assets/icons/checkout-cod.svg';
import nagad from '../assets/icons/checkout-nagad.svg';
import Input from '../components/form/Input';
import PaymentRadio from '../components/form/PaymentRadio';
import { ProductContext } from '../context/cartContext';
import useDictionary from '../hooks/useDictionary';
import { trackEvent } from '../utils/facebookPixel';
import { getCoupon } from '../utils/getCoupon';
import { orderPost } from '../utils/orderPost';

const CheckoutPage = ({ siteSettings, paymentMethod }) => {
    const [total, setTotal] = useState(0);
    const [couponApply, setCouponApply] = useState(true);
    const [orderLoading, setOrderLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [productStock, setProductStock] = useState(0);
    const [discountValue, setDiscountValue] = useState(null);
    const {dictionary} = useDictionary();


    const {
        formTitle,
        orderTitle,
        paymentTitle,
        dicSubTotal,
        dicDeliveryFee,
        dicCouponProvide,
        dicTotal,
        dicConfirm,
        dicConfirmProcessing,
        Form,
        cartEmpty,
        bkashMsgBefore,
        bkashMsgAfter,
        nagadMsgBefore,
        nagadMsgAfter,
        provideBkashNumber,
        provideNagadNumber,
        bkashTransactionID,
        nagadTransactionID,
    } = dictionary.Checkout;

    const {
        nameLabel,
        namePlaceholder,
        phoneLabel,
        phonePlaceholder,
        areaLabel,
        insideDhaka,
        outsideDhaka,
        freeDelevery,
        currency,
        addressLabel,
        addressPlaceholder,
        noteLabel,
        optional,
        notePlaceholder,
    } = Form;

    const handleCodeChange = (event) => {
        setCouponCode(event.target.value);
    };

    const {
        inside_dhaka,
        outside_dhaka,
        bkash: bkashNum,
        nagad: nagadNum,
    } = siteSettings;

    const insideDhakaDC = inside_dhaka ? Number(inside_dhaka) : 0;
    const outsideDhakaDC = outside_dhaka ? Number(outside_dhaka) : 0;

    const router = useRouter();
    const [selectedValue, setSelectedValue] = useState('inside_dhaka');
    const [selectedPayment, setSelectedPayment] = useState('cash');
    const [shippingCost, setShippingCost] = useState(insideDhakaDC);

    const [nameWarningMessage, setNameWarningMessage] = useState(null);
    // const [emailWarningMessage, setEmailWarningMessage] = useState(null);
    const [phoneWarningMessage, setPhoneWarningMessage] = useState(null);
    const [phoneValidMsg, setPhoneValidMsg] = useState(null);
    const [addressWarningMessage, setAddressWarningMessage] = useState(null);

    const { state, dispatch } = useContext(ProductContext);
    const { cartItems, cartTotal } = state;
    const [subTotal, setSubtotal] = useState(null);

    // setSubtotal(cartTotal);
    useEffect(() => {
        setSubtotal(cartTotal);
    }, [cartTotal]);
    useEffect(() => {
        setTotal(subTotal + shippingCost);
    }, [subTotal, shippingCost, cartTotal]);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        if (value === 'inside_dhaka') {
            setShippingCost(insideDhakaDC);
        } else if (value === 'outside_dhaka') {
            setShippingCost(outsideDhakaDC);
        }
    };

    const handleApply = async () => {
        try {
            if (couponCode === '') {
                toast.error(`কুপন কোড দিন`, {
                    position: 'bottom-right',
                });
            }

            let couponData = await getCoupon(couponCode);
            if (couponData.success && couponCode) {
                if (!couponApply) {
                    toast.error(`আপনি কুপন ব্যবহার করে ফেলেছেন`, {
                        position: 'bottom-right',
                    });
                }
                const { type, discount } = couponData.data;

                if (type === 'Flat' && couponApply) {
                    setSubtotal(subTotal - discount);
                    setDiscountValue(discount);
                    setCouponApply(false);
                    toast.success(`"কুপন সফল হয়েছে"`, {
                        position: 'bottom-right',
                    });
                }

                if (type === 'Percentage' && couponApply) {
                    const discountAmount = subTotal * (discount / 100);
                    setSubtotal(subTotal - discountAmount);
                    setDiscountValue(discountAmount);
                    setCouponApply(false);
                    toast.success(`"কুপন সফল হয়েছে"`, {
                        position: 'bottom-right',
                    });
                }
            } else {
                if (couponCode) {
                    toast.error(`"কুপন সফল হয়নি"`, {
                        position: 'bottom-right',
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching coupon:', error);
        }
    };

    const orderedProduct = [];
    cartItems.map((product) =>
        orderedProduct.push({
            product_name: product.name,
            product_id: product.id,
            quantity: product.quantity,
            price:
                product.sale_price > 0
                    ? product.sale_price
                    : product.unit_price,
            size: product.size_name,
            color: product.color_name,
            total:
                product.quantity *
                (product.sale_price > 0
                    ? product.sale_price
                    : product.unit_price),
            attributes: product.attributes,
        })
    );

    const totalQuantity = cartItems.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.quantity;
    }, 0);

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

    const handleIncrement = (id) => {
        dispatch({
            type: 'INCREMENT_QUANTITY',
            payload: id,
        });
    };
    const handleDecrement = (id) => {
        dispatch({
            type: 'DECREMENT_QUANTITY',
            payload: id,
        });
    };

    // const handleChange = (event) => {
    //     setSelectedValue(event.target.value);

    //     if (event.target.value === 'inside_dhaka') {
    //         setShippingCost(80);
    //     }

    //     if (event.target.value === 'outside_dhaka') {
    //         setShippingCost(120);
    //     }
    // };

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const { name, address, phone, spacial_instruction } = data;

        if (name === '' || name === null || name === undefined) {
            setNameWarningMessage('নাম আবশ্যক');
        } else {
            setNameWarningMessage(null);
        }

        if (phone === '' || phone === null || phone === undefined) {
            setPhoneWarningMessage('ফোন নাম্বার আবশ্যক');
        } else {
            if (phone.length === 11) {
                setPhoneWarningMessage(null);
            } else {
                setPhoneWarningMessage('আপনি ভুল নাম্বার দিয়েছেন');
                return;
            }
        }

        if (address === '' || address === null || address === undefined) {
            setAddressWarningMessage('ঠিকানা আবশ্যক');
        } else {
            setAddressWarningMessage(null);
        }

        const orderData = {
            ...data,
            products: orderedProduct,
            delivery_fee: shippingCost,
            total_quantity: totalQuantity,
            total_amount: total,
            delivery_location: selectedValue,
            spacial_instruction: spacial_instruction,
            currency: 'bdt',
            discount_amount: discountValue ? discountValue : 0,
            sub_total: subTotal,
        };

        try {
            setOrderLoading(true);
            const response = await orderPost(JSON.stringify(orderData));
            if (response.ok) {
                setOrderLoading(false);
                const responseData = await response.json();

                if (responseData.success) {
                    router.push('/order-successfull');
                    toast.success(`${responseData.success}`, {
                        position: 'bottom-right',
                    });

                    dispatch({
                        type: 'CLEAR_CART',
                    });
                    // For Google tag manager
                    window.dataLayer.push({
                        event: 'purchase',
                        ecommerce: {
                            items: orderData,
                        },
                    });

                    // For Facebook Pixels
                    trackEvent('Purchase', orderData);
                } else {
                    setOrderLoading(false);
                    toast.error(
                        `দুঃখিত! আপনার অর্ডারটি সফল হয়নি। ${responseData.message}`,
                        {
                            position: 'bottom-right',
                        }
                    );
                }
            } else {
                throw new Error('Failed to submit Order');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    // For Google tag manager
    useEffect(() => {
        window.dataLayer.push({
            event: 'begin_checkout',
            ecommerce: {
                items: cartItems,
            },
        });

        // For Facebook Pixels
        trackEvent('Checkout', cartItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            id="cart-page"
            className="pb-20 pt-28 md:py-20 cart-page"
        >
            <div className="cart-area">
                <div className="container">
                    <form
                        onSubmit={submitHandler}
                        id="cart-form"
                        className="cart-form"
                    >
                        <div className="grid grid-cols-12 gap-[30px]">
                            <div className="col-span-12 lg:col-span-6 xxl:col-span-7">
                                <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl xxl:text-3xl text-gray-900 font-semibold mb-5 lg:mb-[30px] flex flex-col gap-1 md:leading-[36px] lg:leading-[40px]">
                                    {formTitle}
                                    <span className="w-9 h-[2px] bg-[#086CD9] lg:hidden"></span>
                                </h2>
                                <div className="lg:p-[30px] lg:rounded-[20px] lg:bg-white">
                                    <div className="grid gap-[18px] lg:gap-6">
                                        <Input
                                            label={nameLabel}
                                            type="text"
                                            name="name"
                                            placeholder={namePlaceholder}
                                            warningMessage={
                                                nameWarningMessage
                                                    ? nameWarningMessage
                                                    : null
                                            }
                                            required
                                        />
                                        <Input
                                            label={phoneLabel}
                                            type="number"
                                            name="phone"
                                            placeholder={phonePlaceholder}
                                            warningMessage={
                                                phoneWarningMessage
                                                    ? phoneWarningMessage
                                                    : null
                                            }
                                            required
                                        />
                                        <div className="delivary-area">
                                            <label className="block text-gray-700 text-sm font-semibold mb-[6px]">
                                                {areaLabel}
                                            </label>
                                            <select
                                                className="block w-full px-[14px] py-[16px] lg:px-6 lg:py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow bg-white cursor-pointer"
                                                value={selectedValue}
                                                onChange={handleSelectChange}
                                            >
                                                <option
                                                    select
                                                    value="inside_dhaka"
                                                >
                                                    {insideDhaka} -{' '}
                                                    {insideDhakaDC > 0
                                                        ? `${insideDhakaDC} ${currency}`
                                                        : { freeDelevery }}
                                                </option>
                                                <option value="outside_dhaka">
                                                    {outsideDhaka} -{' '}
                                                    {outsideDhakaDC > 0
                                                        ? `${outsideDhakaDC} ${currency}`
                                                        : { freeDelevery }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-[6px]">
                                                {addressLabel}
                                            </label>
                                            <textarea
                                                type="text"
                                                name="address"
                                                placeholder={addressPlaceholder}
                                                warningMessage={
                                                    addressWarningMessage
                                                        ? addressWarningMessage
                                                        : null
                                                }
                                                rows="3"
                                                required
                                                className="block w-full px-6 py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow"
                                            />
                                            <small
                                                className={`mt-1 text-red-500 ${
                                                    addressWarningMessage ===
                                                        '' ||
                                                    addressWarningMessage ===
                                                        null ||
                                                    addressWarningMessage
                                                        ? ''
                                                        : 'hidden'
                                                }`}
                                            >
                                                {addressWarningMessage}
                                            </small>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-[6px]">
                                                {noteLabel}
                                                <span className="text-gray-600">
                                                    ({optional})
                                                </span>
                                            </label>
                                            <textarea
                                                type="text"
                                                name="spacial_instruction"
                                                placeholder={notePlaceholder}
                                                rows="3"
                                                className="block w-full px-6 py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-6 xxl:col-span-5">
                                <div className="mb-10 cart-payment-amount">
                                    <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl xxl:text-3xl text-gray-900 font-semibold mb-5 lg:mb-[70px] flex flex-col gap-1 md:leading-[36px] lg:leading-[40px] capitalize">
                                        {orderTitle}
                                        <span className="w-9 h-[2px] bg-[#086CD9] lg:hidden"></span>
                                    </h2>
                                    <div className="p-[30px] rounded-[20px] bg-white">
                                        {cartItems.length > 0 ? (
                                            <div>
                                                <ul className="grid gap-3">
                                                    {cartItems.map(
                                                        (
                                                            product,
                                                            index,
                                                            cartArray
                                                        ) => (
                                                            <li
                                                                key={product.id}
                                                            >
                                                                <div
                                                                    className={`flex items-start gap-[14px] ${
                                                                        index ===
                                                                        cartArray.length -
                                                                            1
                                                                            ? 'border-b-0'
                                                                            : 'pb-3 border-b border-gray-400'
                                                                    }`}
                                                                >
                                                                    <div>
                                                                        <div className="w-[90px] h-[104px] sm:w-[95px] sm:h-[112px] md:w-[110px] md:h-[118px] lg:w-[84px] lg:h-[90px] xl:w-[110px] xl:h-[120px] rounded-[10px] overflow-hidden">
                                                                            <Image
                                                                                className="object-cover w-full h-full"
                                                                                src={
                                                                                    product.preview_image
                                                                                }
                                                                                alt={
                                                                                    product.name
                                                                                }
                                                                                width={
                                                                                    84
                                                                                }
                                                                                height={
                                                                                    84
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-auto">
                                                                        <div className="flex justify-between gap-2 mb-[10px]">
                                                                            <h2 className="text-sm sm:text-base lg:text-lg text-gray-900 font-semibold ellipsis-2 h-10 sm:h-12 md:h-[54px]">
                                                                                {
                                                                                    product.name
                                                                                }
                                                                            </h2>
                                                                            <div>
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleRemoveFromCart(
                                                                                            product.id
                                                                                        )
                                                                                    }
                                                                                    type="button"
                                                                                    className="pt-[2px] text-xl text-gray-400"
                                                                                >
                                                                                    <RxCross2 />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-6 mb-2">
                                                                            <div className="flex justify-between items-center w-[90px] h-[30px] border bg-[#EAEAEA] rounded-md px-[3px]">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handleDecrement(
                                                                                            product.id
                                                                                        )
                                                                                    }
                                                                                    className="flex items-center justify-center w-6 h-6 text-xs text-gray-600 bg-white rounded-md quantity-decrement"
                                                                                >
                                                                                    <FaMinus />
                                                                                </button>
                                                                                <div className="text-xs text-gray-600 quantity">
                                                                                    {
                                                                                        product.quantity
                                                                                    }
                                                                                </div>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handleIncrement(
                                                                                            product.id
                                                                                        )
                                                                                    }
                                                                                    className="flex items-center justify-center w-6 h-6 text-xs text-gray-600 bg-white rounded-md quantity-increment"
                                                                                >
                                                                                    <FaPlus />
                                                                                </button>
                                                                            </div>
                                                                            <p className="text-sm lg:text-lg text-[#F93754] font-semibold">
                                                                                ৳
                                                                                {product.sale_price >
                                                                                0
                                                                                    ? ' ' +
                                                                                      product.sale_price
                                                                                    : ' ' +
                                                                                      product.unit_price}
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-2">
                                                                                {Object.entries(
                                                                                    product.attributes
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) =>
                                                                                        key.toLocaleLowerCase() ===
                                                                                        'color' ? (
                                                                                            <div
                                                                                                key={
                                                                                                    key
                                                                                                }
                                                                                                className=""
                                                                                            >
                                                                                                <div
                                                                                                    className="w-4 h-4 rounded-full shadow-lg border border-gray-600 p-[2px]"
                                                                                                    style={{
                                                                                                        backgroundColor: `#${value}`,
                                                                                                    }}
                                                                                                ></div>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <p
                                                                                                key={
                                                                                                    key
                                                                                                }
                                                                                                className="text-[9px] bg-gray-900 text-white py-[2px] rounded-lg leading-[12px] px-2"
                                                                                            >
                                                                                                {
                                                                                                    value
                                                                                                }
                                                                                            </p>
                                                                                        )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                                <hr className="mt-3 border-gray-400 lg:mt-5 lg:mb-2" />
                                                <ul className="">
                                                    <li className="flex items-center justify-between py-3 border-b border-gray-400 lg:py-5">
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            {dicSubTotal} :
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            {cartTotal}{' '}
                                                            {currency}
                                                        </p>
                                                    </li>
                                                    <li className="flex items-center justify-between py-3 border-b border-gray-400 lg:py-5">
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            {dicDeliveryFee} :
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            {shippingCost}{' '}
                                                            {currency}
                                                        </p>
                                                    </li>
                                                    <li className="py-3 border-b border-gray-400 lg:py-5">
                                                        <div className="relative flex items-center justify-between">
                                                            <input
                                                                type="text"
                                                                placeholder={
                                                                    dicCouponProvide
                                                                }
                                                                value={
                                                                    couponCode
                                                                }
                                                                onChange={
                                                                    handleCodeChange
                                                                }
                                                                className="w-full px-0 text-sm font-normal text-gray-700 border-0 focus:outline-none focus:ring-0 active:outline-none lg:text-lg"
                                                            />
                                                            <button
                                                                onClick={
                                                                    handleApply
                                                                }
                                                                type="button"
                                                                className="absolute right-0 text-sm font-semibold text-gray-700 lg:text-lg"
                                                            >
                                                                Apply
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-center justify-between pt-3 lg:pt-5">
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            {dicTotal} :
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-700 lg:text-lg">
                                                            {total} {currency}
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="text-base font-semibold text-gray-800">
                                                {cartEmpty}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="cart-payment-option">
                                    <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl xxl:text-3xl text-gray-900 font-semibold mb-5 lg:mb-[30px] flex flex-col gap-1 md:leading-[36px] lg:leading-[40px] capitalize">
                                        {paymentTitle}
                                        <span className="w-9 h-[2px] bg-[#086CD9] lg:hidden"></span>
                                    </h2>
                                    {/* <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3">
                                        <PaymentRadio
                                            value="cash"
                                            icon={cod}
                                            name="payment_method"
                                            imgClass="w-[160px]"
                                            checked={selectedPayment === 'cash'}
                                            onChange={handlePaymentChange}
                                        />
                                        <PaymentRadio
                                            value="bkash"
                                            icon={bkash}
                                            name="payment_method"
                                            imgClass="w-[74px]"
                                            checked={
                                                selectedPayment === 'bkash'
                                            }
                                            onChange={handlePaymentChange}
                                        />
                                        <PaymentRadio
                                            value="nagad"
                                            icon={nagad}
                                            name="payment_method"
                                            imgClass="w-[78px]"
                                            checked={
                                                selectedPayment === 'nagad'
                                            }
                                            onChange={handlePaymentChange}
                                        />
                                    </div> */}
                                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3">
                                        {paymentMethod.map((method) => {
                                            let imgClass;
                                            switch (method.name) {
                                                case 'cash':
                                                    imgClass = 'w-[160px]';
                                                    break;
                                                case 'bkash':
                                                    imgClass = 'w-[74px]';
                                                    break;
                                                case 'nagad':
                                                    imgClass = 'w-[78px]';
                                                    break;
                                                default:
                                                    imgClass = 'w-[100px]'; // default width if needed
                                            }

                                            return (
                                                <PaymentRadio
                                                    key={method.id}
                                                    value={method.name}
                                                    icon={
                                                        method.name === 'cash'
                                                            ? cod
                                                            : method.name ===
                                                              'bkash'
                                                            ? bkash
                                                            : nagad
                                                    }
                                                    name="payment_method"
                                                    imgClass={imgClass}
                                                    checked={
                                                        selectedPayment ===
                                                        method.name
                                                    }
                                                    onChange={
                                                        handlePaymentChange
                                                    }
                                                />
                                            );
                                        })}
                                    </div>

                                    {(selectedPayment === 'bkash' ||
                                        selectedPayment === 'nagad') && (
                                        <div>
                                            {selectedPayment === 'bkash' ? (
                                                <p className="pt-[30px] text-base text-gray-700 font-normal">
                                                    {bkashMsgBefore}{' '}
                                                    <span className="inline-block font-semibold">
                                                        {bkashNum}
                                                    </span>{' '}
                                                    {bkashMsgAfter}
                                                </p>
                                            ) : (
                                                <p className="pt-[30px] text-base text-gray-700 font-normal">
                                                    {nagadMsgBefore}{' '}
                                                    <span className="inline-block font-semibold">
                                                        {nagadNum}
                                                    </span>{' '}
                                                    {nagadMsgAfter}
                                                </p>
                                            )}
                                            <div className="grid sm:grid-cols-2 gap-[18px] lg:gap-6 pt-6">
                                                <div className="">
                                                    <label
                                                        htmlFor="phoneNumber"
                                                        className="block text-gray-700 text-sm font-semibold mb-[6px]"
                                                    >
                                                        {selectedPayment ===
                                                        'bkash'
                                                            ? provideBkashNumber
                                                            : provideNagadNumber}
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone_number"
                                                        placeholder="017XXXXXXXX"
                                                        className="block w-full px-[14px] py-[16px] lg:px-6 lg:py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow bg-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="transactionId"
                                                        className="block text-gray-700 text-sm font-semibold mb-[6px]"
                                                    >
                                                        {selectedPayment ===
                                                        'bkash'
                                                            ? bkashTransactionID
                                                            : nagadTransactionID}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="transaction_id"
                                                        placeholder="7XP59GS33F"
                                                        className="block w-full px-[14px] py-[16px] lg:px-6 lg:py-4 3xl:px-[18px] 3xl:py-[22px] border border-[#D0D5DD] text-gray-700 ring-1 ring-inset ring-[#D0D5DD] focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-none rounded-md input-shadow bg-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className=" mt-[30px]">
                                        <button
                                            type="submit"
                                            className={`flex justify-center items-center capitalize text-center gap-2 px-[30px] py-4 text-white rounded-md w-full ${
                                                orderLoading
                                                    ? 'bg-gray-500'
                                                    : 'bg-gray-900 '
                                            }`}
                                            disabled={orderLoading}
                                        >
                                            {orderLoading
                                                ? dicConfirmProcessing
                                                : dicConfirm}
                                            {orderLoading && (
                                                <div className="spin-loader"></div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
