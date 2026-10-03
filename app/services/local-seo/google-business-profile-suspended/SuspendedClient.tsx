"use client";

// app/services/local-seo/google-business-profile-suspended/SuspendedClient.tsx
//
// Google Business Profile suspension help — a spoke of /services/local-seo,
// on the ServiceBands layout. Copy and FAQ live in ./data.ts.
//
// Competitors for this search (checked 4 Oct 2026) lead with "98%" and "99%"
// reinstatement rates and "no fee until reinstated". SearchPrex has no
// published reinstatement case, so this page leads with a straight answer
// instead of a number, and with Google's own rules.

import { AlertTriangle } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import TrustStrap from "@/components/TrustStrap";
import { AuthorCard, FaqList } from "@/components/layout";
import {
  INK,
  Band,
  BandIntro,
  CheckList,
  CheckPanel,
  Eyebrow,
  FaqBand,
  H2,
  Lead,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
  TextLink,
} from "@/components/ServiceBands";

import { CAPSULES, CAUSES, CHECKS, FAQS, INCLUDED, META } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:local-seo/google-business-profile-suspended";
const GUIDE = "/blog/google-business-profile-suspended";

const PROCESS = [
  { when: "Within 24 hours", title: "Free review", body: "The violation reason, your profile and your documents checked — a written answer on what caused it and what has to change." },
  { when: "Next", title: "Profile fixed", body: "Name, address type, service areas, duplicates and categories brought inside Google’s guidelines." },
  { when: "Then", title: "Evidence matched", body: "Documents chosen so the business name and address match the profile exactly." },
  { when: "Finally", title: "Appeal & prevention", body: "The appeal submitted through Google’s tool, then the profile monitored so it stays inside the rules." },
];

const RELATED = [
  { href: GUIDE, title: "Do it yourself: the reinstatement guide", body: "Five steps, in Google’s own words, with the mistakes that make it worse." },
  { href: "/blog/google-maps-ranking-drop", title: "Ranking dropped, not suspended?", body: "Check the profile before blaming an algorithm." },
  { href: "/services/local-seo/google-business-profile-optimization", title: "Google Business Profile optimization", body: "Once you’re back: a profile set up to bring calls." },
  { href: "/resources/google-business-profile-checklist", title: "Free GBP checklist", body: "23 checks written to Google’s own rules. No email." },
];

