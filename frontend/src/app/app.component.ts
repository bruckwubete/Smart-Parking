import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  books = {};
  constructor(private http: Http) {
    http.get('https://smart-parking-bruck.c9users.io:8081/books')
        .subscribe(res => this.books = res.json());
  }
}
