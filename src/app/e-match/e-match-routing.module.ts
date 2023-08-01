import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EMatchPage } from './e-match.page';

const routes: Routes = [
  {
    path: '',
    component: EMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EMatchPageRoutingModule {}
