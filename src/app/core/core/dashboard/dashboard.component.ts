import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/authentication.service";
import { SessionService } from "src/app/session.service";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productsData =[];
  categories =[];

  @ViewChild('saveBtn') saveBtn: ElementRef;
  

  constructor(private router: Router, private auth: AuthenticationService,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.auth.getProducts().subscribe((data)=>{
      this.productsData=data;
      //this.categories = this.productsData['category_id'];
      var data1 = JSON.parse(JSON.stringify(data));
     // this.categories = data1[0].category_id;
            
      console.log(data);
    });
  }
  getCategories(){
    this.auth.getAllCategories().subscribe((data)=>{
      this.categories = data['categories'];
      //alert(this.categories)
      console.log(data);
    })
  }
  addProduct(event){
    event.preventDefault();
    const target = event.target;
    var uid = this.sessionService.getValueFromSession('username');
    const name = target.querySelector('#name').value;
    const quantity = target.querySelector('#quantity').value;
    const price = target.querySelector('#price').value;
    const category_id = target.querySelector('#category').value;
    const image = target.querySelector('#image').value;
    const desc = target.querySelector('#desc').value;
    this.auth.addProduct(uid,name,quantity,price,category_id,image,desc).subscribe((data)=>{
      this.productsData = data;
      this.getProducts();
    })
  }

  private closeModal(): void {
    this.saveBtn.nativeElement.click();
}
}
