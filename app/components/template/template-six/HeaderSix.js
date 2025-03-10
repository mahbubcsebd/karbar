import logo from '@/assets/icons/logo.svg';
import HeaderCart from '@/components/HeaderCart';
import KarbarButton from '@/components/KarbarButton';
import SortContext from '@/context/SortContext';
import useDictionary from '@/hooks/useDictionary';
import useSiteSetting from '@/hooks/useSiteSetting';
import { getAllCategories } from '@/utils/categories';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';


const HeaderSix = () => {
    const { siteSetting } = useSiteSetting();
    const [categories, setCategories] = useState([]);
    const { language, dictionary } = useDictionary();
    const router = useRouter();
    const { setSortQuery } = useContext(SortContext);


    const headerLogo = useMemo(
        () => siteSetting.header_logo || logo,
        [siteSetting.header_logo]
    );
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

        useEffect(() => {
            const fetchCategory = async () => {
                try {
                    const categoriesData = await getAllCategories(language);
                    setCategories(categoriesData.data);
                } catch (error) {
                    console.error('Failed to fetch products:', error);
                }
            };

            fetchCategory();
        }, [language]);

    return (
        <div className="py-4 bg-white header relative z-9999 shadow-md">
            <div className="container">
                <div className="flex items-center justify-between">
                    <div className="logo">
                        <Link href="/">
                            <Image
                                src={headerLogo ? headerLogo : logo}
                                alt="logo"
                                width={100}
                                height={40}
                                className="max-w-[160px] lg:w-auto h-auto lg:max-w-[200px] max-h-[56px]"
                            />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 text-[#263054]"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <HiX className="w-6 h-6" />
                        ) : (
                            <HiMenu className="w-6 h-6" />
                        )}
                    </button>

                    {/* Navigation Menu */}
                    <ul
                        className={`flex item-center gap-4 md:gap-[30px] absolute md:relative bg-white flex-col md:flex-row
                        ${
                            isMenuOpen
                                ? 'top-[55px] opacity-100 visible'
                                : 'top-[-400px] md:top-0 invisible md:visible opacity-0 md:opacity-100'
                        }
                        left-0 w-full md:w-auto pb-10 md:pb-0 container z-40 transition-all duration-300 ease-in-out`}
                    >
                        {categories.slice(0, 4).map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={`collections/${category.slug}`}
                                    className="text-lg text-[#263054] font-medium"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Order Now Button */}
                    <div className="flex items-center gap-4">
                        <HeaderCart dictionary={dictionary.Header} />
                        <div className="hidden md:block">
                            <KarbarButton
                                asLink
                                href="/collections/all"
                                preserveHover
                                variant="default"
                                className="px-6 py-4 rounded-lg border-2 text-white font-normal text-base inline-block hover:bg-transparent transition-all duration-150"
                                aria-label="See more products in our collection"
                                title="Browse all products in our collection"
                            >
                                Order Now
                            </KarbarButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSix;
