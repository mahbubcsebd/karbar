'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import SortContext from '../context/SortContext';
import useDictionary from '../hooks/useDictionary';

const Categories = () => {
    const { dictionary } = useDictionary();
    const { newArrival, bestSelling, discount } = dictionary.ProductCard.SortBy;
    const { setSortQuery } = useContext(SortContext);
    const router = useRouter();

    const handleCategoryClick = (sort) => {
        setSortQuery(sort);
        router.push('/collections/all');
    };

    const categoriesList = [
        { label: newArrival, value: 'new_arrival' },
        { label: bestSelling, value: 'best_selling' },
        { label: discount, value: 'discount' },
    ];

    return (
        <div className="categories">
            <div className="bg-white categories-area border-t border-gray-400">
                <div className="container">
                    <ul className="flex flex-wrap items-center justify-center gap-6 py-4">
                        {categoriesList.map((item) => (
                            <li key={item.value}>
                                <button
                                    onClick={() =>
                                        handleCategoryClick(item.value)
                                    }
                                    className="text-base text-gray-600 font-normal hover:text-gray-800 transition duration-150"
                                    aria-label={`Sort by ${item.label}`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Categories;
