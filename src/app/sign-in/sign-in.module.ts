import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SignInRoutingModule
  ],
  declarations: [SignInComponent]
})
export class SignInModule { }
