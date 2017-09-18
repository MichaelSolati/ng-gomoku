import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGuard, NoUserGuard, GameGuard } from './core/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/welcome/welcome.module#WelcomeModule',
    canActivateChild: [NoUserGuard]
  },
  {
    path: 'sign-in',
    loadChildren: 'app/sign-in/sign-in.module#SignInModule',
    canActivateChild: [NoUserGuard]
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
    canActivateChild: [UserGuard]
  },
  {
    path: 'game',
    loadChildren: 'app/game/game.module#GameModule',
    canActivateChild: [UserGuard, GameGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
