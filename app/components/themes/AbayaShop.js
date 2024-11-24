import AbayaAllProducts from "../template/abaya/AbayaAllProducts";
import AbayaHeroSlider from "../template/abaya/AbayaHeroSlider";
import Testimonials from "../Testimonials";


const AbayaHomePage = async () => {
  return (
      <div>
          <AbayaHeroSlider />
          <AbayaAllProducts />
          {/* <AbayaLatestProduct /> */}
          <Testimonials />
      </div>
  );
}

export default AbayaHomePage