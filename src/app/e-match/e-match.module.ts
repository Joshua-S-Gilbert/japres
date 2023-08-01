import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EMatchPageRoutingModule } from './e-match-routing.module';

import { EMatchPage } from './e-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EMatchPageRoutingModule
  ],
  declarations: [EMatchPage]
})
export class EMatchPageModule {}
