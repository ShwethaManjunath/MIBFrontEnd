import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';
import { SessionService } from "src/app/session.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  playersvideos;

  public videoId;
  public videoLikes;
  public videodisLikes;
  public islike;
  public uid;
  public username;
  public videosData = [];
  public videoData = [];
  public likeDetails;
  public commentDetails;
  public presentVideo;
  public videoLikeData = [];

  public videourl = "https://www.youtube.com/embed/";
  public safeURL;
  constructor(private router: Router, private auth: AuthenticationService,
    private sanitizer: DomSanitizer,
    private sessionService: SessionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllvideos();
  }

  getVideoId(vid) {

    this.auth.getVideoById(vid).subscribe((data) => {
      this.videoData = JSON.parse(JSON.stringify(data['videoDetails']));
      this.videoId = vid;
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videourl + vid);
      console.log(this.safeURL);
      this.videoLikes = this.videoData['likes'];
      this.videodisLikes = this.videoData['disLikes'];
      this.likeDetails = data['videoLikes'];
      this.commentDetails = data['videoComment'].comments;
      //  this.commentDetails =data['videoComment'].comments;
    });
  }

  goToLike() {
    // alert(this.islike);
    var uid = this.sessionService.getValueFromSession('username');
    if (this.sessionService.getValueFromSession('username') == null) {
      alert("you have not logged in,Please login to like ")
      this.router.navigate(['home/login']);
    } else {
      alert(this.videoId);
      this.auth.getVideoLikeByuserId(uid, this.videoId).subscribe((data) => {
        this.videoLikeData = data['videoLike']
        if (this.videoLikeData.length === 0 || this.videoLikeData['likes']===true) {
            this.auth.doLike(this.videoId, uid, this.videoLikes+1, true).subscribe((data) => {
              this.videoData = data['video'];
              this.videoLikes = this.videoData['likes'];
              this.videodisLikes = this.videoData['disLikes'];
             // this.commentDetails = data['videoComment'].comments;
            });
         
        } else {
          alert("you have already liked or unliked it")
        }
      })
    }
  }
  goToDisLike() {
    var uid = this.sessionService.getValueFromSession('username');
    if (this.sessionService.getValueFromSession('username') == null) {
      alert("you have not logged in,Please login to Dislike ")
      this.router.navigate(['home/login']);
    } else {
      //alert(this.videoId);
      this.auth.getVideoLikeByuserId(uid, this.videoId).subscribe((data) => {
        this.videoLikeData = data['videoLike'];
        if (this.videoLikeData.length === 0 || this.videoLikeData['likes']===false) {
            this.auth.doUnLike(this.videoId, uid, this.videodisLikes+1, false).subscribe((data) => {
              this.videoData = data['video'];
              this.videoLikes = this.videoData['likes'];
              this.videodisLikes = this.videoData['disLikes'];
              //this.commentDetails = data['videoComment'].comments;
            });
        } else {
          alert("you have already unliked or liked it")
        }
      })
    }
  }

  // Saving video comment
  saveComment(event) {
    const target = event.target;
    if (this.sessionService.getValueFromSession('token') == null) {
      this.router.navigate(['home/login']);
    } else {
      event.preventDefault();
     // alert(this.videoId);
      const comment = target.querySelector('#comment').value;
      var uid = this.sessionService.getValueFromSession('username');
      this.auth.saveComment(this.videoId, uid, comment).subscribe((data) => {
        this.commentDetails = data['videoComment'].comments;
        this.username = data['username'];
        target.querySelector('#comment').value = '';
      });
    }
  }

  getAllvideos() {
    this.auth.getAllVideos().subscribe((data) => {
      this.videosData = data['videoDetails'];
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videourl + this.videosData[0].videoYtID);
      this.videoLikes = this.videosData[0].likes;
      this.videoId = this.videosData[0].videoYtID;
      this.videodisLikes = this.videosData[0].disLikes;
      this.likeDetails = data['videoLikes'];
    //  this.commentDetails = data['videoComment'].comments;
      console.log(this.commentDetails);
    })
  }
}
