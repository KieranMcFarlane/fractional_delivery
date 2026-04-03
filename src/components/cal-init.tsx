"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { calNamespace } from "@/lib/cal";

export function CalInit() {
  useEffect(() => {
    let mounted = true;
    const namespace = calNamespace();

    (async () => {
      const cal = await getCalApi(namespace ? { namespace } : undefined);
      if (!mounted) return;
      cal("ui", {
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
