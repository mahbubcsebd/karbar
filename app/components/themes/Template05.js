import Advertisement from '../Advertisement';
import Categories from '../Categories';
import HeroSlider from '../HeroSlider';
import RecentlyViewedThree from '../RecentlyViewedThree';
import Testimonials from '../Testimonials';
import LatestProductFive from '../template/template-five/LatestProductFive';
import ProductListFive from '../template/template-five/ProductListFive';

const TemplateFive = () => {
    return (
        <>
            <Categories />
            <HeroSlider />
            <Advertisement position="home_top" />
            <LatestProductFive />
            <ProductListFive />
            <Advertisement position="home_middle" />
            <Testimonials bg={true} />
            <RecentlyViewedThree />
            <Advertisement position="home_bottom" />
        </>
    );
};

export default TemplateFive;
