import { Component, OnInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './sp_dialog.html',
})
export class DialogResultExampleDialog {
  parking_spot;
  date;
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
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
          .subscribe(res => this.parking_spots_copy = this.parking_spots = res.json());
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
