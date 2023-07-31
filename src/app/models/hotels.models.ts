export class Hotel {
  public id : number;
  public name : string;
  public picture : string;
  public rate : number;
  public phone : string;
  public adress : string;
  public description : string;
  public price? : number;

  constructor(id : number, name :string, picture : string,rate: number, phone: string, adress: string, description : string ){
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.rate = rate;
    this.phone = phone;
    this.adress = adress;
    this.description = description;
  }

}
