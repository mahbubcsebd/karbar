import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

const PosSearch = ({ search, setSearch }) => {
    const [debouncedValue, setDebouncedValue] = useState(search);

    // Debouncing logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(debouncedValue);
        }, 500); // Adjust delay (in milliseconds) as needed

        return () => clearTimeout(timer); // Clear the timeout on cleanup
    }, [debouncedValue, setSearch]);

    const handleInputChange = (event) => {
        setDebouncedValue(event.target.value); // Update the debounced value
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', search);
    };

    return (
        <div>
            <form
                onSubmit={handleSearch}
                className="relative w-full"
            >
                <input
                    type="text"
                    name="header-search"
                    id="header-search"
                    value={debouncedValue} // Use the debounced value
                    onChange={handleInputChange}
                    className="w-full h-full block pl-[18px] pr-[45px] py-4 bg-white border border-[#E7E6EC] text-gray-600 placeholder:text-gray-500 placeholder:text-base outline-hidden rounded-lg search-shadow"
                    placeholder="Search..."
                />
                {debouncedValue && (
                    <button
                        type="button"
                        onClick={() => setDebouncedValue('')}
                        className="absolute top-1/2 -translate-y-1/2 right-[40px] text-gray-500 text-xl font-normal flex items-center"
                    >
                        <RxCross2 />
                    </button>
                )}
                <button
                    type="submit"
                    className="absolute top-1/2 -translate-y-1/2 right-[18px] text-gray-500 text-xl font-normal flex items-center"
                >
                    <IoSearchOutline />
                </button>
            </form>
        </div>
    );
};

export default PosSearch;
