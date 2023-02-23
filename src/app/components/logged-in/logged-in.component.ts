import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserBackendCredentialModel } from '../../models/user-backend-credential.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedInComponent {
  readonly userCridentials$: Observable<null | UserBackendCredentialModel> = this._authService.isUserLogged$;

  constructor(private _authService: AuthService, private _router: Router) {
  } 

  backToLogin(): void {
    this._router.navigate(['/login']);
  }

  
}
