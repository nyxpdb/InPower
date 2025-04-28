const saveToStorage = (data) => {
  localStorage.setItem('products', JSON.stringify(data));
};

export const getProducts = () => {
  try {
    const data = localStorage.getItem('products');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao recuperar produtos:", error);
    return [];
  }
};

export const saveProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  saveToStorage(products);
  return newProduct;
};

export const updateProduct = (updatedProduct) => {
  const products = getProducts().map(p =>
    p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
  );
  saveToStorage(products);
};

export const deleteProduct = (id) => {
  const products = getProducts().filter(p => p.id !== id);
  saveToStorage(products);
};
