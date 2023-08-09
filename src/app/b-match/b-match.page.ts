import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Data, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-b-match',
  templateUrl: './b-match.page.html',
  styleUrls: ['./b-match.page.scss'],
})
export class BMatchPage implements OnInit {
  type:any = 1; 

  question: any; 
  rAns: any; 

  answers: any[] = [];
  rawData: any[] = []; 
  filtered: any[] = [];
  english: any[] = [];
  japanese: any[] = [];

  numSeries: number[] = []; 
  // test values
  // topic = 'Adjectives';
  // gameL = 15;
  
  tempTopics = sessionStorage.getItem('topic'); 
  topic = this.tempTopics.split(',');
  gameL = Number(sessionStorage.getItem('gameL'));  // game length
  count = 0;
  
  qCount = 0; // question count
  cCount = 0; // correctly answered count

  constructor(private router: Router, private data: DataService, private route: ActivatedRoute) { }

  async ngOnInit() {
    //this.type = this.route.snapshot.paramMap.get('type')!;
    this.getData();
  }

  async getData(){
    
     //gets returned http request to csv file
     //subscribes it to the data variable, meaning if a change is detected
     //the data should update, however it probably wont change.
      this.data.getValues().pipe().subscribe(data=> { 
      //this is a temporary variable to hold the data as
      //array of the row values as strings
      let list = data.split('\r');
      //loops through each row and splits values by comma 
      //into separate instances
      list.forEach(e => {
        let x = e.split(','); 
        this.rawData.push(x); 
      }); 
      this.makeQuestion2(this.rawData);  
    }, err => console.error('Observer got an error: ' + err));
  }

  //this is responsible for question generation
  makeQuestion2(arr: any[]){
    // generate filtered array with valid words per type and topic
    for (var j = 0; j < this.topic.length; j++){
      let top = this.topic[j];
      for (var i = 0; i < arr.length; i++){
        let a = this.typeToNum(arr[i][4]);
        if (a == this.type && arr[i][3] == top){
          this.filtered.push(arr[i]);
        }
      }
    }
    // this while loop generates random english words
    let temp = [];  // temp for japanese array words
    let z = 0;
    do {
      let p =  Math.floor(Math.random() * this.filtered.length);
      // x format is: [word, ID]
      let x = [this.filtered[p][1], parseInt(this.filtered[p][0])];
      var check = 0;
      for (let item in this.english){
        if (this.english[item].toString() === x.toString()){
          check = 1;
          break;
        }
      }
      if (check == 1){
        continue;
      }
      this.english.push(x);
      temp.push(this.filtered[p]);
      z++;
      //loop will stop once it has been ran through either 15(short game) 
      //or 40 (long game) times
    }while(z < this.gameL);

    // this while loop puts japanese words randomly in the this.japanese array
    z = 0;
    do {
      let p =  Math.floor(Math.random() * temp.length);
      // format is: [word, ID]
      this.japanese.push([temp[p][2], parseInt(temp[p][0])]);
      temp.splice(p, 1);
      z++;
      //loop will stop once it has been ran through either 15(short game)
      //or 40 (long game) times
    }while(temp.length > 0);
  }

  // check if correct, and increment cCount if true
  checkCorrect(engID: number, japID: number){
    if (engID != japID){
      return false;
    }
    this.cCount++;
    return true;
  }

  typeToNum(type: string){
    let tSwap: number; 
    if(type === 'romaji') {
          tSwap = 0;
        } else if(type === 'kana') {
          tSwap = 1;
        } else {
          tSwap = 2;
        }
        return tSwap; 
  }

  navOptions() {
    this.router.navigateByUrl('/options/1'); 
  }

  // pretty sure this is deprecated for b-match
  newQuestion(result: number) {
    this.qCount++; 
    if(result == 1) {
        this.cCount++
    }
    //need to call to gen new questions
    this.getData(); 
   //checks the question count against game length
    if(this.qCount == this.gameL) {
      //variable reset and nav to game-over
      sessionStorage.setItem('cCount', String(this.cCount)); 
      this.qCount = 0; 
      this.cCount = 0; 
      this.router.navigateByUrl('/game-over'); 
    } 
  }

}
