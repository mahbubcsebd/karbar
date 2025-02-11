'use client';

import { Suspense, useEffect, useState } from 'react';

const Loading = () => (
    <div className="w-full min-h-[90px] bg-gray-200 animate-pulse"></div>
);
const ErrorComponent = () => <div>Error loading theme component.</div>;

function HeaderThemes({ template }) {
    const [Component, setComponent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let isMounted = true;

        const loadComponent = async () => {
            try {
                let importedComponent;
                switch (template) {
                    case 'Template02':
                        importedComponent = await import(
                            '../template/abaya/AbayaHeader'
                        );
                        break;
                    case 'Template06':
                        importedComponent = await import(
                            '../template/template-six/HeaderSix'
                        );
                        break;
                    case 'Template01':
                    default:
                        importedComponent = await import('../Header');
                        break;
                }
                if (isMounted) {
                    setComponent(() => importedComponent.default);
                }
            } catch (err) {
                if (isMounted) {
                    setError(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadComponent();

        return () => {
            isMounted = false;
        };
    }, [template]);

    if (error) return <ErrorComponent />;
    if (loading) return <Loading />;

    return (
        <Suspense fallback={<Loading />}>{Component && <Component />}</Suspense>
    );
}

export default HeaderThemes;
