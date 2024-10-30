import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

const LandingSave = ({section_three_offer_order}) => {
  return (
      <div className="grid justify-center mt-10">
          <div className="grid justify-center text-center mx-auto  max-w-[600px]">
              <div
                  className=""
                  dangerouslySetInnerHTML={{
                      __html: section_three_offer_order,
                  }}
              ></div>
              {/* <h4 className="text-[30px] text-gray-900 font-semibold mb-[18px]">
                  Order Today and Save!
              </h4>
              <p className="text-2xl font-medium text-gray-600 mb-[30px]">
                  Don’t miss out on this limited-time offer. Select your size
                  below and get your new favorite pair of trousers now.
              </p> */}
              <div className="pt-[30px] grid justify-center">
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

export default LandingSave