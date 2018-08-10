import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) { this.userId = user.uid; }
    });
    // here we get a Firebase user; uid is the unique identifier that Firebase assigns to each user
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder(shipping: any) {
    let order = new Order(this.userId, shipping, this.cart);
    // this is a refactoring of the code below, a much cleaner way

    // let order = {
    //   userId: this.userId,
    //   datePlaced: new Date().getTime(),
    //   shipping: this.shipping,
    //   items: this.cart.items.map(i => {
    //     return {
    //       product: {
    //         title: i.title,
    //         imageUrl: i.imageUrl,
    //         price: i.price
    //       },
    //       quantity: i.quantity,
    //       totalPrice: i.totalPrice
    //     };
    //   })
    //   // we want to get the items from the shopping cart and map them to a new structure
    // };

    // this.orderService.placeOrder(order).then(result => {
    //   this.router.navigate(['/order-success', result.key]);
    // });
    // this is the same as the code below, the only difference is there we await for the result and that's why we need to add async in front of our method's name

    // now that we have an order object we can call the orderService and pass this order to the placeOrder() method
    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
    // result.key is the route parameter; we should note that this is key and not $key, $key is used when we read a node from Firebase but key is used when we store something in Firebase so Firebase returns this newly generated id in this key property


  }

}
