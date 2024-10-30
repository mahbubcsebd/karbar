import Image from 'next/image';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

const LandingShopWithUs = ({landing}) => {
    const {section_five_image, section_five_description} = landing || {}
  return (
      <div className="shop-with-us-section mb-[60px]">
          <div className="shop-with-us-area">
              <div className="container">
                  <div className="grid items-center lg:grid-cols-2 gap-[30px]">
                      {section_five_image && <div className="w-full lg:h-[600px]">
                          <Image
                              src={section_five_image}
                              alt="landing-1"
                              width={600}
                              height={600}
                              className="object-cover object-center w-full h-full"
                          />
                      </div>}
                      <div className=" bg-white rounded-lg lg:rounded-[20px] p-[24px] lg:p-10">
                          {section_five_description && <div
                              className="grid gap-[18px]"
                              dangerouslySetInnerHTML={{
                                  __html: section_five_description,
                              }}
                          ></div>}
                          {/* <h4 className="text-[30px] text-gray-900 font-semibold mb-[18px]">
                              Why Shop With Us?
                          </h4>
                          <ul className="grid gap-[18px]">
                              <li className="flex items-start gap-2 text-2xl font-medium text-gray-600">
                                  <p>
                                      <span className="inline-block w-6 h-6 pt-1">
                                          <Image
                                              src={keyIcon}
                                              alt="key icon"
                                          />
                                      </span>
                                  </p>
                                  Free Shipping on orders over 2000 Taka.
                              </li>
                              <li className="flex items-start gap-2 text-2xl font-medium text-gray-600">
                                  <p>
                                      <span className="inline-block w-6 h-6 pt-1">
                                          <Image
                                              src={keyIcon}
                                              alt="key icon"
                                          />
                                      </span>
                                  </p>
                                  07-Day Money-Back Guarantee: If you are not
                                  satisfied, return hassle-free.
                              </li>
                              <li className="flex items-start gap-2 text-2xl font-medium text-gray-600">
                                  <p>
                                      <span className="inline-block w-6 h-6 pt-1">
                                          <Image
                                              src={keyIcon}
                                              alt="key icon"
                                          />
                                      </span>
                                  </p>
                                  Secure Payments: We accept all major credit
                                  cards and PayPal.
                              </li>
                          </ul> */}
                          <div className="pt-[30px] grid justify-start">
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
              </div>
          </div>
      </div>
  );
}

export default LandingShopWithUs