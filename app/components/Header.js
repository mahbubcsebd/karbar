'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import logo from '../assets/icons/logo.svg';
import useDictionary from '../hooks/useDictionary';
import useSiteSetting from '../hooks/useSiteSetting';
import useUser from '../hooks/useUser';
import AuthModal from './AuthModal';
import AuthUser from './AuthUser';
import HeaderCart from './HeaderCart';
import HeaderSearch from './HeaderSearch';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const { siteSetting, loading, error } = useSiteSetting();
    const { dictionary } = useDictionary();
    const {user} = useUser();

    const handleSearch = () => {
        setShowSearchModal(!showSearchModal);
    };

    const { header_logo } = siteSetting;

    return (
        <div
        // className="mb-[76px] lg:mb-[90px]"
        >
            <header
                id="header"
                // className="header py-[17px] bg-[#F4F4F4] border-b border-[#D1D1D1] fixed top-0 left-0 w-full z-9999999999999"
                className="header py-[17px] bg-[#F4F4F4] border-b border-[#D1D1D1]"
            >
                <div className="header-area">
                    <div className="container">
                        <div className="flex items-center justify-between header-content">
                            <div
                                className={`header-logo ${
                                    showSearchModal ? 'hidden' : 'block'
                                }`}
                            >
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
                            <HeaderSearch
                                showSearchModal={showSearchModal}
                                setShowSearchModal={setShowSearchModal}
                                dictionary={dictionary.Header}
                            />
                            <div className="flex items-center gap-2 md:gap-4">
                                {!showSearchModal && <LanguageSwitcher />}
                                {!showSearchModal && (
                                    <HeaderCart
                                        dictionary={dictionary.Header}
                                    />
                                )}
                                <div className="relative lg:hidden">
                                    <button
                                        type="button"
                                        className="relative flex items-center justify-center gap-1 text-lg md:text-[22px] text-gray-800 border border-[#D14BF8] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white z-9999999"
                                        onClick={handleSearch}
                                        aria-label="search toggle button"
                                    >
                                        {showSearchModal ? (
                                            <RxCross1 />
                                        ) : (
                                            <FiSearch />
                                        )}
                                    </button>
                                </div>
                                <div className="flex gap-4 items-center">
                                    {!user ? (
                                        <div className="flex space-x-4">
                                            <AuthModal>
                                                <button className="px-5 py-3 bg-purple-900 rounded-md text-base text-white capitalize">
                                                    Sign In
                                                </button>
                                            </AuthModal>
                                        </div>
                                    ) : (
                                        <div>
                                            <AuthUser />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
