import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user: firebase.User;
  // we'd have used this if we were subscribing to the observable

  user$: Observable<firebase.User>;
  // instead we're using this for the async pipe

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    // with ActivatedRoute we can get the current route and extract the returnUrl parameter

    // afAuth.authState.subscribe(x => console.log(x));
    // we can subscribe to authState to get the state of our authentication

    // afAuth.authState.subscribe(user => this.user = user);
    // tslint:disable-next-line:max-line-length
    // if we store the username like this then we'd have to implement the OnDestroy method to unsubscribe from this subscription to prevent memory leaks; the other way is to use the async pipe which is simplier and cleaner and that's exactly what we're going to do here

    this.user$ = afAuth.authState;
    // we're going to unwrap this observable in our template using the async pipe
    // this pipe would automatically unsubscribe from this observable when that component is destroyed
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    // tslint:disable-next-line:max-line-length
    // before sending the user to google we want to store the return url in local storage; if we have the returnUrl parameter we're going to use that, otherwise we're going to use the route of our website

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    // we call signInWithRedirect() because we want to implement Google authentication in our app
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) { return this.userService.get(user.uid); }

        // return Observable.of(null);
        return from<string>(['']);
        // return an observable of null
      }));
  }

}
