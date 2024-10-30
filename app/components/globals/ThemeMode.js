"use client"

import { useEffect, useState } from 'react';
import { CiDark, CiLight } from 'react-icons/ci';

const ThemeMode = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
        document.body.classList.toggle('light', !darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button
            type="button"
            onClick={toggleDarkMode}
            className="text-[27px] text-white font-semibold bg-primary-main px-4 py-4 border-1 border-primary-main rounded-lg"
        >
            {darkMode ? <CiLight /> : <CiDark />}
        </button>
    );
};

export default ThemeMode;