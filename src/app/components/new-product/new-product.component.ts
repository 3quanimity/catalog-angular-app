import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  productFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      price: this.formBuilder.control(null, [
        Validators.required,
        Validators.min(1),
      ]),
      sale: this.formBuilder.control(false, [Validators.required]),
    });
  }

  handleAddProduct() {
    this.productService.addNewProduct(this.productFormGroup.value).subscribe({
      next: () => {
        alert('Product added successfully 👌');
        // this.productFormGroup.reset();
        this.router.navigateByUrl('/admin/products');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
