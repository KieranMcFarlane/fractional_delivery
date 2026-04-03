const DEFAULT_CAL_LINK = "camillefractionaldelivery/30min";
const DEFAULT_CAL_NAMESPACE = "30min";

type ParsedCalInput = {
  origin: string | null;
  path: string;
};

function parseCalInput(value: string): ParsedCalInput {
  const input = value.trim();
  if (!input) return { origin: null, path: "" };

  if (/^https?:\/\//i.test(input)) {
    try {
      const url = new URL(input);
      return {
        origin: url.origin,
        path: url.pathname.replace(/^\/+|\/+$/g, ""),
      };
    } catch {
      const origin = input.match(/^https?:\/\/[^/]+/i)?.[0] ?? null;
      return {
        origin,
        path: input.replace(/^https?:\/\/[^/]+\/?/i, "").replace(/^\/+|\/+$/g, ""),
      };
    }
  }

  return { origin: null, path: input.replace(/^\/+|\/+$/g, "") };
}

export function calLink(): string {
  const raw = process.env.NEXT_PUBLIC_CAL_LINK ?? "";
  const parsed = parseCalInput(raw);
  const normalized = parsed.path;
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

export function calOrigin(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_CAL_ORIGIN?.trim();
  if (explicit) return explicit;

  const raw = process.env.NEXT_PUBLIC_CAL_LINK ?? "";
  const parsed = parseCalInput(raw);
  return parsed.origin ?? undefined;
}
