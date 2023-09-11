import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { take, takeUntil, map, tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  public timer$?: Observable<number>;
  public complete = new Subject<boolean>();
  public time = 0;
  private _seconds = 60;

  constructor() {
    this.timer$ = interval(1000).pipe(
      shareReplay(1),
      takeUntil(this.complete),
      take(this._seconds + 1),
      tap((v) => {
        this.time = this._seconds - v;
      }),
      map((v) => this._seconds - v)
    );
  }
}
