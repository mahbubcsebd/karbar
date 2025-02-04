'use client';

import { getAddManager } from '@/utils/getAddManager';
import { getSiteSettings } from '@/utils/getSiteSettings';
import { getTemplate } from '@/utils/getTemplate';
import { useEffect, useState } from 'react';

export function useInitialData() {
    const [data, setData] = useState({
        siteSetting: null,
        template: null,
        addManager: null,
        isLoading: true,
        hasLoaded: false
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const [siteSettings, templateData, addManagerData] = await Promise.all([
                    getSiteSettings(),
                    getTemplate(),
                    getAddManager()
                ]);

                setData({
                    siteSetting: siteSettings.data,
                    template: templateData,
                    addManager: addManagerData,
                    isLoading: false,
                    hasLoaded: true
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setData(prev => ({ ...prev, isLoading: false }));
            }
        }

        fetchData();
    }, []);

    return data;
}