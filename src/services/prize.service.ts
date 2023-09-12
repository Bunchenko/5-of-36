import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Combination } from 'src/types/combination';

@Injectable({
  providedIn: 'root',
})
export class PrizeService {
  public prizes$ = new Subject<number>();
  private _prizePool = 1000000;

  public countPrize(combination: Combination) {
    if (combination.hasBonus) {
      switch (combination.matchCount) {
        case 2:
          this.prizes$.next(Math.round(this._prizePool * 0.2));
          break;
        case 3:
          this.prizes$.next(Math.round(this._prizePool * 0.4));
          break;
        case 4:
          this.prizes$.next(Math.round(this._prizePool * 0.8));
          break;
        default:
          this.prizes$.next(0);
          break;
      }
    } else {
      switch (combination.matchCount) {
        case 2:
          this.prizes$.next(Math.round(this._prizePool * 0.1));
          break;
        case 3:
          this.prizes$.next(Math.round(this._prizePool * 0.3));
          break;
        case 4:
          this.prizes$.next(Math.round(this._prizePool * 0.7));
          break;
        case 5:
          this.prizes$.next(this._prizePool);
          break;
        default:
          this.prizes$.next(0);
          break;
      }
    }
  }
}
