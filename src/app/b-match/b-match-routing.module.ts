import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BMatchPage } from './b-match.page';

const routes: Routes = [
  {
    path: '',
    component: BMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BMatchPageRoutingModule {}
