import Advertisement from '../Advertisement';
import Categories from '../Categories';
import HeroSlider from '../HeroSlider';
import Testimonials from '../Testimonials';
import LatestProductFive from '../template/template-five/LatestProductFive';
import ProductListFive from '../template/template-five/ProductListFive';
import RecentlyViewedFive from '../template/template-five/RecentlyViewedFive';

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
            <RecentlyViewedFive />
            <Advertisement position="home_bottom" />
        </>
    );
};

export default TemplateFive;
