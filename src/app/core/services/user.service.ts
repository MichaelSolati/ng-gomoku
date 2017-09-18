import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  constructor(private _fbAuth: AngularFireAuth) { }

  get user(): Observable<any> {
    return this._fbAuth.authState;
  }

  private _signIn(provider: any, callback?: any): void {
    this._fbAuth.auth.signInWithRedirect(provider).then(() => {
      this._fbAuth.auth.getRedirectResult().then((result: any) => {
        if (callback) { callback(null, result); }
      }).catch((error: any) => {
        if (callback) { callback(error, null); }
      });
    });
  }

  public signInFacebook(callback?: any): void {
    const provider = new firebase.auth.FacebookAuthProvider();
    this._signIn(provider, (error: any, result: any) => {
      if (callback) { callback(error, result); }
    });
  }

  public signInGoogle(callback?: any): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this._signIn(provider, (error: any, result: any) => {
      if (callback) { callback(error, result); }
    });
  }

  public signInTwitter(callback?: any): void {
    const provider = new firebase.auth.TwitterAuthProvider();
    this._signIn(provider, (error: any, result: any) => {
      if (callback) { callback(error, result); }
    });
  }

  public signOut(callback?: any): void {
    this._fbAuth.auth.signOut()
      .then((result: any) => {
        callback(null, result);
      }).catch((error: any) => {
        callback(error, null);
      });
  }
}
