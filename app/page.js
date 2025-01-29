import Template from './components/themes/Template';
import { getSiteSettings } from './utils/getSiteSettings';
import getTemplate from './utils/getTemplate';

export async function generateMetadata() {
    const siteSetting = await getSiteSettings();

    return {
        title: `${siteSetting.data.title} | Home`,
        description: siteSetting.data.footer_description,
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
                    alt: siteSetting.data.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: siteSetting.data.title,
            description: siteSetting.data.footer_description,
            images: [siteSetting.data.header_logo],
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
