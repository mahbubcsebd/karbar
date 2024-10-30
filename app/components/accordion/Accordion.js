'use client';

import latestbg from '@/assets/images/latest-bg.svg';
import Image from 'next/image';
import { useState } from 'react';
import useDictionary from '../../hooks/useDictionary';
import useFetchData from '../../hooks/useFetchData';
import getFaq from '../../utils/getFaq';
import SectionTitle from '../SectionTitle';
import AccordionItem from './AccordionItem';

const Accordion = ({bg}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    // const [faqs, setFaqs] = useState([]);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    const { language, dictionary } = useDictionary();

    const {
        data: faqs,
        loading: faqsLoading,
        error: faqsError,
    } = useFetchData(getFaq, [language]);


    if (faqsLoading) return <p>Loading FAQs...</p>;
    if (faqsError) return <p>Error loading FAQs: {faqsError}</p>;
    if (!faqs) return <p>No FAQs found</p>;

    return (
        <div className={`${bg ? '' : 'mb-10'} faqs-section`}>
            <div className={`relative faq-area ${bg ? 'py-16' : ''}`}>
                {bg && (
                    <Image
                        src={latestbg}
                        alt="bg"
                        className="absolute top-0 left-0 z-[-1] w-full h-full object-cover object-center"
                    />
                )}
                <div className="container">
                    <SectionTitle title={dictionary.Faqs.faqTitle} />
                    <div className="w-full max-w-[970px] mx-auto mt-8">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                title={faq.question}
                                isOpen={activeIndex === index}
                                onClick={() => handleClick(index)}
                            >
                                {' '}
                                <div className="w-full h-[1px] bg-gray-200 mt-4 mb-3"></div>
                                <p className="font-normal text-gray-600 text-md">
                                    {faq.answer}
                                </p>
                            </AccordionItem>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
