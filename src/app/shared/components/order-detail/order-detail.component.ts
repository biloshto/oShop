import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId: string;
  order$;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getOrderById(this.orderId);
  }

  navigateBack() {
    this.location.back();
  }
  // with this implementation when the user clicks on the Back to Orders button it doesn't nececarily means that it will take them to the orders list, instead it takes them to the previous page they where on; let's consider the case where user directly lands to the order details page and if they presses the back button with location back it will redirect user to previous page which will not be the orders list page

  // navigateBack(): void {
  //   this.router.navigate(['../../**/orders'], {relativeTo: this.route});
  // }

}
