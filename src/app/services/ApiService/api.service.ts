import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Hotel } from 'src/app/models/hotels.models';
import { City } from 'src/app/models/city.models';
import { User } from 'src/app/models/user.models';
import { AuthService } from '../AuthService/auth.service';

interface ResponsePagination {
  content: Hotel[] | User[];
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
  getToken(){
    let token = localStorage.getItem('jwt');
    if(token){
      return JSON.parse(token);
    }
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
  public getHotelById(id : number):Observable<Hotel>{
    return this.http.get<Hotel>(environment.host + "/hotels/" + id)
  }

  public updateHotel(form : FormData, id : string){
    return this.http.put(environment.host +'/hotels/' + id, form, {headers:new HttpHeaders({'Authorization': this.getToken()})})
  }

  public saveHotel(hotel: FormData){
    return this.http.post(environment.host + '/hotel', hotel, {headers:new HttpHeaders({'Authorization': this.getToken()})})
  }

  public deleteHotel(id: number): Observable<HttpResponse<string>> {
    return this.http.delete(environment.host + '/hotel/' + id,  {headers:new HttpHeaders({'Authorization': this.getToken()}), observe: 'response', responseType: 'text' }, );
  }

  getAllUsers(page : number):Observable<HttpResponse<ResponsePagination>>{
    return this.http.get<ResponsePagination>(environment.host+"/users?page=" + page, {headers:new HttpHeaders({'Authorization': this.getToken()}),observe : 'response'})
   }

   public deleteUser(id : number): Observable<HttpResponse<string>>{
    return this.http.delete(environment.host + '/user/' + id, {headers:new HttpHeaders({'Authorization': this.getToken()}), observe: 'response', responseType: 'text' });
   }
   public saveUser(user : FormData){
    return this.http.post(environment.host + "/user", user, {headers:new HttpHeaders({'Authorization': this.getToken()})})
   }
}
