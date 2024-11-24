'use client';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CategorySelectForm({
    categories,
    subCategories,
    setSubCategories,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    setSortQuery,
    router,
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (selectedCategory && selectedCategory !== 'all') {
            const category = categories.find(
                (cat) => cat.slug === selectedCategory
            );
            setSubCategories(category?.sub_category || []);
            // Set sub-category to 'all' by default when category changes
            setSelectedSubCategory('all');
        } else {
            setSubCategories([]);
        }
    }, [
        selectedCategory,
        categories,
        setSubCategories,
        setSelectedSubCategory,
    ]);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSelectedSubCategory('all'); // Reset to 'all' when category changes
        setSortQuery('all');
        router.push(`/collections/${value}`);
    };

    const handleSubCategoryChange = (value) => {
        setSelectedSubCategory(value);
        setSortQuery('all');
        if (value === 'all') {
            router.push(`/collections/${selectedCategory}`);
        } else {
            router.push(
                `/collections/${selectedCategory}?sub_category=${value}`
            );
        }
    };

    const handleReset = () => {
        setSelectedCategory('');
        setSelectedSubCategory('');
        setSortQuery('all');
        setSubCategories([]);
        router.push('/collections/all');
    };

    const handleBreadcrumbCategoryClick = () => {
        setSelectedSubCategory('all'); // Reset to 'all' when using breadcrumb
        setSortQuery('all');
        router.push(`/collections/${selectedCategory}`);
    };

    const showSubCategory =
        selectedCategory &&
        selectedCategory !== 'all' &&
        subCategories &&
        subCategories.length > 0;

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center">
                <div>
                    <Select
                        value={selectedCategory}
                        onValueChange={handleCategoryChange}
                        className="relative z-[9999999]"
                    >
                        <SelectTrigger
                            className={`w-[150px] md:w-[200px] bg-white text-xs lg:text-sm text-gray-700 font-normal justify-between px-3 py-2 border-gray-300 focus:ring-0 shadow-none ${
                                showSubCategory
                                    ? 'rounded-none rounded-l-md border-r-0'
                                    : 'rounded-md'
                            }`}
                        >
                            <SelectValue
                                placeholder={
                                    selectedCategory === 'all'
                                        ? 'All Categories'
                                        : 'Category'
                                }
                            />
                        </SelectTrigger>
                        <SelectContent className="z-[9999999] max-h-[250px] lg:max-h-[300px]">
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.slug}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {showSubCategory && (
                    <div className="flex items-center justify-center h-full bg-white border-t border-b border-gray-300">
                        <p className="font-light text-gray-500">|</p>
                    </div>
                )}
                {showSubCategory && (
                    <div>
                        <Select
                            value={selectedSubCategory}
                            onValueChange={handleSubCategoryChange}
                            className="relative z-[9999999]"
                        >
                            <SelectTrigger className="w-[150px] md:w-[200px] bg-white text-xs lg:text-sm text-gray-700 font-normal justify-between px-3 py-2 border-gray-300 rounded-none rounded-r-md border-l-0 shadow-none focus:ring-0">
                                <SelectValue placeholder="All Sub Categories" />
                            </SelectTrigger>
                            <SelectContent className="z-[9999999] max-h-[250px] lg:max-h-[300px]">
                                <SelectGroup>
                                    <SelectLabel>Sub Categories</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    {subCategories.map((subCat) => (
                                        <SelectItem
                                            key={subCat.id}
                                            value={subCat.slug}
                                        >
                                            {subCat.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {((selectedCategory && selectedCategory !== 'all') ||
                selectedSubCategory) && (
                <div className="flex items-center gap-4">
                    <nav className="flex items-center space-x-1 text-xs text-gray-600 md:text-sm">
                        <button
                            onClick={() => router.push('/collections/all')}
                            className="hover:text-gray-900"
                        >
                            Collections
                        </button>
                        {selectedCategory && selectedCategory !== 'all' && (
                            <>
                                <ChevronRight className="w-4 h-4" />
                                <button
                                    onClick={handleBreadcrumbCategoryClick}
                                    className="hover:text-gray-900"
                                >
                                    {
                                        categories.find(
                                            (cat) =>
                                                cat.slug === selectedCategory
                                        )?.name
                                    }
                                </button>
                            </>
                        )}
                        {selectedSubCategory &&
                            selectedSubCategory !== 'all' && (
                                <>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-gray-900">
                                        {
                                            subCategories.find(
                                                (sub) =>
                                                    sub.slug ===
                                                    selectedSubCategory
                                            )?.name
                                        }
                                    </span>
                                </>
                            )}
                    </nav>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="h-8"
                    >
                        <X className="w-4 h-4 mr-1" />
                        Clear
                    </Button>
                </div>
            )}
        </div>
    );
}