import Banner from '../../components/Banner';
import ProductList from '../../components/ProductList';
import { getSiteSettings } from '../../utils/getSiteSettings';

export async function generateMetadata({ params }) {
     const category = (await params).category;
    const siteSetting = await getSiteSettings();

    // Generate keywords from title and category
    const generateKeywords = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 2)
            .join(', ');
    };

    const titleKeywords = generateKeywords(siteSetting.data.title);
    const categoryKeywords = generateKeywords(category.replace(/-/g, ' '));

    return {
        title: `${category.replace(/-/g, ' ').toUpperCase()} | ${siteSetting.data.title}`,
        description: `Shop our collection of ${category.replace(/-/g, ' ')} at ${siteSetting.data.title}. Find the best deals and latest trends.`,
        keywords: `${categoryKeywords}, ${titleKeywords}, shop online, best deals, latest collection`,
        icons: {
            icon: siteSetting.data.fev_icon,
            apple: siteSetting.data.fev_icon,
        },
        openGraph: {
            title: `${category.replace(/-/g, ' ').toUpperCase()} - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            url: `${siteSetting.data.website}/collections/${category}`,
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
            card: 'summary_large_image',
            title: `${category.replace(/-/g, ' ').toUpperCase()} - ${siteSetting.data.title}`,
            description: siteSetting.data.footer_description,
            images: siteSetting.data.header_logo,
        },
        alternates: {
            canonical: `${siteSetting.data.website}/collections/${category}`,
        },
        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    };
}

const CategoryPage = async ({ params }) => {
     const category = (await params).category;

    return (
        <>
            <Banner />
            <ProductList category={category} />
        </>
    );
};

export default CategoryPage;
