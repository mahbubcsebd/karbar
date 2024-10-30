"use client"

import { useEffect, useState } from 'react';
import useDictionary from '../hooks/useDictionary';
import { getCategoryWiseProduct } from '../utils/getProduct';
import SingleHomeCategories from './SingleHomeCategories';

const HomeCategories = () => {
    const [categories, setCategories] = useState([])
    const {language} = useDictionary()

        useEffect(() => {
            const fetchCategory = async () => {
                try {
                    const categoriesData = await getCategoryWiseProduct(language);
                    setCategories(categoriesData.data);
                } catch (error) {
                    console.error('Failed to fetch products:', error);
                }
            };

            fetchCategory();
        }, [language]);

    return (
        <div>
            <div className="home-categories">
                <div className="home-categories-area">
                    <div className="container">
                        {categories.map((category) => (
                            <SingleHomeCategories
                                key={category.key}
                                category={category}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCategories;
