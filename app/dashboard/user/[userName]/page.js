import { getSiteSettings } from '@/utils/getSiteSettings';
import UserPageContent from '../../components/UserPageContent';

export async function generateMetadata({ params }) {
     const userName = (await params).userName;
    const siteSetting = await getSiteSettings();

    // Generate keywords from title
    const generateKeywords = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 2)
            .join(', ');
    };

    const titleKeywords = generateKeywords(siteSetting.data.title);

    return {
        title: `My Profile | ${siteSetting.data.title}`,
        description: `Manage your profile and account settings at ${siteSetting.data.title}. Update personal information, view order history, and more.`,
        keywords: `${titleKeywords}, user profile, account settings, my account, dashboard`,
        icons: {
            icon: siteSetting.data.fev_icon,
            apple: siteSetting.data.fev_icon,
        },
        openGraph: {
            title: `My Profile - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            url: `${siteSetting.data.website}/dashboard/user/${userName}`,
            type: 'website',
            images: [
                {
                    url: siteSetting.data.header_logo,
                    width: 1200,
                    height: 630,
                    alt: `${siteSetting.data.title} Logo`,
                },
            ],
            siteName: siteSetting.data.title,
        },
        twitter: {
            card: 'summary',
            title: `My Profile - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            images: siteSetting.data.header_logo,
        },
        alternates: {
            canonical: `${siteSetting.data.website}/dashboard/user/${userName}`,
        },
        robots: {
            index: false, // Don't index user profile pages
            follow: false,
            'max-image-preview': 'none',
            'max-snippet': -1,
            noarchive: true,
        },
        other: {
            'X-Robots-Tag': 'noindex, nofollow, noarchive'
        }
    };
}

const UserPage = async ({ params }) => {
     const userName = (await params).userName;

    return (
        <main
            role="main"
            aria-label="User Profile Page"
            className="user-profile-container"
        >
            <section className="profile-content">
                <UserPageContent userName={userName} />
            </section>
        </main>
    );
};

export default UserPage;
