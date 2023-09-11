import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { take, takeUntil, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  public timer$?: Observable<number>;
  public complete = new Subject<boolean>();
  private _seconds = 10;

  constructor() {
    this.timer$ = interval(1000).pipe(
      takeUntil(this.complete),
      take(this._seconds + 1),
      map((v) => this._seconds - v)
    );
  }
}
