import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<any> | undefined;

  constructor() {}

  ngOnInit(): void {
    this.products = [
      { id: 1, name: 'Computer', price: 3000 },
      { id: 2, name: 'Mobile', price: 2000 },
      { id: 3, name: 'Laptop', price: 4000 },
      { id: 4, name: 'Tablet', price: 1000 },
      { id: 5, name: 'Camera', price: 5000 },
    ];
  }

  handleDeleteProduct(product: any) {
    const index = this.products?.indexOf(product);
    this.products?.splice(index!, 1);
  }
}
