import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS as locale } from "date-fns/locale"; // CHANGED: Switched to English locale
import * as cheerio from "cheerio";
import { defaultSchema } from "hast-util-sanitize";
import { siteConfig } from "@/config/site";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlainTextLength(html: string): number {
  const temp = document.createElement("div");
  temp.innerHTML = html;

  // Get plain text and remove newlines, tabs
  const rawText = temp.textContent || temp.innerText || "";
  const cleaned = rawText.replace(/[\n\t\r]/g, "");

  return cleaned.length;
}

export function getPlainTextFromHTML(html: string): string {
  if (!html) return "";

  const $ = cheerio.load(html);
  const text = $.text(); // get all text in HTML
  return text.replace(/\s+/g, " ").trim();
}

export function getContentLength(html: string): number {
  const $ = cheerio.load(html);

  const text = $.text().trim();
  const textLength = text.length;

  const imgCount = $("img").length;

  const totalLength = textLength + imgCount;

  return totalLength;
}

// CHANGED: Translated time units to English
const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}} min",
  xMinutes: "{{count}} min",
  aboutXHours: "{{count}} hr",
  xHours: "{{count}} hr",
  xDays: "{{count}} day",
  aboutXWeeks: "{{count}} wk",
  xWeeks: "{{count}} wk",
  aboutXMonths: "{{count}} mo",
  xMonths: "{{count}} mo",
  aboutXYears: "{{count}} yr",
  xYears: "{{count}} yr",
  overXYears: "{{count}} yr",
  almostXYears: "{{count}} yr",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;

      return result + " ago"; // CHANGED: "trước" to "ago"
    }
  }

  return result;
}

export function formatTimeToNow(date: Date | number): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

export function isFacebookUrl(url: string): boolean {
  return /facebook\.com/.test(url);
}

export const customSchema = {
  ...defaultSchema,
  attributes: {
    ...(defaultSchema.attributes || {}),
    "*": [
      ...((defaultSchema.attributes && defaultSchema.attributes["*"]) || []),
      "style",
      "className",
    ],
    div: [
      ...((defaultSchema.attributes && defaultSchema.attributes["div"]) || []),
      "style",
      "className",
    ],
    span: [
      ...((defaultSchema.attributes && defaultSchema.attributes["span"]) || []),
      "style",
      "className",
    ],
    p: [
      ...((defaultSchema.attributes && defaultSchema.attributes["p"]) || []),
      "style",
      "className",
    ],
    u: [
      ...((defaultSchema.attributes && defaultSchema.attributes["u"]) || []),
      "style",
      "className",
    ],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "div",
    "span",
    "p",
    "u", // Allow <u> tag
  ],
};

let currentWorkingApiUrl: string | null = null;
let currentImageProxyUrl: string | null = null;

export function getCurrentApiUrl(): string {
  return currentWorkingApiUrl || siteConfig.suicaodex.apiURL;
}

export function setCurrentApiUrl(url: string): void {
  currentWorkingApiUrl = url;
}

export function getCurrentImageProxyUrl(): string {
  return currentImageProxyUrl || siteConfig.suicaodex.apiURL;
}

export function setCurrentImageProxyUrl(url: string): void {
  currentImageProxyUrl = url;
}

export function getCoverImageUrl(
  mangaId: string,
  fileName: string,
  size: string = ""
): string {
  // Use image proxy URL instead of API URL
  const apiUrl = getCurrentImageProxyUrl();

  if (size === "full") {
    return `${apiUrl}/covers/${mangaId}/${fileName}`;
  }

  const sizeStr = size ? `.${size}` : "";
  return `${apiUrl}/covers/${mangaId}/${fileName}${sizeStr}.jpg`;
}

const SUPPORTED_URL_PROTOCOLS = new Set([
  "http:",
  "https:",
  "mailto:",
  "sms:",
  "tel:",
]);

export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    // eslint-disable-next-line no-script-url
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return "about:blank";
    }
  } catch {
    return url;
  }
  return url;
}

// Source: https://stackoverflow.com/a/8234912/2013580
const urlRegExp = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
);
export function validateUrl(url: string): boolean {
  // TODO Fix UI for link insertion; it should never default to an invalid URL such as https://.
  // Maybe show a dialog where they user can type the URL before inserting it.
  return url === "https://" || urlRegExp.test(url);
}

export function formatNumber(num: number): string {
  const f = Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });
  return f.format(num);
}

export function generateSlug(title: string): string {
  if (!title) return "";
  return slugify(title, {
    lower: true,
    locale: "en", // CHANGED: 'vi' to 'en'
    remove: /[*+~.,()'"!?:@\[\]]/g,
  });
}
