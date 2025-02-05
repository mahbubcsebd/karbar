import Template from './components/themes/Template';
import { getSiteSettings } from './utils/getSiteSettings';
import getTemplate from './utils/getTemplate';

export async function generateMetadata() {
    const siteSetting = await getSiteSettings();

    // Generate keywords from site title and description
    const generateKeywords = (text) => {
        return text
            ?.toLowerCase()
            ?.replace(/[^a-z0-9\s]/g, '')
            ?.split(/\s+/)
            ?.filter(word => word?.length > 2)
            ?.join(', ') || '';
    };

    const titleKeywords = generateKeywords(siteSetting.data.title);
    const descKeywords = generateKeywords(siteSetting.data.footer_description);

    // Format current date for sitemap
    const currentDate = new Date().toISOString();

    return {
        title: {
            default: siteSetting.data.title,
            template: `%s | ${siteSetting.data.title}`,
        },
        description: siteSetting.data.footer_description,
        keywords: `${titleKeywords}, ${descKeywords}, online shopping, ecommerce, bangladesh shop`,

        metadataBase: new URL(siteSetting.data.website),

        openGraph: {
            title: siteSetting.data.title,
            description: siteSetting.data.footer_description,
            url: siteSetting.data.website,
            type: 'website',
            locale: 'en_US',
            images: [
                {
                    url: siteSetting.data.header_logo,
                    width: 1200,
                    height: 630,
                    alt: siteSetting.data.title,
                },
            ],
            siteName: siteSetting.data.title,
        },

        twitter: {
            card: 'summary_large_image',
            title: siteSetting.data.title,
            description: siteSetting.data.footer_description,
            images: [siteSetting.data.header_logo],
            creator: '@' + siteSetting.data.title.replace(/\s+/g, ''),
        },

        alternates: {
            canonical: siteSetting.data.website,
            languages: {
                'en-US': '/en',
                'bn-BD': '/bn',
            },
        },

        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-video-preview': -1,
                'max-snippet': -1,
            },
        },

        verification: {
            google: 'your-google-site-verification',
            facebook: 'your-facebook-domain-verification',
        },

        icons: {
            icon: siteSetting.data.fev_icon,
            shortcut: siteSetting.data.fev_icon,
            apple: siteSetting.data.fev_icon,
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: siteSetting.data.fev_icon,
            },
        },

        other: {
            'msapplication-TileColor': '#ffffff',
            'msapplication-TileImage': siteSetting.data.fev_icon,
            'theme-color': '#ffffff',

            // Schema.org markup for Google
            'og:site_name': siteSetting.data.title,
            'og:type': 'website',
            'og:locale': 'en_US',

            // Article publishing meta
            'article:published_time': currentDate,
            'article:modified_time': currentDate,
            'article:section': 'E-commerce',

            // Rich Results testing
            'format-detection': 'telephone=no',
        },
    };
}

const Home = async () => {
    const template = await getTemplate();

    return (
        <>
            <Template template={template.template_name} />
        </>
    );
};

export default Home;
