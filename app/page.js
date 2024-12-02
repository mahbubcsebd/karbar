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

const Home = async () => {
    const template = await getTemplate();

    return (
        <>
            <Template template={template.template_name} />
        </>
    );
};

export default Home;
