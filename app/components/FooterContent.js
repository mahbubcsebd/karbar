'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CiLocationOn, CiMail } from 'react-icons/ci';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import bkash from '../assets/icons/bkash.svg';
import cod from '../assets/icons/cod.svg';
import footerBg from '../assets/icons/footer-bg.svg';
import logo from '../assets/icons/footer-logo.svg';
import nagad from '../assets/icons/nagad.svg';
import useSiteSetting from '../hooks/useSiteSetting';

const Footer = () => {
const { siteSetting, loading, error } = useSiteSetting();

    const {
        footer_logo,
        phone,
        email,
        footer_address,
        facebook_url,
        instagram_url,
        youtube_url,
    } = siteSetting;

    return (
        <footer
            id="footer"
            className="bg-[#14004F] footer relative overflow-hidden"
        >
            <Image
                className="absolute bottom-0 left-0 w-full"
                src={footerBg}
                alt="footer-bg z-[10]"
            />
            <div className="footer-area relative z-[50]">
                <div className="container">
                    <div className="grid grid-cols-3 gap-4 py-[60px]">
                        <div>
                            <div className="mb-6">
                                <Link href="/">
                                    <Image
                                        src={footer_logo ? footer_logo : logo}
                                        alt="footer logo"
                                        height={115}
                                        width={115}
                                        className="w-[115px] md:w-auto h-auto"
                                    />
                                </Link>
                            </div>
                            <p className="text-base text-gray-300 font-normal mb-6 max-w-[310px]">
                                Daarib sells top-notch sporting goods in one
                                place. Shop our performance and comfort jerseys,
                                hats, pants & footwear. Prepare to up your game
                                with Daarib.
                            </p>
                            <ul className="flex items-center gap-[18px]">
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
                                            <FaTiktok />
                                        </div>
                                    </Link>
                                </li>
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
                                            <FaInstagram />
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[20px] text-white font-semibold mb-[30px]">
                                Company
                            </h3>
                            <ul className="grid gap-6">
                                <li>
                                    <Link
                                        className="text-lg font-normal text-gray-400"
                                        href="#"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-lg font-normal text-gray-400"
                                        href="#"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-lg font-normal text-gray-400"
                                        href="#"
                                    >
                                        Return Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-lg font-normal text-gray-400"
                                        href="#"
                                    >
                                        Terms & Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[20px] text-white font-semibold mb-[30px]">
                                Contact Info
                            </h3>
                            <ul className="grid gap-6">
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
                        <p className="text-lg font-normal text-gray-400">
                            © All rights reserved Daarib.
                        </p>
                        <div className="flex items-center gap-4">
                            <p className="text-[20px] font-normal text-gray-400 relative">
                                Payment With :
                            </p>
                            <ul className="flex items-center gap-2">
                                <li>
                                    <Image
                                        src={nagad}
                                        alt="nagad"
                                    />
                                </li>
                                <li>
                                    <Image
                                        src={bkash}
                                        alt="bkash"
                                    />
                                </li>
                                <li>
                                    <Image
                                        src={cod}
                                        alt="cash on delivery"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lg:hidden">
                    <div className="border-b border-gray-600 py-[18px]">
                        <div className="flex flex-col items-center gap-4 lg:flex-row">
                            <p className="text-[20px] font-normal text-gray-400 flex flex-col gap-1 justify-center items-center lg:hidden">
                                পেমেন্ট মাধ্যম :
                                <span className="w-9 h-[1px] bg-[#FF9E2C] "></span>
                            </p>
                            <ul className="flex items-center gap-2 w-[300px] overflow-hidden">
                                <li>
                                    <Image
                                        src={nagad}
                                        alt="nagad"
                                    />
                                </li>
                                <li>
                                    <Image
                                        src={bkash}
                                        alt="bkash"
                                    />
                                </li>
                                <li>
                                    <Image
                                        src={cod}
                                        alt="cash on delivery"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-center bg-gray-700">
                        <p className="py-5 text-lg font-normal text-white lg:hidden">
                            © All rights reserved Daarib.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
