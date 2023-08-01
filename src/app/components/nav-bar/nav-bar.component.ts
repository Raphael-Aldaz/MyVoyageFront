import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { City } from 'src/app/models/city.models';
import { CityService } from 'src/app/services/CityService/city.service';
import { HotelService } from 'src/app/services/HotelService/hotel.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  destinations$ : City[] = []
  kw : string = ""
  constructor(private cityService : CityService, private hotelService : HotelService){}
  ngOnInit(): void {
    this.cityService.hotels$.subscribe({
      next:(data)=> {
        this.destinations$ = data;
      }
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

}
