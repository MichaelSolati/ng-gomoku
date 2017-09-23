import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { board19 } from './boards';

import { UserService } from './user.service';

@Injectable()
export class GamesService {
  private _games: Observable<any>;
  constructor(private _fbDB: AngularFireDatabase, private _us: UserService) {
    this._us.user.subscribe((user: any) => {
      this._games = this._fbDB.list('/games', {
        query: {
          orderByChild: 'createdOn',
          startAt: (Date.now() - 3600000)
        }
      }).map((games: any[]) => {
        return games.filter((game: any) => (game.createdBy.uid !== user.uid && !game.joinedBy));
      });
    });
  }

  get games(): Observable<any[]> {
    return this._games;
  }

  public create(callback?: any): void {
    this._us.user
      .first()
      .subscribe((user: any) => {
        this._fbDB.list('/games')
          .push({
            createdOn: Date.now(),
            createdBy: {
              displayName: user.displayName,
              photoURL: user.photoURL,
              uid: user.uid,
              player: 1
            },
            board: board19
          })
          .then((success: any) => {
            if (callback) { callback(null, success); }
          }, (error: Error) => {
            if (callback) { callback(error, null); }
          });
      });
  }

  public join(gameId: string, callback?: any): void {
    this._us.user
      .first()
      .subscribe((user: any) => {
        this._fbDB.object('/games/' + gameId)
          .update({
            joinedOn: Date.now(),
            joinedBy: {
              displayName: user.displayName,
              photoURL: user.photoURL,
              uid: user.uid,
              player: 2
            }
          })
          .then((success: any) => {
            if (callback) { callback(null); }
          }, (error: Error) => {
            if (callback) { callback(error); }
          });
      });
  }

  public findGame(id: string): Observable<any> {
    return this._fbDB.object('/games/' + id);
  }

  public checkPlayer(game: any, user: any): number {
    // (user.uid === game.createdBy.uid) ? console.log('1') : console.log('2');
    return (user.uid === game.createdBy.uid) ? 1 : 2;
  }

  public latestMove(id: string): Observable<any> {
    return this._fbDB.list('/moves', {
      query: {
        orderByChild: 'gameId',
        equalTo: id
      }
    });
  }

  public move(game: any, row: number, col: number, callback?: any): void {
    this._us.user
      .first()
      .subscribe((user: any) => {
        try {
          console.log(game);
          // this._validateUser(game, user);
          this._validateBox(game.board, row, col);
          game.board[row][col] = this.checkPlayer(game, user);
          this.checkBoardState(game.board);
          this._fbDB.object('/games/' + game['$key'])
            .update({
              playedOn: Date.now(),
              playedBy: {
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid
              },
              board: game.board
            });
        } catch (error) {
          if (callback) { callback(error); }
        }
      });
  }

  public checkBoardState(board: any): number {
    board = board.join('-').replace(/,/g, '');
    console.log(board);
    if (board.match(/1{5}/)) {
      console.log('Horizontal win Player 1!');
      return 1;
    }
    if (board.match(/2{5}/)) {
      console.log('Horizontal win Player 2!');
      return 2;
    }
    if (board.match(/(1...................){5}|(...................1){5}/)) {
      console.log('Vertical win Player 1!');
      return 1;
    }
    if (board.match(/(2...................){5}|(...................2){5}/)) {
      console.log('Vertical win Player 2!');
      return 2;
    }
    // Garbage code.
    // if (board.match(/(1.{19}}){5}|(.{19}1){5}/)) {
    //   console.log('Diagonal win Player 1!');
    //   return 1;
    // }
    if (board.match(/0/)) { return -1; }
  }

  private _validateUser(game: any, user: any): boolean {
    if (game.playedBy && game.playedBy.uid === user.uid) {
      throw new Error('It is your oponents turn');
    }
    return true;
  }

  private _validateBox(board: any, row: number, col: number): boolean {
    if (board[row][col] !== 0) {
      throw new Error('Someone has played in this box already');
    }
    return true;
  }
}
