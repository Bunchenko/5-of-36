import { Injectable } from '@angular/core';
import { Combination } from 'src/types/combination';

@Injectable({
  providedIn: 'root',
})
export class BallsService {
  private _winCombination?: number[] = this.randomizeBalls(6);

  constructor() {
    console.log(this._winCombination);
    const player = this.randomizeBalls(5);
    console.log(player);

    console.log(this.countMatchAmount(player));
  }

  public randomizeBalls(length: number): number[] {
    const allNumbers: number[] = Array.from({ length: 36 }, (_, i) => i + 1);
    const result: number[] = [];

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allNumbers.length);
      result.push(allNumbers[randomIndex]);
      allNumbers.splice(randomIndex, 1);
    }

    return result;
  }

  public countMatchAmount(playerBalls: number[]): Combination {
    const bonusBall = this._winCombination?.pop();
    let matchCount = 0;
    let hasBonus = false;

    for (let ball of playerBalls) {
      if (this._winCombination?.includes(ball)) {
        matchCount++;
      } else if (!hasBonus && ball === bonusBall) {
        hasBonus = true;
      }
    }

    return { matchCount, hasBonus };
  }
}
