import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isConnected : boolean =false
  loginForm! : FormGroup;
  user! : User;
  constructor(private formBuilder: FormBuilder, private auth : AuthService, private router : Router){
    this.user = new User("","",[])
    this.loginForm = this.formBuilder.group({
      username : [this.user.username, [Validators.required]],
      password : [this.user.password, [Validators.required]]
    })

    this.auth.isConnected$.subscribe({
      next : (data) => {
        this.isConnected = data
        if(data === true){
          this.router.navigateByUrl('/')
        }
      },
      error : (error) => console.log(error)
    })
  }

  onLogin(form: FormGroup){
    if(form.valid){
      this.auth.login(form.value.username, form.value.password)
    }

  }

}
