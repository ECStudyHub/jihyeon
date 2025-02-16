export interface ProductCart {
  productId: number;
  optionId: number;
  quantity: number;
}

export function storeProductsCart(productsCart: ProductCart[]) {
  localStorage.setItem("products_cart", JSON.stringify(productsCart));
}
export function resetProductsCart() {
  storeProductsCart([]);
}

export function getStoredProductsCart(): ProductCart[] {
  const productsCart = localStorage.getItem("products_cart");
  return productsCart ? JSON.parse(productsCart) : [];
}
