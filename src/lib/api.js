const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getJSON(path) {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 600 } });
      if (res.ok) return await res.json();
    } catch (e) {
      // try next base url
    }
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
