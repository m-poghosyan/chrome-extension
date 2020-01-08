import parseUrl from "url-parse-lax";

export const extractTopDomain = url => {
  const domain = parseUrl(url || "").hostname;
  const domainParts = domain.split(".");

  const domainPartsLength = domainParts.length;
  if (domainPartsLength === 0) {
    return null; // failed domain
  }
  if (domainPartsLength === 1) {
    return domainParts[0]; // localhost
  }
  // aliexpress.com from https:://ru.aliexpress.com
  return (
    domainParts[domainPartsLength - 2] +
    "." +
    domainParts[domainPartsLength - 1]
  );
};

export const findCurrentShop = (shops, currentHost) => {
  if (!currentHost || !shops) {
    return null;
  }

  const currentTopDomain = extractTopDomain(currentHost);
  return shops.find(shop => currentTopDomain === extractTopDomain(shop.host));
};
