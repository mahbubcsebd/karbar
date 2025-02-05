'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';

// Fallback components
const LoadingComponent = () => <div></div>;
const ErrorComponent = () => <div></div>;

function Template({ template }) {
    const [ThemeComponent, setThemeComponent] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadTemplate = useCallback(async (templateName) => {
        try {
            setIsLoading(true);
            setError(false);

            // Normalize template name
            const normalizedTemplate = templateName?.trim() || 'Template01';

            // Dynamic import with proper error handling
            const module = await import(`./${normalizedTemplate}`).catch(() => {
                console.warn(`Failed to load ${normalizedTemplate}, falling back to Template01`);
                return import('./Template01');
            });

            setThemeComponent(() => module.default);
        } catch (err) {
            console.error('Template loading error:', err);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTemplate(template);
    }, [template, loadTemplate]);

    if (error) {
        return <ErrorComponent />;
    }

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <Suspense fallback={<LoadingComponent />}>
            {ThemeComponent && <ThemeComponent />}
        </Suspense>
    );
}

export default Template;
