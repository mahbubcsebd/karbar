'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import SearchContext from '../../../reducer/SearchContext';
import SearchResult from '../../SearchResult';

const AbayaHeaderSearch = ({
    showSearchModal,
    setShowSearchModal,
    dictionary,
}) => {
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
                        ? 'absolute right-[5px] top-[5px] z-50 block'
                        : 'hidden lg:block'
                }`}
            >
                <form
                    className={`header-search relative lg:w-[500px] h-14 w-[300px]`}
                >
                    <input
                        type="text"
                        name="header-search"
                        id="header-search"
                        value={search}
                        onChange={handleInputChange}
                        className="w-full h-full block pl-[18px] pr-[120px] py-3 bg-white rounded-lg border-0 text-gray-600  placeholder:text-gray-500 placeholder:text-base outline-none"
                        placeholder={dictionary.searchPlaceholder}
                    />
                    <button
                        type="submit"
                        onClick={handleSearch}
                        className="absolute top-1 right-1 px-5 py-[10px] bg-gray-900 text-gray-200 rounded-lg text-lg font-normal flex items-center gap-[10px] h-12 sm:h-auto"
                    >
                        <IoSearchOutline />
                        <span className="hidden sm:block">
                            {dictionary.search}
                        </span>
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

export default AbayaHeaderSearch;
