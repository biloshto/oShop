import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  // cart: ShoppingCart;
  // cartSubscription: Subscription;
  // ONE WAY TO DO THIS IS WITH SUBSCRIPTION; THE OTHER IS WITH PASSING AN OBSERVABLE TO OUR TEMPLATE AND UNWRAP IT THERE WITH THE ASYNC PIPE
  cart$: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) { }

  // async ngOnInit() {
  //   let cart$ = await this.cartService.getCart();
  //   this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
  //   // getCart() returns a promise so we await that, which means we should make this method async; now we can get the actual shopping cart with subscribing to this observable
  // }
  // in this method we read the shopping cart; here we need an actual shopping cart, not an observable because we want to directly access the items in the shopping cart
  // ONE WAY TO DO THIS IS WITH SUBSCRIPTION; THE OTHER IS WITH PASSING AN OBSERVABLE TO OUR TEMPLATE AND UNWRAP IT THERE WITH THE ASYNC PIPE

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    // getCart() returns a promise so we await that, which means we should make this method async; now we can get the actual shopping cart with subscribing to this observable
  }

  // ngOnDestroy() {
  //   this.cartSubscription.unsubscribe();
  // }
  // ONE WAY TO DO THIS IS WITH SUBSCRIPTION; THE OTHER IS WITH PASSING AN OBSERVABLE TO OUR TEMPLATE AND UNWRAP IT THERE WITH THE ASYNC PIPE

  // with this implementation we're communicating with the other components through their Inputs, so we no longer need to subscribe to this here; we can simply pass our shopping cart observable to our template, unwrap it here once and then pass that actual shopping cart object to our child components

}
