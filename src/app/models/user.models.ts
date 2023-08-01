export class User{
  username : string;
  password : string;
  roles : [];

  constructor(username: string, password : string, roles: []){
    this.username = username;
    this.password =password;
    this.roles = roles
  }
}
