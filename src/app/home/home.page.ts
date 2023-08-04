import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Question } from '../interfaces/question';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private data: DataService, private router: Router) {}
  ngOnInit(){
  }

  /*IGNORE - this is just broken/useless functions that may contain useful snips

  
  This is the same function used in e-match page
  can just re-use (maybe put as service) for all other pages

  //this grabs the CSV values and formats it to be
  //Array of Questions
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
        this.japresData.push({
          question: e[0],
          answer: e[1],
          topics: e[2],
          sound: e[3],
          type: tSwap
        }); 
      }); 
    })    
  }

  saveData(){
    
    this.japresData.forEach(e => {
      let q = e['question']; 
      let a = {
        Romaji: e['answer'] + 'romaji',
        Kana: e['answer'] + 'kana',
        Hiragana:e['answer']+ 'hiragana',
        topics: e['topics']
      }
      sessionStorage.setItem(q, JSON.stringify(a)); 
      let t = JSON.parse(sessionStorage.getItem(q)!); 
      console.log('running'); 
    });
  } */ 

  //changes url to the url below
  //to see where each url routes to check app-routing-module.ts
  routeOptions(id:any){
    this.router.navigateByUrl('/options/'+id); 
  }
}
