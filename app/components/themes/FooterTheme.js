'use client';

import { Suspense, lazy, useEffect, useState } from 'react';

// Placeholder component to display while the actual component is loading
const Loading = () => <div></div>;
const ErrorComponent = () => <div>Error loading theme component.</div>;

function FooterThemes({ template }) {
    const [Component, setComponent] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (template === 'Template01') {
            setComponent(lazy(() => import('../Footer')));
        } else if (template === 'Template02') {
            setComponent(lazy(() => import('../template/abaya/AbayaFooter')));
        } else {
            setComponent(lazy(() => import('../Footer')));
        }
    }, [template]);

    if (error) {
        return <ErrorComponent />;
    }

    return (
        <div>
            {Component ? (
                <Suspense>
                    <Component />
                </Suspense>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default FooterThemes;
