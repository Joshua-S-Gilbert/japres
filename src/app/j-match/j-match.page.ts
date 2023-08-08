import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Data, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-j-match',
  templateUrl: './j-match.page.html',
  styleUrls: ['./j-match.page.scss'],
})
export class JMatchPage implements OnInit {
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

  
  qCount = 0;  
  cCount = 0; 

  constructor(private router: Router, private data: DataService, private route: ActivatedRoute) { }

  
  async ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;

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
      console.log(this.filtered);    
    }, err => console.error('Observer got an error: ' + err));
   
    
  }
  //this is responsible for question generation
  makeQuestion2(arr: string[]){
     
    
    //loop through the data
    arr.forEach(e => {
      //assign a type number
      let a = this.typeToNum(e[4])
      //check that the type and the topic match
      if(a == this.type && e[3] == this.topic) {
        //push into array which contains filtered objects
        this.filtered.push(e);
      }
    });
    //creating a series of random numbers to use for random answer generation
    //z will be used as a counter
    let z = 0;
   do {
       //create random number to be assigned to number series
        let p =  Math.floor(Math.random() * this.filtered.length);
        //check it hasnt already been added to the series
        if(!(this.numSeries.find((element) => element == p))) {
          this.numSeries.push(p)
          //increment 
          z++; 
        }
        //loop will stop once it has been ran through either 15(short game) 
        //or 40 (long game) times
    }while(z < this.gameL); 
    //index will increment with each call of this func
    //qCount is a counter that increments each time this func runs
    //the numseries is the random series of numbers
    //ensures different order of questions each time
    let index = this.numSeries[this.qCount];
    this.question = this.filtered[index][2]; 
    this.rAns = this.filtered[index][1]; 
    //remove previous answers
    this.answers = []; 
    //loop 3 times as we need 3 answers
    for(let i = 0; i < 3; i++) {
      //random number
      let w = Math.floor(Math.random() * this.filtered.length);
      //if it matches the current index then get another one
      if(w == index) {
        w = Math.floor(Math.random() * this.filtered.length);
      }
      //does not check twice (can lead to duplication of answers)
      //if the answer does not match the other answers and
      //the question for the answer does not match the created question
      //push the answer into the array
       if(!this.answers.find((element) => element == this.filtered[w][1]) && this.filtered[w][2] != this.question) {
            this.answers.push(this.filtered[w][1]);
            
          }
      
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
    //called to make new question
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
