import Advertisement from '../Advertisement';
import HeroSix from '../template/template-six/HeroSix';
import ProductListSix from '../template/template-six/ProductListSix';
import RecentlyViewedFive from '../template/template-six/RecentlyViewedFive';
import TestimonialSix from '../template/template-six/TestimonialSix';

const TemplateFive = () => {
    return (
        <>
            <HeroSix />
            <Advertisement position="home_top" />
            <ProductListSix />
            <Advertisement position="home_middle" />
            <TestimonialSix />
            <RecentlyViewedFive />
            <Advertisement position="home_bottom" />
        </>
    );
};

export default TemplateFive;
