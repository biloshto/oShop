import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
    // add a product to the list of products in our database
  }

  // getAll() {
  //   return this.db.list('/products').valueChanges();
  //   // returning all the products in our database
  // }

  getAll() {
    return this.db.list('/products').snapshotChanges()
      .pipe(map(data => {
        return data.map(action => {
          const $key = action.payload.key;
          const data = { $key, ...action.payload.val() };
          return data;
        });
      }));
  }
  // tslint:disable-next-line:max-line-length
  // since valueChanges() doesn't return meta-data, to get the unique IDs of the items in our collection we need to use snapshotChanges() instead

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
