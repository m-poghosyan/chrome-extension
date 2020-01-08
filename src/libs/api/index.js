import axios from "axios";

export const DEFAULT_HTTP_HEADERS = {
  "Content-Type": "application/json"
};

export const validateStatus = status => {
  return status >= 200 && status < 300;
};

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: DEFAULT_HTTP_HEADERS,
  validateStatus: validateStatus
});

/**
 * @typedef {Object} Shop
 * @property {number} shop_id
 * @property {string} title_en
 * @property {string} host
 * @property {string} site_url
 * @property {Object} counters
 */

// TODO csrf
// TODO security
// TODO replace calculations/filters on frontend with backend

/**
 * @returns {Promise.<Array.<Shop>>}
 */
export const fetchActiveShops = async () => {
  const response = await client.get("/rss/shops.json/");
  // TODO return normal shops from API, but not Map<ShopId, Shop>
  return Object.values(response.data.items);
};

/**
 * @typedef {Object} Coupon
 * @property {number} coupon_id
 * @property {string} coupon_code
 * @property {string} coupon_description
 * @property {string} coupon_date_start
 * @property {string} coupon_date_end
 * @property {string} coupon_link
 * @property {number} shop_id
 * @property {string} shop_host
 * @property {string} shop_site_url
 * @property {string} shop_title_en
 * @property {string} title
 */

/**
 * @param {number|?} shopId
 * @returns {Promise.<Array.<Coupon>>}
 */
export const fetchActiveCoupons = async shopId => {
  const response = await client.get(`/rss/shops/${shopId || 0}/coupons.json/`);
  return response.data;
};

/**
 * @typedef CouponUrl
 * @property {string} url
 *
 * @param {number} couponId
 * @returns {Promise.<CouponUrl>}
 */
export const fetchCouponUrl = async couponId => {
  const response = await client.get(`/rss/coupons/${couponId}/url.json/`);
  return response.data;
};
