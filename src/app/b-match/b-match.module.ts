import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BMatchPageRoutingModule } from './b-match-routing.module';

import { BMatchPage } from './b-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BMatchPageRoutingModule
  ],
  declarations: [BMatchPage]
})
export class BMatchPageModule {}
