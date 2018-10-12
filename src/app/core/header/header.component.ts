import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';
import { CommonsareService  } from '../../common-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged ;
  username;
  userId;
  constructor(private router: Router, private sessionService: SessionService,
    private commonsareService: CommonsareService) {
      this.commonsareService.loginbuttonTrigger .subscribe(data => {
        this.username = data;
      //  alert(this.username);
      });
     }

  ngOnInit() {
   
  }

  openCart() {
    alert('Please Login to check cart');
  }

  openLogin() {
    this.router.navigate(['home']);
  }

  goToHome() {
   this.router.navigate(['index']);
  }

  goTovideos() {
    this.router.navigate(['home/videos']);
  }

  goToStats() {
    this.router.navigate(['home/players']);
  }

  goToShopping() {
    this.router.navigate(['home/shop']);
  }

  goToChats() {

  }

  goToAboutUS() {
    this.router.navigate(['home/aboutUs']);
  }

  // isLoggedIn() {
  //   // alert(this.isLogged);
  //   if (this.sessionService.getValueFromSession('token')) {
  //     this.isLogged = true;
  //     this.userId = this.sessionService.getValueFromSession('username');
  //   } else {
  //     this.isLogged = false;
  //   }
 
  // }


  signout(uid) {
    this.sessionService.removeSessionItem('token');
    this.sessionService.setValueToSession('isLoggedIn', false);
    this.sessionService.setValueToSession('userId',null);
    window.location.reload();
    alert('you have logged out!!');
  
  }

  goToProfile(){
    //alert(this.username);
    this.router.navigate(['home/profile', this.username]);
  }
  goToAdmin(){
    this.router.navigate(['home/admin']);
  }
}
