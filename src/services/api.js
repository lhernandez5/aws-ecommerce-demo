export async function fetchProducts() {
  try {
    const response = await fetch('/api/products'); // replace with API Gateway URL later
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}