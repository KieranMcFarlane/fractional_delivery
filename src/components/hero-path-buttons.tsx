"use client";

import { useEffect, useState } from "react";

import {
  hashForServicePath,
  selectServicePath,
  servicePathFromHash,
  type ServicePath,
} from "@/lib/service-path-selection";

type HeroPathButtonsProps = {
  businessLabel: string;
  businessMeta: string;
  scalingLabel: string;
  scalingMeta: string;
};

function buttonClasses(path: ServicePath, isSelected: boolean) {
  const colorClasses =
    path === "business"
      ? isSelected
        ? "bg-[#e9694b] text-white ring-[#e9694b]/30 hover:bg-[#d4583c]"
        : "bg-[#e9694b]/88 text-white hover:bg-[#d4583c]"
      : isSelected
        ? "bg-[#15233b] text-white ring-[#15233b]/25 hover:bg-[#0f1a2e]"
        : "bg-[#15233b]/88 text-white hover:bg-[#0f1a2e]";

  return [
    "group rounded-[0.85rem] p-5 text-left transition duration-300 active:translate-y-px",
    isSelected ? "ring-2 ring-offset-2" : "opacity-90 hover:opacity-100",
    colorClasses,
  ].join(" ");
}

export function HeroPathButtons({
  businessLabel,
  businessMeta,
  scalingLabel,
  scalingMeta,
}: HeroPathButtonsProps) {
  const [selectedPath, setSelectedPath] = useState<ServicePath>("business");

  useEffect(() => {
    function syncFromHash() {
      setSelectedPath(servicePathFromHash(window.location.hash));
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function onSelect(path: ServicePath) {
    setSelectedPath(path);
    selectServicePath(path, { scrollToServices: true });
  }

  return (
    <div className="mt-9 grid max-w-[34rem] gap-3 sm:grid-cols-2">
      <a
        href={hashForServicePath("business")}
        data-testid="hero-path-business"
        aria-current={selectedPath === "business" ? "true" : undefined}
        onClick={(event) => {
          event.preventDefault();
          onSelect("business");
        }}
        className={buttonClasses("business", selectedPath === "business")}
      >
        <span className="flex items-center justify-between gap-3 text-base font-bold">
          {businessLabel} <span aria-hidden="true">-&gt;</span>
        </span>
        <span className="mt-1 block text-xs font-medium text-white/80">{businessMeta}</span>
      </a>
      <a
        href={hashForServicePath("scaling")}
        data-testid="hero-path-scaling"
        aria-current={selectedPath === "scaling" ? "true" : undefined}
        onClick={(event) => {
          event.preventDefault();
          onSelect("scaling");
        }}
        className={buttonClasses("scaling", selectedPath === "scaling")}
      >
        <span className="flex items-center justify-between gap-3 text-base font-bold">
          {scalingLabel} <span aria-hidden="true">-&gt;</span>
        </span>
        <span className="mt-1 block text-xs font-medium text-white/75">{scalingMeta}</span>
      </a>
    </div>
  );
}
