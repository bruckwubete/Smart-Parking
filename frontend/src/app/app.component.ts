import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  books = {};
  fullImagePath: string;
  constructor(private http: Http, private _tokenService : Angular2TokenService) {
    //http.get('https://smart-parking-bruck.c9users.io:8081/books')
      //  .subscribe(res => this.books = res.json());
        
    //this.fullImagePath = './component_dashboard.jpg'
     this._tokenService.init({
        apiBase:                    'https://smart-parking-bruck.c9users.io:8081',
        apiPath:                    'auth',

        signInPath:                 'sign_in',
        signInRedirect:             null,
        signInStoredUrlStorageKey:  null,

        signOutPath:                'sign_out',
        validateTokenPath:          'auth/validate_token',
        signOutFailedValidate:      false,
        
        registerAccountPath:        '',
        deleteAccountPath:          'auth',
        registerAccountCallback:    window.location.href,

        globalOptions: {
            headers: {
                'Content-Type':     'application/json',
                'Accept':           'application/json'
            }
        }
    });
  }
}
