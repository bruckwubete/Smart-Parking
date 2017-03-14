import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { MaterialModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'parking_lot',
    component: DashboardComponent,
    data: { title: 'Heroes List' }
  }
  /*{ path: '',
    redirectTo: '/parking_lot',
    pathMatch: 'full'
  }*/
  //{ path: '**', component: AppComponent }
];




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    A2tUiModule
  ],
  providers: [Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
