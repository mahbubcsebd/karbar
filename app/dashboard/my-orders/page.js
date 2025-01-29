import { getSiteSettings } from '@/utils/getSiteSettings';
import MyOrdersPageContent from '../components/MyOrderPageContent';

  export async function generateMetadata() {
      const siteSetting = await getSiteSettings();

      return {
          title: `${siteSetting.data.title} | My Orders`,
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

const MyOrdersPage = () => {
    return (
        <div>
            <MyOrdersPageContent />
        </div>
    );
};

export default MyOrdersPage;
