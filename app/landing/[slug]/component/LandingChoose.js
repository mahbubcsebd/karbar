import Image from 'next/image';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

const LandingChoose = ({landing}) => {
    const {section_two_description, section_two_image} = landing || {}
  return (
      <div className="mb-[60px]">
          <div className="container">
              {/* <p className="text-2xl text-gray-600 leading-9 mb-[30px]">
                  Say hello to your new go-to trousers — Classic & Cool Men s
                  Light Indigo Trouser Pant. Whether you re out for a casual day
                  or headed to an important meeting, these pants offer the
                  perfect blend of comfort, versatility, and timeless style.
              </p> */}

              <div className="grid items-center lg:grid-cols-2 gap-[30px]">
                  {section_two_image && <div className="w-full lg:h-[600px] overflow-hidden lg:order-last">
                      <Image
                          src={section_two_image}
                          alt="landing-1 img"
                          width={600}
                          height={600}
                          className="object-cover object-center w-full h-full"
                      />
                  </div>}
                 {section_two_description && <div
                      className=""
                      dangerouslySetInnerHTML={{
                          __html: section_two_description,
                      }}
                  ></div>}
                  {/* <div className="grid gap-[18px]">
                      <h4 className="text-[30px] font-semibold text-gray-900">
                          Why Choose Classic & Cool?
                      </h4>
                      <p className="text-2xl font-normal leading-relaxed text-gray-600">
                          <span className="inline-block mr-1 text-gray-800 text-medium">
                              Premium Comfort:
                          </span>
                          Crafted with a high-quality cotton blend, these
                          trousers are soft and breathable. Whether for work or
                          a night out, they keep you comfortable all day.
                      </p>
                      <p className="text-2xl font-normal leading-relaxed text-gray-600">
                          <span className="inline-block mr-1 text-gray-800 text-medium">
                              Perfect Fit:
                          </span>
                          Designed with a classic fit and a slight stretch for
                          flexibility, these trousers hug you in all the right
                          places without being restrictive.
                      </p>
                      <p className="text-2xl font-normal leading-relaxed text-gray-600">
                          <span className="inline-block mr-1 text-gray-800 text-medium">
                              Effortless Style:
                          </span>
                          The light indigo shade is neutral enough to pair with
                          anything in your wardrobe, from a basic tee to a
                          button-down shirt. These pants transition seamlessly
                          from day to night.
                      </p>
                      <p className="text-2xl font-normal leading-relaxed text-gray-600">
                          <span className="inline-block mr-1 text-gray-800 text-medium">
                              Durable Design:
                          </span>
                          Engineered to last, these trousers retain their shape
                          and color even after multiple washes.
                      </p>
                  </div> */}
              </div>
              <div className="pt-[30px] md:pt-[60px] grid justify-center">
                  <Link
                      href="#our-package-section"
                      className="text-base lg:text-lg text-white font-normal flex items-center justify-center gap-[6px] bg-purple-900 border border-purple-900 hover:bg-transparent hover:text-purple-900 transition-all duration-150 rounded-[8px] px-[24px] lg:px-[30px] py-4 lg:py-5"
                  >
                      <IoCartOutline />
                      Shop Now
                  </Link>
              </div>
          </div>
      </div>
  );
}

export default LandingChoose