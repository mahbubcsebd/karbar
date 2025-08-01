import RatingReadOnly from '@/_components/RatingReadOnly';
import useSiteSetting from '@/_hooks/useSiteSetting';
import productImg from '@/assets/icons/no-available.svg';
import Image from 'next/image';
import Link from 'next/link';

const ShortProduct = ({ product }) => {
  const { siteSetting } = useSiteSetting();
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="flex items-center gap-4">
        <Image
          src={product.preview_image ?? productImg}
          alt="Product 1"
          className="w-[84px] h-[84px] rounded-lg"
          width={84}
          height={84}
          loading="lazy"
          priority={false}
        />
        <div className="flex flex-col">
          <RatingReadOnly rating={product.product_rating || 0} />
          <h4 className="mb-2 text-sm font-bold text-gray-900 capitalize ellipsis-2">
            {product.name}
          </h4>
          <p className="flex items-center gap-1 text-sm text-gray-900 text-semibold">
            {siteSetting.currency_icon || '৳'}
            {product.sale_price}
            <span className="text-xs line-through text-[#DC2B2B]">
              {siteSetting.currency_icon || '৳'}
              {product.unit_price}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ShortProduct;
