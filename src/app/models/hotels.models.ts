export class Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  rate: number;
  price: number;
  phone: string;

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    address: string = '',
    rate: number = 0,
    price: number = 0,
    phone: string = ''
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.rate = rate;
    this.price = price;
    this.phone = phone;
  }
}
