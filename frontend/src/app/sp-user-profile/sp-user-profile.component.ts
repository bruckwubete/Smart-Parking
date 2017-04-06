import { Component, OnInit } from '@angular/core';
import {Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sp-user-profile',
  templateUrl: './sp-user-profile.component.html',
  styleUrls: ['./sp-user-profile.component.css']
})
export class SpUserProfileComponent implements OnInit {
  user;
  router;
  constructor(private _tokenService : Angular2TokenService, private r: Router) {
    this.router = r;
    
  }

  ngOnInit() {
    this.user = this._tokenService.currentUserData;
    if(this.user){
      this.avatarDataCircle1.text = this.user.username;
    }else{
      this.router.navigate(['/session/sign-in']);
    }
  }
  
  public avatarDataCircle1: any = {
    size: 200,
//        background: '#F39C12', // by default it will produce dynamic colors
    fontColor: '#FFFFFF',
    border: "2px solid #d3d3d3",
    isSquare: false,
    text: "B J"
  };

}
