import { decrypt } from '@/_services/encryption';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const business_category =
  process.env.NEXT_PUBLIC_API_BUSINESS_CATEGORY || 'default';

// ✅ 1. All Products
export async function getAllProduct(
  lang = 'en',
  category = null,
  subCategory = '',
  sort_by = null,
  search = '',
  page = 1,
  perPage = 12,
  brandId = 'all',
  token = null,
  isRetailer = false
) {
  const headers = {};

  const retailerFlag = String(isRetailer) === 'true' || isRetailer === true;
  if (token && retailerFlag) {
    headers['Authorization'] = `Bearer ${decrypt(token)}`;
  }

  const res = await fetch(
    `${baseUrl}/${lang}/products?search=${search}&category=${category}&sub_category=${subCategory}&page=${page}&perPage=${perPage}&sort_by=${sort_by}&brand_id=${brandId}&business_category=${business_category}`,
    {
      cache: 'no-store',
      headers,
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

// ✅ 2. Category Wise Products
export async function getCategoryWiseProduct(
  lang = 'en',
  token = null,
  isRetailer = false,
  perPage = 8
) {
  const headers = {};

  const retailerFlag = String(isRetailer) === 'true' || isRetailer === true;
  if (token && retailerFlag) {
    headers['Authorization'] = `Bearer ${decrypt(token)}`;
  }

  const res = await fetch(
    `${baseUrl}/${lang}/category-wise-products?perPage=${perPage}&business_category=${business_category}`,
    {
      cache: 'no-store',
      headers,
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch Category wise product');
  }

  return res.json();
}

// ✅ 3. Single Product
export async function getProduct(
  lang = 'en',
  uuid,
  token = null,
  isRetailer = false
) {
  const headers = {};

  const retailerFlag = String(isRetailer) === 'true' || isRetailer === true;
  if (token && retailerFlag) {
    headers['Authorization'] = `Bearer ${decrypt(token)}`;
  }

  const res = await fetch(`${baseUrl}/${lang}/product/${uuid}`, {
    cache: 'no-store',
    headers,
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}
