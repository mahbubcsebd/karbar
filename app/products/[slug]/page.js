import ProductDetailsPage from "../../components/ProductDetailsPage";
import RelatedProducts from "../../components/RelatedProducts";
import { getProduct } from "../../utils/getProduct";
import { getSiteSettings } from "../../utils/getSiteSettings";

export async function generateMetadata({ params }) {
    const siteSetting = await getSiteSettings();
    const product = await getProduct('en', params.slug);

    const {
        name,
        description,
        product_images,
        unit_price,
        sale_price,
        sku_code,
        stock
    } = product.data;

    // Generate keywords from name by splitting and removing special characters
    const generateKeywords = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .split(/\s+/) // Split by whitespace
            .filter(word => word.length > 2) // Remove words shorter than 3 characters
            .join(', ');
    };

    const nameKeywords = generateKeywords(name);
    const titleKeywords = generateKeywords(siteSetting.data.title);

    // Format price for structured data
    const currentPrice = sale_price > 0 ? sale_price : unit_price;

    return {
        title: `${name} | ${siteSetting.data.title}`,
        description: description || `Buy ${name} from ${siteSetting.data.title}`,
        keywords: `${nameKeywords}, ${titleKeywords}, online shopping`,
        openGraph: {
            title: name,
            description: description,
            type: 'website',
            url: `${siteSetting.data.website}/products/${params.slug}`,
            images: [
                {
                    url: product_images[0].original_url,
                    width: 800,
                    height: 600,
                    alt: name,
                },
            ],
            siteName: siteSetting.data.title,
        },
        twitter: {
            card: 'product',
            title: name,
            description: description,
            images: product_images[0].original_url,
        },
        alternates: {
            canonical: `${siteSetting.data.website}/products/${params.slug}`,
        },
        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
        other: {
            'product:price:amount': currentPrice,
            'product:price:currency': 'BDT',
            'product:availability': stock > 0 ? 'in stock' : 'out of stock',
            'product:condition': 'new',
            'product:brand': 'Samsung',
            'product:sku': sku_code,
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
