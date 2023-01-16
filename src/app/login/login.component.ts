import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userFormGroup!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilderService: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userFormGroup = this.formBuilderService.group({
      userName: this.formBuilderService.control(''),
      password: this.formBuilderService.control(''),
    });
  }

  handleLogin() {
    let userName = this.userFormGroup.value.userName;
    let password = this.userFormGroup.value.password;

    this.authService.login(userName, password).subscribe({
      next: (appUser) => {
        this.authService.authenticateUser(appUser).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin');
          },
        });
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }
}
