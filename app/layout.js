'use client';

import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useReducer, useState } from 'react';
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
    const conditionalPath =
        pathname !== '/order-successfull' &&
        // pathname !== '/checkout' &&
        !pathname.includes('/landing') &&
        pathname !== '/pos';

    const [state, dispatch] = useReducer(cartReducer, initialState);
    useEffect(() => {
        dispatch({
            type: 'SET_CART',
        });
    }, []);

    const [siteSetting, setSiteSetting] = useState('');
    const [template, setTemplate] = useState('');
    const [addManager, setAddManager] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const siteSettings = await getSiteSettings();
            const template = await getTemplate();
            const addManagerData = await getAddManager();
            setSiteSetting(siteSettings.data);
            setTemplate(template);
            setAddManager(addManagerData);
        };

        fetchData();
    }, []);

    return (
        <html lang="en">
            <GoogleTagManager gtmId={addManager.tag_manager_id} />
            <body className={poppins.className}>
                <LanguageProvider>
                    <ProductContext.Provider value={{ state, dispatch }}>
                        <SearchProvider>
                            <SortProvider>
                                <ModalProvider>
                                    <SiteSettingProvider>
                                        {conditionalPath && (
                                            <HeaderThemes
                                                template={
                                                    template.template_name
                                                }
                                            />
                                        )}

                                        {children}
                                        {conditionalPath && (
                                            <FooterThemes
                                                template={
                                                    template.template_name
                                                }
                                            />
                                        )}
                                        <ScrollToTop />
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
                                                />
                                            </Link>
                                        </div>
                                        <ToastContainer />
                                    </SiteSettingProvider>
                                </ModalProvider>
                            </SortProvider>
                        </SearchProvider>
                    </ProductContext.Provider>
                </LanguageProvider>
                <FBPixel pixelId={addManager.pixel_id} />
            </body>
        </html>
    );
}
