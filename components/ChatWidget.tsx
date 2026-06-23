"use client";
 
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
 
const WHATSAPP_NUMBER = "923106526316";
const WHATSAPP_MESSAGE = "Hi! I'm interested in SEO services from SearchPrex.";
 
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}
 
const quickReplies = [
  "Get Free SEO Audit",
  "Pricing Information",
  "Talk to an Expert",
  "Book a Call",
];
 
const botResponses: Record<string, string> = {
  "get free seo audit": "Great choice! Our free SEO audit includes a comprehensive analysis of your website's technical health, content quality, and backlink profile. Share your website URL or call us at +92 310 652 6316 to get started.",
  "pricing information": "Our pricing is tailored to your needs:\n\n• Beginning: Starting at $1,500/mo\n• Agency Level: Starting at $3,500/mo\n• Enterprise: Custom pricing\n\nWant to schedule a call to find the right plan?",
  "talk to an expert": "I'd love to connect you with one of our SEO specialists!\n\n1. Call us: +92 310 652 6316\n2. Schedule a free consultation\n3. Email: contact@searchprex.com\n\nAvailable Mon-Fri, 9 AM - 6 PM EST.",
  "book a call": "Let's get you scheduled! Our SEO consultants offer a free 30-minute strategy session. Call +92 310 652 6316 or click the phone button below.",
  "default": "Thanks for reaching out! I can help with:\n\n• Free SEO Audit\n• Pricing & Plans\n• Our Process\n• Case Studies\n\nOr call +92 310 652 6316 for immediate help.",
};
 
// ── CRO-based auto popup message (shown after 4s) ──
const CRO_POPUP_MESSAGE =
  "🔥 We're accepting only 3 new clients this month — 2 spots already taken.\n\nGet your FREE SEO audit today and see exactly why competitors are outranking you. Takes 30 seconds, zero commitment.";
 
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi, I'm Mubashar Shahzad, founder of Searchprex. Looking for an SEO growth plan? Tell me about your website or goals and I'll point you in the right direction.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
 
  // ── Auto-scroll to latest message ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
 
  // ── Auto popup after 4 seconds (once per session) ──
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("chatPopupShown");
    if (alreadyShown) return;
 
    // Step 1: show teaser notification at 3s
    const teaserTimer = setTimeout(() => {
      setShowTeaser(true);
    }, 3000);
 
    // Step 2: open full chat at 4s with CRO message
    const popupTimer = setTimeout(() => {
      setShowTeaser(false);
      setIsOpen(true);
      sessionStorage.setItem("chatPopupShown", "true");
 
      // Add CRO message after a short delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: CRO_POPUP_MESSAGE,
            isBot: true,
            timestamp: new Date(),
          },
        ]);
      }, 600);
    }, 4000);
 
    return () => {
      clearTimeout(teaserTimer);
      clearTimeout(popupTimer);
    };
  }, []);
 
  const handleSend = (text: string) => {
    if (!text.trim()) return;
 
    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };
 
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
 
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = botResponses["default"];
 
      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerText.includes(key)) {
          response = value;
          break;
        }
      }
 
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: response,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };
 
  const handleClose = () => {
    setIsOpen(false);
    setShowTeaser(false);
  };
 
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
 
  return (
    <>
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
 
      {/* ── Teaser Notification Bubble (shown at 3s, before chat opens) ── */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-24 right-20 z-50 max-w-[220px] rounded-2xl rounded-br-sm bg-[#0a0f2e] px-4 py-3 shadow-xl"
          >
            <p className="text-xs font-medium leading-snug text-white">
              🔥 Only <span className="font-bold text-[#3eb489]">3 spots left</span> this month — want a free SEO audit?
            </p>
            {/* triangle pointer */}
            <div className="absolute -bottom-2 right-4 h-0 w-0 border-l-8 border-r-0 border-t-8 border-l-transparent border-t-[#0a0f2e]" />
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Ask Mubashar — floating pill button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTeaser(false);
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#0a0f2e] py-2 pl-2 pr-4 text-white shadow-lg"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label={isOpen ? "Close chat" : "Ask Mubashar"}
      >
        {isOpen ? (
          <span className="flex h-10 w-10 items-center justify-center">
            <X className="h-5 w-5" />
          </span>
        ) : (
          <>
            <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#3eb489]">
              <Image
                src="/images/mubashar-transparent.png"
                alt="Mubashar Shahzad"
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <span className="text-sm font-semibold whitespace-nowrap">Ask Mubashar</span>
          </>
        )}
      </motion.button>
 
      {/* Notification Dot */}
      {!isOpen && (
        <span className="fixed bottom-[4.7rem] right-[2.6rem] z-50 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
        </span>
      )}
 
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed z-50 overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{
              // ── RESPONSIVE POSITIONING ──
              bottom: "96px",
              right: "16px",
              // Mobile: near full width | Desktop: fixed 380px
              width: "min(380px, calc(100vw - 32px))",
              // Max height so it never covers full screen
              maxHeight: "calc(100vh - 130px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-[#0a0f2e] px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#3eb489]">
                      <Image
                        src="/images/mubashar-transparent.png"
                        alt="Mubashar Shahzad"
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0a0f2e] bg-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Mubashar Shahzad</p>
                    <p className="text-xs text-white/70">Verified SEO Expert &amp; Founder</p>
                  </div>
                </div>
                {/* Close button in header */}
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
 
            {/* Messages — flex-1 so it fills available space */}
            <div className="flex-1 overflow-y-auto bg-[#f7f8fc] p-4" style={{ minHeight: "180px" }}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-2.5 ${
                        message.isBot
                          ? "bg-white text-[#374151] shadow-sm"
                          : "bg-[#534AB7] text-white"
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                      <p className={`mt-1 text-[10px] ${message.isBot ? "text-[#94a3b8]" : "text-white/70"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
 
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#94a3b8]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#94a3b8] [animation-delay:0.2s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#94a3b8] [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
 
            {/* Quick Replies */}
            <div className="flex-shrink-0 border-t border-[#e5e7eb] bg-white px-4 py-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="rounded-full border border-[#e5e7eb] px-3 py-1 text-xs font-medium text-[#374151] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
 
            {/* Privacy Note */}
            <div className="flex-shrink-0 border-t border-[#e5e7eb] bg-white px-4 pt-3">
              <p className="text-[11px] leading-snug text-[#94a3b8]">
                This chat may be recorded for quality assurance.{" "}
                <Link href="/privacy" className="underline hover:text-[#534AB7]">
                  View our privacy policy.
                </Link>
              </p>
            </div>
 
            {/* Input */}
            <div className="flex-shrink-0 bg-white p-4 pt-2">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border border-[#e5e7eb] px-4 py-2 text-sm text-[#374151] outline-none focus:border-[#534AB7]"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#534AB7] text-white transition-colors hover:bg-[#3C3489] disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <a
                href="tel:+923106526316"
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#f7f8fc] py-2 text-sm font-medium text-[#374151] transition-colors hover:bg-[#e5e7eb]"
              >
                <Phone className="h-4 w-4" />
                Or call us: +92 310 652 6316
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
 