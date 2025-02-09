import Advertisement from '../Advertisement';
import Categories from '../Categories';
import FaqSection from '../FaqSection';
import HeroSlider from '../HeroSlider';
import HomeCategories from '../HomeCategories';
import RecentlyViewed from '../RecentlyViewed';

const Template01 = () => {
    return (
        <>
            <Categories />
            <HeroSlider />
            <Advertisement position="home_top" />
            {/* <LatestProduct /> */}
            <HomeCategories />
            <Advertisement position="home_middle" />
            <FaqSection />
            {/* <Testimonials /> */}
            <RecentlyViewed />
            <Advertisement position="home_bottom" />
        </>
    );
};

export default Template01;
