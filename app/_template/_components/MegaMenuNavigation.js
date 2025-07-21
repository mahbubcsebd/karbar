'use client';

import KarbarButton from '@/_components/KarbarButton';
import useDictionary from '@/_hooks/useDictionary';
import { getAllCategories } from '@/_utils/categories';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function MegaMenu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [mobileView, setMobileView] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const searchParams = useSearchParams();
  const { language } = useDictionary();
  const categoriesContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const wrapperRef = useRef(null); // For outside click detection

  const currentSubCategory = useMemo(
    () => searchParams.get('sub_category'),
    [searchParams]
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView(isMobile);
      if (!isMobile && isOpen) {
        updateArrowVisibility();
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllCategories(language, false, true);
      setCategories(res.data || []);
    } catch (err) {
      console.error('Category fetch failed:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleCategoryExpansion = useCallback((categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  }, []);

  const updateArrowVisibility = useCallback(() => {
    if (categoriesContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        categoriesContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    if (!mobileView && categoriesContainerRef.current) {
      updateArrowVisibility();
      const container = categoriesContainerRef.current;
      container.addEventListener('scroll', updateArrowVisibility);
      return () =>
        container.removeEventListener('scroll', updateArrowVisibility);
    }
  }, [mobileView, updateArrowVisibility]);

  const scrollCategories = (direction) => {
    if (categoriesContainerRef.current) {
      const container = categoriesContainerRef.current;
      const scrollAmount =
        direction === 'right'
          ? Math.min(
              300,
              container.scrollWidth -
                container.scrollLeft -
                container.clientWidth
            )
          : Math.min(300, container.scrollLeft);

      container.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        updateArrowVisibility();
      }, 300);
    }
  };

  // Outside Click Handler
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const renderDesktopView = useMemo(() => {
    return (
      <div className="relative w-full">
        {/* Left and Right arrows same as before */}
        <div
          className={`absolute left-0 top-0 h-full w-8 flex items-center justify-center bg-gradient-to-r from-white via-white to-transparent z-10 transition-opacity duration-200 ${
            showLeftArrow
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => scrollCategories('left')}
            disabled={!showLeftArrow}
            className={`p-2 rounded-full ${
              showLeftArrow ? 'bg-gray-100 hover:bg-gray-200' : 'bg-transparent'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft
              className={`w-5 h-5 ${
                showLeftArrow
                  ? 'text-gray-600 hover:text-primary'
                  : 'text-gray-300'
              }`}
            />
          </button>
        </div>

        <div
          className={`absolute right-0 top-0 h-full w-8 flex items-center justify-center bg-gradient-to-l from-white via-white to-transparent z-10 transition-opacity duration-200 ${
            showRightArrow
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => scrollCategories('right')}
            disabled={!showRightArrow}
            className={`p-2 rounded-full ${
              showRightArrow
                ? 'bg-gray-100 hover:bg-gray-200'
                : 'bg-transparent'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight
              className={`w-5 h-5 ${
                showRightArrow
                  ? 'text-gray-600 hover:text-primary'
                  : 'text-gray-300'
              }`}
            />
          </button>
        </div>

        <div
          ref={categoriesContainerRef}
          className="flex gap-4 pb-2 overflow-x-hidden scroll-smooth"
        >
          {/* Category Map Rendering */}
          {categories.map((cat) => {
            const showAllSubs = expandedCategories[cat.id];
            const subCount = cat.sub_category?.length || 0;
            const showMoreButton = subCount > 6;
            const displaySubs =
              showMoreButton && !showAllSubs
                ? cat.sub_category.slice(0, 6)
                : cat.sub_category;

            return (
              <div key={cat.id} className="w-[170px] flex-shrink-0">
                <Link
                  href={`/collections/${cat.slug}`}
                  onClick={handleLinkClick}
                  className="inline-block mb-5 group"
                >
                  <h3
                    className="text-base font-semibold text-gray-900 mb-[18px] group-hover:text-blue-600 transition-colors duration-200 group-hover:underline truncate"
                    title={cat.name}
                  >
                    {cat.name}
                  </h3>
                  {cat.category_image && (
                    <div className="w-[44px] h-[44px] overflow-hidden">
                      <Image
                        src={cat.category_image}
                        alt={cat.name}
                        width={44}
                        height={44}
                        className="object-contain w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  )}
                </Link>

                <ul className="space-y-1">
                  {displaySubs?.map((sub) => (
                    <li key={sub.id} className="truncate" title={sub.name}>
                      <Link
                        href={`/collections/${cat.slug}?sub_category=${sub.slug}`}
                        onClick={handleLinkClick}
                        className={`text-sm text-gray-600 hover:text-gray-700 transition-all duration-300 hover:underline ${
                          currentSubCategory === sub.slug
                            ? 'text-primary font-medium'
                            : ''
                        }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {showMoreButton && (
                  <button
                    onClick={() => toggleCategoryExpansion(cat.id)}
                    className="mt-1 text-xs text-primary hover:underline"
                  >
                    {showAllSubs ? 'Show Less' : `+${subCount - 6} More`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [
    categories,
    expandedCategories,
    currentSubCategory,
    toggleCategoryExpansion,
    handleLinkClick,
    showLeftArrow,
    showRightArrow,
  ]);

  // ######### MOBILE VIEW HAS BEEN UPDATED #########
  const renderMobileView = useMemo(() => {
    return (
      <div className="space-y-4">
        {categories.map((cat) => {
          const showAllSubs = expandedCategories[cat.id];
          const hasSubCategories = cat.sub_category?.length > 0;

          return (
            <div key={cat.id} className="pb-4 border-b last:border-b-0">
              <div className="flex items-center justify-between w-full">
                {/* Link for category name and image */}
                <Link
                  href={`/collections/${cat.slug}`}
                  onClick={handleLinkClick}
                  className="flex items-center flex-grow gap-2 font-semibold text-gray-900"
                >
                  {cat.category_image && (
                    <Image
                      src={cat.category_image}
                      alt={cat.name}
                      width={24}
                      height={24}
                      className="rounded"
                      loading="lazy"
                    />
                  )}
                  <span className="truncate" title={cat.name}>
                    {cat.name}
                  </span>
                </Link>

                {/* Conditional button for expanding sub-categories */}
                {hasSubCategories && (
                  <button
                    onClick={() => toggleCategoryExpansion(cat.id)}
                    className="flex-shrink-0 p-2 -mr-2"
                    aria-label={`Expand ${cat.name}`}
                  >
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        showAllSubs ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Sub-category list */}
              {hasSubCategories && showAllSubs && (
                <ul className="pl-6 mt-2 space-y-2">
                  {cat.sub_category?.map((sub) => (
                    <li key={sub.id} className="m-0 truncate" title={sub.name}>
                      <Link
                        href={`/collections/${cat.slug}?sub_category=${sub.slug}`}
                        onClick={handleLinkClick}
                        className={`text-sm hover:text-primary py-1 block ${
                          currentSubCategory === sub.slug
                            ? 'text-primary font-medium'
                            : 'text-gray-700'
                        }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    );
  }, [
    categories,
    expandedCategories,
    currentSubCategory,
    toggleCategoryExpansion,
    handleLinkClick,
  ]);

  const renderCategoryContent = useMemo(() => {
    if (loading)
      return (
        <div className="p-4 text-center col-span-full">
          Loading categories...
        </div>
      );
    if (error)
      return (
        <div className="p-4 text-center text-red-500 col-span-full">
          {error}{' '}
          <button
            onClick={fetchCategories}
            className="ml-2 text-primary hover:underline"
          >
            Retry
          </button>
        </div>
      );
    if (categories.length === 0)
      return (
        <div className="p-4 text-center col-span-full">No categories found</div>
      );
    return mobileView ? renderMobileView : renderDesktopView;
  }, [
    loading,
    error,
    categories,
    mobileView,
    renderDesktopView,
    renderMobileView,
    fetchCategories,
  ]);

  return (
    <div className="" ref={wrapperRef}>
      <KarbarButton
        variant="default"
        type="button"
        preserveHover
        onClick={() => setIsOpen(!isOpen)}
        className="text-base text-white font-semibold rounded-full py-2 px-[18px] bg-[#CE8B39] flex items-center gap-2 hover:bg-[#b77a2c] transition-colors duration-200"
        aria-label="Categories"
        aria-expanded={isOpen}
      >
        Categories
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </KarbarButton>

      {isOpen && (
        <div className="absolute left-0 top-full w-full bg-white shadow-lg rounded-bl-lg rounded-br-lg z-[9999999] max-h-[80vh] overflow-y-auto">
          <div className="container p-6 mx-auto">{renderCategoryContent}</div>
        </div>
      )}
    </div>
  );
}
