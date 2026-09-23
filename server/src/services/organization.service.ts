/**
 * Common free webmail domains that indicate an individual retail consumer rather than a corporate B2B client
 */
const CONSUMER_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.co.uk",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "aol.com",
  "mail.com",
  "gmx.com",
  "yandex.com",
]);

/**
 * Universal, generalized organization identity resolution
 * 1. Honors explicit organization input if provided
 * 2. Recognizes personal consumer mailboxes as 'Individual'
 * 3. Dynamically extracts and formats any corporate domain into Title Case (zero hardcoded companies)
 */
export const organizationService = {
  resolve(email: string, explicitOrg?: string): string {
    // 1. Explicit organization takes precedence
    if (explicitOrg && explicitOrg.trim()) {
      return explicitOrg.trim();
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return "Individual";
    }

    const domain = email.trim().split("@")[1]?.toLowerCase().trim();
    if (!domain) {
      return "Individual";
    }

    // 2. Personal consumer webmail check
    if (CONSUMER_DOMAINS.has(domain)) {
      return "Individual";
    }

    // 3. Fully dynamic, generalized company extraction (no hardcoded brands)
    // Strip common country code and generic top-level domains (.co.in, .com, .org, .io, etc.)
    const cleanDomain = domain
      .replace(/\.(co|com|org|net|edu|gov|ac|io)\.[a-z]{2,3}$/i, "")
      .replace(/\.[a-z]{2,}$/i, "");

    const baseName = cleanDomain.split(".").pop() || cleanDomain;

    // Convert hyphenated, underscore, or dot-separated words into Title Case (e.g. 'acme-logistics' -> 'Acme Logistics')
    const formatted = baseName
      .split(/[-_.]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return formatted || "Individual";
  },
};
