import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
// import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // products$;
  products: Product[] = [];
  // filteredProducts: any[];
  // since we're no longer using filteredProducts in our template we don't have to define it here like a field
  // COMMENTING THIS OUT AFTER IMPLEMENTING NGX-DATATABLE
  subscription: Subscription;
  rows: Product[] = [];

  // // Angular 4 Datatable
  // tableResource: DataTableResource<Product>;
  // items: Product[] = [];
  // itemCount: number;

  constructor(private productService: ProductService) {
    // this.products$ = this.productService.getAll();
    // if we don't subscribe we need to use the async pipe to extract the data
    // this.subscription = this.productService.getAll()
    //   .subscribe(products => this.filteredProducts = this.products = products);
    // COMMENTING THIS OUT AFTER IMPLEMENTING NGX-DATATABLE

    // // Angular 4 Datatable
    // this.subscription = this.productService.getAll()
    //   .subscribe(products => {
    //     this.filteredProducts = this.products = products;
    //     this.initializeTable(products);
    //   });

    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.rows = this.products;
      });
  }

  // // Angular 4 Datatable
  // private initializeTable(products: Product[]) {
  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({ offset: 0 })
  //     .then(items => this.items = items);
  //   this.tableResource.count()
  //     .then(count => this.itemCount = count);
  // }

  // reloadItems(params) {
  //   if (!this.tableResource) { return; }

  //   this.tableResource.query(params)
  //     .then(items => this.items = items);
  // }

  filter(query: string) {
    // this.filteredProducts = (query) ?
    //   this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
    //   this.products;
    // COMMENTING THIS OUT AFTER IMPLEMENTING NGX-DATATABLE
      // if we have a query here, or in other words if the user types something we want to apply a filter on our main array of products
      // we want to get all the products whose title has this query we'd passed to this filter() method
      // and if we don't have a query, then we don't want to iterate over this products array and filter, we can simply reset it to products

    let filteredProducts = this.products.filter(product => {
      return product.title.toLowerCase().includes(query.toLowerCase());
    });
    this.rows = filteredProducts;

    // // Angular 4 Datatable
    // this.initializeTable(this.filteredProducts);
  }
  // tslint:disable-next-line:max-line-length
  // if we have around 500 or 1000 items, it's more efficent to download all these items when the page loads and do the filtering on the client - this way the user is going to have a better and faster user experience; in contrast, if we have tens of thousands of records it wouldn't make sense to download all this records to the client and do the filtering there

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
