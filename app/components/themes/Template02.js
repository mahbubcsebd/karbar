import Advertisement from '../Advertisement';
import AbayaAllProducts from '../template/abaya/AbayaAllProducts';
import AbayaHeroSlider from '../template/abaya/AbayaHeroSlider';
import Testimonials from '../Testimonials';

const Template02 = async () => {
    return (
        <div>
            <AbayaHeroSlider />
            <Advertisement position="home_top" />
            <AbayaAllProducts />
            <Advertisement position="home_middle" />
            <Testimonials />
            <Advertisement position="home_bottom" />
        </div>
    );
};

export default Template02;
