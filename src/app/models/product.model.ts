export interface Product {
  id: string;
  name: string;
  price: number;
  sale: boolean;
}

export interface ProductsPage {
  products: Product[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
