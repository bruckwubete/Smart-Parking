import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {Angular2TokenService } from 'angular2-token';
import {Observable} from 'rxjs/Rx';
import { Router, ActivatedRoute, NavigationStart, Event as NavigationEvent  } from '@angular/router';
import { Location } from '@angular/common';

import {SpUserServiceService} from './sp-user-profile/sp-user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  router;
  state;
  user;
  route;
  state_in_transition = true;
  user_signed_in = false;
  constructor(private http: Http, private _tokenService : Angular2TokenService, r: Router, private location: Location) {
     this.router = r;
     this.router.events
        .filter(event => event instanceof NavigationStart)
        .subscribe((event:Event) => {
           this.user = this._tokenService.currentUserData;
           if(!this._tokenService.userSignedIn()){
              this.user_signed_in = false; 
              if((this.location.path() != '/session/sign-in') && this.state_in_transition){
                this.state_in_transition = false; 
                this.router.navigate(['/session/sign-in']);
              }
           }else{
               this.user_signed_in = true; 
           }
        });
  }
  
  ngOnInit() {
     if(this._tokenService.userSignedIn()){
         this.user_signed_in = true;
     }
     this._tokenService.init({
        apiBase:                    'https://smart-parking-bruck.c9users.io:8081',
        apiPath:                    'auth',

        signInPath:                 'sign_in',
        signInRedirect:             '/parking_lot',
        signInStoredUrlStorageKey:  null,

        signOutPath:                'sign_out',
        validateTokenPath:          'validate_token',
        signOutFailedValidate:      false,
        
        registerAccountPath:        '',
        deleteAccountPath:          '',
        registerAccountCallback:    'https://smart-parking-bruck.c9users.io:8080/session/sign-in',

        globalOptions: {
            headers: {
                'Content-Type':     'application/json',
                'Accept':           'application/json'
            }
        }
    });
  }
  
   public avatarDataCircle1: any = {
        size: 200,
//        background: '#F39C12', // by default it will produce dynamic colors
        fontColor: '#FFFFFF',
        border: "2px solid #d3d3d3",
        isSquare: false,
        text: "B J"
    };
    
    
   navigate(input){
    this.state = input;
    if(input == 'user'){
      this.router.navigate(['/user']);
    }else if(input == 'parking_lot'){
      this.router.navigate(['/parking_lot']);
    }else if (input == 'sign_out'){
      this._tokenService.signOut().subscribe(res => this.signUserOut(res.json()));
    }
   }
   
   signUserOut(res){
       this.router.navigate(['/session/sign-in']);
   }
    
}
