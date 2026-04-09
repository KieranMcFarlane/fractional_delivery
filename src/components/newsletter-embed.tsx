"use client";

import { useEffect } from "react";

export function NewsletterEmbed() {
  useEffect(() => {
    if (document.getElementById("supascribe-loader")) return;

    const script = document.createElement("script");
    script.id = "supascribe-loader";
    script.src = "https://js.supascribe.com/v1/loader/b2nQm9wgMLWsDqQydwXvtHZwvSD2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div data-supascribe-embed-id="905066645628" data-supascribe-subscribe />;
}
