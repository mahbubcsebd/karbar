'use client';

import dynamic from 'next/dynamic';
import karbarLoader from '../assets/lottie/karbar-loader.json';

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const HomePreLoader = () => {
    return (
        <div className="pre-loader">
            <div className="pre-loader-area">
                <div className="container">
                    <div className="flex items-center justify-center h-screen bg-[#f4f4f4] fixed top-0 left-0 w-full z-9999999999999">
                        <Lottie
                            animationData={karbarLoader}
                            loop={true}
                            autoplay={true}
                            className="w-1/2 md:w-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePreLoader;
