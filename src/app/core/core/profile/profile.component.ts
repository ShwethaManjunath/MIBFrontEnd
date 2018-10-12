import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/core/authentication.service";
import { SessionService } from "src/app/session.service";
import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userId;
  userData = [];
  accountData=[];
  

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService,
    private sessionService: SessionService,private router: Router) { }

  ngOnInit() {
    
    this.getUserProfile();
  }

 
  updateProfile(event){
    //console.log(event);
    event.preventDefault();
    const target = event.target;
    const uid = this.sessionService.getValueFromSession('username');
    const name = target.querySelector('#name').value;
    const phone = target.querySelector('#phone').value;
    const address = target.querySelector('#address').value;

    this.auth.updateProfile(uid,name,phone,address).subscribe((data)=>{
      this.userData=data['user'];
      this.accountData = data['account'];
      this.closeModal();
      this.getUserProfile();

    })
  }

  getUserProfile(){
    this.userId = this.route.snapshot.params.userId;
    this.auth.getUserProfileById(this.userId).subscribe((data) => {
    this.userData = data['user'];
     //console.log(data['user'].name)
    this.accountData = data['account'];
    
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
}

}
