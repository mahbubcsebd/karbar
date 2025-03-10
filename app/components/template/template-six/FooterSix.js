'use client';

import bkash from '@/assets/icons/bkash.svg';
import cod from '@/assets/icons/cod.svg';
import logo from '@/assets/icons/footer-logo.svg';
import karbar from '@/assets/icons/karbar-logo.svg';
import nagad from '@/assets/icons/nagad.svg';
import footerBg from '@/assets/images/footer-six-bg.svg';
import SortContext from '@/context/SortContext';
import useDictionary from '@/hooks/useDictionary';
import useSiteSetting from '@/hooks/useSiteSetting';
import { getAllCategories } from '@/utils/categories';
import getPages from '@/utils/getPages';
import { getPaymentMethod } from '@/utils/getPaymentMethod';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CiLocationOn, CiMail } from 'react-icons/ci';
import {
    FaArrowRight,
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaYoutube,
} from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';

const FooterSix = () => {
    const [paymentMethod, setPaymentMethod] = useState([]);
    const { language, dictionary } = useDictionary();
    const { siteSetting, loading, error } = useSiteSetting();
    const [pages, setPages] = useState([]);
    const [categories, setCategories] = useState([]);
    const { setSortQuery } = useContext(SortContext);

    useEffect(() => {
        const fetchPaymentMethod = async () => {
            const paymentMethodData = await getPaymentMethod();
            setPaymentMethod(paymentMethodData.data);
        };

        fetchPaymentMethod();
    }, [language]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await getPages();
                setPages(response.data);
            } catch (error) {
                console.error('Error fetching pages:', error);
            }
        };

        fetchPages();
    }, []);

    const {
        contact,
        footerDesc,
        company,
        aboutUs,
        privacyPolicy,
        returnPolicy,
        termsAndConditions,
        copyRight,
        payment,
    } = dictionary.Footer;

    const {
        title,
        footer_logo,
        phone,
        email,
        footer_address,
        facebook_url,
        instagram_url,
        youtube_url,
        tiktok_url,
        footer_description,
    } = siteSetting;

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoriesData = await getAllCategories(language);
                setCategories(categoriesData.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchCategory();
    }, [language]);

    return (
        <footer
            id="footer"
            className="relative overflow-hidden bg-black footer"
        >
            <Image
                className="absolute bottom-0 left-0 object-cover w-full h-full"
                src={footerBg}
                alt="footer-bg z-10"
            />
            <div className="footer-area relative z-50">
                <div className="container">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-[30px] md:gap-4 py-[60px]">
                        <div className="col-span-4">
                            <div className="mb-6 max-w-[200px] max-h-[56px]">
                                <Link href="/">
                                    <Image
                                        src={footer_logo ? footer_logo : logo}
                                        alt="footer logo"
                                        height={115}
                                        width={115}
                                        className="max-w-[115px] lg:max-w-[200px] md:w-auto h-auto max-h-[56px]"
                                    />
                                </Link>
                            </div>
                            <p className="text-base text-gray-300 font-normal mb-6 max-w-[240px]">
                                {footer_description}
                            </p>
                            <div className="relative max-w-[310px]">
                                <input
                                    type="text"
                                    className="block w-full px-[14px] py-[16px] lg:px-6 lg:py-4 3xl:px-[18px] 3xl:py-[22px] border-2 border-white text-white ring-1 ring-inset ring-white focus:ring-1 focus:ring-blue-900 placeholder:text-gray-400 placeholder:text-base outline-hidden input-shadow bg-transparent rounded-full h-[54px] pr-[50px]"
                                    placeholder="Enter your email here"
                                />
                                <button className="text-white absolute top-[5px] right-[5px] w-[44px] h-[44px] bg-[#FD9C02] rounded-full flex justify-center items-center transition duration-150 hover:bg-[#FD9C02]">
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-8">
                            <div className="grid grid-cols-3">
                                <div>
                                    <h3 className="text-[20px] text-white font-semibold mb-6 md:mb-[30px]">
                                        Quick Links
                                    </h3>
                                    <ul className="grid gap-4 md:gap-6">
                                        {categories
                                            .slice(0, 4)
                                            .map((category) => (
                                                <li key={category.id}>
                                                    <Link
                                                        href={`/collections/${category.slug}`}
                                                        className="text-lg font-normal text-gray-400"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-[20px] text-white font-semibold mb-6 md:mb-[30px]">
                                        {company}
                                    </h3>
                                    <ul className="grid gap-4 md:gap-6">
                                        {pages.map((page) => (
                                            <li key={page.id}>
                                                <Link
                                                    className="text-lg font-normal text-gray-400"
                                                    href={`/company/${page.slug}`}
                                                >
                                                    {page.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-[20px] text-white font-semibold mb-6 md:mb-[30px]">
                                        {contact}
                                    </h3>
                                    <ul className="grid gap-4 md:gap-6">
                                        <li>
                                            <div className="flex items-center gap-2 text-base font-normal text-gray-300 lg:text-lg">
                                                <div>
                                                    <span className="w-[34px] h-[34px] rounded-full bg-gray-200 flex justify-center items-center text-gray-900">
                                                        <FiPhoneCall />
                                                    </span>
                                                </div>
                                                {phone ? phone : '01896-088855'}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center gap-2 text-base font-normal text-gray-300 lg:text-lg">
                                                <div>
                                                    <span className="w-[34px] h-[34px] rounded-full bg-gray-200 flex justify-center items-center text-gray-900">
                                                        <CiMail />
                                                    </span>
                                                </div>
                                                {email
                                                    ? email
                                                    : 'karbar@gmail.com'}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center gap-2 text-base font-normal text-gray-300 lg:text-lg">
                                                <div>
                                                    <span className="w-[34px] h-[34px] rounded-full bg-gray-200 flex justify-center items-center text-gray-900">
                                                        <CiLocationOn />
                                                    </span>
                                                </div>
                                                {footer_address
                                                    ? footer_address
                                                    : 'Mirpur DOHS, Dhaka'}
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="flex items-center gap-[18px] pt-5">
                                        {facebook_url && (
                                            <li>
                                                <Link
                                                    href={`${
                                                        facebook_url
                                                            ? facebook_url
                                                            : 'https://facebook.com'
                                                    }`}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    aria-label="facebook url"
                                                >
                                                    <div className="flex items-center justify-center w-10 h-10 text-lg text-white transition duration-150 border-2 border-white rounded-full hover:bg-[#FD9C02] hover:border-[#FD9C02]">
                                                        <FaFacebookF />
                                                    </div>
                                                </Link>
                                            </li>
                                        )}
                                        {instagram_url && (
                                            <li>
                                                <Link
                                                    href={`${
                                                        instagram_url
                                                            ? instagram_url
                                                            : 'https://instagram.com'
                                                    }`}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    aria-label="instagram url"
                                                >
                                                    <div className="flex items-center justify-center w-10 h-10 text-lg text-white transition duration-150 border-2 border-white rounded-full hover:bg-[#FD9C02] hover:border-[#FD9C02]">
                                                        <FaInstagram />
                                                    </div>
                                                </Link>
                                            </li>
                                        )}
                                        {youtube_url && (
                                            <li>
                                                <Link
                                                    href={`${
                                                        youtube_url
                                                            ? youtube_url
                                                            : 'https://youtube.com'
                                                    }`}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    aria-label="youtube url"
                                                >
                                                    <div className="flex items-center justify-center w-10 h-10 text-lg text-white transition duration-150 border-2 border-white rounded-full hover:bg-[#FD9C02] hover:border-[#FD9C02]">
                                                        <FaYoutube />
                                                    </div>
                                                </Link>
                                            </li>
                                        )}
                                        {tiktok_url && (
                                            <li>
                                                <Link
                                                    href={`${
                                                        tiktok_url
                                                            ? tiktok_url
                                                            : 'https://www.tiktok.com/'
                                                    }`}
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    aria-label="tiktok url"
                                                >
                                                    <div className="flex items-center justify-center w-10 h-10 text-lg text-white transition duration-150 border-2 border-white rounded-full hover:bg-[#FD9C02] hover:border-[#FD9C02]">
                                                        <FaTiktok />
                                                    </div>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <hr className="border-gray-600" />
                </div>
                <div className="container">
                    <div className="lg:flex justify-between items-center py-[30px] hidden">
                        <p className="text-base lg:text-lg font-normal text-gray-500 flex items-center gap-[4px]">
                            &copy;All rights reserved by{' '}
                            <span className="font-semibold">{title}</span>
                        </p>
                        <p className="text-base lg:text-lg font-normal text-gray-500 flex items-center gap-[4px]">
                            {/* © {copyRight} */}
                            Powered by{' '}
                            <Link
                                className="text-gray-400"
                                href="https://karbar.shop"
                                target="_blank"
                            >
                                <Image
                                    src={karbar}
                                    alt="karbar"
                                    className="w-[65px] lg:w-[70px] pt-[4px]"
                                />
                            </Link>
                        </p>
                        {paymentMethod.length > 0 && (
                            <div className="flex items-center gap-4">
                                <p className="text-[20px] font-normal text-gray-400 relative">
                                    {payment} :
                                </p>
                                <ul className="flex items-center gap-2">
                                    {paymentMethod.map((method) => {
                                        const icon =
                                            method.name === 'nagad'
                                                ? nagad
                                                : method.name === 'bkash'
                                                ? bkash
                                                : cod;

                                        return (
                                            <li key={method.id}>
                                                <Image
                                                    src={icon}
                                                    alt={method.name}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:hidden">
                    {paymentMethod.length > 0 && (
                        <div className="border-b border-gray-600 py-[18px]">
                            <div className="flex flex-col items-center gap-4 lg:flex-row">
                                <p className="text-[20px] font-normal text-gray-400 flex flex-col gap-1 justify-center items-center lg:hidden">
                                    {payment} :
                                    <span className="w-9 h-[1px] bg-[#FF9E2C] "></span>
                                </p>
                                <ul className="flex items-center gap-2 w-[300px] overflow-hidden">
                                    {paymentMethod.map((method) => {
                                        const icon =
                                            method.name === 'nagad'
                                                ? nagad
                                                : method.name === 'bkash'
                                                ? bkash
                                                : cod;

                                        return (
                                            <li key={method.id}>
                                                <Image
                                                    src={icon}
                                                    alt={method.name}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col items-center justify-center gap-1 py-5 bg-gray-700">
                        <p className="text-base lg:text-lg font-normal text-gray-400 flex items-center gap-[4px]">
                            &copy;All rights reserved by{' '}
                            <span className="font-semibold">{title}</span>
                        </p>
                        <p className="flex items-center gap-1 text-base font-normal text-gray-400 lg:text-lg lg:hidden">
                            {/* © {copyRight} */}
                            Powered by{' '}
                            <Link
                                className="text-gray-400"
                                href="https://karbar.shop"
                            >
                                <Image
                                    src={karbar}
                                    alt="karbar"
                                    className="w-[65px] lg:w-[70px] pt-[4px]"
                                />
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSix;
