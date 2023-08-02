import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { JwtService } from '../JwtService/jwt.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

interface RoleData {
  sub: string;
  roles: string[];
  iss: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isConnectedSubject$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isConnected$: Observable<boolean> = this.isConnectedSubject$.asObservable();

  rolesSubject$ : BehaviorSubject<string []> = new BehaviorSubject<string[]>([])
  role$ : Observable<String[]> = this.rolesSubject$.asObservable();

  userConnectedSubject$ : BehaviorSubject<string> = new BehaviorSubject<string>("")
  userConnectd$ : Observable<string> = this.userConnectedSubject$.asObservable();

  constructor(private apiService : ApiService, private jwtService : JwtService) {
    this.checkToken();
    const token =localStorage.getItem("jwt")
    if(token){
      this.getRoles(token)
    }
   }

  login(username : string, password : string){
    const user = new FormData
    user.append("username", username)
    user.append("password", password)
    this.apiService.loginApi(user).subscribe({
      next: (data) => {
        const jwt = data.headers.get('Authorization')
        const jwtStored =  JSON.stringify(jwt)
        localStorage.setItem("jwt" , jwtStored)
        if(jwt){
          this.getRoles(jwt)
          this.isConnectedSubject$.next(true)
        }
      },
      error : (err) => console.log(err),
    })
  }

  getRoles(jwt: string) {
    if (jwt) {
      const jwtDecoded: RoleData = this.jwtService.DecodeToken(jwt);
      this.rolesSubject$.next(jwtDecoded.roles);
    }
  }
  checkToken(){
    const token = localStorage.getItem('jwt');
    if(token){
      const jwtDecoded: RoleData = this.jwtService.DecodeToken(token);
      this.isConnectedSubject$.next(true)
      this.userConnectedSubject$.next(jwtDecoded.sub)

    } else {
      this.isConnectedSubject$.next(false)

    }
  }

}
