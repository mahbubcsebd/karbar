'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import logo from '../../../assets/icons/logo.svg';
import useDictionary from '../../../hooks/useDictionary';
import useSiteSetting from '../../../hooks/useSiteSetting';
import HeaderCart from '../../HeaderCart';
import LanguageSwitcher from '../../LanguageSwitcher';
import AbayaHeaderSearch from './AbayaHeaderSearch';

const AbayaHeader = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const { siteSetting, loading, error } = useSiteSetting();
    const { dictionary } = useDictionary();

    const handleSearch = () => {
        setShowSearchModal(!showSearchModal);
    };

    const { header_logo } = siteSetting;

    return (
        <div className="mb-[90px]">
            <header
                id="header"
                className="header py-[17px] bg-gray-900 fixed top-0 left-0 w-full z-[99999999]"
            >
                <div className="header-area">
                    <div className="container">
                        <div className="flex items-center justify-between header-content">
                            <div className="relative lg:hidden">
                                <button
                                    onClick={handleSearch}
                                    className="absolute left-0 text-2xl text-white -translate-y-1/2 top-1/2 "
                                >
                                    {showSearchModal ? (
                                        <RxCross1 />
                                    ) : (
                                        <FiSearch />
                                    )}
                                </button>
                            </div>
                            <div
                                className={`header-logo ${
                                    showSearchModal ? 'hidden' : 'block'
                                }`}
                            >
                                <Link href="/">
                                    <Image
                                        src={header_logo ? header_logo : logo}
                                        alt="logo"
                                        width={82}
                                        height={30}
                                        className="max-w-[160px] lg:w-auto h-auto lg:max-w-[200px] max-h-[56px]"
                                    />
                                </Link>
                            </div>
                            <AbayaHeaderSearch
                                showSearchModal={showSearchModal}
                                setShowSearchModal={setShowSearchModal}
                                dictionary={dictionary.Header}
                            />
                            <div className="flex items-center gap-4">
                                <LanguageSwitcher template="Template02" />
                                <HeaderCart dictionary={dictionary.Header} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default AbayaHeader;
