import { getSiteSettings } from '@/utils/getSiteSettings';
import UserPageContent from '../../components/UserPageContent';

export async function generateMetadata() {
    const siteSetting = await getSiteSettings();

    return {
        title: `${siteSetting.data.title} | My Profile`,
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

const UserProfilePage = ({ params: { userName } }) => {
    return (
        <div>
            <UserPageContent userName={userName} />
        </div>
    );
};

export default UserProfilePage;
