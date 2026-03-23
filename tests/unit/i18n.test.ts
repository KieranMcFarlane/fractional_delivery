import { localizePath, swapLocalePath } from "@/lib/i18n";

describe("localizePath", () => {
  it("keeps english paths unprefixed", () => {
    expect(localizePath("en", "/blog")).toBe("/blog");
    expect(localizePath("en", "/")).toBe("/");
  });

  it("prefixes french paths", () => {
    expect(localizePath("fr", "/blog")).toBe("/fr/blog");
    expect(localizePath("fr", "/")).toBe("/fr");
  });
});

describe("swapLocalePath", () => {
  it("maps EN to FR", () => {
    expect(swapLocalePath("/blog", "fr")).toBe("/fr/blog");
  });

  it("maps FR to EN", () => {
    expect(swapLocalePath("/fr/terms-of-service", "en")).toBe("/terms-of-service");
  });
});
