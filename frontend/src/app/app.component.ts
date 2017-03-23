import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {Angular2TokenService } from 'angular2-token';
import {Observable} from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  router;
  fullImagePath: string;
  constructor(private http: Http, private _tokenService : Angular2TokenService, r: Router) {
     this.router = r;
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
    if(input == 'user'){
      this.router.navigate(['/user']);
    }else if(input == 'parking_lot'){
      this.router.navigate(['/parking_lot']);
    }else if (input == 'sign_out'){
      
    }
   }
    
}
