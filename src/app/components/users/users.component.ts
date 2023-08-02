import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : User[] = []
  roles : [] = []
  constructor(private userService : UserService){}
  ngOnInit(): void {
    this.userService.getAllUsers(0)
    this.userService.user$.subscribe({
      next:(data)=> {
        this.users = data
        },
      error:(err) => console.log(err),
      complete: ()=> console.log(this.users)
    })

  }

  deleteUser(id : number){
    this.userService.deleteUser(id)
  }

}
