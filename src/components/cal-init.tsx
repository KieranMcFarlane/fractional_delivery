"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function CalInit() {
  useEffect(() => {
    let mounted = true;

    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      if (!mounted) return;
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
