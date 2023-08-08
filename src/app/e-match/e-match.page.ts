import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../interfaces/question';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-match',
  templateUrl: './e-match.page.html',
  styleUrls: ['./e-match.page.scss'],
})

export class EMatchPage implements OnInit {
  type:any; 

  question: any; 
  rAns: any; 

  answers: any[] = [];
  rawData: any[] = []; 
  filtered: any[] = [];
  numSeries: number[] = []; 
  
  topic = sessionStorage.getItem('topic'); 
  gameL = Number(sessionStorage.getItem('gameL'));  
  count = 0;
  savedTopics = sessionStorage.getItem('topics'); 
  useTopics: any[] = [];
  
  qCount = 0;  
  cCount = 0; 
  
  constructor(private route: ActivatedRoute, public data: DataService, private router: Router) {
    
     
   }

  async ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;

    this.getData();
    this.wordSwapper(); 
   
   
      
   
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
  //get four of the however many questions. 

  //need two seperate objects to loop through, 
  //one containing the correct answer and question
  
  //the other containing the three other incorrect answers 
  makeQuestion2(arr: string[]){
     
    
    
    arr.forEach(e => {
      let a = this.typeToNum(e[4]);
        if(this.useTopics.find((element) => element == e[3])) {
          if(a == this.type) {
            this.filtered.push(e);
          }
      }
    });
    let z = 0;
   do {
       
        let p =  Math.floor(Math.random() * this.filtered.length);
        if(!(this.numSeries.find((element) => element == p))) {
          this.numSeries.push(p)
          z++; 
        }
    }while(z < this.gameL); 
   
    let index = this.numSeries[this.qCount];
    this.question = this.filtered[index][1]; 
    this.rAns = this.filtered[index][2]; 
    this.answers = []; 

    for(let i = 0; i < 3; i++) {
     
      let w = Math.floor(Math.random() * this.filtered.length);

      if(w == index) {
        w = Math.floor(Math.random() * this.filtered.length);
      }

      

      this.answers.push(this.filtered[w][2]); 
    }
    
  }

  /*
  makeQuestion(arr: String[]){  
    let tSwap: number; 
    let r = Math.floor(Math.random() * arr.length);
    let done: any [] = []; 
    let isNew = false;
    tSwap = this.typeToNum(arr[r][4]); 
   
    this.topic.replace(' ', ''); 


    
    
      do {
        r = Math.floor(Math.random() * arr.length);
        tSwap = this.typeToNum(arr[r][4]); 
       
      } while((this.topic != String(arr[r][3]))); 
       
      
      //will swap the question to answer when
      //question is in japanese and answer is english
      do {
        if(!(done.find((element) => element == arr[r][1]))){
          this.question = arr[r][1];
          done.push(this.question); 
        
            this.rAns = arr[r][2];
            isNew = true; 
        
        } else {
          r = Math.floor(Math.random() * arr.length);
        }
      }while(!isNew); 
        
      
       
      
    //generate random number 

    let w = Math.floor(Math.random() * arr.length);
    
    //get object type value for the random object
    
    let count = 0; 
    //loop 3 times as only need 3 answers
    do {
    tSwap = this.typeToNum(arr[w][4]); 
    //if the object type is not the type passed
    //then run the code
      if(tSwap != Number(this.type)) {
        //as object type is not the same, will gen a new one
        //until the random object type matches
        do{
          w = Math.floor(Math.random() * arr.length);
          tSwap = this.typeToNum(arr[w][4]); 
        } while(tSwap != Number(this.type) && this.topic != arr[w][3]); 
        }

        //check to confirm they are same type
        //if so then check its not already in the array
        //if not, add to answers array
        //gen new W value for next iteration
        else {
          if(!this.answers.find((element) => element == arr[w][2]) && arr[w][1] != this.question) {
            this.answers.push(arr[w][2]);
            count++; 
          } 
        } 
      w = Math.floor(Math.random() * arr.length);
      
     
    } while(count != 3); 
  
   
  } */ 
  typeToNum(type: string){
    let tSwap: number; 
    if(type === 'romaji') {
          tSwap = 0;
        } else if(type === 'kana') {
          tSwap = 1
        } else {
          tSwap = 2
        }
        return tSwap; 
  }

  navOptions() {
    this.router.navigateByUrl('/options/1'); 
  }

  newQuestion(result: number) {
    this.qCount++; 
    if(result == 1) {
        this.cCount++
        
    }
    this.getData(); 
   
    if(this.qCount == this.gameL) {
      
      sessionStorage.setItem('cCount', String(this.cCount)); 
      this.qCount = 0; 
      this.cCount = 0; 
      this.router.navigateByUrl('/game-over');  
    } 
    
  }
  //use to swap ng model words to the words used in csv file to describe topic
  wordSwapper(){
    let x = this.savedTopics.split(",");
   
    x.forEach(e => {
      switch(e) {
        case 'body':
          e = 'Body Parts';
          break;
        case 'time':
          e = 'Days weeks months years';
          break;
        case 'people':
          e = 'Family & counting people';
          break; 
        case 'refreshments':
          e = 'Drinks & Sweets';
          break; 
        case 'produce':
          e = 'Fruit & Vegetables';
          break; 
        case 'meals':
          e = 'Other Food';
          break; 
        case 'climate':
          e = 'Weather & Seasons';
          break;  
      }
      let a = e[0]; 
      let b = a.toUpperCase()
      let c = e.slice(1);
      console.log(b+c); 
      e = b+c; 
      this.useTopics.push(e);
    });
    console.log(this.useTopics); 
  }
 
}
