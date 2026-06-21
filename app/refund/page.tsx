import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#eaecf3] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex mb-10">
          <Logo size="md" variant="dark" />
        </Link>

        <h1 className="text-3xl font-black text-[#0a0f2e] mb-2">Refund Policy</h1>
        <p className="text-[#64748b] text-sm mb-8">Last updated: June 2026</p>

        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 space-y-6 text-sm text-[#374151] leading-relaxed">
          <section>
            <h2 className="font-bold text-[#0a0f2e] mb-2">SEO Growth Roadmap ($2 Audit)</h2>
            <p>
              This is a digital report delivered to your email within 24 hours of payment.
              Because the product is digital and delivered quickly, refunds are not offered
              once the report has been sent. If you do not receive your audit within 48 hours
              of payment, contact us for a full refund.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#0a0f2e] mb-2">NicheSEOPro AI (Subscriptions)</h2>
            <p>
              Refund terms for NicheSEOPro AI subscription plans will be displayed at checkout
              once the product is live.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#0a0f2e] mb-2">How to Request a Refund</h2>
            <p>
              Email us at <a href="mailto:contact@searchprex.com" className="text-[#3eb489] font-semibold">support@searchprex.com</a> with
              your order email and reason for the request. Approved refunds are processed within
              5–10 business days to your original payment method.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[#0a0f2e] mb-2">Payment Processing</h2>
            <p>
              All payments are processed securely by Paddle.com, our payment provider and
              Merchant of Record. Charges on your statement will appear as "Paddle.net".
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}