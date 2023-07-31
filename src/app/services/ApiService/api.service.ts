import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Hotel } from 'src/app/models/hotels.models';

interface ResponsePagination {
  content: Hotel[];
  pageable: number;
  last: boolean;
  totalPages: number;
  totalElements: number;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getAllHotels(page : number): Observable<ResponsePagination>{
   return this.http.get<ResponsePagination>(environment.host+"/hotels?page=" + page)
  }
}
