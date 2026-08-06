"use client";

import { useEffect, useState } from "react";
import { calLink, calNamespace, calOrigin } from "@/lib/cal";
import { selectServicePath, servicePathFromHash, type ServicePath } from "@/lib/service-path-selection";

type ServicePathCopy = {
  pathEyebrow: string;
  pathHeadingPrefix: string;
  pathHeadingEmphasis: string;
  pathIntro: string;
  doorOne: string;
  doorTwo: string;
  businessTitle: string;
  businessIntro: string;
  scalingTitle: string;
  scalingIntro: string;
  businessEyebrow: string;
  businessHeading: string;
  businessBody: string;
  service: string;
  businessServiceTitle: string;
  businessServiceTagline: string;
  businessCadence: string;
  bestFor: string;
  businessBestFor: string;
  bookDiscovery: string;
  whatYouGet: string;
  businessOutputs: readonly string[];
  scalingEyebrow: string;
  scalingHeading: string;
  scalingBody: string;
  newBadge: string;
};

type ScalingService = {
  title: string;
  tagline: string;
  body: string;
  duration: string;
  cta: string;
  image: string;
  isNew?: boolean;
  outputs: readonly string[];
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#e9694b]">
      {children}
    </p>
  );
}

function CheckMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 h-4 w-4 flex-none text-[#e9694b]">
      <path d="M13.5 4.25 6.25 11.5 2.5 7.75" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const origin = calOrigin();

  return (
    <button
      type="button"
      data-cal-namespace={calNamespace()}
      data-cal-link={calLink()}
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      {...(origin ? { "data-cal-origin": origin } : {})}
      className={`inline-flex cursor-pointer items-center justify-center rounded-[0.7rem] bg-[#e9694b] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#d4583c] active:translate-y-px ${className}`}
    >
      {children}
    </button>
  );
}

function pathCardClasses(isSelected: boolean, path: ServicePath) {
  const selectedBorder = path === "business" ? "border-[#e9694b]" : "border-[#15233b]";

  return [
    "w-full cursor-pointer rounded-[1.1rem] border bg-white p-7 text-left transition duration-300 active:translate-y-px",
    isSelected
      ? `${selectedBorder} shadow-[0_18px_44px_-28px_rgba(21,35,59,0.45)]`
      : "border-[#dce1e8] hover:-translate-y-1 hover:border-[#15233b] hover:shadow-[0_18px_44px_-28px_rgba(21,35,59,0.35)]",
  ].join(" ");
}

