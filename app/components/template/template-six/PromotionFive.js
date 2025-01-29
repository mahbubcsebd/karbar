import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import promotion1 from "../../../assets/images/promotion-1.png"
import promotion2 from "../../../assets/images/promotion-2.png"
import promotion3 from "../../../assets/images/promotion-3.png"

const promotions = [
    { id: 1, image: promotion1, link: '/' },
    { id: 2, image: promotion2, link: '/' },
    { id: 3, image: promotion3, link: '/' },
]

const PromotionFive = () => {
  return (
      <div className="promotion-section">
          <div className="promotion-area">
              <div className="container">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {promotions.map((promotion) => (
                          <Link
                              key={promotion.id}
                              href={promotion.link}
                              className="block w-full h-[210px] md:[190px] lg:h-[165px] xl:h-[210px] 2xl:h-[245px] rounded-2xl overflow-hidden"
                          >
                              <Image
                                  src={promotion.image}
                                  alt={`promotion-${promotion.id}`}
                                  width={400}
                                  height={210}
                                  className="object-cover w-full h-full"
                              />
                          </Link>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  );
}

export default PromotionFive