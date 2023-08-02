import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from '../ApiService/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  user$: Observable<User[]> = this.userSubject$.asObservable();

  private totalUsersSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalUsers$: Observable<number> = this.totalUsersSubject$.asObservable();
  private statusSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  status$: Observable<number> = this.statusSubject$.asObservable();

  constructor(private apiService : ApiService, private router : Router) {
    this.getAllUsers(0)
   }
  private handleResponseData(data: any) {
    this.userSubject$.next(data.body?.content || []);
    this.totalUsersSubject$.next(data.body?.totalElements || 0);
    this.statusSubject$.next(data.status);
  }

  private handleError(err: any) {
    this.statusSubject$.next(err.status);
  }

  getAllUsers(page :number){
    this.apiService.getAllUsers(page).subscribe({
      next:(data)=>this.handleResponseData(data),
      error:(err)=>this.handleError(err)
    })

  }
  deleteUser(id: number) {
    this.apiService.deleteUser(id).subscribe({
      next: (data) => console.log(data),
      error: (err) => this.handleError(err),
      complete: () => this.getAllUsers(0)
    });
  }

  saveUser(user : FormData){
    this.apiService.saveUser(user).subscribe({
      next: (data) => console.log(data),
      error: (err) => this.handleError(err),
    })

  }


}
