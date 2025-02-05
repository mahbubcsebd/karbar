import Advertisement from '../Advertisement';
import AbayaAllProducts from '../template/abaya/AbayaAllProducts';
import AbayaHeroSlider from '../template/abaya/AbayaHeroSlider';
import Testimonials from '../Testimonials';

export default function Template02() {
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
}
