"use client"

import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import DashboardSidebar from './components/DashboardSidebar';

export default function Layout({ children }) {
    const {user} = useUser();
    const router = useRouter();

    // useEffect(() => {
    //     if (!user) {
    //         router.push('/');
    //     }
    // }, [user, router]);
    return (
        <div className="dahsboard-page py-10">
            <div className="container">
                <div className="grid grid-cols-12 gap-5 min-h-screen items-stretch">
                    <div className="col-span-12 md:col-span-3 h-full bg-white px-4 py-6 border border-gray-400 rounded-lg">
                        <DashboardSidebar />
                    </div>
                    <div className="col-span-12 md:col-span-9 h-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
