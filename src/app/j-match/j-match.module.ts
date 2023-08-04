import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JMatchPageRoutingModule } from './j-match-routing.module';

import { JMatchPage } from './j-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JMatchPageRoutingModule
  ],
  declarations: [JMatchPage]
})
export class JMatchPageModule {}
