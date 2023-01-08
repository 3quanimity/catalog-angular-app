import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<any>;
  constructor() {
    this.products = [
      { id: 1, name: 'Computer', price: 3000 },
      { id: 2, name: 'Mobile', price: 2000 },
      { id: 3, name: 'Laptop', price: 4000 },
      { id: 4, name: 'Tablet', price: 1000 },
      { id: 5, name: 'Camera', price: 5000 },
    ];
  }

  getAllProducts(): Observable<Array<any>> {
    // let random = Math.random();
    // if (random > 0.5) {
    //   return throwError(
    //     () => new Error('Intentionally provoked error for testing')
    //   );
    // }
    return of(this.products);
  }
}
