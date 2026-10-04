import React from "react";
import { ShieldCheck, Receipt, Clock, CreditCard } from "lucide-react";

export function PaymentIconsRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}>
      {/* Stripe Badge */}
      <div className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1 shadow-xs transition-transform hover:-translate-y-0.5">
        <svg className="h-4 w-auto" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M59.64 14.28c0-4.46-2.17-7.98-6.32-7.98-4.18 0-6.7 3.52-6.7 7.94 0 5.23 2.99 7.9 7.28 7.9 2.1 0 3.68-.46 4.88-1.12v-3.41c-1.2.6-2.52.96-4.04.96-1.63 0-3.08-.57-3.26-2.43h8.11c.03-.5.05-1.26.05-1.86zm-8.17-1.55c.08-1.6 1.05-2.28 2.2-2.28 1.12 0 2.1.68 2.15 2.28h-4.35zm-8.79-6.43c-1.67 0-2.73.78-3.3 1.34l-.2-1.07h-3.95v20.47l4.42-.94v-5.26c.59.5 1.57 1.15 3.03 1.15 3.09 0 5.9-2.45 5.9-7.86 0-5.18-2.84-7.83-5.9-7.83zm-1.07 11.96c-1.04 0-1.74-.38-2.2-1.01v-5.32c.5-.68 1.22-1.03 2.2-1.03 1.7 0 2.87 1.58 2.87 3.68 0 2.13-1.14 3.68-2.87 3.68zm-11.45-8.87l-3.35 12.63h4.43l.53-2.35h3.92l.53 2.35h4.43l-3.36-12.63h-7.13zm2.5 7.15l1.07-4.44 1.06 4.44h-2.13zm-8.52-1.13c0-.66.53-1.1 1.37-1.1 1.25 0 2.8.44 4.04 1.12v-3.73c-1.35-.55-2.76-.79-4.04-.79-3.45 0-5.78 1.8-5.78 4.79 0 4.67 6.43 3.92 6.43 5.93 0 .78-.68 1.17-1.62 1.17-1.42 0-3.24-.59-4.66-1.39v3.83c1.55.67 3.16.98 4.66.98 3.56 0 6.04-1.77 6.04-4.82 0-5.04-6.44-4.14-6.44-5.99zm-9.04-3.26c-.95 0-1.87.32-2.48.86l-.16-.69h-3.95v15.7h4.42v-8.73c.92-.88 2.05-.99 2.59-.99h.61v-4.37c-.38-.08-.75-.13-1.03-.13v.35zm-9.28 0h-4.42v15.7h4.42V12.1zm-2.21-6.1c-1.44 0-2.6 1.16-2.6 2.6 0 1.43 1.16 2.6 2.6 2.6 1.43 0 2.6-1.17 2.6-2.6 0-1.44-1.17-2.6-2.6-2.6z" fill="#635BFF"/>
        </svg>
      </div>

      {/* Visa */}
      <div className="flex h-9 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-3 py-1 shadow-xs transition-transform hover:-translate-y-0.5">
        <svg className="h-4 w-auto" viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5 0.5L12.8 15.5H8.4L5.1 3.5C4.9 2.7 4.7 2.4 4.1 2C3.1 1.5 1.5 1 0.1 0.7L0.3 0.5H7.2C8.1 0.5 8.9 1.1 9.1 2.1L10.8 11.2L15.1 0.5H19.5ZM36.5 10.5C36.5 6.5 30.9 6.3 31 4.5C31.1 4 31.6 3.4 32.8 3.2C33.4 3.1 35 3.1 36.6 3.8L37.3 0.9C36.3 0.5 35 0.2 33.4 0.2C29.3 0.2 26.4 2.4 26.4 5.5C26.3 7.8 28.4 9.1 30 9.9C31.6 10.7 32.1 11.2 32.1 11.9C32.1 13 30.8 13.5 29.5 13.5C27.5 13.5 26.3 13 25.4 12.5L24.6 15.5C25.6 16 27.4 16.4 29.3 16.4C33.7 16.4 36.5 14.2 36.5 10.5ZM47.2 15.5H51L47.7 0.5H44.2C43.4 0.5 42.7 1 42.4 1.7L36.2 15.5H40.6L41.5 13H46.8L47.2 15.5ZM42.7 9.9L44.8 4.2L46 9.9H42.7ZM25.3 0.5L21.9 15.5H17.7L21.1 0.5H25.3Z" fill="#1434CB"/>
        </svg>
      </div>

      {/* Mastercard */}
      <div className="flex h-9 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-3 py-1 shadow-xs transition-transform hover:-translate-y-0.5">
        <svg className="h-5 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#EB001B"/>
          <circle cx="26" cy="12" r="12" fill="#F79E1B"/>
          <path d="M19 3.5C21.4 5.7 23 8.7 23 12C23 15.3 21.4 18.3 19 20.5C16.6 18.3 15 15.3 15 12C15 8.7 16.6 5.7 19 3.5Z" fill="#FF5F00"/>
        </svg>
      </div>

      {/* American Express */}
      <div className="flex h-9 items-center justify-center rounded-lg border border-[#006fcf] bg-[#006fcf] px-2.5 py-1 text-[11px] font-black tracking-wider text-white shadow-xs transition-transform hover:-translate-y-0.5">
        AMEX
      </div>

      {/* US ACH / Bank Wire */}
      <div className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1 text-xs font-bold text-[#0a0f2e] shadow-xs transition-transform hover:-translate-y-0.5">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3eb489]/20 text-[10px] text-[#2f9670]">✓</span>
        <span>US ACH / Wire</span>
      </div>

      {/* Wise */}
      <div className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1 text-xs font-bold text-[#163300] shadow-xs transition-transform hover:-translate-y-0.5">
        <span className="font-extrabold text-[#9fe870] bg-[#163300] px-1 py-0.5 rounded text-[10px]">WISE</span>
        <span>Transfer</span>
      </div>
    </div>
  );
}

