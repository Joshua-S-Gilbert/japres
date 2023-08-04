import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'e-match/:type',
    loadChildren: () => import('./e-match/e-match.module').then( m => m.EMatchPageModule)
  },
  {
    path: 'options/:id',
    loadChildren: () => import('./options/options.module').then( m => m.OptionsPageModule)
  },
  {
    path: 'game-over',
    loadChildren: () => import('./game-over/game-over.module').then( m => m.GameOverPageModule)
  },
  {
    path: 'j-match/:type',
    loadChildren: () => import('./j-match/j-match.module').then( m => m.JMatchPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
