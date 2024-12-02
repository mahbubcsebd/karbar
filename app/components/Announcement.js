import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';

// import announcment from "@/assets/images/announcement.jpg";
import announcment from '@/assets/images/announcement-2.jpg';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Announcement = () => {
    const [isTextOpen, setIsTextOpen] = useState(true);
    const [isBannerOpen, setIsBannerOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const announcement = {
        textAnnounce: {
            text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            marque: true,
        },
        bannerAnnounce: {
            image: announcment,
            alt: 'Announcement banner',
            url: '#',
        },
        modalAnnounce: {
            image: announcment,
            alt: 'Announcement banner',
            url: '#',
        },
    };

    if (!announcement) return null;

    return (
        <div>
            {announcement?.textAnnounce && isTextOpen && (
                <div className="bg-purple-900">
                    <div className="container">
                        <div className="flex items-center justify-between py-4">
                            {announcement?.textAnnounce?.marque ? (
                                <marquee className="w-full text-white">
                                    {announcement?.textAnnounce?.text}
                                </marquee>
                            ) : (
                                <p className="w-full text-white">
                                    {announcement?.textAnnounce?.text}
                                </p>
                            )}
                            <button
                                onClick={() => setIsTextOpen(false)}
                                className="ml-4 text-white"
                            >
                                <X />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {announcement?.bannerAnnounce && isBannerOpen && (
                <div className="relative h-[130px] overflow-hidden">
                    <button
                        className="absolute z-50 top-4 right-4"
                        onClick={() => setIsBannerOpen(false)}
                    >
                        <X />
                    </button>
                    <Link
                        href={announcement?.bannerAnnounce?.url}
                        className="relative z-10 block w-full"
                    >
                        <Image
                            src={announcement?.bannerAnnounce?.image}
                            alt="announcement"
                            className="object-fill w-full h-auto"
                        />
                    </Link>
                </div>
            )}
            {announcement?.modalAnnounce && isModalOpen && (
                <div>
                    <Dialog
                        open={isModalOpen}
                        onOpenChange={setIsModalOpen}
                    >
                        <DialogContent className="max-w-[350px] sm:max-w-[800px] p-0 overflow-hidden border-0">
                            <Link
                                href={announcement?.modalAnnounce?.url}
                                className="relative z-10 block w-full"
                            >
                                <Image
                                    src={announcement?.modalAnnounce?.image}
                                    alt="announcement"
                                    className="object-fill w-full h-auto"
                                />
                            </Link>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default Announcement;
