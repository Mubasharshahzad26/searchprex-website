"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "923106526316"; // Apna WhatsApp number yahan likho
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
  "get free seo audit": "Great choice! Our free SEO audit includes a comprehensive analysis of your website's technical health, content quality, and backlink profile. To get started, please share your website URL and email address, or call us directly at (800) 555-1234.",
  "pricing information": "Our pricing is tailored to your specific needs:\n\n• Beginning: Starting at $1,500/mo\n• Agency Level: Starting at $3,500/mo\n• Enterprise: Custom pricing\n\nWould you like to schedule a call to discuss which plan is right for you?",
  "talk to an expert": "I'd be happy to connect you with one of our SEO specialists! You can:\n\n1. Call us: (800) 555-1234\n2. Schedule a free consultation\n3. Email: hello@searchprex.com\n\nOur team is available Mon-Fri, 9 AM - 6 PM EST.",
  "book a call": "Perfect! Let me help you schedule a call. Our SEO consultants are available for a free 30-minute strategy session. Call us at (800) 555-1234 or click the phone icon below to connect immediately.",
  "default": "Thanks for reaching out! I'm here to help with any questions about our SEO services. You can ask about:\n\n• Free SEO Audit\n• Pricing & Plans\n• Our Process\n• Case Studies\n\nOr call us at (800) 555-1234 for immediate assistance.",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Sarah from SearchPrex. How can I help you grow your organic traffic today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp Icon */}
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>

      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Notification Dot */}
      {!isOpen && (
        <span className="fixed bottom-[4.5rem] right-6 z-50 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </span>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#0a0f2e] px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb] text-white font-bold">S</div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0a0f2e] bg-green-500"></span>
                </div>
                <div>
                  <p className="font-semibold text-white">SearchPrex Support</p>
                  <p className="text-xs text-white/70">We typically reply within minutes</p>
                </div>
                </div>
            </div>

            {/* Messages */}
            <div className="h-[300px] overflow-y-auto bg-[#f7f8fc] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.isBot ? "bg-white text-[#374151] shadow-sm" : "bg-[#2563eb] text-white"}`}>
                      <p className="whitespace-pre-line text-sm">{message.text}</p>
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
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#94a3b8]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#94a3b8] [animation-delay:0.2s]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#94a3b8] [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Replies */}
            <div className="border-t border-[#e5e7eb] bg-white px-4 py-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button key={reply} onClick={() => handleSend(reply)}
                    className="rounded-full border border-[#e5e7eb] px-3 py-1 text-xs font-medium text-[#374151] transition-colors hover:border-[#2563eb] hover:text-[#2563eb]">
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-[#e5e7eb] bg-white p-4">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="flex items-center gap-2">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border border-[#e5e7eb] px-4 py-2 text-sm text-[#374151] outline-none focus:border-[#2563eb]"
                />
                <button type="submit" disabled={!inputValue.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb] text-white transition-colors hover:bg-[#1a3c8f] disabled:opacity-50">
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <a href="tel:+18005551234"
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#f7f8fc] py-2 text-sm font-medium text-[#374151] transition-colors hover:bg-[#e5e7eb]">
                <Phone className="h-4 w-4" />
                Or call us: (800) 555-1234
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}