import { getHeroImage } from '../../utils/getHeroImage';
import { getTestimonials } from '../../utils/getTestimonial';
import Categories from '../Categories';
import HeroSlider from '../HeroSlider';
import RecentlyViewedThree from '../RecentlyViewedThree';
import Testimonials from '../Testimonials';
import LatestProductFive from '../template/template-five/LatestProductFive';
import ProductListFive from '../template/template-five/ProductListFive';
import PromotionFive from '../template/template-five/PromotionFive';

const TemplateFive = async () => {
    const heroImages = await getHeroImage();
    const testimonials = await getTestimonials();
    return (
        <>
            <Categories />
            <HeroSlider images={heroImages.data} />
            <LatestProductFive />
            <PromotionFive />
            <ProductListFive />
            <Testimonials
                testimonials={testimonials.data}
                bg={true}
            />
            <RecentlyViewedThree />
        </>
    );
};

export default TemplateFive;
