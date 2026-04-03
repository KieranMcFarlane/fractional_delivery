"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { calNamespace, calOrigin } from "@/lib/cal";

export function CalInit() {
  useEffect(() => {
    let mounted = true;
    const namespace = calNamespace();
    const origin = calOrigin();

    (async () => {
      const cal = (await getCalApi()) as any;
      if (!mounted) return;

      if (namespace) {
        cal("init", namespace, origin ? { origin } : {});
      } else if (origin) {
        cal("init", { origin });
      }

      const scopedCal = namespace ? (cal.ns?.[namespace] ?? cal) : cal;
      scopedCal("ui", {
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
