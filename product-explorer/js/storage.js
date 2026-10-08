const FAVORITES_KEY = "goods-product-explorer-favorites";

export const getFavorites = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((id) => Number.isInteger(id)) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (favoriteIds) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
    return true;
  } catch {
    return false;
  }
};
