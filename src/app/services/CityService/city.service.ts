import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { City } from 'src/app/models/city.models';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citySubject$:BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);
  hotels$ : Observable<City[]> = this.citySubject$.asObservable();

  constructor(private apiService : ApiService) {
    this.getAllCities();
   }

  getAllCities(){
    this.apiService.getAllCities().subscribe({
      next : (data) => {
        this.citySubject$.next(data)
      },
      error(err) {
        console.log(err)
      },
    })
  }
}
