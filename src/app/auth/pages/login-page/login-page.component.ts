import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {


  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  onLogin(): void {
    this.authService.login('admin@example.com', 'admin')
      .subscribe(user => {
        console.log({ user });
        this.router.navigate(['/']);
      })
  }

}
