'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import errorImg from '../app/assets/images/404.png';
import '../app/globals.css';
import logo from './assets/icons/logo.svg';


export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 7000);
    }, [router]);
    return (
        <html>
        <head>
            <title>404 | Page not found</title>
        </head>
            <body className="text-center">
                <header
                    id="header"
                    className="header py-[17px] bg-gray-300 fixed top-0 left-0 w-full"
                >
                    <div className="header-area">
                        <div className="container">
                            <div className="flex items-center justify-center header-content">
                                <Link href="/">
                                    <Image
                                        src={logo}
                                        alt="logo"
                                        className="w-[82px] lg:w-auto"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
                <div>
                    <div className="container">
                        <div className="grid-cols-12 justify-center pt-[120px]">
                            <div className="col-span-8">
                                <div className="flex justify-center text-center mb-[44px]">
                                    <Image
                                        src={errorImg}
                                        alt="404"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-5xl font-semibold text-gray-900 mb-3">
                                        Oops! Page Not found.
                                    </h1>
                                    <p className="text-lg text-[#6E758D] font-normal mb-6">
                                        This page no longer exists or has been
                                        moved
                                    </p>
                                    <div className="flex justify-center">
                                        <Link
                                            href="/product"
                                            className="text-base md:text-[20px] text-white font-normal border-2 border-purple-900 px-6 py-3 rounded-lg md:px-[30px] md:py-4 bg-purple-900  hover:bg-trasnparent hover:text-purple-900 transition duration-150"
                                        >
                                            Return Home
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
