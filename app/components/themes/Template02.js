import { getHeroImage } from '../../utils/getHeroImage';
import { getTestimonials } from '../../utils/getTestimonial';
import AbayaAllProducts from '../template/abaya/AbayaAllProducts';
import AbayaHeroSlider from '../template/abaya/AbayaHeroSlider';
import Testimonials from '../Testimonials';

const Template02 = async () => {
    const heroImages = await getHeroImage();
    const testimonials = await getTestimonials();
    return (
        <div>
            <AbayaHeroSlider images={heroImages.data} />
            <AbayaAllProducts />
            {/* <AbayaLatestProduct /> */}
            <Testimonials testimonials={testimonials.data} />
        </div>
    );
};

export default Template02;
