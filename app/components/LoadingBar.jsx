// components/LoadingBar.jsx
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

const LoadingBar = () => {
    const [loading, setLoading] = useState(false);
    const [width, setWidth] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Make sure router exists before adding event listeners
        if (!router) return;

        let progressInterval;

        const handleStart = () => {
            setLoading(true);
            setWidth(0);

            progressInterval = setInterval(() => {
                setWidth((prev) => {
                    if (prev < 90) {
                        return prev + 10;
                    }
                    clearInterval(progressInterval);
                    return prev;
                });
            }, 200);
        };

        const handleComplete = () => {
            clearInterval(progressInterval);
            setWidth(100);
            setTimeout(() => {
                setLoading(false);
                setWidth(0);
            }, 200);
        };

        // Add event listeners
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        // Cleanup function
        return () => {
            clearInterval(progressInterval);
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]); // Add router as dependency

    if (!loading) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    height: '100%',
                    background: '#ff0000',
                    width: `${width}%`,
                    transition: 'width 200ms ease-in-out',
                }}
            />
        </div>
    );
};

export default LoadingBar;
