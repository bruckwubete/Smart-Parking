import { Component, OnInit } from '@angular/core';
import {Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-sp-user-profile',
  templateUrl: './sp-user-profile.component.html',
  styleUrls: ['./sp-user-profile.component.css']
})
export class SpUserProfileComponent implements OnInit {
  user;
  constructor(private _tokenService : Angular2TokenService) { }

  ngOnInit() {
    this.user = this._tokenService.currentUserData;
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
