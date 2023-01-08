import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<Product> | undefined;
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.handleGetAllProducts();
  }

  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  handleDeleteProduct(product: Product) {
    let deletionConfirmation = confirm(
      `👋 You are deleting ${product.name} from this table`
    );
    if (!deletionConfirmation) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: (data: Boolean) => {
        let index = this.products?.indexOf(product);
        this.products?.splice(index!, 1);
      },
    });
  }
}
