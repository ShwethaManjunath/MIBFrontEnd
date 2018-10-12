import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/core/authentication.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public productId;
  productData = [];
  constructor(private route: ActivatedRoute,private auth: AuthenticationService) { }

  ngOnInit() {
    this.getProductById();
  }

  getProductById() {
    this.productId = this.route.snapshot.params.productId;
    this.auth.getProductById(this.productId).subscribe((data) => {
      this.productData = data;
      console.log('productData:' + JSON.stringify(this.productData));
    });
  }
}
