import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm:FormGroup
  constructor(private FormBuilder: FormBuilder,
              private wService:WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.FormBuilder.group({
      searchWeather: ['',[Validators.required]] })
  }



  searchWeather () {
    this.wService.weatherSearch(this.weatherForm.value).subscribe(
      (response) => {
        console.log("here is message : ", response);
      }
    )
  }

}
