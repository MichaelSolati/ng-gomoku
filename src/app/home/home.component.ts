import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GamesService } from '../core/services';

@Component({
  moduleId: module.id,
  selector: 'go-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _gs: GamesService) { }

  ngOnInit() {
  }

  get games(): Observable<any> {
    return this._gs.games;
  }

  public create(): void {
    this._gs.create();
  }
}
