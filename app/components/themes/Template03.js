import Advertisement from '../Advertisement';
import Categories from '../Categories';
import FaqSection from '../FaqSection';
import HeroSliderThree from '../HeroSliderThree';
import LatestProductThree from '../LatestProductThree';
import ProductListThree from '../ProductListThree';
import RecentlyViewedThree from '../RecentlyViewedThree';
import Testimonials from '../Testimonials';

const TemplateThree = () => {
    return (
        <>
            <Categories />
            <HeroSliderThree />
            <Advertisement position="home_top" />
            <LatestProductThree />
            <ProductListThree />
            <Advertisement position="home_middle" />
            <FaqSection bg={true} />
            <Testimonials bg={true} />
            <RecentlyViewedThree />
            <Advertisement position="home_bottom" />
        </>
    );
};

export default TemplateThree;
