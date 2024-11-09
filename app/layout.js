'use client';

import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useReducer, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import messanger from '../app/assets/icons/messanger.svg';
import whatsapp from '../app/assets/icons/whatsapp.svg';
import ScrollToTop from '../app/components/ScrollToTop';
import { ProductContext } from '../app/context/cartContext';
// import { SortProvider } from '../app/context/SortContext';
import { cartReducer, initialState } from '../app/reducer/CartReducer';
// import LanguageProvider from '../app/reducer/LanguageProvider';
import { GoogleTagManager } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { ModalProvider } from '../app/reducer/ModalProvider';
import { SearchProvider } from '../app/reducer/SearchContext';
import FBPixel from './components/add-manager/FBPixel';
import HomePreLoader from './components/HomePreLoader';
import FooterThemes from './components/themes/FooterTheme';
import HeaderThemes from './components/themes/HeaderTheme';
import { LanguageProvider } from './context/LanguageContext';
import { SiteSettingProvider } from './context/SiteSettingContext';
import { SortProvider } from './context/SortContext';
import './globals.css';
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
    const [loading, setLoading] = useState(true);

    const conditionalPath =
        pathname !== '/order-successfull' &&
        !pathname.includes('/landing') &&
        pathname !== '/pos';

    useEffect(() => {
        dispatch({ type: 'SET_CART' });

        const fetchData = async () => {
            try {
                const [siteSettings, templateData, addManagerData] =
                    await Promise.all([
                        getSiteSettings(),
                        getTemplate(),
                        getAddManager(),
                    ]);

                setSiteSetting(siteSettings.data);
                setTemplate(templateData);
                setAddManager(addManagerData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <HomePreLoader />;

    return (
        <html lang="en">
            {addManager?.tag_manager_id && (
                <GoogleTagManager gtmId={addManager.tag_manager_id} />
            )}
            <body className={poppins.className}>
                <Suspense fallback={<HomePreLoader />}>
                    <LanguageProvider>
                        <ProductContext.Provider value={{ state, dispatch }}>
                            <SearchProvider>
                                <SortProvider>
                                    <ModalProvider>
                                        <SiteSettingProvider>
                                            <main>
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
                                            {siteSetting?.whatsapp_id &&
                                                siteSetting?.fb_page_id && (
                                                    <div className="fixed z-[99999999] grid gap-3 md:gap-2 bottom-10 md:bottom-[85px] right-4">
                                                        <Link
                                                            className="w-10 h-10 overflow-hidden md:w-9 md:h-9"
                                                            target="_blank"
                                                            href={`https://wa.me/${siteSetting.whatsapp_id}`}
                                                        >
                                                            <Image
                                                                className="w-full h-full"
                                                                src={whatsapp}
                                                                alt="whatsapp"
                                                                priority
                                                            />
                                                        </Link>
                                                        <Link
                                                            className="w-10 h-10 overflow-hidden md:w-9 md:h-9"
                                                            target="_blank"
                                                            href={`https://m.me/${siteSetting.fb_page_id}`}
                                                        >
                                                            <Image
                                                                className="w-full h-full"
                                                                src={messanger}
                                                                alt="messanger"
                                                                priority
                                                            />
                                                        </Link>
                                                    </div>
                                                )}
                                            <ToastContainer />
                                        </SiteSettingProvider>
                                    </ModalProvider>
                                </SortProvider>
                            </SearchProvider>
                        </ProductContext.Provider>
                    </LanguageProvider>
                </Suspense>
                {addManager?.pixel_id && (
                    <FBPixel pixelId={addManager.pixel_id} />
                )}
            </body>
        </html>
    );
}
