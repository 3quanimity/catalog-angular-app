import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
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
      { id: UUID.UUID(), name: 'Computer', price: 3000, sale: false },
      { id: UUID.UUID(), name: 'Mobile', price: 2000, sale: false },
      { id: UUID.UUID(), name: 'Laptop', price: 4000, sale: true },
      { id: UUID.UUID(), name: 'Tablet', price: 1000, sale: false },
      { id: UUID.UUID(), name: 'Camera', price: 5000, sale: false },
      { id: UUID.UUID(), name: 'Keyboard', price: 100, sale: false },
      { id: UUID.UUID(), name: 'Mouse', price: 50, sale: false },
      { id: UUID.UUID(), name: 'Monitor', price: 500, sale: false },
      { id: UUID.UUID(), name: 'Printer', price: 200, sale: false },
      { id: UUID.UUID(), name: 'Scanner', price: 300, sale: false },
      { id: UUID.UUID(), name: 'Speakers', price: 200, sale: false },
      { id: UUID.UUID(), name: 'Headphones', price: 100, sale: false },
      { id: UUID.UUID(), name: 'Microphone', price: 100, sale: false },
      { id: UUID.UUID(), name: 'Webcam', price: 100, sale: false },
      { id: UUID.UUID(), name: 'Router', price: 100, sale: false },
      { id: UUID.UUID(), name: 'Modem', price: 100, sale: false },
      { id: UUID.UUID(), name: 'Switch', price: 100, sale: false },
      { id: UUID.UUID(), name: 'Hub', price: 100, sale: false },
      { id: UUID.UUID(), name: 'Cable', price: 100, sale: false },
      { id: UUID.UUID(), name: 'Adapter', price: 100, sale: false },
      { id: UUID.UUID(), name: 'HDMI', price: 100, sale: false },
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

  public deleteProduct(id: string): Observable<Boolean> {
    this.products = this.products.filter((p) => p.id != id);
    return of(true);
  }

  public setSale(id: string): Observable<Boolean> {
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
