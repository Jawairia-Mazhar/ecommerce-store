const BASE_URL = "https://dummyJSON.com";

export async function getProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data.products;
}

export async function getProductById(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    return res.json();
}

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }
    return res.json();
}