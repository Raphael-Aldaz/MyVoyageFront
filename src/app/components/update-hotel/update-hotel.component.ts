import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/city.models';
import { Hotel } from 'src/app/models/hotels.models';
import { HotelService } from 'src/app/services/HotelService/hotel.service';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.css']
})
export class UpdateHotelComponent implements OnInit {
  hotel: Hotel = new Hotel();
  city: City = new City();
  selectedFiles! : File;
  id! : string;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const hotelId = params.get('id');
      if (hotelId) {
        this.getHotelDetails(hotelId);

        this.id = hotelId
      }
    });
  }

  getHotelDetails(id: string) {
    const idNumber: number = +id;
    this.hotelService.getHotelById(idNumber).subscribe((data) => {
      this.hotel = data;
    });
  }
  onSelectedFile(event:any){
    this.selectedFiles = event.target.files.item(0);
  }

  submitForm() {
    const hotelFormData = new FormData();
    hotelFormData.append("name", this.hotel.name)
    hotelFormData.append("description", this.hotel.description)
    hotelFormData.append("address", this.hotel.address)
    hotelFormData.append("phone", this.hotel.phone)
    hotelFormData.append("price", this.hotel.price.toString())
    hotelFormData.append("rate", this.hotel.rate.toString())
    hotelFormData.append("picture", this.selectedFiles)
    hotelFormData.append("cityName", this.city.name)
    hotelFormData.append("country", this.city.country)

    console.log(this.id)
    if(this.id != undefined){
      hotelFormData.append("id", this.id)
      this.hotelService.updateHotel(hotelFormData, this.id)
    } else {
      this.hotelService.saveHotel(hotelFormData)
    }



  }
}
