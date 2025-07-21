'use client';

import KarbarCountdown from '@/_components/KarbarCountdown';
import useDictionary from '@/_hooks/useDictionary';
import useSiteSetting from '@/_hooks/useSiteSetting';
import useUser from '@/_hooks/useUser';
import { getAnnouncement } from '@/_utils/getAnnouncement';
import logo from '@/assets/icons/logo.svg';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import MegaMenuNavigation from './MegaMenuNavigation';

const AuthModal = dynamic(() => import('./AuthModal'), { ssr: false });
const AuthUser = dynamic(() => import('./AuthUser'), { ssr: false });
const HeaderCart = dynamic(() => import('./HeaderCart'), { ssr: false });
const HeaderSearch = dynamic(() => import('./HeaderSearch'), { ssr: false });
const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), {
  ssr: false,
});

const Header = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { siteSetting, loading } = useSiteSetting();
  const [announcement, setAnnouncement] = useState(null);
  const { dictionary } = useDictionary();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const announcementData = await getAnnouncement();
      setAnnouncement(announcementData.data);
    };

    fetchAnnouncement();
  }, []);

  const handleSearch = () => {
    setShowSearchModal(!showSearchModal);
  };

  const handleProtectedRoute = (href) => {
    if (!user) {
      toast.error(`Please login first`, {
        position: 'bottom-right',
      });
    } else {
      router.push(href);
    }
  };

  const { header_logo } = siteSetting;

  return (
    <>
      {loading ? (
        <div className="h-[64px] bg-white ">
          <div className="container">
            <div className="flex h-[64px] items-center justify-end">
              <div className="flex items-center justify-end gap-4 ">
                <div className="w-24 h-8 bg-gray-100 animate-pulse" />
                <div className="w-24 h-8 bg-gray-100 animate-pulse" />
                <div className="w-24 h-8 bg-gray-100 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`header-top`}
          style={{ backgroundColor: siteSetting?.btn_bg_color || '#17AF26' }}
        >
          <div className="container">
            <div
              className={`flex items-end lg:items-center flex-col lg:flex-row lg:gap-5 ${
                !announcement?.textAnnounce && 'justify-end'
              }`}
            >
              {announcement?.textAnnounce && (
                <div className="flex items-end w-full pt-4 lg:justify-between lg:flex-1 lg:items-center lg:py-4">
                  {announcement?.textAnnounce?.marque ? (
                    <div className="flex items-center justify-between w-full gap-5 text-white">
                      <marquee className="w-full text-sm text-white md:text-base">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: announcement?.textAnnounce?.text,
                          }}
                        />
                      </marquee>
                      {announcement?.is_countdown && (
                        <div>
                          <KarbarCountdown
                            endingDate={announcement?.end_date}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full gap-4 text-white lg:flex-row lg:items-center">
                      <div
                        className="w-full text-sm text-white md:text-base"
                        dangerouslySetInnerHTML={{
                          __html: announcement?.textAnnounce?.text,
                        }}
                      />
                      {announcement?.is_countdown && (
                        <div>
                          <KarbarCountdown
                            endingDate={announcement?.end_date}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {!user ? (
                <div className="flex items-center gap-3 py-3 md:py-3">
                  <AuthModal>
                    <button className="text-sm font-semibold text-white cursor-pointer md:text-base">
                      My Account
                    </button>
                  </AuthModal>

                  <p className="text-sm font-semibold text-white md:text-base">
                    |
                  </p>
                  <AuthModal>
                    <button className="text-sm font-semibold text-white cursor-pointer md:text-base">
                      Flash Sale
                    </button>
                  </AuthModal>

                  <p className="text-sm font-semibold text-white md:text-base">
                    |
                  </p>
                  <AuthModal>
                    <button className="text-sm font-semibold text-white cursor-pointer md:text-base">
                      Track Order
                    </button>
                  </AuthModal>
                </div>
              ) : (
                <div className="flex items-center gap-3 py-3 md:py-3">
                  <Link
                    href={`/dashboard/user/${user?.username}`}
                    className="text-sm font-semibold text-white cursor-pointer md:text-base"
                  >
                    My Account
                  </Link>
                  <p className="text-sm font-semibold text-white md:text-base">
                    |
                  </p>
                  <Link
                    href="/"
                    className="text-sm font-semibold text-white cursor-pointer md:text-base"
                  >
                    Flash Sale
                  </Link>
                  <p className="text-sm font-semibold text-white md:text-base">
                    |
                  </p>
                  <Link
                    href="/dashboard/my-orders"
                    className="text-sm font-semibold text-white cursor-pointer md:text-base"
                  >
                    Track Order
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="header py-2 bg-[#E8F7E9] border-b border-[#E8F7E9]">
        <div className="container">
          <div className="relative">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center gap-8">
                <div
                  className={`header-logo ${
                    showSearchModal ? 'hidden' : 'flex items-center'
                  }`}
                >
                  <Link
                    href="/"
                    className="inline-block max-w-[120px] md:max-w-[200px]"
                  >
                    {loading ? (
                      <div className="w-40 h-10 bg-white rounded-md animate-pulse" />
                    ) : (
                      <Image
                        src={header_logo || logo}
                        alt="logo"
                        width={200}
                        height={200}
                        className={`object-contain w-auto h-auto`}
                        unoptimized
                      />
                    )}
                  </Link>
                </div>
                <div className="hidden xl:block">
                  <MegaMenuNavigation />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Search */}
                <HeaderSearch
                  showSearchModal={showSearchModal}
                  setShowSearchModal={setShowSearchModal}
                  dictionary={dictionary.Header}
                />

                <div className="flex items-center gap-2 md:gap-4">
                  {!showSearchModal && <LanguageSwitcher />}

                  {/* Mobile Search Icon */}
                  <button
                    type="button"
                    className="relative flex items-center justify-center text-lg md:text-[22px] text-gray-800 lg:border lg:border-[#D14BF8] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white lg:hidden"
                    onClick={handleSearch}
                    aria-label="search toggle button"
                  >
                    {showSearchModal ? <RxCross1 /> : <FiSearch />}
                  </button>

                  {/* Auth Button or User Info */}
                  <div className="flex items-center gap-4">
                    {!user ? (
                      <AuthModal>
                        <button
                          type="button"
                          aria-label="login button"
                          className="flex items-center text-sm text-[#74787C] font-bold justify-center w-10 h-10 md:px-10 md:py-4 md:h-[50px] md:w-auto capitalize bg-white border border-white rounded-full"
                        >
                          <span className="hidden md:block">
                            {dictionary.Auth.loginOrReg}
                          </span>
                          <span className="md:hidden">
                            <AiOutlineLogin />
                          </span>
                        </button>
                      </AuthModal>
                    ) : (
                      <AuthUser />
                    )}
                  </div>
                </div>

                {/* Cart */}
                {!showSearchModal && (
                  <HeaderCart dictionary={dictionary.Header} />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