export default function SuspendedClient() {
  return (
    <main>
      <ServiceHero
        crumb="GBP Suspended"
        parent={{ label: "Local SEO", href: "/services/local-seo" }}
        eyebrow="Google Business Profile suspended"
        title={META.h1}
        accent={META.accent}
        subtitle="Your profile vanished from Google Maps and you can’t edit it. Calls have stopped. An appeal for a profile that still breaks a rule, or with documents that don’t match it, gives Google a reason to say no. I find the real cause, fix it, and only then appeal."
        primary={{ href: "#causes", label: "See the usual causes" }}
        secondary={{ href: GUIDE, label: "Do it yourself (free guide)" }}
        trustPoints={["The founder does the work", "Free 24-hour review", "No fake success rates"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free suspension review",
              sub: "Send your website. I’ll tell you what most likely caused the suspension and what has to change before you appeal — within 24 hours.",
            }}
          />
        }
      />

      {/* THE STRAIGHT ANSWER */}
      <Band muted>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>A straight answer first</Eyebrow>
          <H2 center>No one can guarantee a reinstatement</H2>
          <Lead center>
            Only Google reinstates profiles. Services that promise a guaranteed outcome or a near-perfect success rate are promising something they don’t control. I don’t have a published reinstatement case study, so I won’t quote you a rate. What I can do is make sure your profile follows the rules and your evidence matches it — the two things Google’s own appeal instructions focus on.
          </Lead>
          <TextLink href={GUIDE}>Prefer to do it yourself? Read the free guide</TextLink>
        </div>
      </Band>

      <TrustStrap />

      {/* CAUSES */}
      <Band id="causes">
        <BandIntro
          center={false}
          eyebrow="The usual causes"
          title="Why Google suspends Business Profiles"
          lead="Six causes behind most suspensions, with Google’s own wording and the fix for each. Google’s appeals tool tells you which one it thinks applies to you."
        />
        <RuleGrid columns={3}>
          {CAUSES.map((c) => (
            <RuleItem
              key={c.title}
              icon={<AlertTriangle className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
              title={c.title}
              body={
                <>
                  <p className="text-[#374151]">{c.rule}</p>
                  <p className="mt-1"><strong className="text-[#374151]">Fix:</strong> {c.fix}</p>
                </>
              }
            />
          ))}
        </RuleGrid>
      </Band>

      {/* WHAT'S INCLUDED */}
      <Band dark>
        <BandIntro
          dark
          eyebrow="What I do"
          title="Fix first, appeal once"
          lead="An appeal for a profile that still breaks the guidelines, or with documents that don’t match it, gives Google a reason to say no. The order is the whole method."
        />
        <RuleGrid>
          {INCLUDED.map((i) => (
            <RuleItem key={i.title} dark title={i.title} body={i.body} />
          ))}
        </RuleGrid>
      </Band>

      {/* FREE REVIEW */}
      <Band id="review">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>The free review</Eyebrow>
            <H2>What I check before anything is submitted</H2>
            <Lead>
              Every check is about one question: if a Google reviewer compared your profile, your documents and your website line by line, would they match?
            </Lead>
            <Lead>You get the answer in writing within 24 hours, whether or not you hire me.</Lead>
          </div>
          <CheckPanel items={CHECKS} />
        </div>
      </Band>

      {/* DIY OR HELP */}
      <Band muted>
        <BandIntro
          eyebrow="Do it yourself, or get help?"
          title="Many owners can fix this themselves"
          lead="The guide covers every step. Help is worth it when the case is less clear-cut."
        />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <p className="text-sm font-black uppercase tracking-wider" style={{ color: INK }}>Do it yourself if</p>
            <div className="mt-5">
              <CheckList
                items={[
                  "The violation reason is clear, like a keyword in the name",
                  "You have a license or utility bill that matches the profile",
                  "It is a single profile, not your whole account",
                  "This is your first appeal",
                ]}
              />
            </div>
            <TextLink href={GUIDE}>Read the free guide</TextLink>
          </div>
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <p className="text-sm font-black uppercase tracking-wider" style={{ color: INK }}>Get help if</p>
            <div className="mt-5">
              <CheckList
                items={[
                  "Every profile you manage went down at once",
                  "An appeal has already been denied",
                  "You’re unsure whether your address is eligible",
                  "You have several locations or old duplicate profiles",
                ]}
              />
            </div>
            <TextLink href="#get-started">Get the free review</TextLink>
          </div>
        </div>
      </Band>

      {/* WHILE YOU WAIT */}
      <Band>
        <BandIntro
          eyebrow="While you wait"
          title="Keep the phone ringing during the review"
          lead="Google’s review can take a while, and creating a second profile is the one thing not to do. These keep calls coming in the meantime."
        />
        <RuleGrid>
          <RuleItem title="Your website’s service pages" body="Pages for each service and town still rank in the normal results while the profile is down." />
          <RuleItem title="Directories that send calls" body="Yelp, Apple Maps, Bing Places and your trade’s directories — with the same name, address and phone as the profile." />
          <RuleItem title="Paid search, if it pays" body="A short ads campaign on your highest-value searches can bridge the gap until the profile is back." />
        </RuleGrid>
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From suspended to a profile that follows the rules" />
        <Steps steps={PROCESS} cta={{ href: "#get-started", label: "Get my free suspension review" }} />
      </Band>

      {/* WHY SEARCHPREX */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why choose SearchPrex</Eyebrow>
            <H2>No guarantees I can’t keep</H2>
            <Lead>
              You work with the person who reviews your profile and writes your appeal — and who will tell you if you can do it yourself.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work, start to finish",
                  "Only fixes inside Google’s guidelines — no workarounds",
                  "A written answer within 24 hours, free",
                  "Told honestly when you don’t need to hire anyone",
                ]}
              />
            </div>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "#f4f5f8" }}>
            <p className="text-sm font-black uppercase tracking-wider" style={{ color: INK }}>How pricing works</p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              The first review is free: a written answer within 24 hours on what caused the suspension and what has to change. If you want me to handle the fix and the appeal, you see the price before any work starts.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              Once the profile is back, ongoing Business Profile work is part of the local SEO plan.
            </p>
            <TextLink href="/services/local-seo/google-business-profile-optimization">Business Profile optimization</TextLink>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;A suspended profile usually breaks a rule the owner didn&rsquo;t know about — a keyword in the name, a virtual office, an old duplicate. Fix that, match the paperwork, and the appeal has something solid to stand on.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* RELATED */}
      <Band dark>
        <BandIntro dark eyebrow="Keep reading" title="Business Profile guides" />
        <RuleGrid columns={4}>
          {RELATED.map((r) => (
            <RuleItem key={r.href} dark {...r} />
          ))}
        </RuleGrid>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="Suspended profile questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="gbp-suspended-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Profile suspended? Send me your website.",
            sub: "Two fields. What most likely caused it and what has to change before you appeal — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
