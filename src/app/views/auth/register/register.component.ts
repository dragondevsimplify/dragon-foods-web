import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserStore } from '../../../stores/user.store';
import { UserSignup } from '../../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private userStore = inject(UserStore)
  private router = inject(Router)

  fg = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  get usernameField() {
    return this.fg.get('username')
  }

  get emailField() {
    return this.fg.get('email')
  }

  get passwordField() {
    return this.fg.get('password')
  }

  signup() {
    if (this.fg.invalid) {
      return
    }

    const user = this.fg.value as UserSignup
    this.authService.signup(user).subscribe(res => {
      if (res.code !== 0) {
        alert(res.message)
        return
      }
      this.userStore.setUserInfo(res.data)
      this.router.navigate(['/admin/dashboard'])
    })
  }
}