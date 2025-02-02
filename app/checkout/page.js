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
            .filter(word => word.length > 2)
            .join(', ');
    };

    const titleKeywords = generateKeywords(siteSetting.data.title);

    return {
        title: `${siteSetting.data.title} | Checkout Page`,
        description: `Complete your order at ${siteSetting.data.title} - Safe and secure checkout process`,
        keywords: `${titleKeywords}, checkout, secure payment, online shopping, ecommerce`,
        icons: {
            icon: siteSetting.data.fev_icon,
            apple: siteSetting.data.fev_icon,
        },
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
                    alt: 'Karbar Logo',
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
            index: false, // Don't index checkout pages
            follow: false,
            'max-image-preview': 'large',
            'max-snippet': -1,
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
