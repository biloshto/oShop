import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  // constructor(public auth: AuthService) { }
  // tslint:disable-next-line:max-line-length
  // // we need to add the public access modifier for this field because when we build our application for production the Ahead of Time compiler expects these fileds that we use in our templates to be public

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {  }
  // we no longer need to mark this as public as we're not going to pass this object to the template

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
