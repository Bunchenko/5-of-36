import { Injectable } from '@angular/core';
import { Combination } from 'src/types/combination';

@Injectable({
  providedIn: 'root',
})
export class PrizeService {
  private _prizePool = 1000000;

  constructor() {}

  public countPrize(combination: Combination) {
    if (combination.hasBonus) {
      switch (combination.matchCount) {
        case 2:
          return Math.round(this._prizePool * 0.2);
        case 3:
          return Math.round(this._prizePool * 0.4);
        case 4:
          return Math.round(this._prizePool * 0.8);
        default:
          return 0;
      }
    } else {
      switch (combination.matchCount) {
        case 2:
          return Math.round(this._prizePool * 0.1);
        case 3:
          return Math.round(this._prizePool * 0.3);
        case 4:
          return Math.round(this._prizePool * 0.7);
        case 5:
          return this._prizePool;
        default:
          return 0;
      }
    }
  }
}
