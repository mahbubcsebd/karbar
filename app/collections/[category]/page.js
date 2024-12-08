import Banner from '../../components/Banner';
import ProductList from '../../components/ProductList';
import { getSiteSettings } from '../../utils/getSiteSettings';

export async function generateMetadata() {
    const siteSetting = await getSiteSettings();

    return {
        title: `${siteSetting.data.title} | Shop Page`,
        icons: {
            icon: siteSetting.data.fev_icon,
            apple: siteSetting.data.fev_icon,
        },
        openGraph: {
            title: siteSetting.data.title,
            description: siteSetting.data.footer_description,
            url: siteSetting.data.website,
            type: 'website',
            images: [
                {
                    url: siteSetting.data.header_logo,
                    width: 1200,
                    height: 630,
                    alt: 'Karbar Logo',
                },
            ],
        },
    };
}

const CategoryPage = async ({ params }) => {
    const category = params.category;

    return (
        <>
            <Banner />
            <ProductList category={category} />
        </>
    );
};

export default CategoryPage;
