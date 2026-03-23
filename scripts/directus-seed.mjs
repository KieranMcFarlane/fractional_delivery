import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.DIRECTUS_URL;
const token = process.env.DIRECTUS_ADMIN_TOKEN;

if (!baseUrl || !token) {
  console.error("Missing DIRECTUS_URL or DIRECTUS_ADMIN_TOKEN");
  process.exit(1);
}

async function api(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${pathname}: ${text}`);
  }

  return response.json().catch(() => ({}));
}

async function truncateCollection(collection) {
  try {
    const existing = await api(`/items/${collection}?limit=-1&fields=id`);
    for (const row of existing.data || []) {
      await api(`/items/${collection}/${row.id}`, { method: "DELETE" });
    }
  } catch {
    // no-op
  }
}

async function seedSiteSettings(seed) {
  await truncateCollection("site_settings_translations");
  await truncateCollection("site_settings");

  const settingsPayload = {
    brand_name: seed.brand_name,
    contact_email: seed.contact_email,
    linkedin_url: seed.linkedin_url,
    cta_href: seed.cta_href,
  };

  const created = await api("/items/site_settings", {
    method: "POST",
    body: JSON.stringify(settingsPayload),
  });
  const settingsId = created.data.id;

  for (const translation of seed.translations || []) {
    await api("/items/site_settings_translations", {
      method: "POST",
      body: JSON.stringify({
        ...translation,
        site_settings_id: settingsId,
      }),
    });
  }
}

async function seedPages(seedPages) {
  await truncateCollection("pages_translations");
  await truncateCollection("pages");

  for (const page of seedPages) {
    const created = await api("/items/pages", {
      method: "POST",
      body: JSON.stringify({
        slug: page.slug,
        type: page.type,
        status: page.status,
      }),
    });
    const pageId = created.data.id;

    for (const translation of page.translations || []) {
      await api("/items/pages_translations", {
        method: "POST",
        body: JSON.stringify({
          ...translation,
          pages_id: pageId,
        }),
      });
    }
  }
}

async function seedPosts(seedPosts) {
  await truncateCollection("posts_translations");
  await truncateCollection("posts");

  for (const post of seedPosts) {
    const created = await api("/items/posts", {
      method: "POST",
      body: JSON.stringify({
        slug: post.slug,
        status: post.status,
        published_at: post.published_at,
        author_name: post.author_name,
      }),
    });
    const postId = created.data.id;

    for (const translation of post.translations || []) {
      await api("/items/posts_translations", {
        method: "POST",
        body: JSON.stringify({
          ...translation,
          posts_id: postId,
        }),
      });
    }
  }
}

async function main() {
  const seedPath = path.join(process.cwd(), "directus", "seed-data.json");
  const seed = JSON.parse(await fs.readFile(seedPath, "utf8"));

  await seedSiteSettings(seed.site_settings);
  await seedPages(seed.pages);
  await seedPosts(seed.posts);

  console.log("Seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
