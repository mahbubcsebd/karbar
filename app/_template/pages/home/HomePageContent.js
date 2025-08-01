import Advertisement from '@/_components/Advertisement';
import Testimonials from '../../_components/Testimonials';
import AllProducts from './_components/AllProducts';
import Categories from './_components/Categories';
import DealOfTheWeek from './_components/DealOfTheWeek';
import FaqSection from './_components/FaqSection';
import HeroSlider from './_components/HeroSlider';
import HomeCategories from './_components/HomeCategories';
import LatestProduct from './_components/LatestProduct';
import MobileCategories from './_components/MobileCategories';
import RecentlyViewed from './_components/RecentlyViewed';
import ShortList from './_components/ShortList';

const HomePageContent = () => {
  return (
    <>
      <HeroSlider />
      <MobileCategories />
      <Categories />
      <Advertisement position="home_top" />
      <LatestProduct />
      <HomeCategories />
      <Advertisement position="home_middle" />
      <AllProducts />
      <DealOfTheWeek />
      <ShortList />
      <FaqSection />
      <Testimonials />
      <RecentlyViewed />
      <Advertisement position="home_bottom" />
    </>
  );
};

export default HomePageContent;
