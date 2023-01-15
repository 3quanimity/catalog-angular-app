import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Array<Product> | undefined;
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  errorMessage: string = '';
  searchFormGroup!: FormGroup;

  constructor(
    private productService: ProductService,
    private formBuilderService: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilderService.group({
      keyword: this.formBuilderService.control(null),
    });
    this.handleGetProductsPage();
  }

  // TODO: Fix page ZERO
  handleGetProductsPage() {
    this.productService
      .getPgeProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.totalPages = data.totalPages;
          console.log(this.totalPages);
        },
        error: (err) => {
          this.errorMessage = err;
        },
      });
  }

  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.handleGetProductsPage();
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

  handleSetSale(product: Product) {
    let newSaleValue = !product.sale;
    this.productService.setSale(product.id).subscribe({
      next: (data) => {
        product.sale = newSaleValue;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  handleSearchProducts() {
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe({
      next: (data) => (this.products = data),
    });
  }
}
