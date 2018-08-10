import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
    // tslint:disable-next-line:max-line-length
    // if we don't have a cartId we want to create it, so we should talk to Firebase and that means that we need a service called shoppingCartService
  }

  // getQuantity() {
  //   if (!this.shoppingCart) { return 0; }
  // tslint:disable-next-line:max-line-length
  //   // while we get the shopping cart from Firebase there's going to be some delay and during that time this shopping cart is going to be null and we would get a null reference exception in the code below and we don't want that to happen; so at first it would show 0 for the the number of itemsMap in shopping cart and if there are some itemsMap in it the 0 will update to quantity amount

  //   let item = this.shoppingCart.items[this.product.$key];
  //   return item ? item.quantity : 0;
  // }

}
