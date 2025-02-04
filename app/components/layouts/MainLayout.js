'use client';

import Announcement from '@/components/Announcement';
import FooterThemes from '@/components/Footer';
import HeaderThemes from '@/components/Header';
import { usePathname } from 'next/navigation';

const EXCLUDED_PATHS = ['/order-successfull', '/landing', '/tally', '/pos'];

export default function MainLayout({ children, template }) {
    const pathname = usePathname();

    const shouldShowHeaderFooter = !EXCLUDED_PATHS.includes(pathname);
    const isHomePage = pathname === '/';

    return (
        <main>
            {isHomePage && <Announcement />}

            {shouldShowHeaderFooter && template?.template_name && (
                <HeaderThemes template={template.template_name} />
            )}

            {children}

            {shouldShowHeaderFooter && template?.template_name && (
                <FooterThemes template={template.template_name} />
            )}
        </main>
    );
}