"use client";


import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import banglaImg from '../assets/icons/bangla.svg';
import englishImg from '../assets/icons/english.svg';
import { LanguageContext } from "../context/LanguageContext";

const LanguageSwitcher = ({template}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { language, changeLanguage } = useContext(LanguageContext);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref for the dropdown container

    // Define the languages dynamically
    const languages = [
        { code: 'en', name: 'English', flag: englishImg },
        { code: 'bn', name: 'বাংলা', flag: banglaImg },
        // You can add more languages here in the future
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setIsOpen(false);
    };

    // Find the selected language
    const selectedLanguage = languages.find((lang) => lang.code === language);


  return (
      <div className="flex items-center gap-4">
          <div
              className="relative"
              ref={dropdownRef}
          >
              <div className="absolute inset-y-0 left-0 flex items-center pt-1 pl-2 pointer-events-none">
                  <span className="hidden w-6 h-6 md:inline-block">
                      {selectedLanguage && (
                          <Image
                              src={selectedLanguage.flag}
                              alt={selectedLanguage.name}
                              className="rounded-full"
                          />
                      )}
                  </span>
              </div>
              <div
                  className={`block w-full md:py-[10px] md:h-12 md:rounded-full font-normal md:border border-[#D14BF8] appearance-none md:px-9 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer capitalize md:bg-white pr-4 ${
                      template === 'Template02' ? 'text-white' : 'text-gray-800'
                  }`}
                  onClick={toggleDropdown}
              >
                  {selectedLanguage ? selectedLanguage.code : ''}
                  <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 pointer-events-none md:pr-2">
                      <MdKeyboardArrowDown />
                  </div>
              </div>
              {isOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg min-w-[150px] right-0">
                      <ul className="py-1 text-gray-700">
                          {languages.map((lang) => (
                              <li
                                  key={lang.code}
                                  className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() =>
                                      handleLanguageChange(lang.code)
                                  }
                              >
                                  <div className="w-6 h-6 mr-2 rounded-full">
                                      <Image
                                          src={lang.flag}
                                          alt={lang.name}
                                          className="object-cover w-full h-full"
                                      />
                                  </div>
                                  {lang.name}
                              </li>
                          ))}
                      </ul>
                  </div>
              )}
          </div>
      </div>
  );
};

export default LanguageSwitcher;
