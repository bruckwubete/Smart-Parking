import { Injectable } from '@angular/core';

@Injectable()
export class SpUserServiceService {
  user;
  constructor() { }
  ngOnInit() {
    this.getUserData();
  }
  
  
  getUserData(){
     console.log(this._tokenService);
     this.user = this._tokenService.currentUserData;
     return this.user;
  }
  
  userSignedIn(){
     return this._tokenService.userSignedIn();
   }
   
}
