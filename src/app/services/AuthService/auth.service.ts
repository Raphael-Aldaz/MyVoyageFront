import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { JwtService } from '../JwtService/jwt.service';
import { BehaviorSubject, Subject } from 'rxjs';

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
  isConnected$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  roles : string [] = [];

  constructor(private apiService : ApiService, private jwtService : JwtService) {
    this.checkToken();
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
          this.isConnected$.next(true)
        }

      },
      error : (err) => console.log(err),
    })
  }

  getRoles(jwt: string) {
    if (jwt) {
      const jwtDecoded: RoleData = this.jwtService.DecodeToken(jwt);
      this.roles = jwtDecoded.roles;
    }
  }
  checkToken(){
    const token = localStorage.getItem('jwt');
    if(token){
      console.log(token, "token")
      this.isConnected$.next(true)
    }
  }
}
