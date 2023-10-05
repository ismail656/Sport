import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherURL: string = "http://localhost:3000/weather"
  
  constructor(private http:HttpClient) {
    

   }

   weatherSearch(obj:any) {
    return this.http.post<{ weather: any }>(this.weatherURL, obj)

   }

   


}
