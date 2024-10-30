import { createContext, useEffect, useState } from 'react';
import { getSiteSettings } from '../utils/getSiteSettings';

export const SiteSettingContext = createContext();

export const SiteSettingProvider = ({ children }) => {
    const [siteSetting, setSiteSetting] = useState([]);

    useEffect(() => {
        const fetchSiteSettings = async () => {
            const storedLanguage = localStorage.getItem('language') || 'en';
            const settings = await getSiteSettings(storedLanguage);
            setSiteSetting(settings);
        };

        fetchSiteSettings();
    }, []);

    return (
        <SiteSettingContext.Provider value={{ siteSetting }}>
            {children}
        </SiteSettingContext.Provider>
    );
};
