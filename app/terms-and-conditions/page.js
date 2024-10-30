/* eslint-disable react/no-unescaped-entities */

import Link from 'next/link';
import { getSiteSettings } from '../utils/getSiteSettings';

  export async function generateMetadata() {
      const siteSetting = await getSiteSettings();

      return {
          title: `${siteSetting.data.title} | Terms and conditions Page`,
          icons: {
              icon: siteSetting.data.fev_icon,
              apple: siteSetting.data.fev_icon,
          },
      };
  }

const TermsAndConditions = async () => {
    const siteSetting = await getSiteSettings();
    return (
        <div className="terms-and-condtions-section  mt-[100px] lg:mt-[130px]">
            <div className="terms-and-condtions-area">
                {siteSetting.data.terms_conditions ? (
                    <div className="container">
                        <div
                            className="mb-5"
                            dangerouslySetInnerHTML={{
                                __html: siteSetting.data.terms_conditions,
                            }}
                        ></div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="mt-10">
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 mb-4 text-2xl font-semibold text-gray-900 border-b border-gray-400 lg:pb-2 lg:text-3xl">
                                    নিয়ম ও শর্তাদি
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>
                                    -এ (
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>
                                    ) স্বাগতাম! আমরা এখানে "
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>
                                    " নামেও পরিচিত। এই ওয়েবসাইট ব্যবহার করার
                                    আগে, নিচের নিয়মাবলী সাবধানে পড়ুন। এই
                                    সাইটটি ব্যবহার করার মাধ্যমে, আপনি এই
                                    নিয়মাবলীকে স্বীকার করছেন এবং এই শর্তাবলী
                                    মেনে চলতে সম্মত হচ্ছেন (যাকে বলা হয়
                                    "ব্যবহারকারী চুক্তি" । সাইটটি ব্যবহার করার
                                    মধ্য দিয়ে আপনি এই চুক্তিটি মেনে চলতে রাজি
                                    হয়েছেন বলে বিবেচিত হবে। যদি আপনি এই
                                    ব্যবহারকারী চুক্তি দ্বারা আবদ্ধ হতে না চান,
                                    তাহলে এই সাইটটি অ্যাক্সেস করবেন না, নিবন্ধন
                                    করবেন না বা ব্যবহার করবেন না। এই সাইটটি{' '}
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    এর মালিকানাধীন এবং পরিচালিত। (নিবন্ধন নম্বর:
                                    TRAD/DSCC/024788/2023)
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    ভূমিকা
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    এই ওয়েবসাইটটি যে কোনো সময় আগে থেকে জানিয়ে
                                    এই নিয়মাবলীরযেকোনো অংশ পরিবর্তন, সংশোধন,
                                    যুক্ত বা অপসারণ করার অধিকার রাখে।
                                    পরিবর্তনগুলি সাইটে পোস্ট করা হলেই কার্যকর
                                    হবে। দয়া করে আপডেটের জন্য নিয়মিত এই
                                    নিয়মাবলী পরীক্ষা করুন। নিবন্ধন এবং শর্তাবলী
                                    পরিবर्तনের পরে সাইটটির অবিরাম ব্যবহার মানে
                                    হলো আপনি সেই পরিবর্তনগুলি মেনে নিয়েছেন।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    সেবা
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    এই ওয়েবসাইটের মাধ্যমে অনেক রকমের পণ্য
                                    বিক্রয় সেবা দেয়। এই সব সেবাকে মিলে
                                    "পরিষেবা" বলা হয়। ওয়েবসাইটে দেওয়া বিভিন্ন
                                    পেমেন্ট পদ্ধতির মধ্যে যে কোনোটা দিয়ে পণ্য
                                    কেনা যায়। অর্ডার করার পর,{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    আপনাকে পণ্যটি পাঠিয়ে দেবে এবং আপনি তার
                                    মূল্যায়ন মেটানোর দায়ী হবেন।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    গোপনীয়তা
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    ব্যবহারকারী এ দ্বারা সম্মতি জানান, স্বীকার
                                    করেন এবং একমত হন যে, তিনি{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    গোপনীয়তা নীতি পড়েছেন এবং পুরোপুরি বুঝতে
                                    পেরেছেন। এছাড়াও, ব্যবহারকারী এই গোপনীয়তা
                                    নীতির শর্তাবলী ও বিষয়বস্তু তার কাছে
                                    গ্রহণযোগ্য বলে সম্মতি জানান।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    বিশেষ ছাড়
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    <span className="font-semibold">
                                        কারবার
                                    </span>{' '}
                                    -এ একসাথে একটা ছাড় এর সুবিধাই পাওয়া যাবে।
                                    আপনি ফ্রি ডেলিভারি, কুপন ছাড় বা পেমেন্ট
                                    গেটওয়ে ছাড় এর মধ্যে যে কোনো একটা ব্যবহার
                                    করতে পারবেন।
                                </p>
                                <ul className="grid gap-3 mt-3 ml-8">
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        কার্টে যদি কোনো ফ্রি ডেলিভারি পণ্য থাকে:
                                        তাহলে কুপন ছাড় শুধুমাত্র সেই
                                        পণ্যগুলোতেই পাওয়া যাবে যারা ফ্রী
                                        ডেলিভারির অন্তর্ভুক্ত নয়।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আপনি যদি কোনো ছাড় দেওয়া পেমেন্ট
                                        গেটওয়ে দিয়ে পেমেন্ট করেন, তাহলে কুপন
                                        ছাড় পাওয়া যাবে না।
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    পণ্যের বর্ণনা
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    যথাসম্ভব নির্ভুল হওয়ার চেষ্টা করে। যাইহোক,
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    ওয়্যারেন্টি দেয় না যে পণ্যের বিবরণ বা
                                    সাইটের অন্যান্য বিষয়বস্তু সঠিক, সম্পূর্ণ,
                                    নির্ভরযোগ্য, বর্তমান বা ত্রুটি-মুক্ত।
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    দ্বারা অফার করা একটি পণ্য যদি বর্ণনা
                                    অনুযায়ী না হয়, তাহলে আপনার একমাত্র
                                    প্রতিকার হল অব্যবহৃত অবস্থায় ফেরত দেওয়া।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    রিটার্ন বা পরিবর্তন নীতি
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    এটি{' '}
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    -এর জন্য একটি বিরল ঘটনা যেখানে গ্রাহকরা
                                    তাদের পণ্যগুলিকে পরিবর্তন করেনি। কিন্তু কখনো
                                    কখনো আমরা আপনার প্রত্যাশা পূরণ করতে ব্যর্থ
                                    হতে পারি, কখনো কখনো পরিস্থিতি আমাদের পাশে
                                    থাকে না। কিন্তু এখন গ্রাহকদের এবং{' '}
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    - এর মধ্যে একটি আস্থার বন্ধন রয়েছে, তাই,
                                    বিশ্বাসের এই বন্ধনটিকে আরও নিশ্চিত করতে এবং
                                    উত্সাহিত করার জন্য{' '}
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    আপনার কাছে পাওয়া পণ্যগুলি ফেরত দেওয়ার
                                    বিকল্প নিয়ে আসে।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    অর্ডার কনফার্ম করার পূর্বে অবশ্যই একবার দেখে
                                    নেয়া উত্তম নিম্নে উল্লেখিত নিয়মাবলি ও
                                    ডেলিভারি সমপর্কিত কিছু তথ্য; এতে আপনার ও
                                    আমাদের মধ্যে স্বচ্ছতা বজায় থাকবে, অন্যথায়{' '}
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    কর্তৃপক্ষ কোনোভাবে দায়গ্রস্ত হবে না।
                                </p>
                                <ul className="grid gap-3 mt-3 mb-6 ml-8">
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        যেকোনো প্রডাক্ট অর্ডার করার পর ডেলিভারি
                                        ম্যান যখন আপনার ঠিকানায় যাবে, আপনি তখন
                                        প্রডাক্ট চ্যাক করবেন এবং আমাদের লেখনী তে
                                        বা ভিডিও তে পণ্যটি সমপর্কে যা যা আমরা
                                        বলেছি, ঠিক সেইরকম না পান, তাহলেই আপনি
                                        পোশাক টি রিটার্ন দিতে পারেন, একারণে
                                        ডেলিভারি চার্জ দিতে হবে না।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        ডেলিভারি ম্যান চলে যাবার পর যদি
                                        প্রোডাক্টের মধ্যে আমাদের পক্ষ থেকে কোনো
                                        ভুল পান যেমন- ছিঁড়া, ছিদ্র, ইত্যাদি
                                        আমাদের কোনো ভুল থাকে,তাহলে শুধুমাত্র এই
                                        কারণে ৩ দিনের ভেতর আপনি জিনিস টি আমাদের
                                        কাছে ফেরত পাঠাতে পারবেন,ডেলিভারি চার্জ
                                        দিতে হবে না এবং আমরা এর বদলে একটি নতুন
                                        প্রডাক্ট যখন পাঠাবো, ডেলিভারি ম্যান
                                        যাবার পর নতুনটি রেখে আপনি আগের টি ফেরত
                                        দিয়ে দিবেন, ৩ দিনের ভেতর হতে হবে।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আপনি প্রডাক্ট সমপর্কে যা যা তথ্য দিবেন,
                                        যেমন-সাইজ,লং,ঘের, ইত্যাদি আপনি যেমন বলে
                                        দেবেন,ঠিক সেটাই পাঠানো হবে। ডেলিভারি
                                        ম্যান আপনার ঠিকানায় যাবার পর যদি বলেন যে
                                        'এখন নিতে পারবো না, আমার অসুবিধা আছে তাই
                                        নেবো না', অথবা প্রোডাক্টের রঙ, সাইজ,
                                        উচ্চতা বা অন্যকিছু প্রথমে ভুল টা জানিয়ে
                                        ফেলেছিলাম, তাই এখন আর নিতে পারবো না',
                                        ইত্যাদি আপনার নিজের ভুলের দায় কিন্তু
                                        আমাদের হবেনা, সেজন্য আপনাকে শুধু
                                        ডেলিভারি চার্জ টা দিয়ে পণ্য রিটার্ন করতে
                                        হবে।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        রিটার্ন পলিসির ক্ষেত্রে এমন যদি হয় যে
                                        প্রোডাক্টের সবকিছু শতভাগ ঠিক আছে, যেটা
                                        চেয়েছিলেন, সেটা পেয়েছেন, আপনার কোনো
                                        অভিযোগ নেই কিন্তু গায়ে দেয়ার পর দেখলেন
                                        যে টাইট হয়েগেছে বা আমাদের বললেন যে সেলাই
                                        ভালো হয়নি, কাপড় ভালো না বা এমন কোনো
                                        অভিযোগ যদি দেন তাহলে আমরা ৫-৭দিনের ভেতর
                                        একজন ডেলিভারি ম্যান পাঠাবো, আপনি উনার
                                        কাছে পণ্য টি দিয়ে দেবেন, আমরা এটা দেখবো
                                        যে আপনার অভিযোগকৃত সমস্যা টা আছে কি না?
                                        যদি সমস্যা থাকে তাহলে আমরা আপনার বিকাশ
                                        বা নগদে দাম টি পাঠিয়ে দেবো।
                                    </li>
                                </ul>
                                <p className="text-base font-normal text-gray-600">
                                    অর্ডার কনফার্ম করার পূর্বে অবশ্যই একবার দেখে
                                    নেয়া উত্তম নিম্নে উল্লেখিত নিয়মাবলি ও
                                    ডেলিভারি সমপর্কিত কিছু তথ্য; এতে আপনার ও
                                    আমাদের মধ্যে স্বচ্ছতা বজায় থাকবে, অন্যথায়{' '}
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    কর্তৃপক্ষ কোনোভাবে দায়গ্রস্ত হবে না।
                                </p>
                                <ul className="grid gap-3 mt-3 mb-6 ml-8">
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        এটি প্রসবের তারিখ থেকে 03 দিনের মধ্যে।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        ফেরত দেওয়া বা বিনিময় করা সমস্ত আইটেম
                                        অবশ্যই অব্যবহৃত হতে হবে এবং তাদের আসল
                                        অবস্থায় সমস্ত আসল ট্যাগ এবং প্যাকেজিং
                                        অক্ষত থাকতে হবে এবং ভাঙা বা টেম্পার করা
                                        উচিত নয়।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        যদি আইটেমটি একটি বিনামূল্যের প্রচারমূলক
                                        আইটেম নিয়ে আসে, তাহলে বিনামূল্যের
                                        আইটেমটিও ফেরত দিতে হবে।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        পণ্যের জন্য অর্থ ফেরত/প্রতিস্থাপন কারবার
                                        টিম দ্বারা পরিদর্শন এবং চেক সাপেক্ষে।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        প্রতিস্থাপন সরবরাহকারীর কাছে স্টকের
                                        প্রাপ্যতা সাপেক্ষে। যদি পণ্যটি স্টকের
                                        বাইরে থাকে তবে আপনি সম্পূর্ণ অর্থ ফেরত
                                        পাবেন, কোন প্রশ্ন জিজ্ঞাসা করা হয়নি।
                                    </li>
                                </ul>
                                <p className="text-base font-normal text-gray-600">
                                    অনুগ্রহ করে মনে রাখবেন যে ক্যাশ অন ডেলিভারি
                                    সুবিধার চার্জ এবং শিপিং চার্জ আপনার অর্ডারের
                                    ফেরত মূল্যে অন্তর্ভুক্ত করা হবে না কারণ
                                    এইগুলি অ-ফেরতযোগ্য চার্জ।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    রিটার্ন এবং পরিবর্তন জন্য কারণ
                                </h2>
                                <ul className="grid gap-3 mt-3 ml-8">
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        পণ্য ক্ষতিগ্রস্থ, ত্রুটিপূর্ণ বা বর্ণিত
                                        হিসাবে না.
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        পোশাকের জন্য মাপ অমিল।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        পোশাকের রঙের অমিল।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        ভুল পণ্য পাঠানো হয়েছে।
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    কিভাবে ফেরত করবেন
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    আপনার অর্ডার পাওয়ার পর 03 দিনের মধ্যে{' '}
                                    <span className="inline-block font-semibold">
                                        info@karbar.shop
                                    </span>{' '}
                                    এ ইমেল করে{' '}
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    কাস্টমার কেয়ার টিমের সাথে যোগাযোগ করুন।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    একবার আমরা আপনার রিটার্ন গ্রহণ করি, আমরা
                                    আমাদের শেষে পণ্যটির গুণমান পরীক্ষা করব এবং
                                    যদি ফেরত দেওয়ার কারণটি বৈধ হয়, আমরা
                                    পণ্যটিকে একটি নতুন দিয়ে প্রতিস্থাপন করব বা
                                    আমরা ফেরত নিয়ে এগিয়ে যাব।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    ফেরত দেওয়া নীতি
                                </h2>
                                <ul className="grid gap-3 mt-3 ml-8">
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আমরা আপনার রিটার্ন মূল্যায়ন সম্পূর্ণ
                                        করার পরে ফেরত প্রক্রিয়া করা হবে।
                                        প্রতিস্থাপন সরবরাহকারীর কাছে স্টকের
                                        প্রাপ্যতা সাপেক্ষে। যদি পণ্যটি স্টকের
                                        বাইরে থাকে তবে আপনি সম্পূর্ণ অর্থ ফেরত
                                        পাবেন, কোন প্রশ্ন জিজ্ঞাসা করা হয়নি।
                                        অনুগ্রহ করে মনে রাখবেন যে ক্যাশ অন
                                        ডেলিভারি সুবিধার চার্জ এবং শিপিং চার্জ
                                        আপনার অর্ডারের ফেরত মূল্যে অন্তর্ভুক্ত
                                        করা হবে না কারণ এইগুলি অ-ফেরতযোগ্য
                                        চার্জ।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আপনি যদি ক্যাশ অন ডেলিভারি (সিওডি)
                                        নির্বাচন করে থাকেন, তাহলে ফেরত দিতে হবে
                                        না কারণ আপনি আপনার অর্ডারের জন্য
                                        অর্থপ্রদান করেননি।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        ক্রেডিট কার্ড, ডেবিট কার্ড, মোবাইল
                                        ব্যাঙ্কিং বা ব্যাঙ্ক ট্রান্সফার ব্যবহার
                                        করে করা অর্থপ্রদানের জন্য, আপনি আপনার
                                        নিজ নিজ অর্থ ফেরত পাবেন।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        কারিগরি ত্রুটির কারণে আরও একবার অনলাইনে
                                        পেমেন্ট করা হলে, পেমেন্ট ফেরত দেওয়া
                                        হবে।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        আপনি 7-10 কার্যদিবসের মধ্যে যেকোনো সময়
                                        ফেরত পাবেন। আপনি যদি এই সময়ের মধ্যে
                                        ফেরত না পান, অনুগ্রহ করে আমাদের
                                        info@karbar.shop এ লিখুন এবং আমরা তদন্ত
                                        করব।
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    নির্দেশ বাতিলকরণ
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    আপনি একটি অর্ডার দেওয়ার পরে আপনি একটি ফোন
                                    নিশ্চিতকরণ পাবেন। আপনি যদি চান, আমাদের
                                    নিশ্চিতকরণ কল পেলে আপনি সেই অর্ডারটি বাতিল
                                    করতে পারেন। আপনি আমাদের নিশ্চিতকরণ কলে পণ্য
                                    গ্রহণ করতে সম্মত হওয়ার পরে আপনি আপনার
                                    অর্ডার বাতিল করতে পারবেন না।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    আপনি যদি ক্যাশ অন ডেলিভারি (সিওডি) নির্বাচন
                                    করে থাকেন, তাহলে ফেরত দিতে হবে না কারণ আপনি
                                    আপনার অর্ডারের জন্য অর্থপ্রদান করেননি।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    ক্রেডিট কার্ড, ডেবিট কার্ড, মোবাইল ব্যাঙ্কিং
                                    বা ব্যাঙ্ক ট্রান্সফার ব্যবহার করে করা
                                    অর্থপ্রদানের জন্য, আপনার অর্ডার বাতিল হওয়ার
                                    পরে আপনি আপনার নিজ অ্যাকাউন্টে ফেরত পাবেন।
                                    আপনার পুরো অর্ডারের পরিমাণ ফেরত দেওয়া হবে।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    সরকারি আইন
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    এই শর্তাবলী আইনের নীতির বিরোধের রেফারেন্স
                                    ছাড়াই বাংলাদেশের আইন অনুসারে পরিচালিত হবে
                                    এবং নির্মিত হবে এবং এর সাথে সম্পর্কিত
                                    বিরোধগুলি ঢাকার আদালতের একচেটিয়া এখতিয়ারের
                                    অধীন হবে৷
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    আইনি বিরোধ
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    যদি আপনার এবং{' '}
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    -এর মধ্যে কোনো বিরোধ দেখা দেয়, আমাদের
                                    লক্ষ্য হল আপনাকে বিরোধ দ্রুত সমাধান করার
                                    জন্য একটি নিরপেক্ষ এবং সাশ্রয়ী উপায় প্রদান
                                    করা। তদনুসারে, আপনি এবং '
                                    <span className="inline-block font-semibold">
                                        কারবার
                                    </span>{' '}
                                    ' সম্মত হন যে আমরা এই চুক্তি বা আমাদের
                                    পরিষেবাগুলি থেকে উদ্ভূত আইন বা ইক্যুইটিতে যে
                                    কোনও দাবি বা বিতর্কের সমাধান করব নীচের
                                    উপধারাগুলির একটি অনুসারে বা আমরা এবং আপনি
                                    অন্যথায় লিখিতভাবে সম্মত হন৷ এই বিকল্পগুলি
                                    অবলম্বন করার আগে, আমরা আপনাকে দৃঢ়ভাবে
                                    উত্সাহিত করি যে আপনি একটি সমাধানের জন্য
                                    প্রথমে আমাদের সাথে সরাসরি যোগাযোগ করুন৷ আমরা
                                    বিকল্প বিরোধ নিষ্পত্তি পদ্ধতির মাধ্যমে
                                    বিরোধের সমাধান করার জন্য যুক্তিসঙ্গত অনুরোধ
                                    বিবেচনা করব, যেমন সালিস, মামলার বিকল্প
                                    হিসাবে।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    প্রযোজ্য আইন এবং এখতিয়ার: এই শর্তাবলী
                                    বাংলাদেশে বলবৎ আইন দ্বারা ব্যাখ্যা এবং
                                    নিয়ন্ত্রিত হবে। নীচের সালিশি বিভাগ
                                    সাপেক্ষে, প্রতিটি পক্ষ এতদ্বারা ঢাকার
                                    আদালতের এখতিয়ারে জমা দিতে সম্মত হয়।
                                </p>
                                <p className="text-base font-normal text-gray-600">
                                    মধ্যস্থতা: এই শর্তাবলীর কারণে বা এর সাথে
                                    সম্পর্কিত যে কোনও বিতর্ক, দাবি বা বিরোধ
                                    ঢাকা, বাংলাদেশে অনুষ্ঠিত একক সালিসের সামনে
                                    ব্যক্তিগত এবং গোপনীয় বাধ্যতামূলক সালিসি
                                    দ্বারা উল্লেখ করা হবে এবং শেষ পর্যন্ত
                                    নিষ্পত্তি করা হবে। সালিসকারী এমন একজন
                                    ব্যক্তি হবেন যিনি আইনগতভাবে প্রশিক্ষিত এবং
                                    যিনি ঢাকার তথ্য প্রযুক্তি ক্ষেত্রে
                                    অভিজ্ঞতাসম্পন্ন এবং যে কোনো পক্ষ থেকে
                                    স্বাধীন। পূর্বোক্ত সত্ত্বেও, সাইটটি আদালতের
                                    মাধ্যমে আদেশমূলক বা অন্যান্য ন্যায়সঙ্গত
                                    ত্রাণের মাধ্যমে মেধা সম্পত্তি অধিকার এবং
                                    গোপনীয় তথ্য রক্ষা করার অধিকার সংরক্ষণ করে।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    আপনার কার্ডে অননুমোদিত চার্জ
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    আপনি যদি{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    -এ করা কেনাকাটার জন্য আপনার ক্রেডিট/ডেবিট
                                    কার্ডে চার্জ দেখতে পান, কিন্তু আপনি কখনই
                                    একটি অ্যাকাউন্ট তৈরি করেননি বা সাইন আপ
                                    করেননি, তাহলে অনুগ্রহ করে আপনার পরিবারের
                                    সদস্যদের বা আপনার পক্ষ থেকে কেনাকাটা করার
                                    জন্য অনুমোদিত ব্যবসায়িক সহকর্মীদের সাথে চেক
                                    করুন, নিশ্চিত করুন যে তারা আছে কিনা। অর্ডার
                                    দেননি। আপনি যদি এখনও চার্জ চিনতে না পারেন,
                                    তাহলে অনুগ্রহ করে লেনদেনের 60 দিনের মধ্যে
                                    অননুমোদিত কেনাকাটার রিপোর্ট করুন যাতে{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>
                                    -কে তদন্ত শুরু করতে সক্ষম হয়।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    প্রতারণামূলক/ব্যবসায়িক আদেশের ক্ষতি
                                    বাতিলকরণ
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    একটি নিরাপদ এবং নিরাপদ কেনাকাটার অভিজ্ঞতা
                                    প্রদানের জন্য, আমরা নিয়মিতভাবে প্রতারণামূলক
                                    কার্যকলাপের জন্য লেনদেন পর্যবেক্ষণ করি। কোনো
                                    সন্দেহজনক কার্যকলাপ শনাক্ত করার ক্ষেত্রে,{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    কোনো দায় ছাড়াই সমস্ত অতীত, মুলতুবি এবং
                                    ভবিষ্যতের আদেশ বাতিল করার অধিকার সংরক্ষণ
                                    করে।{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    ওয়েবসাইটে পণ্যের মূল্য নির্ধারণ এবং স্টক
                                    অনুপলব্ধতার মতো পরিস্থিতিতে অর্ডার
                                    প্রত্যাখ্যান বা বাতিল করার অধিকারও সংরক্ষণ
                                    করে। কোনো অর্ডার গ্রহণ করার আগে আমাদের
                                    অতিরিক্ত যাচাই বা তথ্যের প্রয়োজন হতে পারে।
                                    আপনার অর্ডারের সমস্ত বা কোনো অংশ বাতিল হলে
                                    বা আপনার অর্ডার গ্রহণ করার জন্য অতিরিক্ত
                                    তথ্যের প্রয়োজন হলে আমরা আপনার সাথে যোগাযোগ
                                    করব। আপনার কার্ডে চার্জ নেওয়ার পরে যদি
                                    আপনার অর্ডার বাতিল করা হয়, তাহলে উল্লিখিত
                                    পরিমাণটি আপনার কার্ড অ্যাকাউন্টে ফিরিয়ে
                                    দেওয়া হবে। বাতিল করা অর্ডারের জন্য ব্যবহৃত
                                    কোনো প্রচারমূলক ভাউচার ফেরত নাও হতে পারে।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    নিম্নলিখিত পরিস্থিতিগুলির মধ্যে যেকোনটি পূরণ
                                    হলে গ্রাহককে প্রতারণামূলক হিসাবে বিবেচনা করা
                                    যেতে পারে:
                                </p>
                                <ul className="grid gap-3 mt-3 ml-8">
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        <div>
                                            গ্রাহক{' '}
                                            <Link
                                                href="/"
                                                className="inline-block font-semibold"
                                            >
                                                karbar.shop
                                            </Link>{' '}
                                            দ্বারা পাঠানো অর্থপ্রদান যাচাইকরণ
                                            মেইলের উত্তর দেয় না
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        পেমেন্টের বিশদ যাচাইয়ের সময় গ্রাহক
                                        পর্যাপ্ত নথি তৈরি করতে ব্যর্থ হন
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        অন্য গ্রাহকের ফোন/ইমেলের অপব্যবহার
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        গ্রাহক অবৈধ ইমেল এবং ফোন নম্বর ব্যবহার
                                        করে।
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        গ্রাহক ভুল পণ্য ফেরত দেন
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        গ্রাহক একটি অর্ডারের জন্য অর্থ প্রদান
                                        করতে অস্বীকার করে
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-gray-600 md:gap-4">
                                        <p>
                                            <span className="inline-block w-2 h-2 bg-gray-900 rounded-full md:mt-2"></span>
                                        </p>
                                        গ্রাহক যে কোনো অর্ডারের জন্য ছিনতাইয়ের
                                        সাথে জড়িত
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    পেমেন্ট এবং শিপিং
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    অর্থ প্রদানের পদ্ধতি হিসাবে ক্যাশ অন
                                    ডেলিভারি (সিওডি), ডেবিট/ক্রেডিট কার্ড (ভিসা,
                                    মাস্টার কার্ড, ডিবিবিএল নেক্সাস ইত্যাদি),
                                    মোবাইল ব্যাংকিং (বিকাশ, রকেট) অফার করে।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    আমরা আপনার কাছে পণ্য চালানের ব্যবস্থা করব।
                                    শিপিং সময়সূচী শুধুমাত্র আনুমানিক এবং
                                    নিশ্চিত করা যাবে না. চালানে কোনো বিলম্বের
                                    জন্য আমরা দায়ী নই। কখনও কখনও, খারাপ
                                    আবহাওয়া, রাজনৈতিক প্রতিবন্ধকতা এবং অন্যান্য
                                    অপ্রত্যাশিত পরিস্থিতির কারণে বিতরণে বেশি
                                    সময় লাগতে পারে। আপনার কাছে পণ্য সরবরাহের
                                    সময় শিরোনাম এবং ক্ষতি এবং ক্ষতির ঝুঁকি
                                    আপনার কাছে চলে যায়।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    ক্ষতির ঝুঁকি
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    থেকে কেনা সমস্ত আইটেম একটি চালান চুক্তি
                                    অনুযায়ী তৈরি করা হয়। এর অর্থ হল ক্ষতির
                                    ঝুঁকি{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    -এর সাথে থাকবে যতক্ষণ না আইটেমটি আপনার কাছে
                                    হস্তান্তর করা হয়। প্রাপ্তির পরে আইটেমগুলি
                                    ক্ষতিগ্রস্ত হলে, ঝুঁকি গ্রাহকের উপর পড়ে।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    জালিয়াতি সুরক্ষা নীতি
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    একটি শক্তিশালী জালিয়াতি সনাক্তকরণ এবং
                                    সমাধান ক্ষমতার গুরুত্ব উপলব্ধি করে৷ আমরা এবং
                                    আমাদের অনলাইন পেমেন্ট অংশীদাররা সন্দেহজনক
                                    কার্যকলাপের জন্য ক্রমাগত লেনদেনগুলি নিরীক্ষণ
                                    করি এবং আমাদের দল দ্বারা ম্যানুয়াল
                                    যাচাইয়ের জন্য সম্ভাব্য প্রতারণামূলক
                                    লেনদেনগুলিকে চিহ্নিত করি৷
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    বিরলতম ক্ষেত্রে, যখন আমাদের দল স্পষ্টভাবে
                                    জালিয়াতির সম্ভাবনা উড়িয়ে দিতে অক্ষম হয়,
                                    তখন লেনদেন আটকে রাখা হয় এবং গ্রাহককে পরিচয়
                                    নথি সরবরাহ করার জন্য অনুরোধ করা হয়। আইডি
                                    নথিগুলি আমাদের নিশ্চিত করতে সাহায্য করে যে
                                    কেনাকাটাগুলি প্রকৃতপক্ষে একজন প্রকৃত
                                    কার্ডধারকের দ্বারা করা হয়েছে। গ্রাহকদের
                                    যেকোন অসুবিধার জন্য আমরা ক্ষমাপ্রার্থী এবং
                                    অনলাইন লেনদেনের জন্য নিরাপদ ও নিরাপদ পরিবেশ
                                    নিশ্চিত করার বৃহত্তর স্বার্থে আমাদের সাথে
                                    সহ্য করার জন্য তাদের অনুরোধ করছি।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    সমাপ্তি
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    আপনার ওয়েবসাইট বা যেকোনো পরিষেবার ব্যবহার
                                    স্থগিত বা বন্ধ করতে পারে যদি এটি বিশ্বাস করে
                                    যে, আপনি এই শর্তাবলীর কোনো শর্ত লঙ্ঘন
                                    করেছেন, অপব্যবহার করেছেন বা অনৈতিকভাবে
                                    ব্যবহার করেছেন বা শোষণ করেছেন বা অন্যথায়
                                    অনৈতিকভাবে কাজ করেছেন।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    এই শর্তাদি অনির্দিষ্টকালের জন্য টিকে থাকবে
                                    যতক্ষণ না এবং যতক্ষণ না Fabrilife.com তাদের
                                    সমাপ্ত করতে বেছে নেয়।
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    যদি আপনি বা{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    আপনার ওয়েবসাইট বা যেকোন পরিষেবার ব্যবহার
                                    বন্ধ করে দেন,{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    আপনার পরিষেবার ব্যবহার সম্পর্কিত কোনও
                                    সামগ্রী বা অন্যান্য সামগ্রী মুছে ফেলতে পারে
                                    এবং এটি করার জন্য{' '}
                                    <Link
                                        href="/"
                                        className="inline-block font-semibold"
                                    >
                                        karbar.shop
                                    </Link>{' '}
                                    -এর আপনার বা কোনও তৃতীয় পক্ষের কোনও দায়
                                    থাকবে না৷
                                </p>
                                <br />
                                <p className="text-base font-normal text-gray-600">
                                    আপনি যেকোন পরিষেবা বা পণ্যের জন্য অর্থপ্রদান
                                    করতে দায়বদ্ধ থাকবেন যা আপনি ইতিমধ্যে যেকোন
                                    পক্ষের দ্বারা সমাপ্তির সময় পর্যন্ত অর্ডার
                                    করেছেন। উপরন্তু, আপনি ব্যবহারকারী লাইসেন্স
                                    চুক্তি অনুযায়ী আপনার রয়্যালটি অর্থপ্রদানের
                                    অধিকারী হবেন যা আপনার কাছে বৈধভাবে জমা
                                    হয়েছে বা বলে গণ্য হয়েছে।
                                </p>
                            </div>
                            <div className="mb-6 lg:mb-8 single-area">
                                <h2 className="pb-1 lg:pb-2 mb-4 text-[20px] lg:text-2xl font-semibold text-gray-900 border-b border-gray-400">
                                    মেয়াদ এবং নীতি আপডেট
                                </h2>
                                <p className="text-base font-normal text-gray-600">
                                    আমরা আমাদের সাইটে একটি বিশিষ্ট নোটিশ স্থাপন
                                    করে যে কোন সময় এই শর্তাদি এবং নীতিগুলি
                                    পরিবর্তন বা আপডেট করার অধিকার সংরক্ষণ করি।
                                    এই ধরনের পরিবর্তনগুলি এই সাইটে পোস্ট করার
                                    সাথে সাথে কার্যকর হবে৷
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermsAndConditions;
