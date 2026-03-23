const baseUrl = process.env.DIRECTUS_URL;
const token = process.env.DIRECTUS_ADMIN_TOKEN;

if (!baseUrl || !token) {
  console.error("Missing DIRECTUS_URL or DIRECTUS_ADMIN_TOKEN");
  process.exit(1);
}

const collections = [
  { collection: "site_settings", meta: { icon: "settings", singleton: true } },
  { collection: "site_settings_translations", meta: { icon: "translate" } },
  { collection: "pages", meta: { icon: "article" } },
  { collection: "pages_translations", meta: { icon: "translate" } },
  { collection: "posts", meta: { icon: "description" } },
  { collection: "posts_translations", meta: { icon: "translate" } },
];

const fields = [
  ["site_settings", { field: "brand_name", type: "string" }],
  ["site_settings", { field: "contact_email", type: "string" }],
  ["site_settings", { field: "linkedin_url", type: "string" }],
  ["site_settings", { field: "cta_href", type: "string" }],
  ["site_settings_translations", { field: "site_settings_id", type: "integer" }],
  ["site_settings_translations", { field: "languages_code", type: "string" }],
  ["site_settings_translations", { field: "cta_label", type: "string" }],
  ["site_settings_translations", { field: "footer_text", type: "text" }],
  ["site_settings_translations", { field: "nav_items", type: "json" }],
  ["site_settings_translations", { field: "legal_links", type: "json" }],
  ["pages", { field: "slug", type: "string" }],
  ["pages", { field: "type", type: "string" }],
  ["pages", { field: "status", type: "string" }],
  ["pages", { field: "sort", type: "integer" }],
  ["pages", { field: "hero_image", type: "uuid" }],
  ["pages_translations", { field: "pages_id", type: "integer" }],
  ["pages_translations", { field: "languages_code", type: "string" }],
  ["pages_translations", { field: "title", type: "string" }],
  ["pages_translations", { field: "seo_title", type: "string" }],
  ["pages_translations", { field: "seo_description", type: "text" }],
  ["pages_translations", { field: "body_richtext", type: "text" }],
  ["posts", { field: "slug", type: "string" }],
  ["posts", { field: "status", type: "string" }],
  ["posts", { field: "published_at", type: "timestamp" }],
  ["posts", { field: "author_name", type: "string" }],
  ["posts", { field: "cover_image", type: "uuid" }],
  ["posts_translations", { field: "posts_id", type: "integer" }],
  ["posts_translations", { field: "languages_code", type: "string" }],
  ["posts_translations", { field: "title", type: "string" }],
  ["posts_translations", { field: "excerpt", type: "text" }],
  ["posts_translations", { field: "seo_title", type: "string" }],
  ["posts_translations", { field: "seo_description", type: "text" }],
  ["posts_translations", { field: "content_richtext", type: "text" }],
];

async function api(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${path}: ${text}`);
  }

  return response.json().catch(() => ({}));
}

async function ensureCollection(collection) {
  try {
    await api(`/collections/${collection.collection}`);
    console.log(`Collection exists: ${collection.collection}`);
  } catch {
    await api("/collections", { method: "POST", body: JSON.stringify(collection) });
    console.log(`Created collection: ${collection.collection}`);
  }
}

async function ensureField(collectionName, field) {
  try {
    await api(`/fields/${collectionName}/${field.field}`);
  } catch {
    await api(`/fields/${collectionName}`, { method: "POST", body: JSON.stringify(field) });
    console.log(`Created field: ${collectionName}.${field.field}`);
  }
}

async function main() {
  for (const collection of collections) {
    await ensureCollection(collection);
  }

  for (const [collectionName, field] of fields) {
    await ensureField(collectionName, field);
  }

  console.log("Directus schema bootstrap complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
