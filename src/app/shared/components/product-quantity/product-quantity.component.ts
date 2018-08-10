import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
    // tslint:disable-next-line:max-line-length
    // if we don't have a cartId we want to create it, so we should talk to Firebase and that means that we need a service called shoppingCartService
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
