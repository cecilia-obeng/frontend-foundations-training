const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const makeProductImage = (product, className = "product-image") => {
  const image = document.createElement("img");
  image.className = className;
  image.src = product.thumbnail || product.images?.[0] || "";
  image.alt = product.title ? `${product.title} product photo` : "Product photo";
  image.loading = "lazy";
  image.addEventListener("error", () => {
    const fallback = document.createElement("div");
    fallback.className = "product-image-fallback";
    fallback.setAttribute("aria-label", "Product image unavailable");
    fallback.textContent = product.title?.charAt(0)?.toUpperCase() || "✳";
    image.replaceWith(fallback);
  }, { once: true });
  return image;
};

const makeFavoriteButton = (product, isFavorite, onToggle) => {
  const button = document.createElement("button");
  button.className = "favorite-button";
  button.type = "button";
  button.setAttribute("aria-pressed", String(isFavorite));
  button.setAttribute("aria-label", `${isFavorite ? "Remove" : "Add"} ${product.title} ${isFavorite ? "from" : "to"} saved products`);
  button.textContent = isFavorite ? "♥" : "♡";
  button.addEventListener("click", () => onToggle(product.id));
  return button;
};

export const createProductCard = (product, isFavorite, onToggle, onDetails) => {
  const card = document.createElement("article");
  card.className = "product-card";
  const imageWrap = document.createElement("div");
  imageWrap.className = "product-image-wrap";
  const category = document.createElement("span");
  category.className = "product-category";
  category.textContent = product.category;
  imageWrap.append(makeProductImage(product), category, makeFavoriteButton(product, isFavorite, onToggle));

  const info = document.createElement("div");
  info.className = "product-info";
  const title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.title;
  const meta = document.createElement("div");
  meta.className = "product-meta";
  const rating = document.createElement("span");
  rating.className = "product-rating";
  rating.textContent = `★ ${Number(product.rating || 0).toFixed(1)}`;
  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = currency.format(product.price || 0);
  meta.append(rating, price);
  const details = document.createElement("button");
  details.className = "product-link";
  details.type = "button";
  details.textContent = "A closer look ↗";
  details.addEventListener("click", () => onDetails(product));
  info.append(title, meta, details);
  card.append(imageWrap, info);
  return card;
};

export const renderProductDetails = (product, isFavorite, onToggle) => {
  const content = document.createElement("div");
  content.className = "dialog-content";
  const imageWrap = document.createElement("div");
  imageWrap.className = "dialog-image-wrap";
  imageWrap.append(makeProductImage(product, "dialog-image"));
  const copy = document.createElement("div");
  copy.className = "dialog-copy";
  const category = document.createElement("p");
  category.className = "dialog-eyebrow";
  category.textContent = product.category;
  const title = document.createElement("h2");
  title.id = "dialogTitle";
  title.textContent = product.title;
  const price = document.createElement("p");
  price.className = "dialog-price";
  price.textContent = currency.format(product.price || 0);
  const description = document.createElement("p");
  description.textContent = product.description || "A good thing, well found.";
  const rating = document.createElement("p");
  rating.className = "dialog-rating";
  rating.textContent = `★ ${Number(product.rating || 0).toFixed(1)} rating · ${product.stock ?? 0} in stock`;
  const favorite = document.createElement("button");
  favorite.className = "favorites-toggle";
  favorite.type = "button";
  favorite.setAttribute("aria-pressed", String(isFavorite));
  favorite.textContent = isFavorite ? "♥ Saved" : "♡ Save this find";
  favorite.addEventListener("click", () => onToggle(product.id));
  copy.append(category, title, price, description, rating, favorite);
  content.append(imageWrap, copy);
  return content;
};
