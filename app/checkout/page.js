// import CheckoutPage from '../components/CheckoutPage';
import CheckoutPage from '../components/CheckoutPage';
import { getPaymentMethod } from '../utils/getPaymentMethod';
import { getSiteSettings } from '../utils/getSiteSettings';

  export async function generateMetadata() {
      const siteSetting = await getSiteSettings();

      return {
          title: `${siteSetting.data.title} | Checkout Page`,
          icons: {
              icon: siteSetting.data.fev_icon,
              apple: siteSetting.data.fev_icon,
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
