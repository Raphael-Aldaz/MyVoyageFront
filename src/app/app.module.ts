import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './components/card/card.component';


import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatPaginatorModule} from '@angular/material/paginator';



import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UpdateHotelComponent } from './components/update-hotel/update-hotel.component';
import { UsersComponent } from './components/users/users.component';
import { UserFormComponent } from './components/user-form/user-form.component';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CardComponent,
    FooterComponent,
    NavBarComponent,
    HotelComponent,
    LoginComponent,
    AdminComponent,
    UpdateHotelComponent,
    UsersComponent,
    UserFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    FontAwesomeModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
