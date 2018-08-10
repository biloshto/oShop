import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        // when the user logs in we're going to call UserService to save the user
        // tslint:disable-next-line:max-line-length
        // with this approach every time the user logs in we're trying to save them to the database; in a traditional application we save our users only when they register but in this application we don't have the concept of registration; so here the user logs in and can access certain features; in the future if we add registration form we can save the user as part of the registration process; however with this OAuth providers it's possible that the user may update their name or their email address outside of the scope of our application, so with this technic every time they login we ensure that we have their up-to-date name stored in our database

        // let returnUrl = localStorage.getItem('returnUrl');
        // router.navigateByUrl(returnUrl);
        // tslint:disable-next-line:max-line-length
        // with this implementation every time we refresh the page we're redirected to the homepage; to solve this problem here we should delete this returnUrl from local storage once we read it because we want to do this redirection only the first time and that is when the user logs in we send them to Google and we store the returnUrl to local storage, and when they come back from Google we want to read this url from local storage and redirect the user but only this time, not in the future, so in other words this should happen only once as part of our authentication

        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    });
    // tslint:disable-next-line:max-line-length
    // every time the user logs in or logs out this observable is going to emit a new value; if the user logs out there's going to be no user object, we receive null that's why we have this conditional statement here
  }
}
