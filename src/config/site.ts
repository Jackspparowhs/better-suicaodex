export const siteConfig = {
  name: "Manga by PirateRuler",
  url: "https://pirateruler.com",
  ogImage: "https://suicaodex.com/og-image.png",
  // CHANGED: Translated to English
  description: "PirateRuler - The best manga reader on the web",
  links: {
    discord: "https://pirateruler.com",
    github: "https://pirateruler.com",
    facebook: "https://pirateruler.com",
  },
  mangadexAPI: {
    webURL: "https://mangadex.org",
    baseURL: "https://api.mangadex.org",
    coverURL: "https://uploads.mangadex.org/covers",
    imgURL: "https://uploads.mangadex.org",
    ogURL: "https://og.mangadex.org/og-image",
    staffPickList: "805ba886-dd99-4aa4-b460-4bd7c7b71352",
    seasonalList: "68ab4f4e-6f01-4898-9038-c5eee066be27",
  },
  suicaodex: {
    domain: "https://pirateruler.com",
    dev_domain: "https://dev.suicaodex.com",
    apiURL: "https://api2.suicaodex.com", //pls use your own proxy server; or use built-in proxy, see /lib/axios.ts
  },
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
