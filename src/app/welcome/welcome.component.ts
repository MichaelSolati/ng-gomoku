import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../core/services';

@Component({
  moduleId: module.id,
  selector: 'go-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(private _ns: NavbarService) { }

  ngOnInit() {
    this._ns.setTitle('Gomoku');
  }
}