export function ServicePathSelector({
  copy,
  services,
}: {
  copy: ServicePathCopy;
  services: readonly ScalingService[];
}) {
  const [selectedPath, setSelectedPath] = useState<ServicePath>("business");
  const showBusiness = selectedPath === "business";

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
    selectServicePath(path);
  }

  return (
    <section id="services" className="bg-[#f5f6f9] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto mb-11 max-w-[40rem] text-center">
          <Eyebrow>{copy.pathEyebrow}</Eyebrow>
          <h2 className="font-sans text-[2.45rem] font-semibold leading-[1.08] tracking-[-0.022em] text-[#15233b] md:text-[42px]">
            {copy.pathHeadingPrefix} <em className="font-serif font-medium italic text-[#e9694b]">{copy.pathHeadingEmphasis}</em>
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-[#54606f]">
            {copy.pathIntro}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={copy.pathEyebrow}
          className="grid gap-5 md:grid-cols-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={showBusiness}
            aria-controls="businesses-going-digital"
            id="businesses-going-digital-tab"
            onClick={() => onSelect("business")}
            className={pathCardClasses(showBusiness, "business")}
          >
            <span className="inline-flex rounded-full bg-[#fdece6] px-3 py-1 text-xs font-bold uppercase tracking-[0.06em] text-[#e9694b]">{copy.doorOne}</span>
            <h3 className="mt-5 font-sans text-[23px] font-semibold tracking-[-0.01em] text-[#15233b]">{copy.businessTitle}</h3>
            <p className="mt-3 text-[15.5px] leading-[1.55] text-[#54606f]">
              {copy.businessIntro}
            </p>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!showBusiness}
            aria-controls="scaling-tech-teams"
            id="scaling-tech-teams-tab"
            onClick={() => onSelect("scaling")}
            className={pathCardClasses(!showBusiness, "scaling")}
          >
            <span className="inline-flex rounded-full bg-[#e9edf3] px-3 py-1 text-xs font-bold uppercase tracking-[0.06em] text-[#15233b]">{copy.doorTwo}</span>
            <h3 className="mt-5 font-sans text-[23px] font-semibold tracking-[-0.01em] text-[#15233b]">{copy.scalingTitle}</h3>
            <p className="mt-3 text-[15.5px] leading-[1.55] text-[#54606f]">
              {copy.scalingIntro}
            </p>
          </button>
        </div>

        {showBusiness ? (
          <section id="businesses-going-digital" className="mt-9 rounded-[1.35rem] border border-[#e6e9ef] border-t-4 border-t-[#e9694b] bg-white p-6 shadow-[0_24px_60px_-42px_rgba(21,35,59,0.45)] md:p-12">
            <div className="max-w-[49rem]">
              <Eyebrow>{copy.businessEyebrow}</Eyebrow>
              <h3 className="font-sans text-[2.15rem] font-semibold leading-[1.12] tracking-[-0.022em] text-[#15233b] md:text-[34px]">
                {copy.businessHeading}
              </h3>
              <p className="mt-5 text-[17px] leading-[1.62] text-[#54606f]">
                {copy.businessBody}
              </p>
            </div>
            <div className="mt-8 rounded-[1.1rem] border border-[#eef0f4] bg-[#fafbfc] p-6 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#eef0f4] pb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#aeb6c2]">{copy.service}</p>
                  <h4 className="mt-2 font-sans text-[26px] font-semibold tracking-[-0.015em] text-[#15233b]">{copy.businessServiceTitle}</h4>
                  <p className="mt-2 font-serif text-[18px] italic text-[#e9694b]">{copy.businessServiceTagline}</p>
                </div>
                <span className="rounded-full border border-[#e6e9ef] bg-white px-4 py-2 text-[12.5px] font-semibold text-[#7c8696]">{copy.businessCadence}</span>
              </div>
              <div className="mt-7 grid gap-8 md:grid-cols-[1fr_1.1fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#aeb6c2]">{copy.bestFor}</p>
                  <p className="mt-3 text-[16px] leading-[1.6] text-[#54606f]">{copy.businessBestFor}</p>
                  <CalButton className="mt-7">{copy.bookDiscovery}</CalButton>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#aeb6c2]">{copy.whatYouGet}</p>
                  <ul className="mt-3 space-y-2">
                    {copy.businessOutputs.map((item) => (
                      <li key={item} className="flex gap-3 text-[15.5px] leading-[1.5] text-[#54606f]">
                        <CheckMark />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section id="scaling-tech-teams" className="mt-9 rounded-[1.35rem] border border-[#e6e9ef] border-t-4 border-t-[#15233b] bg-white p-6 shadow-[0_24px_60px_-42px_rgba(21,35,59,0.45)] md:p-12">
            <div className="max-w-[50rem]">
              <Eyebrow>{copy.scalingEyebrow}</Eyebrow>
              <h3 className="font-sans text-[2.15rem] font-semibold leading-[1.12] tracking-[-0.022em] text-[#15233b] md:text-[34px]">
                {copy.scalingHeading}
              </h3>
              <p className="mt-5 text-[17px] leading-[1.62] text-[#54606f]">
                {copy.scalingBody}
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {services.map((service) => (
                <article key={service.title} className="relative flex flex-col overflow-hidden rounded-[1.1rem] border border-[#e6e9ef] bg-white">
                  {service.isNew ? (
                    <span className="absolute right-4 top-4 z-[1] rounded-full bg-[#fdece6] px-3 py-1 text-xs font-bold uppercase tracking-[0.05em] text-[#e9694b]">
                      {copy.newBadge}
                    </span>
                  ) : null}
                  <img src={service.image} alt="" className="aspect-[16/7] w-full border-b border-[#e6e9ef] object-cover" />
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#aeb6c2]">{copy.service}</p>
                    <h3 className="mt-2 font-sans text-[21px] font-semibold text-[#15233b]">{service.title}</h3>
                    <p className="mt-[7px] font-serif text-[16px] italic text-[#e9694b]">{service.tagline}</p>
                    <p className="mt-4 text-[14.5px] leading-[1.55] text-[#54606f]">{service.body}</p>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-[#aeb6c2]">{copy.whatYouGet}</p>
                    <ul className="mt-3 space-y-2">
                      {service.outputs.map((item) => (
                        <li key={item} className="flex gap-3 text-[14.5px] leading-[1.5] text-[#54606f]">
                          <CheckMark />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-[12.5px] font-semibold text-[#7c8696]">{service.duration}</span>
                      <CalButton className="px-5 py-2.5">{service.cta}</CalButton>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
