// import landingBg from "@/assets/images/landing-banner-bg.svg";
import CheckoutPage from '@/components/CheckoutPage';
import Testimonials from '@/components/Testimonials';
import { getLanding } from '@/utils/getLanding';
import { getPaymentMethod } from '@/utils/getPaymentMethod';
import { getSiteSettings } from '@/utils/getSiteSettings';
import { getTestimonials } from '@/utils/getTestimonial';
import LandingBanner from './component/LandingBanner';
import LandingChoose from './component/LandingChoose';
import LandingDescription from './component/LandingDescription';
import LandingShopWithUs from './component/LandingShopWithUs';
import OurPackages from './component/OurPackages';
  export async function generateMetadata({ params: {slug} }) {
    function capitalizeEachWord(text) {
        return text
            .split(' ')
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    }

    const slugTitle = slug.replace(/-/g, " ");
      const siteSetting = await getSiteSettings('en');
      return {
          title: `${siteSetting.data.title} | ${capitalizeEachWord(slugTitle)}`,
          icons: {
              icon: siteSetting.data.fev_icon,
              apple: siteSetting.data.fev_icon,
          },
      };
  }

const LandingPage = async ({params : {slug}}) => {
    const testimonials = await getTestimonials();
    const siteSettings = await getSiteSettings('en');
    const paymentMethod = await getPaymentMethod('en');

    const landingData = await getLanding(slug);

    const {
        section_one_title,
        section_one_image,
        section_two_description,
        section_two_image,
        section_three_video,
        section_three_key_feature,
        section_three_offer_order,
        section_four_available_size,
        section_five_image,
        section_five_description,
        products,
    } = landingData.data;

    return (
        <div className="landing-page ">
            <LandingBanner landing={{ section_one_title, section_one_image }} />
            <LandingChoose
                landing={{ section_two_description, section_two_image }}
            />
            <LandingDescription
                landing={{
                    section_three_video,
                    section_three_key_feature,
                    section_three_offer_order,
                    section_four_available_size,
                }}
            />
            {testimonials.data.length > 3 && (
                <div className="landing-testimonial bg-[#F4EBFF] pt-10 pb-3 lg:pt-20 lg:pb-14 mb-[30px] lg:mb-[60px]">
                    <Testimonials testimonials={testimonials.data} />
                </div>
            )}
            <LandingShopWithUs
                landing={{ section_five_image, section_five_description }}
            />
            <OurPackages products={products} />
            <CheckoutPage
                siteSettings={siteSettings.data}
                paymentMethod={paymentMethod.data}
            />
        </div>
    );
};

export default LandingPage;
