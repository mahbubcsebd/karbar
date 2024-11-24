'use client';

import logo from '@/assets/icons/logo.svg';
import useAuth from '@/hooks/useAuth';
import useDictionary from '@/hooks/useDictionary';
import usePos from '@/hooks/usePos';
import useSiteSetting from '@/hooks/useSiteSetting';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPosUser } from '../../utils/pos/getPosUser';
import PosUser from './PosUser';

const PosHeader = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const { siteSetting, loading, error } = useSiteSetting();
    const [user, setUser] = useState([]);
    const { dictionary } = useDictionary();
    const { state, dispatch } = usePos();
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getPosUser(authToken);
                setUser(userData.data);
            } catch (error) {
                console.error('Failed to fetch pos user:', error);
            }
        };

        fetchUser();
    }, [authToken]);

    const handleSearch = () => {
        setShowSearchModal(!showSearchModal);
    };

    const handleRefresh = () => {
        dispatch({
            type: 'CLEAR_CART',
        });
    };

    const { header_logo } = siteSetting;

    return (
        <div className="mb-[76px] lg:mb-[90px]">
            <header
                id="header"
                className="header py-[10px] bg-white border-b border-[#D1D1D1] fixed top-0 left-0 w-full z-10"
            >
                <div className="header-area">
                    <div className="container">
                        <div className="flex items-center justify-between header-content">
                            <div className="flex items-center gap-[50px]">
                                <div className={`header-logo`}>
                                    <Link href="/">
                                        <Image
                                            src={
                                                header_logo ? header_logo : logo
                                            }
                                            alt="logo"
                                            width={100}
                                            height={40}
                                            className="max-w-[160px] lg:w-auto h-auto lg:max-w-[200px] max-h-[56px]"
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center gap-[18px]">
                                {/* <button className="text-base text-white font-normal bg-purple-900 border border-purple-900 rounded-md px-4 py-[14px]">
                                    New Sale
                                </button> */}
                                {/* <button onClick={handleRefresh} className="w-[34px] h-[34px] flex justify-center items-center bg-gray-200 rounded">
                                    <LuRefreshCw />
                                </button> */}
                                <PosUser user={user} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default PosHeader;
