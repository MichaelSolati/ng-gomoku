import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavbarService {
  private _title: BehaviorSubject<string>  = new BehaviorSubject<string>('Gomoku');

  constructor() { }

  get title(): Observable<string> {
    return this._title.asObservable();
  }

  public setTitle(title: string): void {
    this._title.next(title);
  }

}
