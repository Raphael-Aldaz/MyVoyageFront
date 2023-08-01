import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotels.models';
import { HotelService } from 'src/app/services/HotelService/hotel.service';
import { PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  hotels : Hotel[] = [];
  totalHotels! : number;
  errorStatus!: number;
  constructor(private hotelService : HotelService){}
  ngOnInit(): void {
    this.hotelService.hotels$.subscribe({
      next : (data) => {
        this.hotels = data;
      }
    })

    this.hotelService.totalHotels$.subscribe((data) => this.totalHotels = data)

    this.hotelService.status.subscribe({
      next: (data) => this.errorStatus = data
    })
  }

  onChange(e : PageEvent ){
    this.hotelService.getAllHotels(e.pageIndex)
  }

}
