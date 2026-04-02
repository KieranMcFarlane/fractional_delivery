type CookiebotScriptsProps = {
  googleTagId: string;
  clarityId: string;
};

export function CookiebotScripts({ googleTagId, clarityId }: CookiebotScriptsProps) {
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID ?? "d76f8ad3-369c-4fb8-9156-3ee1f8e42990";

  return (
    <>
      <script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid={cookiebotId}
        data-blockingmode="auto"
        type="text/javascript"
      />

      <script
        data-cookieconsent="ignore"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("consent", "default", {
  ad_personalization: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
  wait_for_update: 500
});
gtag("set", "ads_data_redaction", true);
gtag("set", "url_passthrough", false);`,
        }}
      />

      <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagId}');`,
        }}
      />

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");`,
        }}
      />
    </>
  );
}

