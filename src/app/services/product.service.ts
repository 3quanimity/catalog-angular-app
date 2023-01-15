import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<Product>;
  constructor() {
    // Fake Data Base
    this.products = [
      { id: 1, name: 'Computer', price: 3000, sale: false },
      { id: 2, name: 'Mobile', price: 2000, sale: false },
      { id: 3, name: 'Laptop', price: 4000, sale: true },
      { id: 4, name: 'Tablet', price: 1000, sale: false },
      { id: 5, name: 'Camera', price: 5000, sale: false },
    ];
  }

  public getAllProducts(): Observable<Product[]> {
    let random = Math.random();
    if (random < 0.1) {
      return throwError(
        () => new Error('Intentionally provoked error for testing')
      );
    }

    return of(this.products);
  }

  public deleteProduct(id: number): Observable<Boolean> {
    this.products = this.products.filter((p) => p.id != id);
    return of(true);
  }

  public setSale(id: number): Observable<Boolean> {
    let product = this.products.find((product) => product.id == id);
    if (product) {
      product.sale = !product.sale;
      return of(true);
    } else {
      return throwError(() => new Error('Product not found!'));
    }
  }

  public searchProducts(keyword: string): Observable<Product[]> {
    let products = this.products.filter((product) =>
      product.name.includes(keyword)
    );
    return of(products);
  }
}
