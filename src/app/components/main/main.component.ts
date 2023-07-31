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
  error: string= "";
  constructor(private hotelService : HotelService){}
  ngOnInit(): void {
    this.hotelService.hotels$.subscribe({
      next : (data) => {
        this.hotels = data;
      },
      error : (err) => this.error = err
    })

    this.hotelService.totalTrainings$.subscribe((data) => this.totalHotels = data)
  }

  onChange(e : PageEvent ){
    this.hotelService.getAllHotels(e.pageIndex)
  }

}
