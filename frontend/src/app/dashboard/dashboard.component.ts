import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  mouseOver1;
  mouseOver2;
  mouseOver3;
  clicked1;
  clicked2;
  clicked3;
  parking_spots;
  lightblue = 'lightblue';
  constructor(private http: Http) { 
    http.get('https://smart-parking-bruck.c9users.io:8081/parking_spots')
        .subscribe(res => this.parking_spots = res.json());
  }

  ngOnInit() {
  }
  
changeBackground(): any {
   console.log("input");
    return { 'background-color': this.lightblue };
}
  
  navigate(input){
    console.log("input");
    this.clicked1 = true;
  }
  
  Colors={
    "P1": 'lightblue'
  }
  
   tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 4, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

}
