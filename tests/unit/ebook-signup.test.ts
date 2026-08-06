import { POST } from "@/app/api/ebook-signup/route";

describe("ebook signup API", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      MAILERLITE_API_KEY: "test-api-key",
      MAILERLITE_GROUP_DIAGNOSTIC: "diagnostic-group",
      MAILERLITE_GROUP_NEWSLETTER: "newsletter-group",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env = originalEnv;
  });

  it("adds footer newsletter signups to the newsletter group without the diagnostic group", async () => {
    const response = await POST(
      new Request("http://localhost/api/ebook-signup", {
        method: "POST",
        body: JSON.stringify({
          email: "Footer@Example.com",
          locale: "en",
          source: "footer_newsletter",
          termsAccepted: true,
          marketingConsent: true,
        }),
      }),
    );

    expect(response.status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(1);

    const [, init] = vi.mocked(fetch).mock.calls[0];
    const body = JSON.parse(String(init?.body));

    expect(body).toMatchObject({
      email: "footer@example.com",
      groups: ["newsletter-group"],
      fields: {
        source: "footer_newsletter",
        locale: "en",
        terms_accepted: "yes",
        marketing_consent: "yes",
      },
    });
  });
});
