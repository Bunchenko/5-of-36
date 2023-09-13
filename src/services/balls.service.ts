import { Injectable } from '@angular/core';
import { Combination } from 'src/types/combination';
import { PrizeService } from './prize.service';
import { DrawingService } from './drawing.service';

@Injectable({
  providedIn: 'root',
})
export class BallsService {
  public playerCombinations: number[][] = [[], [], [], [], [], [], [], []]; //TODO
  private _winCombination?: number[];

  constructor(
    private _prizeService: PrizeService,
    private _drawingService: DrawingService
  ) {
    _drawingService.timer$.subscribe({
      complete: () => {
        this._winCombination = this.randomizeBalls(6);
        const combinations = this._countMatchAmount();
        _prizeService.countTotalPrize(combinations);
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

  public addBalls(balls: number[], index: number): void {
    this.playerCombinations[index] = balls;
  }

  public removeBalls(index: number): void {
    this.playerCombinations[index] = [];
  }

  private _countMatchAmount(): Combination[] {
    const bonusBall = this._winCombination?.pop();

    const combinations = this.playerCombinations.map((playerCombination) => {
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
    });

    return combinations;
  }
}
