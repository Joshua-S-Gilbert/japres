import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //location of the initial csv file
  japresData = 'assets/test.csv'; 

  constructor(private http: HttpClient) { }

  getValues(){
    //simply returns a text object that contains CSV values
    return this.http.get(this.japresData, {responseType:'text'});
  }

}
