import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';

import { BehaviorSubject, Subject } from 'rxjs';
import { Hotel } from 'src/app/models/hotels.models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private totalTrainingsSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalTrainings$: Observable<number> = this.totalTrainingsSubject$.asObservable();

  private hotelSubject$: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);
  hotel$: Observable<Hotel[]> = this.hotelSubject$.asObservable();

  private totalHotelsSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalHotels$: Observable<number> = this.totalHotelsSubject$.asObservable();

  private statusSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  status$: Observable<number> = this.statusSubject$.asObservable();

  constructor(private apiService: ApiService) {
    this.getAllHotels(0);
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

  getHotelById(id: number) {
    return this.apiService.getHotelById(id);
  }

  updateHotel(hotel: FormData, id: string) {
    this.apiService.updateHotel(hotel, id).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    });
  }

  saveHotel(hotel: FormData) {
    this.apiService.saveHotel(hotel).subscribe({
      next: (data) => console.log(data),
      error: (err) => this.handleError(err)
    });
  }

  deleteHotel(id: number) {
    this.apiService.deleteHotel(id).subscribe({
      next: (data) => console.log(data),
      error: (err) => this.handleError(err),
      complete: () => this.getAllHotels(0)
    });
  }
}
