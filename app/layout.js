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
// import FBPixel from './components/add-manager/FBPixel';
import FBConversionApi from './components/add-manager/FBConversionApi';
import FBPixel from './components/add-manager/FBPixel';
import Announcement from './components/Announcement';
import HomePreLoader from './components/HomePreLoader';
import FooterThemes from './components/themes/FooterTheme';
import HeaderThemes from './components/themes/HeaderTheme';
import { BrandProvider } from './context/brandContext';
import { LanguageProvider } from './context/LanguageContext';
import { SiteSettingProvider } from './context/SiteSettingContext';
import { SortProvider } from './context/SortContext';
import { UserProvider } from './context/UserContext';
import './globals.css';
import AdProvider from './provider/AdProvider';
import OrderProvider from './provider/orderIdProvider';
import getAddManager from './utils/getAddManager';
import { getSiteSettings } from './utils/getSiteSettings';
import getTemplate from './utils/getTemplate';

// const HomePreLoader = dynamic(() => import('./components/HomePreLoader'), {
//     suspense: true,
// });

// const HeaderThemes = dynamic(() => import('./components/themes/HeaderTheme'), {
//     suspense: true,
// });

// const FooterThemes = dynamic(() => import('./components/themes/FooterTheme'), {
//     suspense: true,
// });

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '800'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

// export const metadata = {
//     metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
//     alternates: {
//         canonical: '/',
//         languages: {
//             'en-US': '/en',
//             'bn-BD': '/bn',
//         },
//     },
//     viewport: {
//         width: 'device-width',
//         initialScale: 1,
//         maximumScale: 1,
//     },
//     robots: {
//         index: true,
//         follow: true,
//         googleBot: {
//             index: true,
//             follow: true,
//             'max-image-preview': 'large',
//             'max-video-preview': -1,
//             'max-snippet': -1,
//         },
//     },
//     verification: {
//         google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
//         facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION,
//     },
// };

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [siteSetting, setSiteSetting] = useState(null);
    const [template, setTemplate] = useState(null);
    const [addManager, setAddManager] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false); // Track if the initial load is completed
    const [isVisible, setIsVisible] = useState(false); // Track if the initial load is completed

    useEffect(() => {
        // Initialize visibility state only once when component mounts
        const initializeVisibility = () => {
            if (typeof window === 'undefined') return;

            const hasVisited = sessionStorage.getItem('homeVisited');

            if (!hasVisited && pathname === '/') {
                setIsVisible(true);
                sessionStorage.setItem('homeVisited', 'true');
            }
        };

        initializeVisibility();

        // Cleanup function
        return () => {
            if (pathname !== '/') {
                setIsVisible(false);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]); // Empty dependency array

    const conditionalPath =
        pathname !== '/order-successfull' &&
        // pathname !== '/checkout' &&
        pathname !== '/landing' &&
        pathname !== '/tally' &&
        pathname !== '/pos';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const siteSettings = await getSiteSettings();
                if (!siteSettings.data)
                    throw new Error('Failed to fetch site settings');
                setSiteSetting(siteSettings.data);

                const [templateData, addManagerData] = await Promise.all([
                    getTemplate(),
                    getAddManager(),
                ]);

                if (!templateData || !addManagerData)
                    throw new Error(
                        'Failed to fetch template or ad manager data'
                    );
                setTemplate(templateData);
                setAddManager(addManagerData);

                setTimeout(() => {
                    setIsLoading(false);
                    setHasLoaded(true);
                }, 1000);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
                // Optionally, set an error state and display an error message to the user
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        dispatch({
            type: 'SET_CART',
        });
    }, []);

    return (
        <html lang="en">
            {addManager?.tag_managers &&
                Array.isArray(addManager?.tag_managers) &&
                addManager?.tag_managers.map((tagManager) => (
                    <GoogleTagManager
                        key={tagManager.tag_manager_id}
                        gtmId={tagManager.tag_manager_id}
                    />
                ))}
            <body>
                {/* Show HomePreLoader only during the first load */}
                {isLoading && !hasLoaded ? (
                    <HomePreLoader />
                ) : (
                    <Suspense fallback={!hasLoaded ? <HomePreLoader /> : null}>
                        <LanguageProvider>
                            <UserProvider>
                                <AdProvider>
                                    <ProductContext.Provider
                                        value={{ state, dispatch }}
                                    >
                                        <SearchProvider>
                                            <SortProvider>
                                                <BrandProvider>
                                                    <ModalProvider>
                                                        <SiteSettingProvider>
                                                            <OrderProvider>
                                                                <NextTopLoader
                                                                    color="#8831E1"
                                                                    initialPosition={
                                                                        0.08
                                                                    }
                                                                    crawlSpeed={
                                                                        200
                                                                    }
                                                                    height={3}
                                                                    crawl={true}
                                                                    showSpinner={
                                                                        false
                                                                    }
                                                                    easing="ease"
                                                                    speed={200}
                                                                    shadow="0 0 10px #8831E1,0 0 5px #8831E1"
                                                                    zIndex={
                                                                        99999999999999
                                                                    }
                                                                />
                                                                <main>
                                                                    {pathname ===
                                                                        '/' && (
                                                                        <div>
                                                                            {isVisible && (
                                                                                <Announcement />
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {template?.template_name &&
                                                                        conditionalPath && (
                                                                            <HeaderThemes
                                                                                template={
                                                                                    template.template_name
                                                                                }
                                                                            />
                                                                        )}
                                                                    {children}
                                                                    {template?.template_name &&
                                                                        conditionalPath && (
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
                                                </BrandProvider>
                                            </SortProvider>
                                        </SearchProvider>
                                    </ProductContext.Provider>
                                </AdProvider>
                            </UserProvider>
                        </LanguageProvider>
                    </Suspense>
                )}
                {addManager?.pixels &&
                    Array.isArray(addManager?.pixels) &&
                    addManager?.pixels.map((pixel) => (
                        <div key={pixel.id}>
                            <FBPixel
                                // key={`pixel-${pixel.id}`}
                                pixelId={pixel.pixel_id}
                            />
                            <FBConversionApi
                                // key={`token-${pixel.id}`}
                                pixelId={pixel.token}
                            />
                        </div>
                    ))}
            </body>
        </html>
    );
}
