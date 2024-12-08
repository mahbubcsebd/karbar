'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import { Suspense, useEffect, useReducer, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import messanger from '../app/assets/icons/messanger.svg';
import whatsapp from '../app/assets/icons/whatsapp.svg';
import ScrollToTop from '../app/components/ScrollToTop';
import { ProductContext } from '../app/context/cartContext';
import { cartReducer, initialState } from '../app/reducer/CartReducer';
import { ModalProvider } from '../app/reducer/ModalProvider';
import { SearchProvider } from '../app/reducer/SearchContext';
import FBPixel from './components/add-manager/FBPixel';
import Announcement from './components/Announcement';
import HomePreLoader from './components/HomePreLoader';
import FooterThemes from './components/themes/FooterTheme';
import HeaderThemes from './components/themes/HeaderTheme';
import { LanguageProvider } from './context/LanguageContext';
import { SiteSettingProvider } from './context/SiteSettingContext';
import { SortProvider } from './context/SortContext';
import './globals.css';
import AdProvider from './provider/AdProvider';
import OrderProvider from './provider/orderIdProvider';
import getAddManager from './utils/getAddManager';
import { getSiteSettings } from './utils/getSiteSettings';
import getTemplate from './utils/getTemplate';

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '800'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [siteSetting, setSiteSetting] = useState(null);
    const [template, setTemplate] = useState(null);
    const [addManager, setAddManager] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state for the preloader
    const [showChat, setShowChat] = useState(true);
    const [showAnnouncement, setShowAnnouncement] = useState(false);

    useEffect(() => {
        if (pathname === '/') {
            const hasVisited = sessionStorage.getItem('homeVisited');
            if (!hasVisited) {
                setShowAnnouncement(true);
                sessionStorage.setItem('homeVisited', 'true');
            }
        }
    }, [pathname]);

    const conditionalPath =
        pathname !== '/order-successfull' &&
        !pathname.includes('/landing') &&
        pathname !== '/pos';

    useEffect(() => {
        dispatch({ type: 'SET_CART' });

        const fetchData = async () => {
            try {
                // Fetch site setting first
                const siteSettings = await getSiteSettings();
                setSiteSetting(siteSettings.data);

                // Fetch other data after siteSetting is loaded
                const [templateData, addManagerData] = await Promise.all([
                    getTemplate(),
                    getAddManager(),
                ]);

                setTemplate(templateData);
                setAddManager(addManagerData);

                // Set a delay before hiding the loader
                setTimeout(() => setIsLoading(false), 1000); // 1000 ms delay
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false); // Hide loader on error
            }
        };

        fetchData();
    }, []);

    return (
        <html lang="en">
            {addManager?.tag_manager_id &&
                Array.isArray(addManager?.tag_manager_id) &&
                addManager?.tag_manager_id.map((gtmId) => (
                    <GoogleTagManager
                        key={gtmId}
                        gtmId={gtmId}
                    />
                ))}

            <body className={poppins.className}>
                {/* Display HomePreLoader while loading */}
                {isLoading ? (
                    <HomePreLoader />
                ) : (
                    <Suspense fallback={<HomePreLoader />}>
                        <LanguageProvider>
                            <AdProvider>
                                <ProductContext.Provider
                                    value={{ state, dispatch }}
                                >
                                    <SearchProvider>
                                        <SortProvider>
                                            <ModalProvider>
                                                <SiteSettingProvider>
                                                    <OrderProvider>
                                                        <NextTopLoader
                                                            color="#8831E1"
                                                            initialPosition={
                                                                0.08
                                                            }
                                                            crawlSpeed={200}
                                                            height={3}
                                                            crawl={true}
                                                            showSpinner={false}
                                                            easing="ease"
                                                            speed={200}
                                                            shadow="0 0 10px #8831E1,0 0 5px #8831E1"
                                                            zIndex={
                                                                99999999999999
                                                            }
                                                        />
                                                        <main>
                                                            <div>
                                                                {/* {pathname ===
                                                                    '/' &&
                                                                    showAnnouncement && (
                                                                        <Announcement />
                                                                    )} */}
                                                                <Announcement />
                                                            </div>
                                                            {conditionalPath &&
                                                                template?.template_name && (
                                                                    <HeaderThemes
                                                                        template={
                                                                            template.template_name
                                                                        }
                                                                    />
                                                                )}

                                                            {children}

                                                            {conditionalPath &&
                                                                template?.template_name && (
                                                                    <FooterThemes
                                                                        template={
                                                                            template.template_name
                                                                        }
                                                                    />
                                                                )}
                                                        </main>

                                                        <ScrollToTop />
                                                        <div className="fixed z-[99999999] grid gap-3 md:gap-2 bottom-10 md:bottom-[85px] right-4">
                                                            {siteSetting?.whatsapp_id &&
                                                                pathname !==
                                                                    '/pos' && (
                                                                    <Link
                                                                        className="w-10 h-10 overflow-hidden md:w-9 md:h-9"
                                                                        target="_blank"
                                                                        href={`https://wa.me/${siteSetting.whatsapp_id}`}
                                                                    >
                                                                        <Image
                                                                            className="w-full h-full"
                                                                            src={
                                                                                whatsapp
                                                                            }
                                                                            alt="whatsapp"
                                                                            priority
                                                                        />
                                                                    </Link>
                                                                )}
                                                            {siteSetting?.fb_page_id &&
                                                                pathname !==
                                                                    '/pos' && (
                                                                    <Link
                                                                        className="w-10 h-10 overflow-hidden md:w-9 md:h-9"
                                                                        target="_blank"
                                                                        href={`https://m.me/${siteSetting.fb_page_id}`}
                                                                    >
                                                                        <Image
                                                                            className="w-full h-full"
                                                                            src={
                                                                                messanger
                                                                            }
                                                                            alt="messanger"
                                                                            priority
                                                                        />
                                                                    </Link>
                                                                )}
                                                        </div>

                                                        <ToastContainer />
                                                    </OrderProvider>
                                                </SiteSettingProvider>
                                            </ModalProvider>
                                        </SortProvider>
                                    </SearchProvider>
                                </ProductContext.Provider>
                            </AdProvider>
                        </LanguageProvider>
                    </Suspense>
                )}
                {addManager?.pixel_id &&
                    Array.isArray(addManager?.pixel_id) &&
                    addManager?.pixel_id.map((id) => (
                        <FBPixel
                            key={id}
                            pixelId={id}
                        />
                    ))}
            </body>
        </html>
    );
}
