import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';

import { BehaviorSubject, Subject } from 'rxjs';
import { Hotel } from 'src/app/models/hotels.models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private statusSubject$:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  status: Observable<number> = this.statusSubject$.asObservable();

  private hotelSubject$:BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);
  hotels$ : Observable<Hotel[]> = this.hotelSubject$.asObservable();

  private totalHotelsSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalHotels$: Observable<number> = this.totalHotelsSubject$.asObservable();

  constructor(private apiService: ApiService) {
    this.getAllHotels(0)
   }

  getAllHotels(page : number){
    this.apiService.getAllHotels(page).subscribe({
      next : (data) => {
        this.hotelSubject$.next(data.body?.content || []);
        this.totalHotelsSubject$.next(data.body?.totalElements || 0);
        this.statusSubject$.next(data.status)
      },
      error:(err) =>{
        this.statusSubject$.next(err.status)
      },

    })
  }

  getHotelByCityName(id : number, page : number){
    this.apiService.getHotelByCityName(page, id).subscribe({
      next:(data)=>{
        this.hotelSubject$.next(data.body?.content || []);
        this.totalHotelsSubject$.next(data.body?.totalElements || 0);
        this.statusSubject$.next(data.status)
      },
      error:(err) =>{
        this.statusSubject$.next(err.status)
      },
    })
  }

  getHotelByKw(kw :string, page : number){
    this.apiService.getCityByKeyWord(kw, page).subscribe({
      next:(data) => {
        this.hotelSubject$.next(data.body?.content || []);
        this.totalHotelsSubject$.next(data.body?.totalElements || 0);
        this.statusSubject$.next(data.status)
      },
      error:(err) =>{
        this.statusSubject$.next(err.status)
      },
    })
  }


}
