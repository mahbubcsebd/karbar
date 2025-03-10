import Image from 'next/image';
import Link from 'next/link';
import landingBg from "../../../assets/images/landing-banner-bg.png";

const LandingBanner = ({ landing }) => {
    const { section_one_title, section_one_image } = landing || {};
    return (
        <div className="landing-banner mb-[60px] relative">
            <div className="w-full landing-banner-area">
                    <Image
                        src={section_one_image ? section_one_image : landingBg}
                        alt="landing-bg"
                        width={1920}
                        height={310}
                        className="absolute top-0 left-0 z-10 object-cover w-full h-full"
                    />
                {section_one_title && (
                    <div className="min-h-[240px] md:min-h-[270px] lg:min-h-[310px] flex items-center justify-center w-full relative z-50">
                        <div className="container grid items-center justify-center">
                            <div className="text-center py-10 lg:py-[50px]">
                                <h2 className="text-[24px] md:text-[30px] lg:text-4xl xl:text-5xl text-white font-bold text-center block mb-[30px] leading-relaxed">
                                    {section_one_title}
                                </h2>
                                <Link
                                    href="#our-package-section"
                                    className="py-3 px-[30px] text-[#484848] bg-[#F6F4FD] text-base rounded md:text-lg md:rounded-md leading-lg"
                                >
                                    Order Now
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingBanner;
