const DEFAULT_CAL_LINK = "camillefractionaldelivery/30min";
const DEFAULT_CAL_NAMESPACE = "30min";

function stripHostAndNormalize(value: string): string {
  const input = value.trim();
  if (!input) return "";

  if (/^https?:\/\//i.test(input)) {
    try {
      const url = new URL(input);
      return url.pathname.replace(/^\/+|\/+$/g, "");
    } catch {
      return input.replace(/^https?:\/\/[^/]+\/?/i, "").replace(/^\/+|\/+$/g, "");
    }
  }

  return input.replace(/^\/+|\/+$/g, "");
}

export function calLink(): string {
  const raw = process.env.NEXT_PUBLIC_CAL_LINK ?? "";
  const normalized = stripHostAndNormalize(raw);
  const namespace = calNamespace();

  if (!normalized) return DEFAULT_CAL_LINK;

  // If user provides only a username, append namespace/event slug.
  if (!normalized.includes("/") && namespace) {
    return `${normalized}/${namespace}`;
  }

  return normalized;
}

export function calNamespace(): string {
  return process.env.NEXT_PUBLIC_CAL_NAMESPACE?.trim() || DEFAULT_CAL_NAMESPACE;
}
