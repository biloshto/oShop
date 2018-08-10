import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import { take } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()
      // .pipe(map(x => new ShoppingCart(x.items)));
      .pipe(map((x) => {
        if (!x) { return new ShoppingCart(); }
        return new ShoppingCart(x.items);
      }));
  }

  // async getCart(): Promise<Observable<ShoppingCart>> {
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/' + cartId)
  //     .valueChanges()
  //     .pipe(map((x: ShoppingCartFirebase) => {
  //       if(!x) return new ShoppingCart();
  //       return new ShoppingCart(x.items)
  //     }));
  // }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
      // getting the current time and its numeric representation by calling the getTime() method
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  // a simple, reuseable method for getting a reference to a shopping cart item in Firebase

  // private getOrCreateCart() {
  //   let cartId = localStorage.getItem('cartId');
  //   if (!cartId) {
  //     this.create().then(result => {
  //       localStorage.setItem('cartId', result.key);
  //       // at this point we need to store this new id in the local storage; result.key is the id of this newly created node

  //       return this.getCart(result.key);
  //       // add product to cart (the scenario where we don't have a shopping cart)
  //     });
  //   } else {
  //     return this.getCart(cartId);
  //     // otherwise, if we do have a shopping cart
  //     // add product to cart
  //   }
  // }
  // ABOVE IS THE SAME AS BELLOW

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      // at this point we need to store this new id in the local storage; result.key is the id of this newly created node
      // the scenario where we don't have a shopping cart
      // return this.getCart(result.key);
      // with this implementation we're returning an actual shopping cart
      return result.key;
      // but we want to return the id instead
    }
    // otherwise, if we do have a shopping cart
    // return this.getCart(cartId);
    // with this implementation we're returning an actual shopping cart
    return cartId;
    // but we want to return the id instead
  }
  // because we decorated this method with the async keyword, this means that this method returns a promise
  // tslint:disable-next-line:max-line-length
  // every time we want to add a product to the shopping cart we're going to Firebase to get an actual shopping cart, and we don't really need to read a shopping cart object when adding a product to a cart, all we need is a shopping cart id, so we're changing this method to return a shopping cart id instead of the actual shopping cart object

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    // we want to get a reference to the shopping cart first
    // tslint:disable-next-line:max-line-length
    // so in order to get the actual result, which in this case is an observable, we should either call cart.then() but a cleaner approach is to apply the await modifier here and decorate the method with async
    let item$ = this.getItem(cartId, product.$key);
    // tslint:disable-next-line:max-line-length
    // here we want to get a reference to this product in the shopping cart; we need this reference to calculate the quantity - so if we don't have this product in the shopping cart we're going to create it and set the quantity to 1, otherwise we're going to increase the quantity

    // item$.snapshotChanges().pipe(take(1)).subscribe(item => {
    //   let quantity = (item.quantity || 0) + change;
    //   // increasing or decreasing the quantity by 1
    //   if (quantity === 0) item$.remove();
    //   // we want to remove the item with quantity 0 from the shopping cart
    //   else {
    //     item$.update({
    //       // product: product,
    //       title: product.title,
    //       imageUrl: product.imageUrl,
    //       price: product.price,
    //       quantity: quantity
    //     });
    //   }
    // });

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      let quantity = change;
      if (item.payload.exists()) {
        quantity = item.payload.val().quantity + change;
      }

      if (quantity === 0) { item$.remove(); }
      // we want to remove the item with quantity 0 from the shopping cart; else we want to update it
      else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
       });
      }
    });
  }
}
