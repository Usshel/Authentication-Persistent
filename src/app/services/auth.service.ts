import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HasDataModel } from '../models/has-data.model';
import { CredentialModel } from '../models/credential.model';
import { UserBackendCredentialModel } from '../models/user-backend-credential.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isUserLoggedSubject: BehaviorSubject<null  | UserBackendCredentialModel > = new BehaviorSubject<null  | UserBackendCredentialModel >(null);
  public isUserLogged$: Observable<null | UserBackendCredentialModel> = this._isUserLoggedSubject.asObservable()



  constructor(private _httpClient: HttpClient,   private _storage: Storage ) {
  }

  saveUserCredentialInLocalStorage(credential: UserBackendCredentialModel) {
    this._storage.setItem('token', credential.token),
    this._storage.setItem('id', credential.id)
  }

  login(credentials: HasDataModel<CredentialModel>): Observable<UserBackendCredentialModel> {
    return this._httpClient.post<UserBackendCredentialModel>('https://us-central1-courses-auth.cloudfunctions.net/auth/login', credentials)
    .pipe(map((userCredentials) => ({
        id: userCredentials.id,
        token: userCredentials.token
        }),
        tap((userCredentials: UserBackendCredentialModel) => {
            this._isUserLoggedSubject.next(userCredentials),
            this.saveUserCredentialInLocalStorage(userCredentials)
        })
    ));
  }
}
