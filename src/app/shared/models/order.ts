import { ShoppingCart } from "./shopping-cart";

export class Order {
  datePlaced: number;
  items: any[];
  $key: string;

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
    // we want to get the items from the shopping cart and map them to a new structure
  }
}