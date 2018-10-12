import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../authentication.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  public playerId;
  playerData = [];
  constructor(private route: ActivatedRoute, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getplayer();
  }

  getplayer() {
    this.playerId = this.route.snapshot.params.playerId;
    this.auth.getPlayerById(this.playerId).subscribe((data) => {
      this.playerData = data;
      console.log('playerData:' + JSON.stringify(this.playerData));
    });
  }
}
