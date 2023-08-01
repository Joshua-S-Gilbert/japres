import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  id: any; 
  type: any; 
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
     this.id = this.route.snapshot.paramMap.get('id')!;
  }
  //will grab the id and route to the relevant game
  //e.g. if the id is 1, the router will use '/game1/ url
  // if the id is 2 the router will use '/game2/ etc. 

  //route with type and send topics to session storage instead of routing
  startGame(){
    this.router.navigateByUrl('/e-match/'+this.type); 
  }
}
