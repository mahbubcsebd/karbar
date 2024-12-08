/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { getSiteSettings } from "../utils/getSiteSettings";


  export async function generateMetadata() {
      const siteSetting = await getSiteSettings();

      return {
          title: `${siteSetting.data.title} | Privacy and Policy Page`,
          icons: {
              icon: siteSetting.data.fev_icon,
              apple: siteSetting.data.fev_icon,
          },
          openGraph: {
              title: siteSetting.data.title,
              description: siteSetting.data.footer_description,
              url: siteSetting.data.website,
              type: 'website',
              images: [
                  {
                      url: siteSetting.data.header_logo,
                      width: 1200,
                      height: 630,
                      alt: 'Karbar Logo',
                  },
              ],
          },
      };
  }
const PrivacyPolicy = async () => {
    const siteSetting = await getSiteSettings();
    return (
        <div className="privacy-policy-section mt-[100px] lg:mt-[130px]">
            <div className="privacy-policy-area">
                {siteSetting.data.privacy_policy ? (
                    <div className="container">
                        <div
                            className="mb-5"
                            dangerouslySetInnerHTML={{
                                __html: siteSetting.data.privacy_policy,
                            }}
                        ></div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="">
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 mb-4 text-2xl font-semibold text-gray-900 border-b border-gray-400 lg:pb-2 lg:text-3xl">
                                    গোপনীয়তা নীতি
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    আপনার গোপনীয়তাকে সম্মান করে।{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    জানে যে আপনি কীভাবে আপনার সম্পর্কে তথ্য
                                    ব্যবহার এবং ভাগ করা হয় তার যত্ন নেন এবং
                                    আমরা আপনার আস্থার প্রশংসা করি যে আমরা এটি
                                    যত্ন সহকারে এবং সংবেদনশীলভাবে করব।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    আপনাকে গোপনীয়তা নীতিটি সাবধানে পড়ার
                                    পরামর্শ দেওয়া হচ্ছে।{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    দ্বারা প্রদত্ত পরিষেবাগুলি অ্যাক্সেস করার
                                    মাধ্যমে আপনি এই গোপনীয়তা নীতিতে প্রদত্ত
                                    পদ্ধতিতে{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    দ্বারা আপনার ডেটা সংগ্রহ এবং ব্যবহারে সম্মত
                                    হন।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    কি তথ্য আপনার কাছ থেকে সংগ্রহ করা হয়, বা
                                    হতে পারে?
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    আমরা স্বয়ংক্রিয়ভাবে আমাদের ওয়েব সার্ভারের
                                    মাধ্যমে স্ট্যান্ডার্ড ব্যবহারের লগগুলিতে
                                    কিছু বেনামী তথ্য গ্রহণ করব এবং সংগ্রহ করব,
                                    যার মধ্যে আপনার হার্ড ড্রাইভে সংরক্ষিত একটি
                                    আইপি ঠিকানা, আপনার হার্ড ড্রাইভে সংরক্ষিত
                                    একটি ওয়েব সার্ভার কুকি থেকে আপনার ব্রাউজারে
                                    পাঠানো "কুকিজ" থেকে প্রাপ্ত কম্পিউটার
                                    সনাক্তকরণ তথ্য সহ আপনি যে ডোমেইন সার্ভার
                                    ব্যবহার করেন সেই কম্পিউটার যার মাধ্যমে আপনি
                                    আমাদের পরিষেবা অ্যাক্সেস করেন আপনি যে ধরনের
                                    কম্পিউটার ব্যবহার করছেন আপনি যে ধরনের ওয়েব
                                    ব্রাউজার ব্যবহার করছেন।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    আমরা আপনার সম্পর্কে নিম্নলিখিত ব্যক্তিগতভাবে
                                    সনাক্তযোগ্য তথ্য সংগ্রহ করতে পারি -
                                </p>
                                <ul className="grid gap-3 mt-3 ml-8">
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আপনার নাম।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        ইমেইল ঠিকানা (বিকল্প)।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        মোবাইল ফোন নম্বর এবং যোগাযোগের বিবরণ।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        জিপ/পোস্টাল কোড।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আর্থিক তথ্য (যেমন অ্যাকাউন্ট বা ক্রেডিট
                                        কার্ড নম্বর) - আমাদের ওয়েবসাইটের
                                        বৈশিষ্ট্যগুলির মতামত।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আমাদের নিবন্ধন প্রক্রিয়া অনুযায়ী
                                        অন্যান্য তথ্য।
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    আমরা নিম্নলিখিত তথ্য সংগ্রহ করতে পারি
                                </h2>
                                <ul className="grid gap-3 mt-3 mb-5 ml-4 md:ml-8">
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আপনার পরিদর্শন/অ্যাক্সেস করা পৃষ্ঠাগুলি
                                        সম্পর্কে।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আপনি আমাদের সাইটে ক্লিক করুন লিঙ্ক।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আপনি পৃষ্ঠাটি অ্যাক্সেস করার সংখ্যা।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আপনি আমাদের ওয়েব সাইটে কতবার কেনাকাটা
                                        করেছেন।
                                    </li>
                                </ul>
                                <p className="text-base font-normal text-gray-600">
                                    আপনি যেকোনো সময় আপনার অ্যাকাউন্ট বন্ধ করতে
                                    পারেন। যাইহোক, আপনার তথ্য মুছে ফেলা বা আপনার
                                    অ্যাকাউন্ট বন্ধ করার পরেও আমাদের সার্ভারে
                                    সংরক্ষণাগারে সংরক্ষণ করা যেতে পারে।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    কে তথ্য সংগ্রহ করে?
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    আপনি যখন আমাদের সাইটে যান তখন আমরা আপনার কাছ
                                    থেকে বেনামী ট্র্যাফিক তথ্য সংগ্রহ করব। আমরা
                                    শুধুমাত্র একটি স্বেচ্ছাসেবী নিবন্ধন
                                    প্রক্রিয়া, অন-লাইন সমীক্ষা, বা প্রতিযোগীতার
                                    অংশ হিসাবে আপনার সম্পর্কে ব্যক্তিগতভাবে
                                    শনাক্তযোগ্য তথ্য সংগ্রহ করব। আমাদের
                                    বিজ্ঞাপনদাতারা আপনার ব্রাউজারে তাদের নিজস্ব
                                    নির্ধারিত কুকি থেকে বেনামী ট্র্যাফিক তথ্য
                                    সংগ্রহ করতে পারে। সাইটটিতে অন্যান্য ওয়েব
                                    সাইটের লিঙ্ক রয়েছে। আমরা এই ধরনের ওয়েব
                                    সাইটগুলির গোপনীয়তা অনুশীলনের জন্য দায়ী নই
                                    যা আমরা মালিকানা, পরিচালনা বা নিয়ন্ত্রণ করি
                                    না।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    তথ্যের ব্যবহার
                                </h2>
                                <div className="mb-10">
                                    <p className="text-base font-normal text-gray-600">
                                        আমরা আপনার ব্যক্তিগত তথ্য ব্যবহার করি:
                                    </p>
                                    <ul className="grid gap-3 mt-3 mb-5 ml-4 md:ml-8">
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আপনার আগ্রহগুলি জেনে এবং আমাদের
                                            সাইটটিকে সেই অনুসারে তৈরি করে আমাদের
                                            বন্ধনকে আরও শক্তিশালী করুন৷
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            প্রয়োজনে আপনার সাথে যোগাযোগ করার
                                            জন্য
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আপনার দ্বারা অনুরোধ করা পরিষেবা
                                            প্রদান করতে
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            বিদ্যমান আইন বা নীতি দ্বারা পরিচালিত
                                            সামাজিক ইতিহাস সংরক্ষণ করা
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-10">
                                    <p className="text-base font-normal text-gray-600">
                                        আমরা অভ্যন্তরীণভাবে যোগাযোগের তথ্য
                                        ব্যবহার করি:
                                    </p>
                                    <ul className="grid gap-3 mt-3 mb-5 ml-4 md:ml-8">
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            পণ্যের উন্নতির জন্য আমাদের
                                            প্রচেষ্টাকে নির্দেশ করুন
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            একজন জরিপ উত্তরদাতা হিসাবে আপনার
                                            সাথে যোগাযোগ করুন
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আপনি কোন প্রতিযোগিতায় জিতলে আপনাকে
                                            অবহিত করুন এবং আমাদের প্রতিযোগিতার
                                            স্পনসর বা বিজ্ঞাপনদাতাদের কাছ থেকে
                                            আপনাকে প্রচারমূলক উপকরণ পাঠান
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-10">
                                    <p className="text-base font-normal text-gray-600">
                                        সাধারণত, আমরা বেনামী ট্রাফিক তথ্য
                                        ব্যবহার করি:
                                    </p>
                                    <ul className="grid gap-3 mt-3 mb-5 ml-4 md:ml-8">
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            বিজ্ঞাপন এবং সম্পাদকীয় উভয়
                                            দৃষ্টিকোণ থেকে আপনাকে আরও ভাল এবং
                                            আরও ব্যক্তিগতকৃত পরিষেবা সরবরাহ করতে
                                            আপনি কে তা আমাদের মনে করিয়ে দিন
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আমাদের ওয়েবসাইটগুলিতে আপনার
                                            অ্যাক্সেসের বিশেষাধিকারগুলি চিনুন
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আমাদের কিছু প্রচার, সুইপস্টেক এবং
                                            প্রতিযোগিতায় আপনার এন্ট্রিগুলি
                                            ট্র্যাক করুন প্রচারের মাধ্যমে একজন
                                            খেলোয়াড়ের অগ্রগতি নির্দেশ করতে এবং
                                            পুরস্কার অঙ্কনে এন্ট্রি, জমা এবং
                                            স্থিতি ট্র্যাক করতে
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            নিশ্চিত করুন যে আপনি একই বিজ্ঞাপন
                                            বারবার দেখতে পাচ্ছেন না
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আমাদের সার্ভারের সমস্যা নির্ণয় করতে
                                            সাহায্য করুন
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আমাদের ওয়েবসাইটগুলি পরিচালনা করুন,
                                            আপনার সেশন ট্র্যাক করুন যাতে লোকেরা
                                            আমাদের সাইটগুলি কীভাবে ব্যবহার করে
                                            তা আমরা আরও ভালভাবে বুঝতে পারি
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-6 lg:mb-8 single-area">
                                    <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                        তৃতীয় পক্ষের সাথে তথ্য শেয়ার করা
                                    </h2>
                                    <p className="text-base font-normal text-gray-600">
                                        আমরা আপনার সাথে একটি লেনদেন সম্পূর্ণ করা
                                        ছাড়া অন্য কোনো উদ্দেশ্যে আপনার আর্থিক
                                        তথ্য ব্যবহার করব না। আমরা আপনার
                                        ব্যক্তিগত তথ্য ভাড়া, বিক্রি বা শেয়ার
                                        করি না এবং আমরা তৃতীয় পক্ষের কাছে আপনার
                                        ব্যক্তিগতভাবে সনাক্তযোগ্য তথ্য প্রকাশ
                                        করব না যদি না:
                                    </p>
                                    <ul className="grid gap-3 mt-3 mb-5 ml-4 md:ml-8">
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আমাদের আপনার অনুমতি আছে
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আপনার অনুরোধ করা পণ্য বা পরিষেবা
                                            প্রদান করতে
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            <div>
                                                বেআইনি ও বেআইনি কার্যকলাপ,
                                                সন্দেহভাজন জালিয়াতি, কোনো
                                                ব্যক্তির নিরাপত্তা বা নিরাপত্তার
                                                জন্য সম্ভাব্য হুমকি,{' '}
                                                <Link
                                                    href="/"
                                                    className="inline-block font-semibold"
                                                >
                                                    karbar.shop
                                                </Link>{' '}
                                                -এর ব্যবহারের শর্তাবলী লঙ্ঘন বা
                                                আইনি দাবির বিরুদ্ধে রক্ষা করার
                                                বিষয়ে তদন্ত, প্রতিরোধ বা
                                                ব্যবস্থা নিতে সাহায্য করতে
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            বিশেষ পরিস্থিতিতে যেমন সাবপোনা মেনে
                                            চলা, আদালতের আদেশ, অনুরোধ/আদেশ, আইনী
                                            কর্তৃপক্ষ বা আইন প্রয়োগকারী সংস্থার
                                            নোটিশ যা এই ধরনের প্রকাশের প্রয়োজন।
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                            <p>
                                                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                            </p>
                                            আমরা শুধুমাত্র সামগ্রিক ভিত্তিতে
                                            বিজ্ঞাপনদাতাদের সাথে আপনার তথ্য
                                            শেয়ার করি।
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-6 lg:mb-8 single-area">
                                    <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                        তথ্য সংগ্রহ এবং পুনরায় বিতরণ সংক্রান্ত
                                        উপলব্ধ পছন্দ
                                    </h2>
                                    <p className="text-base font-normal text-gray-600">
                                        আপনি যেকোনো সময় আপনার আগ্রহ পরিবর্তন
                                        করতে পারেন এবং যেকোনো
                                        মার্কেটিং/প্রমোশনাল/নিউজলেটার মেলিং থেকে
                                        অপ্ট-ইন বা অপ্ট-আউট করতে পারেন।{' '}
                                        <Link
                                            href="/"
                                            className="inline-block font-semibold"
                                        >
                                            karbar.shop
                                        </Link>{' '}
                                        আপনাকে অপ্ট-আউট করার সুবিধা প্রদান না
                                        করে আপনার{' '}
                                        <Link
                                            href="/"
                                            className="inline-block font-semibold"
                                        >
                                            karbar.shop
                                        </Link>{' '}
                                        অ্যাকাউন্টের একটি অংশ হিসাবে বিবেচিত
                                        কিছু পরিষেবা সম্পর্কিত যোগাযোগ পাঠানোর
                                        অধিকার সংরক্ষণ করে৷ আপনি যেকোনো সময়
                                        আপনার তথ্য আপডেট করতে এবং আপনার
                                        অ্যাকাউন্ট সেটিংস পরিবর্তন করতে পারেন।
                                    </p>
                                    <br />
                                    <p className="text-base font-normal text-gray-600">
                                        অনুরোধের ভিত্তিতে, আমরা আমাদের ডাটাবেস
                                        থেকে আপনার ব্যক্তিগতভাবে শনাক্তযোগ্য
                                        তথ্য মুছে ফেলব/ব্লক করব, যার ফলে আপনার
                                        নিবন্ধন বাতিল হবে। যাইহোক, আপনার তথ্য
                                        মুছে ফেলা বা আপনার অ্যাকাউন্ট বন্ধ করার
                                        পরেও আমাদের সার্ভারে সংরক্ষণাগারে
                                        সংরক্ষণ করা যেতে পারে।
                                    </p>
                                    <br />
                                    <p className="text-base font-normal text-gray-600">
                                        আমরা যদি কোনো বাণিজ্যিক উদ্দেশ্যে আপনার
                                        ব্যক্তিগতভাবে শনাক্তযোগ্য তথ্য ব্যবহার
                                        করার পরিকল্পনা করি, আমরা সেই তথ্য সংগ্রহ
                                        করার সময় আপনাকে অবহিত করব এবং সেই
                                        উদ্দেশ্যে আপনার তথ্য ব্যবহার করা থেকে
                                        অপ্ট-আউট করার অনুমতি দেব।
                                    </p>
                                </div>
                                <div className="mb-6 lg:mb-8 single-area">
                                    <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                        তথ্য সুরক্ষিত করার জন্য নিরাপত্তা পদ্ধতি
                                    </h2>
                                    <p className="text-base font-normal text-gray-600">
                                        আমাদের নিয়ন্ত্রণে থাকা তথ্যের ক্ষতি,
                                        অপব্যবহার এবং পরিবর্তনের বিরুদ্ধে
                                        সুরক্ষার জন্য, আমরা যথাযথ শারীরিক,
                                        বৈদ্যুতিন এবং ব্যবস্থাপক পদ্ধতির
                                        ব্যবস্থা করেছি। উদাহরণ স্বরূপ, আমাদের
                                        সার্ভারগুলি শুধুমাত্র অনুমোদিত কর্মীদের
                                        কাছেই অ্যাক্সেসযোগ্য এবং লেনদেন সম্পূর্ণ
                                        করার জন্য এবং আপনার অনুরোধ করা
                                        পরিষেবাগুলি প্রদান করার জন্য আপনার তথ্য
                                        সংশ্লিষ্ট কর্মীদের সাথে শেয়ার করা
                                        হয়েছে।
                                    </p>
                                    <br />
                                    <p className="text-base font-normal text-gray-600">
                                        যদিও আমরা আপনার ব্যক্তিগতভাবে
                                        শনাক্তযোগ্য তথ্যের গোপনীয়তা রক্ষা করার
                                        চেষ্টা করব, ইন্টারনেটের মাধ্যমে করা
                                        ট্রান্সমিশনগুলিকে একেবারে নিরাপদ করা
                                        যায় না। এই সাইটটি ব্যবহার করে, আপনি
                                        সম্মত হন যে সংক্রমণে ত্রুটি বা তৃতীয়
                                        পক্ষের অননুমোদিত কাজের কারণে আপনার তথ্য
                                        প্রকাশের জন্য আমাদের কোন দায় থাকবে না।
                                    </p>
                                    <br />
                                    <p className="text-base font-normal text-gray-600">
                                        আমরা যদি কোনো বাণিজ্যিক উদ্দেশ্যে আপনার
                                        ব্যক্তিগতভাবে শনাক্তযোগ্য তথ্য ব্যবহার
                                        করার পরিকল্পনা করি, আমরা সেই তথ্য সংগ্রহ
                                        করার সময় আপনাকে অবহিত করব এবং সেই
                                        উদ্দেশ্যে আপনার তথ্য ব্যবহার করা থেকে
                                        অপ্ট-আউট করার অনুমতি দেব।
                                    </p>
                                </div>
                                <div className="mb-6 lg:mb-8 single-area">
                                    <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                        তোমার অধিকারগুলো
                                    </h2>
                                    <p className="text-base font-normal text-gray-600">
                                        আপনি যদি আপনার ডেটা সম্পর্কে উদ্বিগ্ন হন
                                        তবে আপনার কাছে ব্যক্তিগত ডেটা
                                        অ্যাক্সেসের অনুরোধ করার অধিকার রয়েছে যা
                                        আমরা ধরে রাখতে পারি বা আপনার সম্পর্কে
                                        প্রক্রিয়া করতে পারি। বিনা মূল্যে আপনার
                                        ডেটাতে কোনো ভুলত্রুটি সংশোধন করার জন্য
                                        আমাদের প্রয়োজন করার অধিকার আপনার আছে।
                                        যে কোনো পর্যায়ে, আপনার কাছে সরাসরি
                                        বিপণনের উদ্দেশ্যে আপনার ব্যক্তিগত ডেটা
                                        ব্যবহার বন্ধ করার জন্য আমাদের বলার
                                        অধিকার রয়েছে।
                                    </p>
                                    <br />
                                    <p className="text-base font-normal text-gray-600">
                                        আপনি যদি কোনো পর্যায়ে কারবার থেকে,
                                        সমস্ত প্ল্যাটফর্ম জুড়ে আপনার ব্যক্তিগত
                                        ডেটা মুছে ফেলতে চান, তাহলে তা করার
                                        সম্পূর্ণ অধিকার আপনার আছে। অনুগ্রহ করে
                                        info@karbar.shop-এ একটি ইমেল পাঠান, আমরা
                                        পরবর্তী ব্যবসায়িক দিনের মধ্যে আপনার
                                        অনুরোধ প্রক্রিয়া করব এবং আপডেট সম্পর্কে
                                        আপনাকে অবহিত করব।
                                    </p>
                                </div>
                                <div className="mb-6 lg:mb-8 single-area">
                                    <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                        নীতি সংক্রান্ত আপডেট
                                    </h2>
                                    <p className="text-base font-normal text-gray-600">
                                        আমরা আমাদের সাইটে একটি বিশিষ্ট নোটিশ
                                        স্থাপন করে যে কোনো সময় এই নীতি পরিবর্তন
                                        বা আপডেট করার অধিকার সংরক্ষণ করি। এই
                                        ধরনের পরিবর্তনগুলি এই সাইটে পোস্ট করার
                                        সাথে সাথে কার্যকর হবে৷
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrivacyPolicy;
