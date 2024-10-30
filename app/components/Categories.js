"use client"

import { useRouter } from "next/navigation";
import { useContext } from "react";
import SortContext from "../context/SortContext";
import useDictionary from "../hooks/useDictionary";

const Categories = () => {
    const {dictionary} = useDictionary();
    const { newArrival, bestSelling, discount } =
        dictionary.ProductCard.SortBy;

    const {setSortQuery} = useContext(SortContext)


     const router = useRouter();

     const handleCategoryClick = (sort) => {
        setSortQuery(sort);
         router.push(`/collections/all`);
     };
    return (
        <div className="categories">
            <div className="bg-white categories-area border-top border-gray-4 00">
                <div className="container">
                    <ul className="flex flex-wrap items-center justify-center gap-6 py-4">
                        <li>
                            <button
                                onClick={() =>
                                    handleCategoryClick('new_arrival')
                                }
                                className={`text-base text-gray-600 font-normal hover:text-gray-800 transition duration-150`}
                            >
                                {newArrival}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    handleCategoryClick('best_selling')
                                }
                                className={`text-base text-gray-600 font-normal hover:text-gray-800 transition duration-150`}
                            >
                                {bestSelling}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleCategoryClick('discount')}
                                className={`text-base text-gray-600 font-normal hover:text-gray-800 transition duration-150`}
                            >
                                {discount}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Categories