import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css'],
})
export class AdminTemplateComponent {
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  handleLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('login');
      },
    });
  }
}
