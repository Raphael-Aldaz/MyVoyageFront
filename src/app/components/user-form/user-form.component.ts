import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  username : string ="";
  password : string = "";
  role : string = "";
  id! : string;
  userFormData = new FormData();
  constructor(private router : ActivatedRoute, private userService : UserService, private route : Router ){}
  ngOnInit(): void {
    this.router.paramMap.subscribe((params)=> {
      const userId = params.get('id')
      if(userId){
        this.id = userId;
      }
    })
  }
  onSelectChange(event : Event) {
    this.role =(event.target as HTMLSelectElement).value;
  }

  submitForm(){
    this.userFormData.append("username", this.username)
    this.userFormData.append("password", this.password)
    this.userFormData.append("role", this.role)
    this.userService.saveUser(this.userFormData)
    this.route.navigateByUrl('/users')

  }

}
