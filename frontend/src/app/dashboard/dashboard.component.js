"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var DialogResultExampleDialog = (function () {
    function DialogResultExampleDialog(http, dialogRef) {
        this.http = http;
        this.dialogRef = dialogRef;
    }
    DialogResultExampleDialog.prototype.makeReservation = function () {
        var _this = this;
        console.log(this.from_time);
        var from_fields = (this.from_time.toString()).split(' ', 3);
        var body = {
            "user_id": "12347"
        };
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        this.http.post('https://smart-parking-bruck.c9users.io:8081/reservations', body, options) // ...using post request
            .subscribe(function (res) { return _this.reservation = res.json(); }); // ...and calling .json() on the response to return data
    };
    DialogResultExampleDialog = __decorate([
        core_1.Component({
            selector: 'dialog-result-example-dialog',
            templateUrl: './sp_dialog.html'
        })
    ], DialogResultExampleDialog);
    return DialogResultExampleDialog;
}());
exports.DialogResultExampleDialog = DialogResultExampleDialog;
var DashboardComponent = (function () {
    function DashboardComponent(http, dialog) {
        this.http = http;
        this.dialog = dialog;
        this.view = true;
        this.config = {
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
        this.numTemplateOpens = 0;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getParkingSpots();
        //let timer = Observable.timer(2000,1000);
        //  timer.subscribe(t=> {
        //     this.getParkingSpots();
        // });
    };
    DashboardComponent.prototype.getParkingSpots = function () {
        var _this = this;
        this.http.get('https://smart-parking-bruck.c9users.io:8081/parking_spots')
            .subscribe(function (res) { return _this.update(res.json()); });
    };
    DashboardComponent.prototype.update = function (res) {
        this.parking_spots_copy = this.parking_spots = res;
    };
    DashboardComponent.prototype.search = function () {
        var term = this.searchTerm;
        if (!term) {
            this.parking_spots = this.parking_spots_copy;
            return;
        }
        this.parking_spots = this.parking_spots.filter(function (tag) {
            return tag.name.indexOf(term) >= 0;
        });
    };
    DashboardComponent.prototype.toggled = function (value) {
        this.view = !this.view;
    };
    DashboardComponent.prototype.getColor = function (lot) {
        if (lot.occupied) {
            return 'lightcoral';
        }
        return 'lightgreen';
    };
    DashboardComponent.prototype.openDialog = function (parking_spot) {
        var _this = this;
        //let dialogRef = this.dialog.open(DialogResultExampleDialog, this.config);
        var dialogRef;
        dialogRef = this.dialog.open(DialogResultExampleDialog, this.config);
        dialogRef.componentInstance.parking_spot = parking_spot;
        dialogRef.afterClosed().subscribe(function (result) {
            _this.selectedOption = result;
        });
    };
    __decorate([
        core_1.ViewChild(core_1.TemplateRef)
    ], DashboardComponent.prototype, "template");
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
