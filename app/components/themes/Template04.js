import { getHeroImage } from '../../utils/getHeroImage';
import { getTestimonials } from '../../utils/getTestimonial';
import Categories from '../Categories';
import HeroSlider from '../HeroSlider';
import RecentlyViewedThree from '../RecentlyViewedThree';
import Testimonials from '../Testimonials';
import Accordion from '../accordion/Accordion';
import LatestProductFour from '../template/template-four/LatestProductFour';
import ProductListFour from '../template/template-four/ProductListFour';

const TemplateFour = async () => {
    const heroImages = await getHeroImage();
    const testimonials = await getTestimonials();
    return (
        <>
            <Categories />
            <HeroSlider images={heroImages.data} />
            <LatestProductFour />
            {/* <Campain /> */}
            <ProductListFour />
            <Accordion bg={true} />
            <Testimonials
                testimonials={testimonials.data}
                bg={true}
            />
            <RecentlyViewedThree />
        </>
    );
};

export default TemplateFour;
