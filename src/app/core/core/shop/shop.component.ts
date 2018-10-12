import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "src/app/core/authentication.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  productsData = [];
  categories =[];
  selectedCategory = [];
  public noProducts;

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.auth.getProducts().subscribe((data) => {
      this.productsData = data;
      //  console.log('productsdata:' + JSON.stringify(this.productsData));
    });
  }

  goToProduct(id) {
    //  console.log('product _id' +  id);
    this.router.navigate(['home/product-details', id]);
  }
  getAllCategories() {
    this.auth.getAllCategories().subscribe((data) => {
      this.categories = data;
    })
  }

  applyFilter(event,category_id) {
        if (event.target.checked) {
            this.selectedCategory.push(category_id);
          } else if (!event.target.checked) {
            const index: number = this.selectedCategory.indexOf(category_id);
            this.selectedCategory.splice(index, 1);
          }
    
          if(this.selectedCategory.length == 0) {
            this.getAllProducts();
          } else {
            this.auth.getFilteredProducts(this.selectedCategory).subscribe((data) => {
              console.log(data['products'].length);
               if(data['products'].length != 0) {
                this.productsData = data;
                this.noProducts = false;           
               } else  if(data['products'].length == 0) {
                 this.noProducts = true;
                 this.productsData = [];
               }
            });
          }
      }
}
