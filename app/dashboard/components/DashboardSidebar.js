"use client"

import orderIcon from '@/assets/icons/order.svg';
import profileIcon from '@/assets/icons/profile.svg';
import profileImg from '@/assets/images/profile.png';
import useUser from '@/hooks/useUser';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const DashboardSidebar = () => {
         const segment = useSelectedLayoutSegment();
         const {user} = useUser();

    return (
        <div className="dashboard-sidebar">
            <div className="user-info grid justify-center mb-5">
                <div className="user-image w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-purple-900 p-1 mb-3 mx-auto">
                    <Image
                        src={user?.avatar ? user?.avatar : profileImg}
                        height={120}
                        width={120}
                        alt="User Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-base font-medium text-gray-700 mb-1">
                        {user?.name}
                    </h2>
                    <p className="text-xs text-gray-500 font-normal">
                        {user?.username}
                    </p>
                </div>
            </div>
            <hr />

            <ul className="grid gap-1 pt-5">
                <li>
                    <Link
                        href={`/dashboard/user/${user?.username}`}
                        className={`px-4 py-[14px] text-gray-900 font-medium rounded-md hover:bg-[#EDE9FA] transition duration-300 w-full flex items-center gap-2 ${
                            segment === 'user' ? 'bg-[#EDE9FA]' : ''
                        } `}
                    >
                        <Image
                            src={profileIcon}
                            alt="profile icon"
                            className="auth-icon"
                        />
                        Profile
                    </Link>
                </li>
                <li>
                    <Link
                        href="/dashboard/my-orders"
                        className={`px-4 py-[14px] text-gray-900 font-medium rounded-md hover:bg-[#EDE9FA] transition duration-300 w-full flex items-center gap-2 ${
                            segment === 'my-orders' ? 'bg-[#EDE9FA]' : ''
                        } `}
                    >
                        <Image
                            src={orderIcon}
                            alt="orders icon"
                            className="auth-icon"
                        />
                        My Orders
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default DashboardSidebar;
