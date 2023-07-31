import { Component, Input } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Hotel } from 'src/app/models/hotels.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  host = environment.host
  @Input() hotel! : Hotel;


  getRange(): number[] {
    return Array(this.hotel.rate).fill(0).map((x, i) => i + 1);
  }
}
