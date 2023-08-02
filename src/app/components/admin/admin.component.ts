import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Hotel } from 'src/app/models/hotels.models';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { HotelService } from 'src/app/services/HotelService/hotel.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  hotels : Hotel[] = [];
  username! : string;
  errorStatus!: number;
  totalHotels! : number;
  constructor(private authService : AuthService, private hotelService:HotelService){}
  ngOnInit(): void {
    this.authService.userConnected$.subscribe({
      next: (data) => this.username = data,
    })
    this.hotelService.hotel$.subscribe({
      next:(data)=> this.hotels = data,
    })
    this.hotelService.status$.subscribe({
      next: (data) => this.errorStatus = data
    })
    this.hotelService.totalHotels$.subscribe((data) => this.totalHotels = data)

  }

  onChange(e : PageEvent ){
    this.hotelService.getAllHotels(e.pageIndex)
  }

}
