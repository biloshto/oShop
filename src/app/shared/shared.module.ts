import { CustomFormsModule } from 'ng2-validation';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgxDatatableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    // NgbModule adds a bunch of directives to work with Bootstrap components
    RouterModule.forChild([
      // routes for logged in users
      {
        path: 'order-detail/:id',
        component: OrderDetailComponent,
        canActivate: [ AuthGuard ]
      }
    ])
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgxDatatableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
    // in the exports array we should add modules not modules with providers and NgbModule.forRoot() is exactly that; to fix that error we're return the actual module here
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
