'use client';

import { useEffect, useState } from 'react';
import useDictionary from '../hooks/useDictionary';
import { getCategoryWiseProduct } from '../utils/getProduct';
import SingleHomeCategories from './SingleHomeCategories';

const HomeCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { language } = useDictionary();

    useEffect(() => {
        const fetchCategory = async () => {
            setIsLoading(true);
            try {
                const categoriesData = await getCategoryWiseProduct(language);
                setCategories(categoriesData.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategory();
    }, [language]);

    return (
        <div>
            <div className="home-categories">
                <div className="home-categories-area">
                    <div className="container">
                        {isLoading
                            ? // Skeleton loader with same dimensions as actual content
                              Array.from({ length: 3 }).map((_, index) => (
                                  <div
                                      key={`skeleton-${index}`}
                                      className="animate-pulse bg-gray-200 rounded-lg"
                                      style={{
                                          minHeight: '300px',
                                          marginBottom: '1rem',
                                      }}
                                  />
                              ))
                            : categories.map((category) => (
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
