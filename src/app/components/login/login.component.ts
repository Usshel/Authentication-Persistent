import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
constructor(private _authService: AuthService, private _router: Router){}


  onLoginFormSubmitted(loginForm: FormGroup): void {
    this._authService.login({
      data:{
        email: loginForm.value.email,
        password: loginForm.value.password
      }
    }).subscribe({
      error:(err) => loginForm.setErrors({
        valid: err.error.message
      }),
      complete: () => this._router.navigate(['/logged-in'])
    })
  }
}
