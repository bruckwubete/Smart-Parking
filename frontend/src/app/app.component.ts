import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {Angular2TokenService } from 'angular2-token';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public books;
  fullImagePath: string;
  constructor(private http: Http, private _tokenService : Angular2TokenService) {
    //http.get('https://smart-parking-bruck.c9users.io:8081/books')
      //  .subscribe(res => this.books = res.json());
        
    //this.fullImagePath = './component_dashboard.jpg'
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
}
