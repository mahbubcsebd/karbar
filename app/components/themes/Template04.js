import Advertisement from '../Advertisement';
import Categories from '../Categories';
import HeroSlider from '../HeroSlider';
import Testimonials from '../Testimonials';
import Accordion from '../accordion/Accordion';
import LatestProductFour from '../template/template-four/LatestProductFour';
import ProductListFour from '../template/template-four/ProductListFour';
import RecentlyViewedFour from '../template/template-four/RecentlyViewedFour';

const TemplateFour = () => {
    return (
        <>
            <Categories />
            <HeroSlider />
            <Advertisement position="home_top" />
            <LatestProductFour />
            <ProductListFour />
            <Advertisement position="home_middle" />
            <Accordion bg={true} />
            <Testimonials bg={true} />
            <RecentlyViewedFour />
            <Advertisement position="home_bottom" />
        </>
    );
};

export default TemplateFour;
