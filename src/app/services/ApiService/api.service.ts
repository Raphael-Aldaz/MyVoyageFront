import { HttpClient, HttpHeaderResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Hotel } from 'src/app/models/hotels.models';
import { City } from 'src/app/models/city.models';

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

  constructor(private http : HttpClient) {
  }

  getAllHotels(page : number):Observable<HttpResponse<ResponsePagination>>{
   return this.http.get<ResponsePagination>(environment.host+"/hotels?page=" + page, {observe : 'response'})
  }

  getAllCities(): Observable<City[]>{
    return this.http.get<City[]>(environment.host+"/cities")
  }

  getHotelByCityName(page:number, id: number):Observable<HttpResponse<ResponsePagination>>{
    return this.http.get<ResponsePagination>(environment.host+"/hotelsBy?page=" + page +"&id=" + id, {observe : 'response'})
  }

  getCityByKeyWord(kw : string, page: number):Observable<HttpResponse<ResponsePagination>>{
    return this.http.get<ResponsePagination>(environment.host+"/hotelsByDest?kw=" + kw + "&page=" + page, {observe : 'response'})

  }
  public loginApi(user : FormData){
    return this.http.post( "http://localhost:8080/login", user, {observe : 'response'})
  }
}
