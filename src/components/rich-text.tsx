"use client";

import { useEffect, useRef } from "react";

type RichTextProps = {
  html: string;
};

export function RichText({ html }: RichTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const toggles = Array.from(root.querySelectorAll<HTMLButtonElement>(".faq-toggle"));

    const handlers = toggles.map((toggle) => {
      toggle.style.cursor = "pointer";
      if (!toggle.hasAttribute("aria-expanded")) {
        toggle.setAttribute("aria-expanded", "false");
      }

      const handler = () => {
        const container = toggle.closest<HTMLElement>(".border");
        if (!container) return;

        const content = container.querySelector<HTMLElement>(".faq-content");
        const icon = toggle.querySelector<HTMLElement>("img, svg");
        if (!content) return;

        const isOpen = !content.classList.contains("hidden");
        content.classList.toggle("hidden", isOpen);
        icon?.classList.toggle("rotate-180", !isOpen);
        toggle.setAttribute("aria-expanded", String(!isOpen));
      };

      toggle.addEventListener("click", handler);
      return { toggle, handler };
    });

    return () => {
      handlers.forEach(({ toggle, handler }) => {
        toggle.removeEventListener("click", handler);
      });
    };
  }, [html]);

  return <div ref={rootRef} className="prose-content text-zinc-700" dangerouslySetInnerHTML={{ __html: html }} />;
}
