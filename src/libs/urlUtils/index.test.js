const { extractTopDomain, findCurrentShop } = require("./index");

const shops = [
  { shop_id: "4", host: "aliexpress.com" },
  { shop_id: "7", host: "sendflowers.ru" },
  { shop_id: "29", host: "grand-flora.ru" },
  { shop_id: "30", host: "groupon.ru" },
  { shop_id: "46", host: "lightinthebox.com" },
  { shop_id: "51", host: "miniinthebox.com" },
  { shop_id: "53", host: "mytoys.ru" },
  { shop_id: "61", host: "shop.philips.ru" },
  { shop_id: "78", host: "yves-rocher.ru" },
  { shop_id: "89", host: "letoile.ru" },
  { shop_id: "98", host: "shop.snq.ru" },
  { shop_id: "117", host: "kupivip.ru" },
  { shop_id: "140", host: "shop.vichyconsult.ru" },
  { shop_id: "142", host: "notik.ru" },
  { shop_id: "144", host: "bookvoed.ru" },
  { shop_id: "148", host: "holodilnik.ru" },
  { shop_id: "149", host: "yoox.com" },
  { shop_id: "156", host: "gearbest.com" }
];

const shopsHosts = [
  "aliexpress.com",
  "sendflowers.ru",
  "grand-flora.ru",
  "groupon.ru", // FAILED because redirects to groupon.com
  "lightinthebox.com",
  "miniinthebox.com",
  "mytoys.ru",
  "shop.philips.ru",
  "yves-rocher.ru",
  "letoile.ru",
  "shop.snq.ru",
  "kupivip.ru",
  "shop.vichyconsult.ru",
  "notik.ru",
  "bookvoed.ru",
  "holodilnik.ru",
  "yoox.com",
  "gearbest.com"
];

describe("App.js", () => {
  describe("extractTopDomain", () => {
    it("return localhost when url is null", () => {
      expect(extractTopDomain(null)).toBe("");
    });
    it("return localhost when url is undefined", () => {
      expect(extractTopDomain()).toBe("");
    });
    it("return string when url is strange string", () => {
      expect(extractTopDomain("wrong")).toBe("wrong");
    });
    it("return domain when url is simple", () => {
      expect(extractTopDomain("simple.com")).toBe("simple.com");
    });
    it("return domain when url has http", () => {
      expect(extractTopDomain("http://simple.com")).toBe("simple.com");
    });
    it("return domain when url has https", () => {
      expect(extractTopDomain("https://simple.com")).toBe("simple.com");
    });
    it("return domain when url non-http protocol", () => {
      expect(extractTopDomain("file://simple.com")).toBe("simple.com");
    });
    it("return domain when url has www", () => {
      expect(extractTopDomain("www.simple.com")).toBe("simple.com");
    });
    it("return domain when url has http and www", () => {
      expect(extractTopDomain("http://www.simple.com")).toBe("simple.com");
    });
    it("return domain when url has https and www", () => {
      expect(extractTopDomain("https://www.simple.com")).toBe("simple.com");
    });
    it("return domain when url has query params", () => {
      expect(extractTopDomain("simple.com?x=123")).toBe("simple.com");
    });
    it("return domain when url has hash params", () => {
      expect(extractTopDomain("simple.com#x=123")).toBe("simple.com");
    });
    it("return domain when url has hash and query params", () => {
      expect(extractTopDomain("simple.com?y=456#x=123")).toBe("simple.com");
    });
    it("return domain when url has trailing slash", () => {
      expect(extractTopDomain("simple.com/")).toBe("simple.com");
    });
    it("return domain when url has suburl", () => {
      expect(extractTopDomain("simple.com/test")).toBe("simple.com");
    });
    it("return domain when url has many suburls", () => {
      expect(extractTopDomain("simple.com/test/123/rt/43535")).toBe(
        "simple.com"
      );
    });
    it("return domain when url has subdomain", () => {
      expect(extractTopDomain("bla.simple.com")).toBe("simple.com");
    });
    it("return domain when url has 3 subdomains", () => {
      expect(extractTopDomain("foo.bar.bla.simple.com")).toBe("simple.com");
    });
    it("return domain when url is really complex", () => {
      expect(
        extractTopDomain(
          "https://foo.bar.bla.simple.eu/suburl/subsuburl?x=123&y=456#foo=bar&bla=456"
        )
      ).toBe("simple.eu");
    });
    // SKIPPED cause not implemented
    it.skip("return domain when url has 3 subdomains", () => {
      expect(extractTopDomain("google.com.eu")).toBe("google.com");
    });
  });

  describe("findCurrentShop", () => {
    shopsHosts.forEach(shopHost => {
      it(`when shop domain is ${shopHost}`, () => {
        const shop = findCurrentShop(shops, shopHost);

        expect(shop).not.toBeUndefined();
        expect(shop).not.toBeNull();
      });
    });
  });
});
