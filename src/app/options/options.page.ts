import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  cho = {
    adjectives: false,
    animals: false,
    body: false,
    colours: false,
    time: false,
    essential: false,
    people: false,
    refreshments: false,
    produce: false,
    meals: false,
    general: false,
    greetings: false,
    numbers: false,
    school: false,
    verbs: false,
    climate:false
  }
  checker: any[] = []; 
  cTops: any[] = []; 
  id: any; 
  type: any; 
  gameL: any; 
  topics: any[] = []; 
  topic: any; 
  game:any; 
  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) { }

  ngOnInit() {
     this.id = this.route.snapshot.paramMap.get('id')!;
     this.getTopics(); 
     console.log(this.topics);
  }
  //will grab the id and route to the relevant game
  //e.g. if the id is 1, the router will use '/game1/ url
  // if the id is 2 the router will use '/game2/ etc. 

  //route with type and send topics to session storage instead of routing
  startGame(){
    this.getGame(); 
    if(this.type == undefined){
      this.type = 0; 
    }

    if(this.gameL == undefined) {
      this.gameL = 15; 
      sessionStorage.setItem('gameL', this.gameL);
    } else {
      sessionStorage.setItem('gameL', this.gameL);
    }
    
    if(this.topic == undefined) {
      let r = Math.floor(Math.random() * this.topics.length);
      this.topic = this.topics[r]; 
      sessionStorage.setItem('topic', 'Adjectives'); 
    }else {
      sessionStorage.setItem('topic', 'Adjectives');
    }
    this.setTopics(); 
    this.router.navigateByUrl('/'+this.game+'/'+this.type); 
  }
  navHome(){
   
     
    this.router.navigateByUrl('/'); 
  }
  getTopics(){
    this.data.getValues().pipe().subscribe(data=> { 
      //this is a temporary variable to hold the data as
      //array of the row values as strings
      let list = data.split('\r');
       
      //loops through each row and splits values by comma 
      //into separate instances
      list.forEach(e => {
        let x = e.split(','); 
        if(!this.topics.find((element) => element == x[3])) {
          this.topics.push(x[3]); 
        }
      }); 
      
    }, err => console.error('Observer got an error: ' + err));
  }
  getGame(){
    if(this.id == 1){
      this.game = 'e-match';
    } else if(this.id == 2) {
      this.game = 'j-match';
    }
  }
  setTopics() {
    sessionStorage.removeItem('topics');
    this.checker = []; 
    
   
    for(let t in this.cho) {
       if(this.cho[t]) {
        this.checker.push(t);
       } 
    }
   
    let x = this.checker.join(","); 
    sessionStorage.setItem('topics', x); 
  }
}
