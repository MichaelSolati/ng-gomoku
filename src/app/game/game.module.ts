import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GameRoutingModule
  ],
  declarations: [GameComponent]
})
export class GameModule { }
