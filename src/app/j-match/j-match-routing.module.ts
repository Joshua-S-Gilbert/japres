import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JMatchPage } from './j-match.page';

const routes: Routes = [
  {
    path: '',
    component: JMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JMatchPageRoutingModule {}
