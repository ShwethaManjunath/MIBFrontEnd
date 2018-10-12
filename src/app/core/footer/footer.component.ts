import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  isUser(event) {
    const token = this.sessionService.getValueFromSession(event);
    if (token === 'token') {
      return true;
    } else {
      return false;
    }
  }
}
