import OrderSuccess from '../components/OrderSuccess';
import { getSiteSettings } from '../utils/getSiteSettings';


  export async function generateMetadata() {
      const siteSetting = await getSiteSettings();

      return {
          title: `${siteSetting.data.title} | Order Success Page`,
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

const OrderSuccessfull = async () => {
    const siteSetting = await getSiteSettings();
  return (
      <div>
          <OrderSuccess title={siteSetting.data.title} />
      </div>
  );
}

export default OrderSuccessfull