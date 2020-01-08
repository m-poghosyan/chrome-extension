/* global chrome */

import * as Analytics from "../libs/analytics";
import * as API from "../libs/api";
import * as UrlUtils from "../libs/urlUtils";
import { Storage } from "../libs/extensionUtils";
import { lessThanSeveralMinutesAgo } from "./dateUtils";

const SHOPS_CACHE_KEY = "promocot-shops";

Analytics.init();
// Analytics.event("start-browser", "chrome");

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === "install") {
    Analytics.event("install", "chrome");
    chrome.tabs.create({ url: process.env.REACT_APP_INSTALL_URL });
  }
});
chrome.runtime.setUninstallURL(process.env.REACT_APP_UNINSTALL_URL);

// TODO Try replace with webNavigation.onCommited
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Skip non http tabs
  if (!tabId || !tab || !tab.url || !tab.url.startsWith("http")) {
    return;
  }

  try {
    const shops = await fetchShopsFromCacheOrApi();
    const shop = UrlUtils.findCurrentShop(
      shops,
      UrlUtils.extractTopDomain(tab.url)
    );
    if (!shop || !shop.counters || !shop.counters.show) {
      return;
    }

    // Show badge icon under open extension popup button
    chrome.browserAction.setBadgeText({ text: `${shop.counters.show}`, tabId });
  } catch (e) {
    console.log("Failed to set badge text", e);
  }
});

const fetchShopsFromCacheOrApi = async () => {
  const cache = await Storage.get(SHOPS_CACHE_KEY);

  if (cache && lessThanSeveralMinutesAgo(new Date(cache.updated_at))) {
    return cache.shops;
  }

  const shops = await API.fetchActiveShops();

  await Storage.set(SHOPS_CACHE_KEY, {
    shops,
    updated_at: new Date().toISOString() // chrome store can't normally save Date object
  });

  return shops;
};
