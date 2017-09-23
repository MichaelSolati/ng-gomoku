import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { NavbarService, UserService } from '../core/services';

@Component({
  moduleId: module.id,
  selector: 'go-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(private _ns: NavbarService, private _router: Router, private _snackBar: MdSnackBar, private _us: UserService) { }

  ngOnInit() {
    this._ns.setTitle('Sign In');
  }

  public signIn(account: string): void {
    switch (account) {
      case 'facebook':
        this._us.signInFacebook((error: Error, success: any) => {
          if (error) {
            this._snackBar.open(error.message, null, { duration: 3000 });
          } else {
            this._snackBar.open('Welcome ' + success.user.displayName, null, { duration: 3000 });
            this._router.navigate(['/', 'home']);
          }
        });
        break;
      case 'twitter':
        this._us.signInTwitter((error: Error, success: any) => {
          if (error) {
            this._snackBar.open(error.message, null, { duration: 3000 });
          } else {
            this._snackBar.open('Welcome ' + success.user.displayName, null, { duration: 3000 });
            this._router.navigate(['/', 'home']);
          }
        });
        break;
      default:
        this._us.signInGoogle((error: Error, success: any) => {
          if (error) {
            this._snackBar.open(error.message, null, { duration: 3000 });
          } else {
            this._snackBar.open('Welcome ' + success.user.displayName, null, { duration: 3000 });
            this._router.navigate(['/', 'home']);
          }
        });
        break;
    }
  }
}
