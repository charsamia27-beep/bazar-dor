const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJSON(path) {
  // try each base url up to 3 times (handles "429 Too Many Requests")
  for (let attempt = 0; attempt < 3; attempt++) {
    for (const base of BASES) {
      try {
        const res = await fetch(base + path, { cache: "no-store" });
        if (res.ok) return await res.json();
      } catch (e) {
        // try next
      }
    }
    await sleep(400 * (attempt + 1));
  }
  return null;
}

export async function getProducts() {
  const data = await getJSON("/products");
  return Array.isArray(data) ? data : [];
}

export async function getProductsByCategory(slug) {
  const data = await getJSON(`/products?category=${encodeURIComponent(slug)}`);
  return Array.isArray(data) ? data : [];
}

export async function getCategories() {
  const data = await getJSON("/categories");
  return Array.isArray(data) ? data : [];
}

export async function getProductBySlug(slug) {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) || null;
}
