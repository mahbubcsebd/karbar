import ProductDetailsPage from "../../components/ProductDetailsPage";
import RelatedProducts from "../../components/RelatedProducts";
import { getProduct } from "../../utils/getProduct";
import { getSiteSettings } from "../../utils/getSiteSettings";

  export async function generateMetadata({ params }) {
      const siteSetting = await getSiteSettings();
        const product = await getProduct('en', params.slug);

        const { name } = product.data;
      return {
          title: `${siteSetting.data.title} | ${name}`,
          icons: {
              icon: siteSetting.data.fev_icon,
              apple: siteSetting.data.fev_icon,
          },
          openGraph: {
              title: siteSetting.data.title,
              description: siteSetting.data.footer_description,
              url: siteSetting.data.website,
              type: 'website',
              images: [
                  {
                      url: siteSetting.data.header_logo,
                      width: 1200,
                      height: 630,
                      alt: 'Karbar Logo',
                  },
              ],
          },
      };
  }

const ProductDetails = async ({params}) => {
    return (
        <>
            <ProductDetailsPage slug={params.slug} />
            <RelatedProducts slug={params.slug} />
        </>
    );
};

export default ProductDetails;
