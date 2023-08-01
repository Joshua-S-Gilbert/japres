import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../interfaces/question';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-e-match',
  templateUrl: './e-match.page.html',
  styleUrls: ['./e-match.page.scss'],
})
export class EMatchPage implements OnInit {
  type:any; 
  rawData: any[] = []; 
  japresData:Question[]= []; 
  filterData: Question[] = []; 
  test:any; 
  constructor(private route: ActivatedRoute, public data: DataService) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;

    this.getData(); 
   
      
   
  }
  getData(){
    
     //gets returned http request to csv file
     //subscribes it to the data variable, meaning if a change is detected
     //the data should update, however it probably wont change.
    this.data.getValues().subscribe(data=> {
      //this is a temporary variable to hold the data as
      //array of the row values as strings
      let list = data.split('\r');
      
      //loops through each row and splits values by comma 
      //into separate instances
      list.forEach(e => {
        let x = e.split(','); 
        this.rawData.push(x); 
      }); 

      //once data is an array of arrays we can format to question interface
      //similar to above function except it assigns the values to their own 
      //question interface 
      this.rawData.forEach(e =>{
        let tSwap: number;

        //changes type to a distinct number
        //enables less room for filtering errors later on 
        if(e[4] === 'Romaji') {
          tSwap = 0;
        } else if(e[4] === 'Kana') {
          tSwap = 1
        } else {
          tSwap = 2
        }
        //as japresData is defined as array of Question
        //when pushing must call all Question variables and assign values
        //for each instance

        //will there be only 1 type of writing per game?
        //if so this will work universally. 

        if(this.type == tSwap) {
          this.japresData.push({
            question: e[0],
            answer: e[1],
            topics: e[2],
            sound: e[3],
            type: tSwap
          }); 
        }
      }); 
    })    
  }


}
