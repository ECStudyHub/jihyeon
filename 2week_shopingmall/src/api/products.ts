import { apiClient } from ".";

export interface ProductDTO {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ProductDetailDTO extends ProductDTO {
  productOptions: Array<{
    id: number;
    name: string;
    price: number;
    stock: number;
  }>;
}

export const productAPI = {
  async getProducts(): Promise<ProductDTO[]> {
    return apiClient.fetch("/products");
  },

  async getProduct(id: string): Promise<ProductDetailDTO> {
    return apiClient.fetch(`/products/${id}`);
  },
};
