import chefIcon from "@/assets/icons/chef.svg";
import heroSixBg from "@/assets/images/hero-six-bg.svg";
import heroSixImg from "@/assets/images/restaurant-hero.png";
import Image from 'next/image';
import Link from 'next/link';

const HeroSix = () => {
  return (
      <div className="hero-six mb-10 relative">
          <Image
              src={heroSixBg}
              className="absolute w-full h-full object-cover left-0 top-0 z-10"
              alt="hero-six-bg"
          />
          <div className="container">
              <div className="grid grid-cols-12 relative z-30 items-center gap-[50px] pt-16 mb-14">
                  <div className="col-span-12 md:col-span-7">
                      <div className="mb-[30px]">
                          <p className="flex items-center gap-2 text-base font-semibold text-[#982121] mb-3">
                              <span>
                                  <Image
                                      src={chefIcon}
                                      alt="chef"
                                  />
                              </span>
                              Welcome To Bite & Eat
                          </p>
                          <h1 className="text-4xl md:text-7xl font-bold text-[#0E1941] mb-[18px] font-cormorant">
                              Come for the Taste, Stay for the Experience
                          </h1>
                          <Image
                              src={heroSixImg}
                              alt="hero-six-img"
                              className="relative w-full h-full z-40 md:hidden"
                          />
                          <p className="text-lg font-normal text-[#3E4767]">
                              Take a walk through our menu, and let it become a
                              tale of taste. We invite you to experience an
                              unforgettable dining experience with us.
                          </p>
                      </div>
                      <div className="flex items-center gap-[18px]">
                          <Link
                              href="#"
                              className="px-6 py-4 rounded-lg bg-[#982121] border-2 border-[#982121] text-white font-normal text-base inline-block hover:bg-transparent hover:text-[#982121] transition-all duration-150"
                          >
                              Get Started
                          </Link>
                          <Link
                              href="#"
                              className="px-6 py-4 rounded-lg bg-tranparent border-2 border-[#982121] text-[#982121] font-normal text-base inline-block hover:bg-[#982121] hover:text-white transition-all duration-150"
                          >
                              Contact Us
                          </Link>
                      </div>
                  </div>
                  <div className="col-span-12 md:col-span-5 hidden md:block">
                      <div className="relative">
                          <Image
                              src={heroSixImg}
                              alt="hero-six-img"
                              className="relative w-full h-full z-50"
                          />
                          <div className="absolute w-full h-full bg-[#EAD3D3] top-10 left-10 z-40"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default HeroSix