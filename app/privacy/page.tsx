import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Privacy Policy - SearchPrex",
  description:
    "SearchPrex privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://searchprex.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy - SearchPrex",
    description: "SearchPrex privacy policy and data protection practices.",
    url: "https://searchprex.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="pt-32">
        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-[#0a0f2e]">Privacy Policy</h1>
            <p className="mt-4 text-[#64748b]">Last updated: January 2026</p>

            <div className="prose prose-lg mt-12 max-w-none text-[#374151]">
              <h2 className="text-2xl font-bold text-[#0a0f2e]">Introduction</h2>
              <p>
                SearchPrex (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your 
                privacy. This Privacy Policy explains how we collect, use, disclose, and 
                safeguard your information when you visit our website searchprex.com or 
                use our services.
              </p>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                Information We Collect
              </h2>
              <h3 className="mt-6 text-xl font-semibold text-[#0a0f2e]">
                Personal Information
              </h3>
              <p>We may collect personal information that you voluntarily provide, including:</p>
              <ul className="list-disc pl-6">
                <li>Name and contact information (email, phone, address)</li>
                <li>Business information (company name, website URL, industry)</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="mt-6 text-xl font-semibold text-[#0a0f2e]">
                Automatically Collected Information
              </h3>
              <p>When you visit our website, we automatically collect:</p>
              <ul className="list-disc pl-6">
                <li>IP address and location data</li>
                <li>Browser type and device information</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website or source</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6">
                <li>Provide, maintain, and improve our SEO services</li>
                <li>Process transactions and send related information</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Analyze usage patterns to improve our website</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                Data Sharing and Disclosure
              </h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6">
                <li>Service providers who assist in our operations</li>
                <li>Professional advisors (lawyers, accountants, auditors)</li>
                <li>Government authorities when required by law</li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
              </p>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                Your Rights
              </h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">
                California Privacy Rights
              </h2>
              <p>
                California residents have additional rights under the California Consumer 
                Privacy Act (CCPA), including the right to know what personal information 
                is being collected and the right to opt-out of the sale of personal information.
              </p>

              <h2 className="mt-8 text-2xl font-bold text-[#0a0f2e]">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us:</p>
              <ul className="list-none pl-0">
                <li><strong>Email:</strong> privacy@searchprex.com</li>
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
