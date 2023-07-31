import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';

import { BehaviorSubject } from 'rxjs';
import { Hotel } from 'src/app/models/hotels.models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotelSubject$:BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);
  hotels$ : Observable<Hotel[]> = this.hotelSubject$.asObservable();

  private totalHotelsSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalTrainings$: Observable<number> = this.totalHotelsSubject$.asObservable();

  constructor(private apiService: ApiService) {
    this.getAllHotels(0)
   }

  getAllHotels(page : number){
    this.apiService.getAllHotels(page).subscribe({
      next : (data) => {
        this.hotelSubject$.next(data.content)
        this.totalHotelsSubject$.next(data.totalElements)
      },
      error(err) {
        console.log(err)
      },

    })
  }


}
