import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.models';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { CityService } from 'src/app/services/CityService/city.service';
import { HotelService } from 'src/app/services/HotelService/hotel.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isConnected : boolean = false
  destinations$ : City[] = []
  kw : string = ""
  constructor(private cityService : CityService, private hotelService : HotelService, private auth:AuthService, private router : Router){}
  ngOnInit(): void {
    this.cityService.hotels$.subscribe({
      next:(data)=> {
        this.destinations$ = data;
      }
    })
    this.auth.isConnected$.subscribe({
      next : (data) => {
        this.isConnected = data;
      },
      error : (error) => console.error(error)

    })

  }

  onClick(city : City){
    this.hotelService.getHotelByCityName(city.id, 0)
  }

  onSubmit(){
    this.hotelService.getHotelByKw(this.kw,0)

  }
  refreshList(){
    this.hotelService.getAllHotels(0);
  }

  logout(){
    localStorage.removeItem("jwt")
    this.auth.isConnectedSubject$.next(false)
    this.auth.rolesSubject$.next([])
    this.hotelService.getAllHotels(0);
    this.router.navigateByUrl("/")
  }

}
