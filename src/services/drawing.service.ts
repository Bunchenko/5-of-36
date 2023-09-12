import { Injectable } from '@angular/core';
import { Observable, interval, Subject, BehaviorSubject } from 'rxjs';
import {
  take,
  takeUntil,
  map,
  tap,
  shareReplay,
  finalize,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  public timer$: Observable<number>;
  public complete$ = new Subject<boolean>();
  public time$ = new BehaviorSubject<number>(0);
  private _seconds = 60;

  constructor() {
    this.timer$ = interval(1000).pipe(
      shareReplay(1),
      takeUntil(this.complete$),
      take(this._seconds + 1),
      tap((v) => {
        this.time$.next(this._seconds - v);
      }),
      map((v) => this._seconds - v),
      finalize(() => {
        this.time$.next(0);
      })
    );
  }
}
