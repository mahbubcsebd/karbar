'use client';

import { getPaymentMethod } from '@/utils/getPaymentMethod';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiLocationOn, CiMail } from 'react-icons/ci';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import bkash from '../assets/icons/bkash.svg';
import cod from '../assets/icons/cod.svg';
import footerBg from '../assets/icons/footer-bg.svg';
import logo from '../assets/icons/footer-logo.svg';
import karbar from '../assets/icons/karbar-logo.svg';
import nagad from '../assets/icons/nagad.svg';
import useDictionary from '../hooks/useDictionary';
import useSiteSetting from '../hooks/useSiteSetting';

const Footer = () => {
    const [paymentMethod, setPaymentMethod] = useState([]);
    const { language, dictionary } = useDictionary();
    const { siteSetting, loading, error } = useSiteSetting();

        useEffect(() => {
            const fetchPaymentMethod = async () => {
                const paymentMethodData = await getPaymentMethod();
                setPaymentMethod(paymentMethodData.data);
            };

            fetchPaymentMethod();
        }, [language]);

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

    return (
        <footer
            id="footer"
            className="bg-[#14004F] footer relative overflow-hidden"
        >
            <Image
                className="absolute bottom-0 left-0 w-full"
                priority
                src={footerBg}
                alt="footer-bg z-[10]"
            />
            <div className="footer-area relative z-[50]">
                <div className="container">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px] md:gap-4 py-[60px]">
                        <div>
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
                            <p className="text-base text-gray-300 font-normal mb-6 max-w-[310px]">
                                {footer_description}
                            </p>
                            <ul className="flex items-center gap-[18px]">
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
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 text-lg text-white transition duration-150 border-2 border-white rounded-full hover:bg-purple-900 hover:border-purple-900">
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
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 text-lg text-white transition duration-150 border-2 border-white rounded-full hover:bg-purple-900 hover:border-purple-900">
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
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 text-lg text-white transition duration-150 border-2 border-white rounded-full hover:bg-purple-900 hover:border-purple-900">
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
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 text-lg text-white transition duration-150 border-2 border-white rounded-full hover:bg-purple-900 hover:border-purple-900">
                                                <FaTiktok />
                                            </div>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[20px] text-white font-semibold mb-6 md:mb-[30px]">
                                {company}
                            </h3>
                            <ul className="grid gap-4 md:gap-6">
                                {/* <li>
                                    <Link
                                        className="text-lg font-normal text-gray-400"
                                        href="#"
                                    >
                                        {aboutUs}
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        className="text-lg font-normal text-gray-400"
                                        href="/privacy-policy"
                                    >
                                        {privacyPolicy}
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        className="text-lg font-normal text-gray-400"
                                        href="#"
                                    >
                                        {returnPolicy}
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        className="text-lg font-normal text-gray-400"
                                        href="/terms-and-conditions"
                                    >
                                        {termsAndConditions}
                                    </Link>
                                </li>
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
                                        {email ? email : 'karbar@gmail.com'}
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
                        </div>
                    </div>
                </div>
                <hr className="border-gray-600" />
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

export default Footer;
