"use client";

// Client-side boundary for the deferred chat widget.
//
// app/page.tsx is a Server Component (it exports `metadata`), and Next 16 rejects
// `dynamic(..., { ssr: false })` there outright:
//
//   `ssr: false` is not allowed with `next/dynamic` in Server Components.
//
// That error broke the homepage and, under Turbopack dev, every route compiled
// after it. Moving the dynamic import behind this "use client" file keeps the
// original intent — ChatWidget stays out of the initial payload and only loads
// in the browser — without putting the call in a server file.

import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function ChatWidgetLazy() {
  return <ChatWidget />;
}
