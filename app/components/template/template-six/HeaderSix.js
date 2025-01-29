import logo from '@/assets/icons/logo.svg';
import useSiteSetting from '@/hooks/useSiteSetting';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const HeaderSix = () => {
    const { siteSetting, loading, error } = useSiteSetting();
    const { header_logo } = siteSetting;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="py-4 bg-white header relative z-[9999] shadow-md">
            <div className="container">
                <div className="flex items-center justify-between">
                    <div className="logo">
                        <Link href="/">
                            <Image
                                src={header_logo ? header_logo : logo}
                                alt="logo"
                                width={100}
                                height={40}
                                className="max-w-[160px] lg:w-auto h-auto lg:max-w-[200px] max-h-[56px]"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 text-[#263054]"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <HiX className="w-6 h-6" />
                        ) : (
                            <HiMenu className="w-6 h-6" />
                        )}
                    </button>

                    {/* Navigation Menu */}
                    <ul
                        className={`flex item-center gap-4 md:gap-[30px] absolute md:relative bg-white flex-col md:flex-row
                        ${
                            isMenuOpen
                                ? 'top-[55px] opacity-100 visible'
                                : 'top-[-400px] md:top-0 invisible md:visible opacity-0 md:opacity-100'
                        }
                        left-0 w-full md:w-auto pb-10 md:pb-0 container z-40 transition-all duration-300 ease-in-out`}
                    >
                        <li>
                            <Link
                                className="text-lg text-[#263054] font-medium"
                                href="#"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-lg text-[#263054] font-medium"
                                href="#"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-lg text-[#263054] font-medium"
                                href="#"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-lg text-[#263054] font-medium"
                                href="/"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>

                    {/* Order Now Button */}
                    <div className="hidden md:block">
                        <Link
                            href="#"
                            className="px-6 py-4 rounded-lg bg-[#FD9C02] border-2 border-[#FD9C02] text-white font-normal text-base inline-block hover:bg-transparent hover:text-[#FD9C02] transition-all duration-150"
                        >
                            Order Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSix;
