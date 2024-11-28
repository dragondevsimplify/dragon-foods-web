import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserSignin } from '../../../models/user.model';
import { UserStore } from '../../../stores/user.store';
import { errorTailorImports } from '@ngneat/error-tailor';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, errorTailorImports],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private userStore = inject(UserStore)
  private router = inject(Router)

  fg = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  signin() {
    if (this.fg.invalid) {
      return
    }

    const user = this.fg.value as UserSignin
    this.authService.signin(user).subscribe(res => {
      if (res.code !== 0 || !res.data) {
        alert(res.message)
        return
      }
      this.userStore.setUserInfo(res.data)
      this.router.navigate(['/admin/dashboard'])
    })
  }
}
