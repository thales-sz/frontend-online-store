// https://api.mercadolibre.com/sites/MLB/categories - categorias

export async function getCategories() {
  try {
    const responseAPI = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const result = await responseAPI.json();
    return result;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (query === 'query') {
    try {
      const responseAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId} `);
      const result = await responseAPI.json();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  /* if (categoryId === null && query) {
    try {
      const responseAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
      const result = await responseAPI.json();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  } */
}
