import { createContext, useEffect, useState } from 'react';
import bn from '../dictionaries/bn.json';
import en from '../dictionaries/en.json';

// Add more languages as needed
export const LanguageContext = createContext();

const translations = {
    en: en,
    bn: bn,
    // Add more language translations here, e.g., 'fr': fr for French
};

export const LanguageProvider = ({ children }) => {
    // Initialize language with default 'en' before mounting
    const [language, setLanguage] = useState();
    const [dictionary, setDictionary] = useState(translations['en']);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Ensure this runs only on the client
        if (typeof window !== 'undefined') {
            const storedLanguage = localStorage.getItem('language') || 'en';
            setLanguage(storedLanguage);
            setIsHydrated(true); // Set hydration flag after loading from localStorage
        }
    }, []);

    useEffect(() => {
        if (isHydrated) {
            setDictionary(translations[language]);
            localStorage.setItem('language', language);
        }
    }, [language, isHydrated]);

    const changeLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang);
        } else {
            console.warn(`Language ${lang} is not available.`);
        }
    };

    return (
        <LanguageContext.Provider
            value={{ language, dictionary, changeLanguage }}
        >
            {children}
        </LanguageContext.Provider>
    );
};
