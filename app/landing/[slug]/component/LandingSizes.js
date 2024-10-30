import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

const LandingSizes = ({ section_four_available_size }) => {
    return (
        <div className="bg-white rounded-lg lg:rounded-[20px] p-[24px] lg:p-10 mt-[30px]">
            <div
                className="grid gap-[18px]"
                dangerouslySetInnerHTML={{
                    __html: section_four_available_size,
                }}
            ></div>
            {/* <h4 className="text-[30px] text-gray-900 font-semibold mb-[18px]">
                Available Sizes:
            </h4>
            <p className="text-2xl font-medium text-gray-600 mb-[30px]">
                Don’t miss out on this limited-time offer. Select your size
                below and get your new favorite pair of trousers now.
            </p>
            <p className="text-2xl font-medium text-gray-600 mb-[30px]">
                Don’t miss out on this limited-time offer. Select your size
                below and get your new favorite pair of trousers now.
            </p> */}
            <div className="pt-[30px] flex justify-start">
                <Link
                    href="#our-package-section"
                    className="text-base lg:text-lg text-white font-normal flex items-center justify-center gap-[6px] bg-purple-900 border border-purple-900 hover:bg-transparent hover:text-purple-900 transition-all duration-150 rounded-[8px] px-[24px] lg:px-[30px] py-4 lg:py-5"
                >
                    <IoCartOutline />
                    Shop Now
                </Link>
            </div>
        </div>
    );
};

export default LandingSizes