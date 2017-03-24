import { Component, OnInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './sp_dialog.html',
})
export class DialogResultExampleDialog {
  parking_spot;
  date;
  from_time;
  to_time;
  reservation;
  user;
  
  constructor(private http: Http, public dialogRef: MdDialogRef<DialogResultExampleDialog>, public _tokenService : Angular2TokenService) {}
  ngOnInit(){
    this.user = this._tokenService.currentUserData;
  }
  makeReservation(){
    
    var from_reservation_fields = (this.from_time.toString()).split(' ',3);
    var from_date_fields = (from_reservation_fields[0].toString()).split('/',3);
    var from_time_fileds = (from_reservation_fields[1].toString()).split(':',2);
    
    var to_reservation_fields = (this.to_time.toString()).split(' ',3);
    var to_date_fields = (to_reservation_fields[0].toString()).split('/',3);
    var to_time_fileds = (to_reservation_fields[1].toString()).split(':',2);
  
    
    var body = {
      "user_id": this.user._id.$oid,
      "parking_spot_id": this.parking_spot.id.$oid,
      "from": {
            "year":from_date_fields[2],
            "month":from_date_fields[0],
            "day":from_date_fields[1],
            "hour":from_time_fileds[0],
            "minutes":from_time_fileds[1],
            "seconds":0
      },
      "to": {
            "year":to_date_fields[2],
            "month":to_date_fields[0],
            "day":to_date_fields[1],
            "hour":to_time_fileds[0],
            "minutes":to_time_fileds[1],
            "seconds":0
      }
    }
    
    
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    

    this.http.post('https://smart-parking-bruck.c9users.io:8081/reservations', body, options) // ...using post request
                     .subscribe(res => this.successReservation(res)) // ...and calling .json() on the response to return data
                     
  }
  
  successReservation(reservation){
    this.reservation = reservation.json();
    console.log(this.reservation);
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})


export class DashboardComponent implements OnInit {
  
  parking_spots;
  parking_spots_copy;
  searchTerm;
  view=true;
  selectedOption;
  
  dialogRef: MdDialogRef<DialogResultExampleDialog>;
  lastCloseResult: string;
  actionsAlignment: string;
  config: MdDialogConfig = {
    disableClose: false,
    width: '600px',
    height: '500px',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      message: 'Jazzy jazz jazz'
    }
  };
  numTemplateOpens = 0;
  
   @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(private http: Http, public dialog: MdDialog) {
  }

  ngOnInit() {
    this.getParkingSpots();
    //let timer = Observable.timer(2000,1000);
   //  timer.subscribe(t=> {
   //     this.getParkingSpots();
   // });
  }
  
  getParkingSpots(){
      this.http.get('https://smart-parking-bruck.c9users.io:8081/parking_spots')
          ///.subscribe(function(response) { this.parking_spots = response.json(); this.parking_spots_copy = this.parking_spots; console.log(this.parking_spots);},
          //           function(error){},
           //          function(){});
          .subscribe(res => this.update(res.json()));
  }
  
  update(res){
    this.parking_spots_copy = this.parking_spots = res;
  }
  
  search(): void {
    let term = this.searchTerm;
    if(!term){
      this.parking_spots = this.parking_spots_copy;
      return;
    }
    this.parking_spots = this.parking_spots.filter(function(tag) {
        return tag.name.indexOf(term) >= 0;
    }); 
  }

  toggled(value) {
    this.view = !this.view;
  }

  
  getColor(lot){
    if(lot.occupied){
      return 'lightcoral';
    }
    return 'lightgreen';
  }
  
  openDialog(parking_spot) {
    //let dialogRef = this.dialog.open(DialogResultExampleDialog, this.config);
    let dialogRef : MdDialogRef<DialogResultExampleDialog>;
    dialogRef = this.dialog.open(DialogResultExampleDialog, this.config);
    dialogRef.componentInstance.parking_spot=parking_spot;
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

}
