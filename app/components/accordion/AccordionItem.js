// AccordionItem.js
import { useRef } from 'react';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
    const contentRef = useRef(null);

    return (
        <div className="p-5 bg-white rounded-[10px] border border-gray-200 mb-3">
            <button
                className="w-full flex justify-between items-center text-left focus:outline-hidden text-[20px] font-normal text-gray-800"
                onClick={onClick}
            >
                <span className="font-semibold">{title}</span>
                <svg
                    className={`w-6 h-6 transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <div
                    ref={contentRef}
                    className="overflow-hidden"
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
