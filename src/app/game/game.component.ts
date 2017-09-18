import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GamesService } from '../core/services';

@Component({
  moduleId: module.id,
  selector: 'go-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  private _game: Observable<any>;
  private _idSubscription: Subscription;

  constructor(private _gs: GamesService, private _route: ActivatedRoute, private _snackBar: MdSnackBar) { }

  ngOnInit() {
    this._idSubscription = this._route.params.subscribe((params: any) => {
      this._game = this._gs.findGame(params.id);
    });
  }

  ngOnDestroy() {
    this._idSubscription.unsubscribe();
  }

  get game(): Observable<any> {
    return this._game;
  }

  public boxImg(box: any, row: number, col: number, createdBy: string) {
    if (row === 0 && col === 0) {
      return 'assets/nw-corner.png';
    } else if (row === 0 && col === 18) {
      return 'assets/ne-corner.png';
    } else if (row === 18 && col === 0) {
      return 'assets/sw-corner.png';
    } else if (row === 18 && col === 18) {
      return 'assets/se-corner.png';
    } else if (row === 0) {
      return 'assets/north.png';
    } else if (col === 18) {
      return 'assets/east.png';
    } else if (row === 18) {
      return 'assets/south.png';
    } else if (col === 0) {
      return 'assets/west.png';
    } else if ((row === 3 && col === 3) || (row === 3 && col === 9) || (row === 3 && col === 15) ||
      (row === 9 && col === 3) || (row === 9 && col === 9) || (row === 9 && col === 15) ||
      (row === 15 && col === 3) || (row === 15 && col === 9) || (row === 15 && col === 15)) {
      return 'assets/star.png';
    } else if (createdBy === box) {
      return 'assets/black.png';
    } else if (typeof box === 'string') {
      return 'assets/white.png';
    }
    return 'assets/cross.png';
  }

  public move(row: number, col: number): void {
    this._game
      .first()
      .subscribe((game: any) => {
        this._gs.move(game, row, col, (error: Error) => {
          this._snackBar.open(error.message, null, { duration: 3000 });
        });
      });
  }
}
