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
  fullImagePath: string;
  constructor(private http: Http) {
    //http.get('https://smart-parking-bruck.c9users.io:8081/books')
      //  .subscribe(res => this.books = res.json());
        
    //this.fullImagePath = './component_dashboard.jpg'
  }
  
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}
