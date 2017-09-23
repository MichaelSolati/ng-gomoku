import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../core/services';

@Component({
  moduleId: module.id,
  selector: 'go-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  private _gameTime = 0;
  constructor(private _ns: NavbarService) { }

  ngOnInit() {
    this._ns.setTitle('Gomoku');
  }

  public game(): void {
    this._gameTime++;
    if (this._gameTime === 5 && (typeof window !== 'undefined')) {
      window.open('https://www.youtube.com/watch?v=kYWcV2DIIHU', '_blank');
    }
  }
}
