/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import GlobalProductCard from '@/components/GlobalProductCard';
import SectionTitle from '@/components/SectionTitle';
import useDictionary from '@/hooks/useDictionary';
// import GlobalProductCard from './GlobalProductCard';

const LandingRelatedProducts = ({products}) => {
    const { language, dictionary } = useDictionary();

    if(products.length < 1) return null;

    return (
        <div
            id="product-section"
            className="mb-10 product-section"
        >
            <div className="product-area">
                <div className="container">
                    <SectionTitle
                        title={dictionary.RelatedProducts.relatedTitle}
                    />
                    <div className="product-list grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-[30px] ">
                        {products.map((product) => {
                            return (
                                <GlobalProductCard
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingRelatedProducts;
