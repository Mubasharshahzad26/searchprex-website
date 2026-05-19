import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Terms and Conditions - SearchPrex",
  description:
    "SearchPrex terms and conditions. Read our service agreement, payment terms, and policies.",
  alternates: {
    canonical: "https://searchprex.com/terms",
  },
  openGraph: {
    title: "Terms and Conditions - SearchPrex",
    description: "SearchPrex terms of service and conditions of use.",
    url: "https://searchprex.com/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="pt-32">
        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-[#0a0f2e]">
              Terms and Conditions
            </h1>
            <p className="mt-4 text-[#64748b]">Last updated: January 2026</p>

            <div className="prose prose-lg mt-12 max-w-none text-[#374151]">
              <h2 className="text-2xl font-bold text-[#0a0f2e]">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using SearchPrex&apos;s website and services, you agree to 
                be bound by these Terms and Conditions. If you disagree with any part of 
                these terms, you may not access our services.
              </p>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                2. Services Description
              </h2>
              <p>
                SearchPrex provides search engine optimization (SEO) services including 
                but not limited to:
              </p>
              <ul className="list-disc pl-6">
                <li>Technical SEO audits and implementation</li>
                <li>On-page and off-page optimization</li>
                <li>Content strategy and creation</li>
                <li>Link building services</li>
                <li>Local SEO and Google Business Profile optimization</li>
                <li>SEO consulting and strategy</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                3. Payment Terms
              </h2>
              <h3 className="mt-6 text-xl font-semibold text-[#0a0f2e]">
                3.1 Pricing
              </h3>
              <p>
                All prices are quoted in US dollars. Pricing is based on the scope of 
                services agreed upon in the proposal or service agreement.
              </p>

              <h3 className="mt-6 text-xl font-semibold text-[#0a0f2e]">
                3.2 Payment Schedule
              </h3>
              <p>
                Monthly retainer fees are due on the 1st of each month. Setup fees and 
                one-time charges are due upon signing of the service agreement.
              </p>

              <h3 className="mt-6 text-xl font-semibold text-[#0a0f2e]">
                3.3 Late Payments
              </h3>
              <p>
                Payments overdue by more than 15 days may result in suspension of services. 
                A late fee of 1.5% per month may be applied to overdue balances.
              </p>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                4. 90-Day Money-Back Guarantee
              </h2>
              <p>
                We offer a 90-day money-back guarantee on all new engagements. If you 
                don&apos;t see measurable progress (defined as improvement in rankings, traffic, 
                or leads) within 90 days of campaign launch, we will either:
              </p>
              <ul className="list-disc pl-6">
                <li>Continue working at no charge until results are achieved, or</li>
                <li>Provide a full refund of fees paid during the guarantee period</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                5. Contract Term and Cancellation
              </h2>
              <p>
                All SearchPrex services operate on a month-to-month basis unless otherwise 
                specified in writing. Either party may cancel services with 30 days written notice.
              </p>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                6. Client Responsibilities
              </h2>
              <p>To ensure optimal results, clients agree to:</p>
              <ul className="list-disc pl-6">
                <li>Provide timely access to website, analytics, and other required tools</li>
                <li>Review and approve content within 5 business days</li>
                <li>Implement technical recommendations in a timely manner</li>
                <li>Provide accurate business information</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                7. Results Disclaimer
              </h2>
              <p>
                SEO results depend on many factors outside our control including search 
                engine algorithm changes, competitor actions, and market conditions. We 
                do not guarantee specific rankings, traffic levels, or revenue outcomes.
              </p>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                8. Governing Law
              </h2>
              <p>
                These Terms shall be governed by the laws of the State of Illinois, 
                United States, without regard to conflict of law provisions.
              </p>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                9. Contact Information
              </h2>
              <p>For questions about these Terms, please contact us:</p>
              <ul className="list-none pl-0">
                <li><strong>Email:</strong> legal@searchprex.com</li>
                <li><strong>Phone:</strong> +92 310 652 6316</li>
                <li>
                  <strong>Address:</strong> 1250 Executive Place, Suite 450, Geneva, IL 60134, USA
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
