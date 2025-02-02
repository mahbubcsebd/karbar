import { getSiteSettings } from '@/utils/getSiteSettings';
import OrderDetailsPageContent from '../../components/OrderDetailsPageContent';

export async function generateMetadata({ params }) {
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
        title: `Order #${params.orderId} Details | ${siteSetting.data.title}`,
        description: `View details for order #${params.orderId} at ${siteSetting.data.title}. Track your order status and delivery information.`,
        keywords: `${titleKeywords}, order details, order tracking, order status, order ${params.orderId}`,
        icons: {
            icon: siteSetting.data.fev_icon,
            apple: siteSetting.data.fev_icon,
        },
        openGraph: {
            title: `Order #${params.orderId} Details - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            url: `${siteSetting.data.website}/dashboard/my-orders/${params.orderId}`,
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
            title: `Order #${params.orderId} Details - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            images: siteSetting.data.header_logo,
        },
        alternates: {
            canonical: `${siteSetting.data.website}/dashboard/my-orders/${params.orderId}`,
        },
        robots: {
            index: false, // Don't index individual order pages
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

const OrderDetailsPage = ({ params }) => {
    return (
        <main
            role="main"
            aria-label={`Order #${params.orderId} Details`}
            className="order-details-container"
        >
            <section className="order-details-content">
                <OrderDetailsPageContent orderId={params.orderId} />
            </section>
        </main>
    );
};

export default OrderDetailsPage;