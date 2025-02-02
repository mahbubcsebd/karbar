import { getSiteSettings } from '@/utils/getSiteSettings';
import MyOrdersPageContent from '../components/MyOrderPageContent';
// import MyOrdersPageContent from '../components/MyOrdersPageContent ';

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
        title: `My Orders | ${siteSetting.data.title}`,
        description: `View and track your orders at ${siteSetting.data.title}. Check order status, history, and delivery updates.`,
        keywords: `${titleKeywords}, my orders, order history, order tracking, purchase history`,
        icons: {
            icon: siteSetting.data.fev_icon,
            apple: siteSetting.data.fev_icon,
        },
        openGraph: {
            title: `My Orders - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            url: `${siteSetting.data.website}/dashboard/my-orders`,
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
            title: `My Orders - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            images: siteSetting.data.header_logo,
        },
        alternates: {
            canonical: `${siteSetting.data.website}/dashboard/my-orders`,
        },
        robots: {
            index: false, // Don't index order pages for privacy
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

const MyOrdersPage = () => {
    return (
        <main
            role="main"
            aria-label="My Orders Page"
            className="orders-container"
        >
            <section className="orders-content">
                <MyOrdersPageContent/>
            </section>
        </main>
    );
};

export default MyOrdersPage;
