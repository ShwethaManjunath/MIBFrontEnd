import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  public playerId;
  playerData = [];
  constructor(private route: Router , private auth: AuthenticationService) { }

  ngOnInit() {
    this.getplayerS();
  }

  getplayerS() {
// this.playerId = this.route.snapshot.params.playerId;
    this.auth.getPlayers().subscribe((data) => {
      this.playerData = data;
      console.log('playerData:' + JSON.stringify(this.playerData));
    });
  }

    goToPlayer(player_id) {
      console.log('Player _id'  +  player_id);
          this.route.navigate(['home/player-details', player_id]);
  }
}
