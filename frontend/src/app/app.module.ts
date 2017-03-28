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
import { DialogResultExampleDialog } from './dashboard/dashboard.component';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { ExpandableListModule } from 'angular2-expandable-list';

import {LetterAvatarDirective} from '../assets/directives/letter-avatar.directive';
import { SpDialogComponentComponent } from './sp-dialog-component/sp-dialog-component.component';
import { SpUserProfileComponent } from './sp-user-profile/sp-user-profile.component';
import { SpUserReservationsComponent } from './sp-user-reservations/sp-user-reservations.component';

const appRoutes: Routes = [
  //{ path: 'login', component: LoginComponent },
  {
    path: 'parking_lot',
    component: DashboardComponent,
    data: { title: 'Heroes List' }
  },
  { path: 'user',
    component: SpUserProfileComponent,
  },
  { path: 'reservations',
    component: SpUserReservationsComponent,
  },
  { path: '**', component: DashboardComponent }
];




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LetterAvatarDirective,
    DialogResultExampleDialog,
    SpDialogComponentComponent,
    SpUserProfileComponent,
    SpUserReservationsComponent,
    NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    A2tUiModule,
    Ng2DatetimePickerModule,
    ExpandableListModule
  ],
  providers: [Angular2TokenService],
  bootstrap: [AppComponent],
  entryComponents: [DialogResultExampleDialog]
})
export class AppModule { }