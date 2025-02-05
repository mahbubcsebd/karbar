'use client';

import { lazy, useCallback, useEffect, useState } from 'react';

// Placeholder components
const ErrorComponent = () => <div>Error loading theme component.</div>;

function Template({ template }) {
    const [Component, setComponent] = useState(null);
    const [error, setError] = useState(false);
    const [cachedTemplate, setCachedTemplate] = useState(null);

    const fetchAndRender = useCallback(
        async (newTemplate) => {
            const templateName =
                newTemplate && typeof newTemplate === 'string'
                    ? newTemplate
                    : 'Template01';

            if (templateName !== cachedTemplate) {
                try {
                    const Component = lazy(() =>
                        import(`./${templateName}`).catch(() =>
                            import(`./Template01`)
                        )
                    );
                    setComponent(Component);
                    setCachedTemplate(templateName);
                } catch (error) {
                    setError(true);
                }
            }
        },
        [cachedTemplate]
    );

    useEffect(() => {
        fetchAndRender(template);
    }, [template, fetchAndRender]);

    if (error) {
        return <ErrorComponent />;
    }

    return (
        <div>
            {Component && (
                <Component />
            )}
        </div>
    );
}

export default Template;
