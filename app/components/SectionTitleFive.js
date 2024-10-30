import React from 'react';

const SectionTitleFive = ({ preTitle, postTitle, position }) => {
    return (
        <div
            className={`flex md:mb-[60px] mb-6 ${
                position === 'start' ? '' : 'justify-center'
            }`}
        >
            <h2 className="text-2xl font-semibold text-gray-800 capitalize md:text-4xl">
                {preTitle} <span className="text-[#F3832D]"> {postTitle}</span>
            </h2>
        </div>
    );
};

export default SectionTitleFive;
