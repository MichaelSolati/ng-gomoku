import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingRoutingModule } from './loading-routing.module';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    LoadingRoutingModule
  ],
  declarations: [LoadingComponent]
})
export class LoadingModule { }
