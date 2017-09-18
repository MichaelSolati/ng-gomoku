import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GamesService } from '../core/services';

@Component({
  moduleId: module.id,
  selector: 'go-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private _gs: GamesService) { }

  ngOnInit() {
  }
}
