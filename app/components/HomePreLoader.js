'use client';

// import loader from "../assets/images/preloader.gif";
// import loader from "../assets/icons/karbar-logo.svg";
import Lottie from 'lottie-react';
// import daribLoader from '../assets/lottie/daarib-loader.json';
import karbarLoader from '../assets/lottie/karbar-loader.json';


const HomePreLoader = () => {
    return (
        <div className="pre-loader">
            <div className="pre-loader-area">
                <div className="container">
                    <div className="flex items-center justify-center h-screen bg-[#f4f4f4] fixed top-0 left-0 w-full z-[9999999999999]">
                        {/* <div className="">
                            <Image
                                priority
                                unoptimized
                                className="w-[180px] lg:w-[420px]"
                                src={loader}
                                alt="loader"
                            />
                        </div> */}
                        <Lottie
                          animationData={karbarLoader}
                          loop={true}
                          autoplay={true}
                      />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePreLoader;
