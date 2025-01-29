import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

// import announcment from "@/assets/images/announcement.jpg";
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getAnnouncement } from '../utils/getAnnouncement';
import KarbarCountdown from './KarbarCountdown';

const Announcement = () => {
    const [announcement, setAnnouncement] = useState(null);
    const [isTextOpen, setIsTextOpen] = useState(true);
    const [isBannerOpen, setIsBannerOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(true);

    // const is_countdown = true;

    useEffect(() => {
        const fetchAnnouncement = async () => {
            const announcementData = await getAnnouncement();
            setAnnouncement(announcementData.data);
        }

        fetchAnnouncement();
    },[])

    if (!announcement) return null;

    return (
        <div>
            {announcement?.textAnnounce && isTextOpen && (
                <div className="bg-purple-900">
                    <div className="container">
                        <div className="flex items-center justify-between py-4">
                            {announcement?.textAnnounce?.marque ? (
                                <div className="flex items-center justify-between w-full gap-5 text-white">
                                    <marquee className="w-full text-white">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: announcement
                                                    ?.textAnnounce?.text,
                                            }}
                                        />
                                    </marquee>
                                    {announcement?.is_countdown && (
                                        <div>
                                            <KarbarCountdown
                                                endingDate={
                                                    announcement?.end_date
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-between w-full gap-5 text-white">
                                    <div
                                        className="w-full text-white"
                                        dangerouslySetInnerHTML={{
                                            __html: announcement?.textAnnounce
                                                ?.text,
                                        }}
                                    />
                                    {announcement?.is_countdown && (
                                        <div>
                                            <KarbarCountdown
                                                endingDate={
                                                    announcement?.end_date
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            <button
                                onClick={() => setIsTextOpen(false)}
                                className="ml-4 text-white"
                                aria-label="Close announcement"
                            >
                                <X />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {announcement?.bannerAnnounce && isBannerOpen && (
                <div className="relative overflow-hidden">
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
                            width={1920}
                            height={1080}
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
                        <DialogContent className="max-w-[350px] max-h-[250px] sm:max-w-[800px] sm:max-h-[500px] p-0 overflow-hidden border-0">
                            <Link
                                href={announcement?.modalAnnounce?.url}
                                className=""
                            >
                                <Image
                                    src={announcement?.modalAnnounce?.image}
                                    alt="announcement"
                                    className="object-fill w-full h-full"
                                    width={1920}
                                    height={1080}
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
