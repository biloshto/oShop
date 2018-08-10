import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin));
  }
  // tslint:disable-next-line:max-line-length
  // here we want to check if the authenticated user is also an admin; if the user is admin we're going to return true, otherwise we're going to return false
}
