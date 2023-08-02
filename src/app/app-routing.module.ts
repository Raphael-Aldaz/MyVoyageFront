import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { userGuard } from './guards/user.guard';
import { UpdateHotelComponent } from './components/update-hotel/update-hotel.component';
import { UsersComponent } from './components/users/users.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  {path:"", component: MainComponent},
  {path:"hotels/:id", component:HotelComponent},
  {path:"login", component:LoginComponent},
  {path:"admin", component:AdminComponent, canActivate:[userGuard]},
  {path:"updateForm/:id", component: UpdateHotelComponent, canActivate:[userGuard]},
  {path:"updateForm", component: UpdateHotelComponent, canActivate:[userGuard]},
  {path:"users", component: UsersComponent, canActivate:[userGuard]},
  {path:"users/userForm/:id", component: UserFormComponent, canActivate:[userGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
