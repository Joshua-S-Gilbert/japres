import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.page.html',
  styleUrls: ['./game-over.page.scss'],
})
export class GameOverPage implements OnInit {
  score = 0;
  gameL = sessionStorage.getItem('gameL');
  cCount = sessionStorage.getItem('cCount')
  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }
  nav(name: string) {
    this.router.navigateByUrl("/"+name)
  }
  gameReset(){
    this.location.back(); 
    sessionStorage.removeItem('cCount'); 
  }
}
