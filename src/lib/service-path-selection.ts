export type ServicePath = "business" | "scaling";

const servicePathHashes: Record<ServicePath, string> = {
  business: "#businesses-going-digital",
  scaling: "#scaling-tech-teams",
};

export function hashForServicePath(path: ServicePath): string {
  return servicePathHashes[path];
}

export function servicePathFromHash(hash: string): ServicePath {
  return hash === servicePathHashes.scaling ? "scaling" : "business";
}

export function selectServicePath(path: ServicePath, options: { scrollToServices?: boolean } = {}) {
  if (typeof window === "undefined") return;

  const nextHash = hashForServicePath(path);
  if (window.location.hash !== nextHash) {
    window.history.pushState(null, "", nextHash);
  }

  window.dispatchEvent(new Event("hashchange"));

  if (options.scrollToServices) {
    window.requestAnimationFrame(() => {
      document.getElementById("services")?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }
}
