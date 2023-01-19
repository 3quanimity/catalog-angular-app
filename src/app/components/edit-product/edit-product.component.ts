import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId!: string;
  product!: Product;
  productFormGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.productFormGroup = this.formBuilder.group({
          name: this.formBuilder.control(this.product.name, [
            Validators.required,
            Validators.minLength(4),
          ]),
          price: this.formBuilder.control(this.product.price, [
            Validators.required,
            Validators.min(1),
          ]),
          sale: this.formBuilder.control(this.product.sale, [
            Validators.required,
          ]),
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleUpdateProduct() {
    let product = this.productFormGroup.value;
    product.id = this.productId;

    this.productService.updateProduct(product).subscribe({
      next: (prod) => {
        alert('Product updated successfully 👌');
        // this.productFormGroup.reset();
        this.router.navigateByUrl('/admin/products');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
