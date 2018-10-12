import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/core/authentication.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  
  cartDataProducts:any;
  amount ;
  product_id;


  constructor(private route: ActivatedRoute,private auth: AuthenticationService,
    private router: Router,private sessionService: SessionService) { }

  ngOnInit() {
    this.getCartDetailsByUserId();
  }

  getCartDetailsByUserId() {
    var uid = this.sessionService.getValueFromSession('username');
    this.auth.getCartDetailsByUserId(uid).subscribe((data) => {
      console.log('cart :' + JSON.stringify(data));
      var data1 = JSON.parse(JSON.stringify(data));
      this.cartDataProducts = data1.cart[0].products[0].product_id;
            
      this.amount = data1.sum;
      console.log("product details " + JSON.stringify(this.cartDataProducts));
      console.log("amount " + this.amount);
    });
  }
  

  gotoProducts(){
    this.router.navigate(['home/shop'])
  }

  deleteProduct(pid){
    this.auth.deleteProduct(pid).subscribe((data) =>{
      this.cartDataProducts = data;
    })
  }

  placeOrder(){
    alert(" you're order has been placed,Thank you for shopping")
    this.router.navigate(['home/shop'])
  }
}
