import Template from './components/themes/Template';
import { getSiteSettings } from './utils/getSiteSettings';
import getTemplate from './utils/getTemplate';

export async function generateMetadata() {
    const siteSetting = await getSiteSettings();

    return {
        title: `${siteSetting.data.title} | Home`,
        icons: {
            icon: siteSetting.data.fev_icon,
            apple: siteSetting.data.fev_icon,
        },
       openGraph: {
            title: 'Karbar Ecommerce',
            description: 'Karbar makes online store creation, design, and management easy for small companies, startups & entrepreneurs.',
            url: 'https://karbar.shop/',
            type: 'website',
            images: [
                {
                    url: 'https://karbar.shop/wp-content/uploads/2024/09/karbar-logo.svg',
                    width: 1200, // Add width if possible
                    height: 630, // Add height if possible
                    alt: 'Karbar Logo',
                },
            ],
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
