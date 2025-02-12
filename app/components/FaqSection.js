'use client';

import latestbg from '@/assets/images/latest-bg.svg';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useDictionary from '../hooks/useDictionary';
import useFetchData from '../hooks/useFetchData';
import getFaq from '../utils/getFaq';
import SectionTitle from './SectionTitle';

// Dynamically import Accordion components
const AccordionRoot = dynamic(() => import('@/components/ui/accordion').then(mod => mod.AccordionRoot));
const AccordionItem = dynamic(() => import('@/components/ui/accordion').then(mod => mod.AccordionItem));
const AccordionTrigger = dynamic(() => import('@/components/ui/accordion').then(mod => mod.AccordionTrigger));
const AccordionContent = dynamic(() => import('@/components/ui/accordion').then(mod => mod.AccordionContent));

const ErrorFallback = ({ error }) => (
    <div className="container py-8">
        <p>Error loading FAQs: {error.message}</p>
    </div>
);

const FaqSection = ({ bg }) => {
    const { language, dictionary } = useDictionary();
    const [activeIndex, setActiveIndex] = useState(null);

    const {
        data: faqs,
        loading: faqsLoading,
        error: faqsError,
    } = useFetchData(getFaq, [language]);

    const handleValueChange = (value) => {
        setActiveIndex(prev => value === prev ? null : value);
    };

    // Memoize split FAQs
    const { leftColumnFaqs, rightColumnFaqs } = useMemo(() => {
        if (!faqs) return { leftColumnFaqs: [], rightColumnFaqs: [] };

        const midPoint = Math.ceil(faqs.length / 2);
        return {
            leftColumnFaqs: faqs.slice(0, midPoint),
            rightColumnFaqs: faqs.slice(midPoint)
        };
    }, [faqs]);

    if (faqsLoading) {
        return (
            <div className="container py-16">
                <SectionTitle title={dictionary?.Faqs?.faqTitle || "FAQs"} />
                <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-200 animate-pulse rounded-[10px]"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (faqsError) return <p>Error loading FAQs: {faqsError}</p>;
    if (!faqs || faqs.length === 0) return <p>No FAQs found</p>;

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className={`${bg ? '' : 'mb-10'} faqs-section pt-5`}>
                <div className={`relative faq-area ${bg ? 'py-16' : ''}`}>
                    {bg && (
                        <Image
                            src={latestbg}
                            alt="bg"
                            className="absolute top-0 left-0 z-[-1] w-full h-full object-cover object-center"
                            priority={true}
                            sizes="100vw"
                        />
                    )}
                    <div className="container">
                        <SectionTitle title={dictionary.Faqs.faqTitle} />
                        <div className="w-full max-w-[1170px] mx-auto mt-8">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {/* Left Column */}
                                <div className="space-y-3">
                                    <AccordionRoot
                                        type="single"
                                        collapsible
                                        value={activeIndex}
                                        onValueChange={handleValueChange}
                                        className="space-y-3"
                                    >
                                        {leftColumnFaqs.map((faq, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={index.toString()}
                                                className="bg-white rounded-[10px] border border-gray-200 px-5 py-5"
                                            >
                                                <AccordionTrigger className="flex items-center justify-between py-1 text-left hover:no-underline">
                                                    <span className="text-lg font-semibold leading-snug text-gray-800">
                                                        {faq.question}
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="w-full h-[1px] bg-gray-200 mt-4 mb-3" />
                                                    <p className="text-base font-normal text-gray-600">
                                                        {faq.answer}
                                                    </p>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </AccordionRoot>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-3">
                                    <AccordionRoot
                                        type="single"
                                        collapsible
                                        value={activeIndex}
                                        onValueChange={handleValueChange}
                                        className="space-y-3"
                                    >
                                        {rightColumnFaqs.map((faq, index) => (
                                            <AccordionItem
                                                key={index + leftColumnFaqs.length}
                                                value={(index + leftColumnFaqs.length).toString()}
                                                className="bg-white rounded-[10px] border border-gray-200 px-5 py-5"
                                            >
                                                <AccordionTrigger className="flex items-center justify-between py-1 text-left hover:no-underline">
                                                    <span className="text-lg font-semibold leading-snug text-gray-800">
                                                        {faq.question}
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="w-full h-[1px] bg-gray-200 mt-4 mb-3" />
                                                    <p className="text-base font-normal text-gray-600">
                                                        {faq.answer}
                                                    </p>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </AccordionRoot>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default FaqSection;