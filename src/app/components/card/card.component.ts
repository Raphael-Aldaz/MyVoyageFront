import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Hotel } from 'src/app/models/hotels.models';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { HotelService } from 'src/app/services/HotelService/hotel.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  host = environment.host
  isAdmin$ : boolean = false;
  @Input() hotel! : Hotel;

constructor(private auth : AuthService, private hotelService : HotelService, private router : Router){
  this.auth.role$.subscribe({
    next:(data) => {
      if(data.includes("SUPERVISEUR")){
        this.isAdmin$ = true;
      } else {
        this.isAdmin$ = false
      }
    }
  })


}
  getRange(): number[] {
    return Array(this.hotel.rate).fill(0).map((x, i) => i + 1);
  }

  deleteHotel(id : number){
    this.hotelService.deleteHotel(id)
  }
}
