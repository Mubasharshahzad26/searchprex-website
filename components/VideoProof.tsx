// components/VideoProof.tsx
//
// "Recorded live" — screen recordings made inside each client's own accounts,
// placed on the home page directly after the revenue screenshots.
//
// A walkthrough video was removed from this page on 29 Aug 2026 because it
// was a recording of a spreadsheet, which is no harder to fake than a
// screenshot. These three are different in kind: a live Search Console
// session, a live Google search typed on camera, and a live WooCommerce admin.
// The Remit Choice video is a product demo, not proof of a result, so it is
// not here.
//
// Thumbnails only until clicked (VideoGallery), so the section costs no
// third-party JavaScript on load.

import { Section, SectionHeading, VideoGallery, type GalleryVideo } from "@/components/layout";

const VIDEOS: GalleryVideo[] = [
  {
    id: "Y5PxSECNGP0",
    title: "Search Console, live: Michigan Sports & Outdoor",
    sub: "The store's own Performance report in Google Search Console, with the comparison ranges set on screen.",
  },
  {
    id: "g_1TfDU4YeA",
    title: "A Google search, typed live: Local HVAC Services",
    sub: "The query “free cost estimation of ac installation in simi valley ca” typed in real time, and the result it returns.",
  },
  {
    id: "gFod-dTY-bg",
    title: "WooCommerce admin, live: SMK Store",
    sub: "From the storefront into the store's own dashboard — where the monthly sales figures above come from.",
  },
];

export default function VideoProof() {
  return (
    <Section id="recorded-live">
      <SectionHeading
        eyebrow="Recorded live"
        title="Don't take the screenshots on trust — watch them"
        intro="Unedited screen recordings from inside each client's own accounts. A screenshot can be edited; a live session moving through the real account is far harder to fake."
      />
      <VideoGallery videos={VIDEOS} badge="Recorded live" columns={3} />
    </Section>
  );
}
