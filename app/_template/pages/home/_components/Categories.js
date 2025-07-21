'use client';

import SortContext from '@/_context/SortContext';
import useDictionary from '@/_hooks/useDictionary';
import { getAllCategories } from '@/_utils/categories';
import vegetables from '@/assets/icons/vegetable.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// 🔸 Skeleton Placeholder Component
const SkeletonCategory = () => (
  <ul className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 xl:grid-cols-10 xxl:grid-cols-12 gap-3 py-5 lg:py-10 xl:gap-[21px] xxl:gap-6 md:py-16">
    {Array.from({ length: 12 }).map((_, index) => (
      <li key={index}>
        <div className="block w-full text-center animate-pulse">
          <div className="w-full mb-1 bg-gray-200 rounded-lg aspect-square lg:mb-3"></div>
          <div className="w-3/4 h-3 mx-auto bg-gray-300 rounded"></div>
        </div>
      </li>
    ))}
  </ul>
);

const Categories = () => {
  const { dictionary, language } = useDictionary();
  const { setSortQuery } = useContext(SortContext);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(language);
        setCategoryList(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [language]);

  return (
    <div className="relative z-10 categories">
      <div className="py-5 bg-white border-t border-gray-400 categories-area lg:py-10 md:py-16">
        <div className="container">
          {loading ? (
            <SkeletonCategory />
          ) : (
            <div className="">
              <Swiper
                ref={swiperRef}
                loop={categoryList.length > 10} // 10 highest column count
                autoplay={
                  categoryList.length > 10
                    ? { delay: 2500, disableOnInteraction: false }
                    : false
                }
                navigation={false}
                pagination={false}
                breakpoints={{
                  0: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 6,
                    spaceBetween: 14,
                  },
                  1024: {
                    slidesPerView: 8,
                    spaceBetween: 16,
                  },
                  1280: {
                    slidesPerView: 10,
                    spaceBetween: 16,
                  },
                  1536: {
                    slidesPerView: 10,
                    spaceBetween: 24,
                  },
                }}
                modules={[Navigation, Pagination, Autoplay]}
                className="py-5 mySwiper lg:py-10 md:py-16"
                onMouseEnter={() => swiperRef.current?.swiper?.autoplay.stop()}
                onMouseLeave={() => swiperRef.current?.swiper?.autoplay.start()}
              >
                {categoryList.map((category) => (
                  <SwiperSlide key={category.id}>
                    <Link
                      href={`/collections/${category.slug}`}
                      className="block w-full text-center"
                    >
                      <div className="w-full aspect-square bg-[#C0E5C3] rounded-lg mb-1 lg:mb-3 flex items-center justify-center overflow-hidden">
                        <Image
                          src={category?.category_image || vegetables}
                          alt={category.name}
                          className="object-contain w-3/4 h-3/4"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="hidden sm:block text-[8px] sm:text-xs font-semibold text-gray-800 md:text-sm xxl:text-base">
                        {category.name}
                      </p>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
