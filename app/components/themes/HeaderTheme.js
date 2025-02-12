'use client';

import { useEffect, useState } from 'react';

function HeaderThemes({ template }) {
    const [Component, setComponent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        let importComponent;

        if (template === 'Template01') {
            importComponent = import('../Header');
        } else if (template === 'Template02') {
            importComponent = import('../template/abaya/AbayaHeader');
        } else if (template === 'Template06') {
            importComponent = import('../template/template-six/HeaderSix');
        } else {
            importComponent = import('../Header');
        }

        importComponent
            .then((mod) => {
                setComponent(() => mod.default);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [template]);

    if (loading) {
        return (
            <div className="w-full min-h-[75px] md:min-h-[90px] bg-gray-200 animate-pulse"></div>
        );
    }

    if (error) {
        return <div>Error loading theme component.</div>;
    }

    return Component ? <Component /> : null;
}

export default HeaderThemes;
