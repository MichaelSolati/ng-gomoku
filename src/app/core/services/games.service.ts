import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/first';

import { UserService } from './user.service';

@Injectable()
export class GamesService {
  private _games: Observable<any>;
  constructor(private _fbDB: AngularFireDatabase, private _us: UserService) {
    this._games = this._fbDB.list('/games');
  }

  get games(): Observable<any[]> {
    return this._games;
  }

  public create(): void {
    this._us.user
    .first()
    .subscribe((user: any) => {
      this._fbDB.list('/games').push({
        createdOn: Date().toString(),
        createdBy: user.providerData[0]
      });
    });
  }
}
