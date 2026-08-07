// components/layout/index.ts
// The SearchPrex page-shell primitives. Every page outside the home page, the
// case studies, /experts and /why-us is assembled from these — that is what
// makes the site read as one product instead of twenty.
//
// Rule of thumb: if you are about to write a <section> with its own padding,
// its own hex colour, or its own heading size, use one of these instead.

export { default as Section } from "./Section";
export type { SectionProps, SectionTone, SectionWidth } from "./Section";

export { default as Breadcrumb } from "./Breadcrumb";
export type { Crumb } from "./Breadcrumb";

export { default as Prose } from "./Prose";
export type { ProseProps } from "./Prose";

export { default as SectionHeading } from "./SectionHeading";
export type { SectionHeadingProps } from "./SectionHeading";

export { default as PageHero, Accent } from "./PageHero";
export type { PageHeroProps, HeroCta } from "./PageHero";

export { default as CtaButton } from "./CtaButton";
export type { CtaButtonProps, CtaVariant } from "./CtaButton";

export { default as CtaBand } from "./CtaBand";
export type { CtaBandProps, CtaBandAction } from "./CtaBand";

export { default as HeroPanel, HeroPanelStats } from "./HeroPanel";
export type { HeroPanelProps } from "./HeroPanel";

export { default as CaseStudyPanel } from "./CaseStudyPanel";
export type { CaseStudyPanelProps, CaseStudyMetric } from "./CaseStudyPanel";

export { default as VideoGallery, NarrativeCard } from "./VideoGallery";
export type { VideoGalleryProps, GalleryVideo } from "./VideoGallery";

export { default as StatStrip } from "./StatStrip";
export type { StatStripProps, Stat } from "./StatStrip";

export { default as CardGrid, FeatureCard } from "./CardGrid";
export type { CardGridProps, CardGridVariant, FeatureCardProps } from "./CardGrid";

export { default as FaqList } from "./FaqList";
export type { FaqListProps, Faq } from "./FaqList";

export { default as ComparisonTable } from "./ComparisonTable";
export type { ComparisonTableProps, ComparisonRow, CellValue } from "./ComparisonTable";

export { default as AuthorCard } from "./AuthorCard";
export type { AuthorCardProps } from "./AuthorCard";
