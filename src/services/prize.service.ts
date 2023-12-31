import { BehaviorSubject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Combination } from 'src/types/combination';

@Injectable({
  providedIn: 'root',
})
export class PrizeService implements OnDestroy {
  public prizes$ = new BehaviorSubject<number | null>(null);
  private _prizePool = 1000000;

  public countTotalPrize(combinations: Combination[] | null) {
    if (!combinations) return;

    let totalWin = 0;

    combinations.forEach(combination => {
      if (combination.hasBonus) {
        totalWin += this.calculateWithBonus(combination.matchCount);
      } else {
        totalWin += this.calculateWithoutBonus(combination.matchCount);
      }
    });

    this.prizes$.next(totalWin);
  }

  private calculateWithBonus(matchCount: number): number {
    switch (matchCount) {
      case 2:
        return Math.round(this._prizePool * 0.2);
      case 3:
        return Math.round(this._prizePool * 0.4);
      case 4:
        return Math.round(this._prizePool * 0.6);
      default:
        return 0;
    }
  }

  private calculateWithoutBonus(matchCount: number): number {
    switch (matchCount) {
      case 2:
        return Math.round(this._prizePool * 0.1);
      case 3:
        return Math.round(this._prizePool * 0.3);
      case 4:
        return Math.round(this._prizePool * 0.5);
      case 5:
        return this._prizePool * 7;
      default:
        return 0;
    }
  }

  public ngOnDestroy(): void {
    this.prizes$.complete();
  }
}
