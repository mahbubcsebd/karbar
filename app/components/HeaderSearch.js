/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import SearchContext from '../reducer/SearchContext';
import SearchResult from './SearchResult';

const HeaderSearch = ({ showSearchModal, setShowSearchModal, dictionary }) => {
    const [search, setSearch] = useState('');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const router = useRouter();


    const contextValue = useContext(SearchContext);

    const { setSearchQuery } = contextValue;

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };
    const handleSearch = (event) => {
        event.preventDefault();
        setSearchQuery(search);
        router.push('/collections/all');
        setSearch('');
    };

    function closeSearchResults() {
        setSearchQuery('');
        setSearch('');
    }

    return (
        <div className="lg:relative">
            <div
                className={`${
                    showSearchModal
                        ? 'absolute left-2 top-[17px] z-50 block w-full'
                        : 'hidden lg:block'
                }`}
            >
                <form
                    className={`header-search relative lg:w-[350px] h-13 lg:h-14 w-[300px] sm:w-[370px] md:w-[460px]`}
                >
                    <input
                        type="text"
                        name="header-search"
                        id="header-search"
                        value={search}
                        onChange={handleInputChange}
                        className="w-full h-full block pl-[45px] pr-[14px] py-3 bg-white border border-[#D14BF8] text-gray-600 placeholder:text-gray-500 placeholder:text-base outline-none rounded-full search-shadow"
                        placeholder={dictionary.searchPlaceholder}
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            className="absolute top-1/2 -translate-y-1/2 right-[18px] text-gray-500 text-xl font-normal flex items-center"
                        >
                            <RxCross2 />
                        </button>
                    )}
                    <button
                        type="submit"
                        onClick={handleSearch}
                        className="absolute top-1/2 -translate-y-1/2 left-[18px] text-gray-500 text-xl font-normal flex items-center"
                        aria-label="product search button"
                    >
                        <IoSearchOutline />
                    </button>
                </form>
                {search && search.trim().length > 0 && (
                    <SearchResult
                        search={search}
                        closeSearchResults={closeSearchResults}
                    />
                )}
            </div>
        </div>
    );
};

export default HeaderSearch;
