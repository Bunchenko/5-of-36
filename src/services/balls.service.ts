import { Injectable } from '@angular/core';
import { Combination } from 'src/types/combination';
import { PrizeService } from './prize.service';
import { DrawingService } from './drawing.service';

@Injectable({
  providedIn: 'root',
})
export class BallsService {
  public playerCombination: number[] = this.randomizeBalls(5); //TODO
  private _winCombination?: number[];

  constructor(
    private _prizeService: PrizeService,
    private _drawingService: DrawingService
  ) {
    _drawingService.timer$?.subscribe({
      complete: () => {
        this._winCombination = this.randomizeBalls(6);
        const combination = this._countMatchAmount(this.playerCombination);
        console.log(_prizeService.countPrize(combination));
      },
    });
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

  private _countMatchAmount(playerCombination: number[]): Combination {
    const bonusBall = this._winCombination?.pop();
    let matchCount = 0;
    let hasBonus = false;

    for (let ball of playerCombination) {
      if (this._winCombination?.includes(ball)) {
        matchCount++;
      } else if (!hasBonus && ball === bonusBall) {
        hasBonus = true;
      }
    }

    return { matchCount, hasBonus };
  }
}
