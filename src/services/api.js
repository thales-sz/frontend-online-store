// https://api.mercadolibre.com/sites/MLB/categories - categorias

export async function getCategories() {
  try {
    const responseAPI = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const result = await responseAPI.json();
    return result;
  } catch (e) {
    throw new Error('Failed to fetch');
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const responseAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
    const result = await responseAPI.json();
    return result;
  } catch (error) {
    throw new Error('Failed to fetch');
  }
}
