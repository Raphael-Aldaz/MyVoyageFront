import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';

import { BehaviorSubject, Subject } from 'rxjs';
import { Hotel } from 'src/app/models/hotels.models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  hotelSubject$: Subject<Hotel[]> = new Subject<Hotel[]>();
  totalHotelsSubject$: Subject<number> = new Subject<number>();
  statusSubject$: Subject<number> = new Subject<number>();

  constructor(private apiService: ApiService) {
    this.getAllHotels(0)
  }

  private handleResponseData(data: any) {
    this.hotelSubject$.next(data.body?.content || []);
    this.totalHotelsSubject$.next(data.body?.totalElements || 0);
    this.statusSubject$.next(data.status);
  }

  private handleError(err: any) {
    this.statusSubject$.next(err.status);
  }

  getAllHotels(page: number) {
    this.apiService.getAllHotels(page).subscribe({
      next: (data) => this.handleResponseData(data),
      error: (err) => this.handleError(err),
    });
  }

  getHotelByCityName(id: number, page: number) {
    this.apiService.getHotelByCityName(page, id).subscribe({
      next: (data) => this.handleResponseData(data),
      error: (err) => this.handleError(err),
    });
  }

  getHotelByKw(kw: string, page: number) {
    this.apiService.getCityByKeyWord(kw, page).subscribe({
      next: (data) => this.handleResponseData(data),
      error: (err) => this.handleError(err),
    });
  }


}
