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
  answers: any[] = []
  rawData: any[] = []; 
  grabData: any[] = [];
  japresData:Question[]= []; 
  filterData: Question[] = []; 
  test:any;  
  count = 0; 
  constructor(private route: ActivatedRoute, public data: DataService, private router: Router) {
   
   
     
   }

  async ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;

    this.getData();
    await this.rawData; 
   
      
   
  }
  ionViewWillEnter(){
    
    //this.makeQuestion(); 
  }
  ionViewDidLoad(){
  
   

  }
  async getData(){
    let count = 0; 
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
        if(this.type == e[4]) {

        }
        this.rawData.push(x); 
      }); 
      this.makeQuestion(this.rawData);        
    }, err => console.error('Observer got an error: ' + err));
   
    
  }
  //get four of the however many questions. 

  //need two seperate objects to loop through, 
  //one containing the correct answer and question
  
  //the other containing the three other incorrect answers 

  makeQuestion(arr: String[]){  
    let tSwap: number; 
    let r = Math.floor(Math.random() * arr.length);

     tSwap = this.typeToNum(arr[r][4]); 
        console.log(this.type, tSwap); 

    

      do {
        r = Math.floor(Math.random() * arr.length);
        tSwap = this.typeToNum(arr[r][4]); 
      } while((tSwap != Number(this.type))); 

      if(tSwap == Number(this.type)) {
        this.question = arr[r][0]; 
        this.rAns = arr[r][1];
      }
      
    

    
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
        } while((tSwap != Number(this.type))); 
        }

        //check to confirm they are same type
        //if so then check its not already in the array
        //if not, add to answers array
        //gen new W value for next iteration
        else {
          if(!this.answers.find((element) => element == arr[w][1]) && arr[w][0] != this.question) {
            this.answers.push(arr[w][1]);
            count++; 
          } 
        } 
      w = Math.floor(Math.random() * arr.length);
      console.log(this.type); 
     
    } while(count != 3); 
   
    console.log(this.answers);
  }
  typeToNum(type: string){
    let tSwap: number; 
    if(type === 'Romaji') {
          tSwap = 0;
        } else if(type === 'Kana') {
          tSwap = 1
        } else {
          tSwap = 2
        }
        return tSwap; 
  }

  navOptions() {
    this.router.navigateByUrl('/options/1'); 
  }
}
