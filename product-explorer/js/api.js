const PRODUCTS_URL = "https://dummyjson.com/products?limit=100";

export const getProducts = async () => {
  const response = await fetch(PRODUCTS_URL);
  if (!response.ok) {
    throw new Error(`The product request failed with status ${response.status}.`);
  }
  const data = await response.json();
  if (!data || !Array.isArray(data.products)) {
    throw new Error("The API returned products in an unexpected format.");
  }
  return data.products;
};
