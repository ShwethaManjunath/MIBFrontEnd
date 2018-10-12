import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/core/authentication.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public productId;
  productData = [];
  public uid;
  public quantity;
  constructor(private route: ActivatedRoute, private auth: AuthenticationService,
    private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    this.getProductById();
  }

  getProductById() {
    this.productId = this.route.snapshot.params.productId;
    console.log(this.productId)
    this.auth.getProductById(this.productId).subscribe((data) => {
      this.productData = data['product'];
      console.log('productData:' + JSON.stringify(this.productData));
    });
  }

  // goToOrder(id){
  //   console.log('productId'  +  id);
  //   this.router.navigate(['home/order-details', id]);
  // }


  getQuantity(event) {
    // console.log(event)
    alert(event);
    //event.preventDefault();
    this.quantity = event.target.select('#quantity').value;
    alert(this.quantity);
  }

  goToOrder(pid) {
    if(this.sessionService.getValueFromSession('username')){
      var uid = this.sessionService.getValueFromSession('username');
      var quantity = 1;
    //  alert("uid,pid,qunatity"+uid+pid+quantity);
      this.auth.addToCart(uid, pid, quantity).subscribe((data) => {
        console.log("cart"+ data['cart'])
        this.router.navigate(['home/order-details'])
      });
    }else{
      alert('you have not logged in ,please login');
      this.router.navigate(['home/login']);
    }
      
  }
}
