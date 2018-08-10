import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  // we're going to use this field in our template to easily iterate over all the items in the shopping cart

  constructor(private itemsMap?: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    // tslint:disable-next-line:forin
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({
        // title: item.title,
        // imageUrl: item.imageUrl,
        // price: item.price,
        ...item,
        // tslint:disable-next-line:max-line-length
        // when we apply the spread operator to an object TypeScript will iterate over all the properties of this object and add them here (in ...item); so the three lines commented above are exactly the same as the ...item line
        $key: productId
      }));
    }
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line:forin
    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    // tslint:disable-next-line:forin
    for (let productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }
}