export function BillingOverviewSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-t border-[#e2e8f0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-[#534AB7]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#534AB7]">
            Transparent B2B Billing
          </span>
          <h2 className="mt-3 text-3xl font-black text-[#0a0f2e] sm:text-4xl">
            How Payments &amp; Invoicing Work
          </h2>
          <p className="mt-3 text-base text-[#475569] leading-relaxed">
            We operate with complete corporate transparency. No hidden charges, no mandatory long-term contracts, and 100% tax-deductible digital invoices.
          </p>
        </div>

        {/* 3 Pillars of Billing */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-7 transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#534AB7]/10 text-[#534AB7]">
              <Receipt className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-black text-[#0a0f2e]">Official Tax-Deductible Invoices</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#475569]">
              Every retainer and project is billed with an itemized digital invoice detailing deliverables, company tax information, and payment timestamps — ready for corporate accounting.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-7 transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3eb489]/15 text-[#2f9670]">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-black text-[#0a0f2e]">Secure Global Payment Gateways</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#475569]">
              Pay securely via <strong>Stripe Billing</strong> using Visa, Mastercard, American Express, Apple Pay, or direct <strong>US Bank ACH transfer</strong> (zero credit card fees for retainers).
            </p>
          </div>

          <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-7 transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#534AB7]/10 text-[#534AB7]">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-black text-[#0a0f2e]">Month-to-Month Flexibility</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#475569]">
              Retainers are billed on a month-to-month basis. You are never locked into an inflexible 12-month contract. Pause or cancel before your next billing cycle with zero friction.
            </p>
          </div>
        </div>

        {/* Payment Icons Bar */}
        <div className="mt-12 rounded-2xl border border-[#e2e8f0] bg-[#f1f5f9]/60 p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-4">
            Accepted Payment Methods &amp; Gateways
          </p>
          <PaymentIconsRow />
          <p className="mt-4 text-xs text-[#64748b]">
            All transactions are 256-bit encrypted and processed through PCI-DSS Level 1 certified gateways.
          </p>
        </div>
      </div>
    </section>
  );
}
