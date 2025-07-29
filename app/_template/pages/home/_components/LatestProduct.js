'use client';

import KarbarButton from '@/_components/KarbarButton';
import useDictionary from '@/_hooks/useDictionary';
import useSiteSetting from '@/_hooks/useSiteSetting';
import useUser from '@/_hooks/useUser';
import { getAdvertisement } from '@/_utils/getAdvertisement';
import { getAllProduct } from '@/_utils/getProduct';
import latestCampain1 from '@/assets/images/latest-campain-1.png';
import latestCampain2 from '@/assets/images/latest-campain-2.png';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DaribProductLoader from '../../../_components/DaribProductLoader';
import ProductCard from '../../../_components/ProductCard';
import SectionTitle from '../../../_components/SectionTitle';

const LatestProduct = () => {
  const { language, dictionary } = useDictionary();
  const { sectionTitle, seeMore } = dictionary.ProductCard;
  const { siteSetting } = useSiteSetting();
  const [advertisements, setAdvertisements] = useState([]);
  const { user } = useUser();
  const token = Cookies.get('userToken');

  const isRetailer = user?.retailer_role_yn === 'yes';

  useEffect(() => {
    if (!siteSetting?.module?.includes('advertisement')) return;

    const fetchAdvertisement = async () => {
      try {
        const advertisementData = await getAdvertisement('section_middle');
        setAdvertisements(advertisementData?.data || []);
      } catch (err) {
        console.error('Error fetching advertisements:', err);
      }
    };
    fetchAdvertisement();
  }, [siteSetting?.module]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching products with:', { token, isRetailer });

        const { data } = await getAllProduct(
          language,
          'all',
          '',
          'new_arrival',
          '',
          1,
          4,
          'all',
          token,
          isRetailer
        );

        console.log('Fetched products:', token, isRetailer);

        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err.message);
        setError(err.message || 'Failed to fetch products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [language, user, token, isRetailer]);

  const fallbackImages = [
    {
      id: 1,
      alt: 'Featured Product 1',
      url: '/collections/all',
      image: latestCampain1,
    },
    {
      id: 2,
      alt: 'Featured Product 2',
      url: '/collections/all',
      image: latestCampain2,
    },
  ];

  const displayImages =
    advertisements[0]?.images?.length > 0
      ? advertisements[0].images.slice(0, 2)
      : fallbackImages;

  return (
    <div className="product-section">
      <div className="relative pt-10 pb-6 product-area">
        <div className="container">
          <SectionTitle position="start" title="Deal Of The Week" />

          {loading ? (
            <DaribProductLoader items={8} />
          ) : error ? (
            <div className="text-red-500 text-center min-h-[300px] flex items-center justify-center">
              {error}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid items-stretch grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                {products.slice(0, 2).map((product, index) => (
                  <div className="col-span-1" key={product.id}>
                    <ProductCard product={product} isPriority={index < 4} />
                  </div>
                ))}
                <div className="flex flex-col h-full col-span-2 gap-4">
                  <div className="flex flex-col flex-1 h-full gap-4 max-h-[420px]">
                    {displayImages.map((img) => (
                      <Link
                        key={img.id}
                        href={img.url || '/collections/all'}
                        className="flex-1 overflow-hidden rounded-lg"
                      >
                        <Image
                          src={img.image}
                          alt={img.alt || 'Advertisement'}
                          width={500}
                          height={500}
                          className="w-full h-full rounded-lg"
                          loading="lazy"
                          priority={false}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
                {products.slice(2, 4).map((product, index) => (
                  <div className="col-span-1" key={product.id}>
                    <ProductCard product={product} isPriority={index < 4} />
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6 md:pt-6">
                <KarbarButton
                  asLink
                  href="/collections/all"
                  preserveHover
                  variant="default"
                  className="text-base md:text-lg text-white font-normal border md:border-2 px-6 py-[10px] md:px-6 md:py-3 transition duration-150 rounded-full bg-[#17AF26] border-[#17AF26]"
                  aria-label="See more products in our collection"
                  title="Browse all products in our collection"
                >
                  {seeMore ?? 'See More'}
                </KarbarButton>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center min-h-[300px] flex items-center justify-center">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestProduct;
