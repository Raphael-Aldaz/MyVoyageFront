import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Hotel } from 'src/app/models/hotels.models';
import { HotelService } from 'src/app/services/HotelService/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  constructor(private route: ActivatedRoute, private hotelService : HotelService){}
  hotel! : Hotel;
  host = environment.host
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const hotelId = params.get('id')
      if(hotelId){
        this.getHotelDetails(hotelId)
      }

    })

  }

  getHotelDetails(id: string){
    let idNumber : number = +id
    this.hotelService.getHotelById(idNumber).subscribe({
      next:(data)=> this.hotel = data
    })
  }
  getRange(): number[] {
    return Array(this.hotel.rate).fill(0).map((x, i) => i + 1);
  }
}
