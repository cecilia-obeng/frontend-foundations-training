import { getProducts } from "./api.js";
import { getFavorites, saveFavorites } from "./storage.js";
import { createProductCard, renderProductDetails } from "./ui.js";

const grid = document.getElementById("productGrid");
const status = document.getElementById("statusMessage");
const count = document.getElementById("resultCount");
const search = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");
const favoritesToggle = document.getElementById("favoritesToggle");
const favoriteCount = document.getElementById("favoriteCount");
const retryButton = document.getElementById("retryButton");
const emptyState = document.getElementById("emptyState");
const resetFiltersButton = document.getElementById("resetFiltersButton");
const dialog = document.getElementById("productDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialogButton = document.getElementById("closeDialogButton");

let products = [];
let favorites = getFavorites();
let savedOnly = false;
let activeProductId = null;

const setStatus = (message, kind = "") => {
  status.textContent = message;
  status.dataset.kind = kind;
};

const updateFavoriteCount = () => {
  favoriteCount.textContent = String(favorites.length);
  favoritesToggle.setAttribute("aria-pressed", String(savedOnly));
};

const getVisibleProducts = () => {
  const query = search.value.trim().toLocaleLowerCase();
  const category = categorySelect.value;
  const visible = products.filter((product) => {
    const matchesName = product.title.toLocaleLowerCase().includes(query);
    const matchesCategory = category === "all" || product.category === category;
    const matchesSaved = !savedOnly || favorites.includes(product.id);
    return matchesName && matchesCategory && matchesSaved;
  });
  if (sortSelect.value === "price-asc") visible.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "price-desc") visible.sort((a, b) => b.price - a.price);
  return visible;
};

const renderProducts = () => {
  const visible = getVisibleProducts();
  grid.replaceChildren(...visible.map((product) => createProductCard(
    product,
    favorites.includes(product.id),
    toggleFavorite,
    showDetails
  )));
  grid.setAttribute("aria-busy", "false");
  count.textContent = `${visible.length} ${visible.length === 1 ? "good find" : "good finds"}`;
  emptyState.hidden = visible.length > 0;
  if (status.dataset.kind !== "error") {
    setStatus(visible.length === products.length ? "A fresh batch, just for you." : `Showing ${visible.length} of ${products.length} finds.`);
  }
};

const populateCategories = () => {
  const categories = [...new Set(products.map((product) => product.category).filter(Boolean))].sort();
  categorySelect.replaceChildren(new Option("All categories", "all"));
  categories.forEach((category) => categorySelect.add(new Option(category, category)));
};

const toggleFavorite = (productId) => {
  favorites = favorites.includes(productId)
    ? favorites.filter((id) => id !== productId)
    : [...favorites, productId];
  const saved = saveFavorites(favorites);
  updateFavoriteCount();
  renderProducts();
  if (!saved) setStatus("Your browser could not save favourites. Check its storage settings.", "error");
  if (activeProductId === productId && dialog.open) {
    const activeProduct = products.find((product) => product.id === activeProductId);
    if (activeProduct) dialogContent.replaceChildren(renderProductDetails(activeProduct, favorites.includes(productId), toggleFavorite));
  }
};

const showDetails = (product) => {
  activeProductId = product.id;
  dialogContent.replaceChildren(renderProductDetails(product, favorites.includes(product.id), toggleFavorite));
  dialog.showModal();
};

const loadProducts = async () => {
  retryButton.hidden = true;
  retryButton.disabled = true;
  search.disabled = true;
  categorySelect.disabled = true;
  sortSelect.disabled = true;
  favoritesToggle.disabled = true;
  grid.replaceChildren();
  grid.setAttribute("aria-busy", "true");
  emptyState.hidden = true;
  count.textContent = "A moment, please…";
  setStatus("Finding the good stuff…");
  try {
    products = await getProducts();
    populateCategories();
    search.disabled = false;
    categorySelect.disabled = false;
    sortSelect.disabled = false;
    favoritesToggle.disabled = false;
    renderProducts();
  } catch (error) {
    products = [];
    grid.replaceChildren();
    grid.setAttribute("aria-busy", "false");
    count.textContent = "The collection is taking a break";
    setStatus(`${error.message} Check your connection and try again.`, "error");
    retryButton.hidden = false;
  } finally {
    retryButton.disabled = false;
  }
};

const resetFilters = () => {
  search.value = "";
  categorySelect.value = "all";
  sortSelect.value = "featured";
  savedOnly = false;
  updateFavoriteCount();
  renderProducts();
  search.focus();
};

search.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);
favoritesToggle.addEventListener("click", () => {
  savedOnly = !savedOnly;
  updateFavoriteCount();
  renderProducts();
});
retryButton.addEventListener("click", loadProducts);
resetFiltersButton.addEventListener("click", resetFilters);
closeDialogButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => { activeProductId = null; });

updateFavoriteCount();
loadProducts();
