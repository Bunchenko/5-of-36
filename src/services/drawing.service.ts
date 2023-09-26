import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
  interval,
  Subject,
  BehaviorSubject,
  Subscription,
} from 'rxjs';
import { take, takeUntil, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DrawingService implements OnDestroy {
  public timer$: Observable<number>;
  public complete$ = new Subject<boolean>();
  public time$ = new BehaviorSubject<number>(0);
  public drawingStarted$ = new Subject<boolean>();
  private _seconds = 60;

  constructor() {
    this.timer$ = interval(1000).pipe(
      tap(v => {
        this.time$.next(this._seconds - v);
      }),
      take(this._seconds + 1),
      takeUntil(this.complete$),
      finalize(() => {
        this.time$.next(0);
      })
    );
  }

  public startDrawing(completeCallback: () => void): Subscription {
    this.drawingStarted$.next(true);
    return this.timer$.subscribe({ complete: completeCallback });
  }

  public stopDrawing(): void {
    this.complete$.next(true);
  }

  public ngOnDestroy(): void {
    this.time$.complete();
    this.complete$.complete();
    this.drawingStarted$.complete();
  }
}
