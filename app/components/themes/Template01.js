import { getHeroImage } from '../../utils/getHeroImage';
import { getTestimonials } from '../../utils/getTestimonial';
import Categories from '../Categories';
import HeroSlider from '../HeroSlider';
import HomeCategories from '../HomeCategories';
import LatestProduct from '../LatestProduct';
import RecentlyViewed from '../RecentlyViewed';
import Testimonials from '../Testimonials';
import Accordion from '../accordion/Accordion';

const Template01 = async () => {
    const heroImages = await getHeroImage();
    const testimonials = await getTestimonials();
    return (
        <>
            <Categories />
            <HeroSlider images={heroImages.data} />
            <LatestProduct />
            <HomeCategories />
            <Accordion />
            <Testimonials testimonials={testimonials.data} />
            <RecentlyViewed />
        </>
    );
};

export default Template01;
