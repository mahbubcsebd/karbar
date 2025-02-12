'use client';

import AuthModal from '@/components/AuthModal';
import useUser from '@/hooks/useUser';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import logo from '../../../assets/icons/logo.svg';
import useDictionary from '../../../hooks/useDictionary';
import useSiteSetting from '../../../hooks/useSiteSetting';
import AuthUser from '../../AuthUser';
import HeaderCart from '../../HeaderCart';
import LanguageSwitcher from '../../LanguageSwitcher';
import AbayaHeaderSearch from './AbayaHeaderSearch';

const AbayaHeader = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const { siteSetting, loading, error } = useSiteSetting();
    const { dictionary } = useDictionary();
    const { user } = useUser();

    const handleSearch = () => {
        setShowSearchModal(!showSearchModal);
    };

    const { header_logo } = siteSetting;

    return (
        <div className="">
            <header
                id="header"
                className="header py-[17px] bg-gray-900 w-full z-99999999"
            >
                <div className="header-area">
                    <div className="container">
                        <div className="flex items-center justify-between header-content">
                            <div className="relative lg:hidden">
                                <button
                                    onClick={handleSearch}
                                    className="absolute left-0 hidden text-2xl text-white -translate-y-1/2 top-1/2 "
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
                                        src={header_logo ?? logo}
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
                                <div className="flex items-center gap-4">
                                    {!user ? (
                                        <div className="flex space-x-4">
                                            <AuthModal>
                                                <button className="flex items-center justify-center w-10 h-10 text-base text-white capitalize bg-purple-900 border border-purple-900 rounded-full md:px-5 md:py-3 md:rounded-md md:w-auto md:h-auto">
                                                    <span className="hidden md:block">
                                                        Sign In
                                                    </span>
                                                    <span className="md:hidden">
                                                        <AiOutlineLogin />
                                                    </span>
                                                </button>
                                            </AuthModal>
                                        </div>
                                    ) : (
                                        <div>
                                            <AuthUser theme="dark" />
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

export default AbayaHeader;
