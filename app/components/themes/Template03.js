import { getHeroImage } from '../../utils/getHeroImage';
import { getTestimonials } from '../../utils/getTestimonial';
import BestSale from '../BestSale';
import Campain from '../Campain';
import Categories from '../Categories';
import HeroSliderThree from '../HeroSliderThree';
import LatestProductThree from '../LatestProductThree';
import ProductListThree from '../ProductListThree';
import RecentlyViewedThree from '../RecentlyViewedThree';
import Testimonials from '../Testimonials';
import Accordion from '../accordion/Accordion';

const TemplateThree = async () => {
    const heroImages = await getHeroImage();
    const testimonials = await getTestimonials();
    return (
        <>
            <Categories />
            <HeroSliderThree images={heroImages.data} />
            <LatestProductThree />
            <Campain />
            <ProductListThree />
            <BestSale />
            <Accordion bg={true} />
            <Testimonials
                testimonials={testimonials.data}
                bg={true}
            />
            <RecentlyViewedThree />
        </>
    );
};

export default TemplateThree;
