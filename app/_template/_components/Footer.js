'use client';

import useDictionary from '@/_hooks/useDictionary';
import useSiteSetting from '@/_hooks/useSiteSetting';
import getPages from '@/_utils/getPages';
import { getPaymentMethod } from '@/_utils/getPaymentMethod';
import bkashIcon from '@/assets/icons/bkash.svg';
import codIcon from '@/assets/icons/cod.svg';
import logo from '@/assets/icons/footer-logo.svg';
import karbar from '@/assets/icons/karbar-logo.svg';
import nagadIcon from '@/assets/icons/nagad.svg';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  // State management
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [pages, setPages] = useState([]);
  const [isPaymentLoading, setIsPaymentLoading] = useState(true);
  const [isPagesLoading, setIsPagesLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hooks
  const { language, dictionary } = useDictionary();
  const { siteSetting, loading: isSiteSettingLoading } = useSiteSetting();

  // Memoized values
  const paymentIcons = useMemo(
    () => ({
      bkash: bkashIcon,
      nagad: nagadIcon,
      cash: codIcon,
    }),
    []
  );

  const socialLinks = useMemo(
    () => [
      { name: 'facebook', url: siteSetting?.facebook_url, icon: FaFacebookF },
      { name: 'instagram', url: siteSetting?.instagram_url, icon: FaInstagram },
      { name: 'youtube', url: siteSetting?.youtube_url, icon: FaYoutube },
      { name: 'tiktok', url: siteSetting?.tiktok_url, icon: FaTiktok },
    ],
    [siteSetting]
  );

  // Dictionary values
  const { payment } = dictionary?.Footer || {};

  useEffect(() => {
    // Fetch payment methods
    setIsPaymentLoading(true);
    getPaymentMethod()
      .then((res) => {
        setPaymentMethod(res?.data || []);
      })
      .catch((err) => {
        console.error('Payment Error', err);
        setError('Failed to load payment methods');
        setPaymentMethod([]);
      })
      .finally(() => setIsPaymentLoading(false));

    // Fetch pages
    setIsPagesLoading(true);
    getPages()
      .then((res) => {
        setPages(res?.data || []);
      })
      .catch((err) => {
        console.error('Pages Error', err);
        setError('Failed to load pages');
        setPages([]);
      })
      .finally(() => setIsPagesLoading(false));
  }, []);

  // Error state
  if (error) {
    return (
      <footer className="py-10 bg-gray-900">
        <div className="container text-center text-red-400">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 mt-4 text-gray-900 bg-white rounded"
          >
            Retry
          </button>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="relative overflow-hidden bg-gray-900"
      style={{ backgroundColor: siteSetting.btn_bg_color || '#181818' }}
    >
      <div className="relative z-50">
        {/* Top Row with Logo and Socials */}
        <div className="py-[30px] border-b border-white/10">
          <div className="container flex items-center justify-between">
            <div className="max-w-[120px] md:max-w-[200px] flex items-center">
              {isSiteSettingLoading ? (
                <div className="w-[150px] h-[24px] bg-gray-700 rounded animate-pulse" />
              ) : (
                <Link href="/" className="inline-block">
                  <Image
                    src={siteSetting?.footer_logo || logo}
                    alt="footer logo"
                    width={200}
                    height={50}
                    className="object-contain w-auto h-auto"
                    loading="lazy"
                    quality={60}
                    unoptimized
                  />
                </Link>
              )}
            </div>

            <div className="w-[150px] h-[24px]">
              {isSiteSettingLoading ? (
                <div className="w-full h-full bg-gray-700 rounded animate-pulse" />
              ) : (
                <ul className="flex items-center gap-[18px]">
                  {socialLinks.map(
                    ({ name, url, icon: Icon }) =>
                      url && (
                        <li key={name}>
                          <Link
                            href={url}
                            rel="noopener noreferrer"
                            target="_blank"
                            aria-label={`${name} url`}
                            className="transition-colors hover:text-primary"
                          >
                            <div className="text-lg text-white">
                              <Icon />
                            </div>
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Pages */}
        <div className="container text-center py-[30px]">
          <div className="min-h-[24px] flex justify-center">
            {isPagesLoading ? (
              <div className="w-3/4 h-6 bg-gray-700 rounded animate-pulse" />
            ) : (
              <ul className="flex items-center justify-center gap-4 md:gap-[18px] flex-wrap">
                {pages.length > 0 ? (
                  pages.map((page, index) => (
                    <React.Fragment key={page.id}>
                      <li>
                        <Link
                          className="text-base font-normal text-white transition-all duration-150 hover:underline"
                          href={`/company/${page.slug}`}
                        >
                          {page.title}
                        </Link>
                      </li>
                      {index !== pages.length - 1 && (
                        <li className="text-xs font-normal text-white">/</li>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <li className="text-sm text-white/70">No pages available</li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="container text-center pb-[30px]">
          <div className="flex items-center justify-center gap-4 min-h-[34px]">
            {isPaymentLoading ? (
              <div className="w-1/2 h-8 bg-gray-700 rounded animate-pulse" />
            ) : (
              <>
                <p className="text-base font-medium text-white">{payment} :</p>
                {paymentMethod.length > 0 ? (
                  <ul className="flex items-center gap-2">
                    {paymentMethod.map((method) => {
                      const icon = paymentIcons[method.name];
                      return (
                        <li key={method.id}>
                          <Image
                            src={icon}
                            alt={method.name}
                            loading="lazy"
                            quality={60}
                            width={70}
                            height={34}
                            className="object-contain w-[50px] sm:w-[60px] lg:w-[80px] h-auto"
                          />
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-white/70">
                    No payment methods available
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="container">
          <hr className="border-white/10" />
          <div className="flex flex-col lg:flex-row justify-between items-center py-[30px] gap-3 min-h-[24px]">
            {isSiteSettingLoading ? (
              <>
                <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse" />
                <div className="w-1/4 h-4 bg-gray-700 rounded animate-pulse" />
              </>
            ) : (
              <>
                <p className="text-sm font-normal text-white flex items-center gap-[4px]">
                  &copy; {new Date().getFullYear()} All rights reserved by{' '}
                  <span className="font-semibold">
                    {siteSetting?.title || 'Our Company'}
                  </span>
                </p>
                <p className="text-sm font-normal text-white flex items-center gap-[4px]">
                  Powered by{' '}
                  <Link
                    className="text-gray-400 transition-colors hover:text-primary"
                    href="https://karbar.shop"
                    target="_blank"
                  >
                    <Image
                      src={karbar}
                      alt="karbar"
                      className="w-[65px] lg:w-[70px] pt-[4px]"
                      loading="lazy"
                      quality={60}
                      width={70}
                      height={30}
                    />
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
