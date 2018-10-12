import { Component, OnInit } from '@angular/core';
import { SessionService } from "src/app/session.service";
import { SocketServiceService } from "src/app/core/socket-service.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  toggleDisp = true;
  queAnsList = [];
  randomAns: string;
  answerToggle = true;
  messages: string[] = [];
  ioConnection: any;
  userEmailId: string = this.sessionServices.getValueFromSession('_u');
  userName: string = this.sessionServices.getValueFromSession('_FN');
  messageContent: string;

  constructor(private SocketServiceService: SocketServiceService, private sessionServices: SessionService) { }

  ngOnInit() {
    this.SocketServiceService.initSocket();
    this.SocketServiceService.onMessage();

    //To listen to the socket messages
    setTimeout(() => {
      this.initIoConnection();
    }, 0);
  }

  onToggleDisp() {
    this.toggleDisp = !this.toggleDisp;
    this.getChatDetails();
  }

  getChatDetails() {
    this.SocketServiceService.fetchQuestions().subscribe(data => {
      this.queAnsList = data.data;
    })
  }

  showAnswers(id) {
    var selected = this.queAnsList.filter(
      que => que._id === id);
    var queAns = selected[0].answer;
    this.answerToggle = !this.answerToggle;
    var len = queAns.length;
    this.randomAns = queAns[(Math.floor(Math.random() * len / 2) + 1)]
  }

  private initIoConnection(): void {
    this.SocketServiceService.initSocket();

    this.ioConnection = this.SocketServiceService.onMessage()
      .subscribe((message: string) => {
        let temp = message
        this.messages.push(temp);
      });
  }

  checkLogged() {
    if (!this.sessionServices.getValueFromSession('username')) {
      alert('Please Login to chat')
    }
  }

  startChat(messageVal: HTMLInputElement) {
    if (!this.sessionServices.getValueFromSession('username')) {
      alert('Please Login to chat')
    } else {
      this.SocketServiceService.joinchat(this.userEmailId);
      let tempval = this.sessionServices.getValueFromSession('username') + " : " + messageVal.value;
      this.SocketServiceService.send(tempval);
      this.messageContent = null;
      messageVal.value = '';
    }
  }


}
