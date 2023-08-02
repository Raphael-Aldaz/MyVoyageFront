export class User{
  id?: number
  username : string;
  password : string;
  role : [];

  constructor(username: string, password : string, role: [], id? : number){
    this.id = id
    this.username = username;
    this.password =password;
    this.role = role
  }
}
