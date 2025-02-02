// import CheckoutPage from '../components/CheckoutPage';
import CheckoutPage from '../components/CheckoutPage';
import { getPaymentMethod } from '../utils/getPaymentMethod';
import { getSiteSettings } from '../utils/getSiteSettings';

export async function generateMetadata() {
    const siteSetting = await getSiteSettings();

    // Generate keywords from title
    const generateKeywords = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter((word) => word.length > 2)
            .join(', ');
    };

    const titleKeywords = generateKeywords(siteSetting.data.title);

    return {
        title: `Checkout | ${siteSetting.data.title}`,
        description: `Complete your purchase at ${siteSetting.data.title}. Secure checkout process with multiple payment options.`,
        keywords: `${titleKeywords}, checkout, payment, order, secure payment`,
        openGraph: {
            title: `Checkout - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            url: `${siteSetting.data.website}/checkout`,
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
            title: `Checkout - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            images: siteSetting.data.header_logo,
        },
        alternates: {
            canonical: `${siteSetting.data.website}/checkout`,
        },
        robots: {
            index: false, // Don't index checkout pages for security
            follow: false,
            nocache: true,
            googleBot: {
                index: false,
                follow: false,
                noimageindex: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

const page = async () => {
    const siteSettings = await getSiteSettings("en");
    const paymentMethod = await getPaymentMethod('en');

    return (
        <div>
            <CheckoutPage
                siteSettings={siteSettings.data}
                paymentMethod={paymentMethod.data}
            />
        </div>
    );
};

export default page;