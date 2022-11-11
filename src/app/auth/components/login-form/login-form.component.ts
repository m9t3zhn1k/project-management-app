import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup = new FormGroup({
    login: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private router: Router) {}

  submitForm(): void {
    this.router.navigateByUrl('');
  }
}
