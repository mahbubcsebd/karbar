import Image from 'next/image';
import { getHeroImage } from '../utils/getHeroImage';

const Hero = async () => {
    const heroImg = await getHeroImage()
  return (
      <div
          id="hero"
          className="hero pb-[30px] lg:pb-10"
      >
          <div className="hero-area">
                  <div className="w-full h-[160px] md:h-[350px] overflow-hidden">
                      <Image
                          src={heroImg.data.image_url}
                          alt={heroImg.data.title}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full"
                      />
                  </div>
          </div>
      </div>
  );
}

export default Hero