import { getLanguage } from '@/utils/getLanguage';
import { createContext, useEffect, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [languages, setLanguages] = useState([]);
    const [language, setLanguage] = useState('en');
    const [dictionary, setDictionary] = useState({});
    const [translations, setTranslations] = useState({}); // Declare translations state
    const [isHydrated, setIsHydrated] = useState(false); // Ensures translations are loaded
    const [isLoading, setIsLoading] = useState(true); // Ensures the app waits for API and translations

    const supportedLanguage = ['en', 'bn'];

    const importTranslations = async (availableLanguages) => {
        const importedTranslations = {};

        for (const lang of availableLanguages) {
            try {
                let translation;
                try {
                    translation = await import(
                        `../dictionaries/${lang.code}.json`
                    );
                } catch {
                    console.warn(
                        `Translation file for ${lang.code} not found. Falling back to English.`
                    );
                    translation = await import('../dictionaries/en.json');
                }

                importedTranslations[lang.code] = translation.default;
            } catch {
                console.error(`Failed to load translation for ${lang.code}.`);
                importedTranslations[lang.code] = {};
            }
        }

        return importedTranslations;
    };

    useEffect(() => {
        const fetchLanguagesAndSetup = async () => {
            try {
                const languageData = await getLanguage();
                const fetchedLanguages = languageData.data;
                setLanguages(fetchedLanguages);

                const defaultLanguage =
                    fetchedLanguages.find((lang) => lang.is_default)?.code ||
                    'en';

                if (!fetchedLanguages.some((lang) => lang.is_default)) {
                    console.warn(
                        "No default language found in API. Falling back to English ('en')."
                    );
                }

                const importedTranslations = await importTranslations(
                    fetchedLanguages
                );
                setTranslations(importedTranslations);

                const storedLanguage =
                    localStorage.getItem('language') || defaultLanguage;

                const validLanguage = fetchedLanguages.some(
                    (lang) => lang.code === storedLanguage
                )
                    ? storedLanguage
                    : defaultLanguage;

                setLanguage(validLanguage);
                setDictionary(importedTranslations[validLanguage] || {});
            } catch (error) {
                console.error(
                    'Failed to fetch languages or translations',
                    error
                );
                setLanguage('en');
            } finally {
                setIsHydrated(true);
                setIsLoading(false); // Mark loading complete
            }
        };

        fetchLanguagesAndSetup();
    }, []);

    useEffect(() => {
        if (isHydrated && translations[language]) {
            setDictionary(translations[language]);
            localStorage.setItem('language', language);
        }
    }, [language, isHydrated, translations]);

    const changeLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang);
        } else {
            console.warn(`Language ${lang} is not available.`);
        }
    };

    if (isLoading) {
        // Show a loading spinner or placeholder while the app waits for language setup
        return <div></div>;
    }

    return (
        <LanguageContext.Provider
            value={{
                language,
                dictionary,
                changeLanguage,
                languages,
                isHydrated,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};
