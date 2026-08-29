// X/Twitter reuses the OG card. The renderer is re-exported rather than
// duplicated so the two can never drift apart, and `alt`/`size`/`contentType`
// come across with it because Next reads those from this file, not from the
// module it wraps.
//
// `runtime` is deliberately not among them: Next parses these route config
// exports statically and cannot follow a re-export, so naming it here only
// produced a build warning while having no effect.
export { default, alt, size, contentType } from "./opengraph-image";
