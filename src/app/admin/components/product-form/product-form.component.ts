import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
// with take we can take only 1 item, only 1 value from our observable and that observable would automatically complete

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;
  // tslint:disable-next-line:max-line-length
  // initially, when we load this template before getting that product from Firebase this product is null so we'd get a null reference exception; so to fix this issue we're initially setting this product to an empty object

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    // now we can easily read the parameter from the routeSnapshot()
    if (this.id) { this.productService.get(this.id).pipe(take(1)).subscribe(product => this.product = product); }
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
    // we're using the router so that we can navigate the user upon creating this product
  }
  // we should either call create or update here and that depend on the ID parameter

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }

    // if (!confirm('Are you sure you want to delete this product?')) { return; }

    // this.productService.delete(this.id);
    // this.router.navigate(['/admin/products']);
  }

}
