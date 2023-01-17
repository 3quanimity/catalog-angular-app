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
    private productService: ProductService,
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

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    console.log(this.productFormGroup);
    if (error['required']) {
      return `${fieldName} is required!`;
    } else if (error['minlength']) {
      return `${fieldName} should have at least ${error['minlength']['requiredLength']} characters!`;
    } else if (error['min']) {
      return `${fieldName} should be superior to ${error['min']['min'] - 1}!`;
    } else return '';
  }
}
