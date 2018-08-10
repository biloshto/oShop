import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // products$;
  // a field which is an observable of products
  products: Product[] = [];
  filteredProducts: Product[] = [];
  // tslint:disable-next-line:max-line-length
  // generally speaking is a good practice to always initialize our arrays, just set them to an empty array; otherwise we would get an error - TypeError: Cannot read property 'filter' of undefined
  category: string;
  // a field that is used for highlighting the currently selected category
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();

    this.populateProducts();
  }

  private populateProducts() {
    // this.products$ = productService.getAll();
    // tslint:disable-next-line:max-line-length
    // instead of using the products$ observable we need to subscribe and get all the products from Firebase and then set them to this.products
    this.productService.getAll()
      // tslint:disable-next-line:max-line-length
      // with switchMap operator we can switch one observable to another, so here we get the result of the first observable, we get all the products and then we're going to return another observable; we basically switched our first observable which was a list of products into this second observable route.queryParamMap; so after this switchMap we can subscribe to the result and at this point we have our route parameters
      .pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
        // this is the second observable that we switched to, so when we subscribe to this we get the route parameters
      }))
      .subscribe(params => {
          this.category = params.get('category');
          // we promoted this variable to a field in this class so we can go to our template and highlight the currently selected category

          this.applyFilter();

          // tslint:disable-next-line:max-line-length
          // when we want to do client-side filtering we can't use the products$ observable here, we need to store all the products in an array in this component so we can filter them
        });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    // if we have a category we're going to call the filter() method on our products
      this.products.filter(p => p.category === this.category) :
      // we get a product object and return it if its category is exactly this.category
      this.products;
      // otherwise, if we don't have a category we want to return all products
  }

}
