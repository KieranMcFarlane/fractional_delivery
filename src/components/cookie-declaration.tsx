export function CookieDeclaration() {
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID ?? "d76f8ad3-369c-4fb8-9156-3ee1f8e42990";

  return (
    <script
      id="CookieDeclaration"
      src={`https://consent.cookiebot.com/${cookiebotId}/cd.js`}
      type="text/javascript"
      async
    />
  );
}

