import Advertisement from '../Advertisement';
import Categories from '../Categories';
import FaqSection from '../FaqSection';
import HeroSlider from '../HeroSlider';
import HomeCategories from '../HomeCategories';
import LatestProduct from '../LatestProduct';
import RecentlyViewed from '../RecentlyViewed';
import Testimonials from '../Testimonials';

const Template01 = () => {
    return (
        <>
            <Categories />
            <HeroSlider />
            <Advertisement position="home_top" />
            <LatestProduct />
            <HomeCategories />
            <Advertisement position="home_middle" />
            <FaqSection />
            <Testimonials />
            <RecentlyViewed />
            <Advertisement position="home_bottom" />
        </>
    );
};

export default Template01;
