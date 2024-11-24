import Advertisement from '../Advertisement';
import Categories from '../Categories';
import HeroSlider from '../HeroSlider';
import RecentlyViewedThree from '../RecentlyViewedThree';
import Testimonials from '../Testimonials';
import Accordion from '../accordion/Accordion';
import LatestProductFour from '../template/template-four/LatestProductFour';
import ProductListFour from '../template/template-four/ProductListFour';

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
            <RecentlyViewedThree />
            <Advertisement position="home_bottom" />
        </>
    );
};

export default TemplateFour;
