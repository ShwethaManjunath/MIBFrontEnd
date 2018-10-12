import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { SessionService } from '../../../session.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { CommonsareService } from '../../../common-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData = [];
  isLoggedIn;

  // tslint:disable-next-line:prefer-const

  constructor(private router: Router, private auth: AuthenticationService,
    private sessionService: SessionService, private flashMessagesService: FlashMessagesService,
    private commonsareService: CommonsareService ) { }

  ngOnInit() {
  }

  checkCredentialToAdmin() {
    this.router.navigate(['admin-access']);
  }

  checkCredentialToUSer() {
    this.router.navigate(['user-access']);
  }

  registerForm() {
    // alert('hi');
    this.router.navigate(['/home/login/']);
  }
  goToHome() {
    this.router.navigate(['index']);
  }
  register(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.querySelector('#name').value;
    const email_id = target.querySelector('#email_id').value;
    const password = target.querySelector('#regpassword').value;
    const phone = target.querySelector('#phone').value;

    this.auth.register(name, email_id, phone, password).subscribe((data) => {
      this.userData = data;
     // console.log('Error data:' + JSON.stringify(data));
     let errors = this.userData['errors'];
      if (errors) {
        //target(event);
        errors.forEach(element => {
          console.log(element)
          this.flashMessagesService.show(element.msg, {  
            classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
            timeout: 6000, // Default is 3000
          });
        });
      } else {
        this.userData = data;
        this.flashMessagesService.show(this.userData['message'], {
          classes: ['alert', 'alert-success'], // You can pass as many classes as you need
          timeout: 3000, // Default is 3000
        });
      }
    });
    target.querySelector('#name').value = '';
    target.querySelector('#email_id').value = '';
    target.querySelector('#regpassword').value = '';
    target.querySelector('#phone').value = '';
    // alert('You have successfully Registered , you can login now');
  }

  login(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    // console.log(username, password);
    this.auth.logIn(username, password).subscribe((data) => {
      this.userData = data;
      // console.log('User data:' + JSON.stringify(this.userData));
      this.sessionService.setValueToSession('token', this.userData['token']);
      this.sessionService.setValueToSession('username', username);
      // console.log('User data:' + this.sessionService.getValueFromSession('token'));
      this.commonsareService.loginbuttonTrigger.emit(username);
      if (this.userData['error']) {
        this.flashMessagesService.show(this.userData['error'], {
          classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
          timeout: 3000, // Default is 3000
        });
      } else {
        this.router.navigate(['index']);
      }
    });
  }
}

