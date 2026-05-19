"use client";
 
import { motion } from "framer-motion";
import { Scale, ShoppingBag, MapPin, Building2, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
 
const services = [
  {
    icon: Scale,
    title: "Law Firm SEO",
    subtitle: "Family Law, Personal Injury, Criminal Defense",
    description:
      "We help attorneys rank for high-intent searches in their practice area and city. More rankings, more consultations, more cases.",
    tags: [
      "Family Law SEO",
      "Personal Injury",
      "Criminal Defense",
      "E-E-A-T",
      "Legal Content",
      "AEO",
    ],
    features: [
      "Practice area page optimization (custody, divorce, DUI)",
      "Google Business Profile optimization for local maps",
      "E-E-A-T content strategy highlighting attorney credentials",
      "Local citation building (Avvo, Justia, FindLaw)",
      "Monthly rank tracking + lead attribution reporting",
    ],
    cta: "Get Law Firm SEO Audit",
  },
  {
    icon: ShoppingBag,
    title: "Shopify & Ecommerce SEO",
    subtitle: "DTC Brands & Online Retailers",
    description:
      "Technical and content SEO built for Shopify stores scaling in the US market. We fix what holds you back and build authority that drives organic sales.",
    tags: [
      "Shopify SEO",
      "Collection Pages",
      "Core Web Vitals",
      "Product Schema",
      "Technical Audit",
      "Link Building",
    ],
    features: [
      "Full Shopify technical audit (indexation, speed, crawl)",
      "Collection and product page keyword mapping",
      "Core Web Vitals optimization for Shopify themes",
      "Product, FAQ, and breadcrumb schema implementation",
      "Niche-relevant link building for US ecommerce",
    ],
    cta: "Get Ecommerce SEO Audit",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    subtitle: "Small Business Owners & Service Providers",
    description:
      "Dominate local search results and Google Maps. We help local businesses become the go-to choice in their service area.",
    tags: [
      "Google Maps",
      "GBP Optimization",
      "Local Citations",
      "Review Management",
      "NAP Consistency",
      "Local Links",
    ],
    features: [
      "Google Business Profile setup and optimization",
      "Local keyword research and on-page optimization",
      "Citation building across 50+ local directories",
      "Review generation and reputation management",
      "Local link building from community sources",
    ],
    cta: "Get Local SEO Audit",
  },
  {
    icon: Building2,
    title: "Enterprise SEO",
    subtitle: "Mid-Size & Enterprise Companies",
    description:
      "Scalable SEO strategies for growing companies. We handle complex sites, multiple locations, and enterprise-level reporting.",
    tags: [
      "Enterprise Strategy",
      "Multi-Location",
      "Technical SEO",
      "Content at Scale",
      "International SEO",
      "Analytics",
    ],
    features: [
      "Enterprise technical SEO audit and remediation",
      "Multi-location SEO strategy and execution",
      "Programmatic SEO for large-scale content",
      "Advanced analytics and attribution modeling",
      "Stakeholder reporting and executive dashboards",
    ],
    cta: "Get Enterprise SEO Audit",
  },
];
 
export default function Services() {
  return (
    <section id="services" className="bg-[#f7f8fc] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#1a3c8f]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#1a3c8f]">
            Our Services
          </span>
          <h2 className="mb-4 text-4xl font-black text-[#0a0f2e] sm:text-5xl">
            <span className="text-balance">SEO Services for Every Business Type</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#64748b]">
            From local service providers to enterprise companies, we deliver SEO strategies tailored to your industry and goals.
          </p>
        </motion.div>
 
        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all hover:shadow-xl"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#f7f8fc] transition-colors group-hover:bg-[#1a3c8f]">
                <service.icon className="h-7 w-7 text-[#1a3c8f] transition-colors group-hover:text-white" />
              </div>
 
              {/* Title */}
              <h3 className="mb-1 text-xl font-bold text-[#0a0f2e]">
                {service.title}
              </h3>
              <p className="mb-3 text-sm font-medium text-[#2563eb]">
                {service.subtitle}
              </p>
 
              {/* Description */}
              <p className="mb-4 text-sm text-[#64748b]">{service.description}</p>
 
              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {service.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#e5e7eb] bg-white px-2 py-0.5 text-[10px] font-medium text-[#64748b]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
 
              {/* Features */}
              <ul className="mb-6 flex-1 space-y-2">
                {service.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#22c55e]" />
                    <span className="text-xs text-[#374151]">{feature}</span>
                  </li>
                ))}
              </ul>
 
              {/* CTA */}
              <Link
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#0a0f2e] px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#0a0f2e] transition-all hover:bg-[#0a0f2e] hover:text-white"
              >
                {service.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.article>
          ))}
        </div>
 
        {/* EEAT Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-2xl border border-[#e5e7eb] bg-white p-8"
        >
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="mb-2 text-3xl font-black text-[#1a3c8f]">5+</p>
              <p className="text-sm font-medium text-[#64748b]">Years Hands-On Experience</p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl font-black text-[#1a3c8f]">20+</p>
              <p className="text-sm font-medium text-[#64748b]">US Businesses Served</p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl font-black text-[#1a3c8f]">50</p>
              <p className="text-sm font-medium text-[#64748b]">States Covered</p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-3xl font-black text-[#1a3c8f]">100%</p>
              <p className="text-sm font-medium text-[#64748b]">Founder-Led Work</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
 


