import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { GamesService } from '../core/services';

@Component({
  moduleId: module.id,
  selector: 'go-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _processing: boolean;

  constructor(private _gs: GamesService, private _router: Router, private _snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  get processing(): boolean {
    return this._processing;
  }

  get games(): Observable<any> {
    return this._gs.games;
  }

  public create(): void {
    this._processing = true;
    this._gs.create((error: Error, success: any) => {
      if (error) {
        this._processing = false;
        this._snackBar.open(error.message, null, { duration: 3000 });
      } else {
        this._router.navigate(['/', 'game', success.key]);
      }
    });
  }

  public join(gameId: string): void {
    console.log(gameId)
    if (!this._processing) {
      this._processing = true;
      this._gs.join(gameId, (error: Error) => {
        if (error) {
          this._processing = false;
          this._snackBar.open(error.message, null, { duration: 3000 });
        } else {
          this._router.navigate(['/', 'game', gameId]);
        }
      });
    }
  }
}