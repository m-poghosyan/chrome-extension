/*global chrome*/
import { extractTopDomain } from "../urlUtils";
export const isChromeExtension = () => chrome && chrome.tabs;

export const openInNewTab = url => {
  if (!isChromeExtension()) {
    window.open(url);
  } else {
    chrome.tabs.create({ active: true, url });
  }
};

export const fetchCurrentUrl = () => {
  if (!isChromeExtension()) {
    return new Promise(resolve => resolve(window.location.href));
  }
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      tabs => {
        if (!Array.isArray(tabs) || tabs.length === 0) {
          reject("No tabs found");
        }
        return resolve(tabs[0].url);
      }
    );
  });
};

export const fetchCurrentHost = async (defaultHost = "localhost") => {
  try {
    const currentUrl = await fetchCurrentUrl();
    return extractTopDomain(currentUrl);
  } catch (e) {
    return defaultHost;
  }
};

// TODO add catch/reject blocks
export const Storage = {
  set: (key, value) => {
    if (!isChromeExtension()) {
      return new Promise(resolve => {
        const stringifiedValue = JSON.stringify(value);
        localStorage.setItem(key, stringifiedValue);
        resolve(stringifiedValue);
      });
    }
    return new Promise(resolve => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  },

  get: key => {
    if (!isChromeExtension()) {
      return new Promise(resolve => {
        const value = localStorage.getItem(key);
        try {
          resolve(JSON.parse(value));
        } catch (e) {
          resolve(null);
        }
      });
    }
    return new Promise(resolve => {
      chrome.storage.local.get(response => {
        resolve(response[key]);
      });
    });
  }
};
