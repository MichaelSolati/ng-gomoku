import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { NavbarService, UserService } from '../../core/services';

@Component({
  moduleId: module.id,
  selector: 'go-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _ns: NavbarService, private _router: Router, private _snackBar: MdSnackBar, private _us: UserService) { }

  ngOnInit() {
  }

  get title(): Observable<string> {
    return this._ns.title;
  }

  get user(): Observable<string> {
    return this._us.user;
  }

  public signOut(): void {
    this._us.signOut((error: Error) => {
      this._snackBar.open('Until Next Time...', null, { duration: 3000 });
      this._router.navigate(['/']);
    });
  }
}
