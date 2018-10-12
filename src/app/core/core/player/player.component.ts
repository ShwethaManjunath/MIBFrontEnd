import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../authentication.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  playersData = [];
  playerData = [];

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.auth.getPlayers().subscribe((data) => {
      this.playersData = data ;
     // console.log('Players data:' + JSON.stringify(this.playersData));
      });
  }

  goToPlayer(player_id) {
    console.log('Player _id'  +  player_id);
        this.router.navigate(['home/player-details', player_id]);
  }
}
