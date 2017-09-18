import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/'
}, {
  path: ':id',
  component: GameComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
