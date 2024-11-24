'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useDebounce } from '../hooks/useDebounce';
import useDictionary from '../hooks/useDictionary';
import SearchContext from '../reducer/SearchContext';
import { getAllProduct } from '../utils/getProduct';
import SearchResult from './SearchResult';

const HeaderSearch = ({ showSearchModal, setShowSearchModal, dictionary }) => {
    const [search, setSearch] = useState('');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const router = useRouter();
    const { language } = useDictionary();
    const [products, setProducts] = useState([]);

    const debouncedSearch = useDebounce(async (search) => {
        try {
            const productsData = await getAllProduct(
                language,
                null,
                null,
                null,
                search
            );
            setProducts(productsData.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }, 300); // Adjust the delay as needed

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

    const contextValue = useContext(SearchContext);

    const { setSearchQuery } = contextValue;

    const handleInputChange = (event) => {
        setProducts([]);
        setSearch(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSearch('');
        setSearchQuery(search);
        router.push('/collections/all');
    };

    function closeSearchResults(event) {
        event.preventDefault();
        router.push(event.target.href);
        setSearch('');
    }

    return (
        <div className="relative">
            <div
                className={`${
                    showSearchModal
                        ? 'absolute right-[5px] top-[13px] z-50 block'
                        : 'hidden lg:block'
                }`}
            >
                <form
                    className={`header-search relative lg:w-[350px] h-14 w-[300px]`}
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
                    <button
                        type="submit"
                        onClick={handleSearch}
                        className="absolute top-1/2 -translate-y-1/2 left-[18px] text-gray-500 text-xl font-normal flex items-center"
                    >
                        <IoSearchOutline />
                    </button>
                </form>
                {search && search.trim().length > 0 && (
                    <SearchResult
                        products={products}
                        search={search}
                        closeSearchResults={closeSearchResults}
                    />
                )}
            </div>
        </div>
    );
};

export default HeaderSearch;
