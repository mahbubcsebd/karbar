import { getSiteSettings } from '@/utils/getSiteSettings';
import ProfileEditContent from '../components/ProfileEditContent';

export async function generateMetadata() {
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
        title: `Edit Profile | ${siteSetting.data.title}`,
        description: `Update your profile information at ${siteSetting.data.title}. Manage your personal details, contact information, and account settings.`,
        keywords: `${titleKeywords}, edit profile, account settings, update profile, personal information`,
        icons: {
            icon: siteSetting.data.fev_icon,
            apple: siteSetting.data.fev_icon,
        },
        openGraph: {
            title: `Edit Profile - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            url: `${siteSetting.data.website}/dashboard/edit`,
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
            title: `Edit Profile - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            images: siteSetting.data.header_logo,
        },
        alternates: {
            canonical: `${siteSetting.data.website}/dashboard/edit`,
        },
        robots: {
            index: false, // Don't index profile edit pages
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

const EditProfilePage = () => {
    return (
        <main
            role="main"
            aria-label="Edit Profile Page"
            className="edit-profile-container"
        >
            <section className="edit-profile-content">
                <ProfileEditContent />
            </section>
        </main>
    );
};

export default EditProfilePage;