// X/Twitter reuses the OG card. Re-exported rather than duplicated so the two
// can never drift, and `alt`/`size`/`contentType` come across with it because
// Next reads those from this file, not from the module it wraps.
export { default, alt, size, contentType } from "./opengraph-image";
