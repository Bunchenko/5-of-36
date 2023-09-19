import { Injectable } from '@angular/core';
import { Combination } from 'src/types/combination';
import { PrizeService } from './prize.service';
import { DrawingService } from './drawing.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BallsService {
  public availableNumbers: number[] = Array.from(
    { length: 36 },
    (_, i) => i + 1
  );
  public playerCombinations: number[][] = [[], [], [], [], [], [], [], []];
  public winCombination$ = new BehaviorSubject<number[]>([]);
  public bufferCombination: number[] = [];

  constructor(
    private _prizeService: PrizeService,
    private _drawingService: DrawingService
  ) {
    _drawingService.timer$.subscribe({
      complete: () => {
        this.winCombination$.next(this.randomizeBalls(6));
        const combinations = this._countMatchAmount();
        _prizeService.countTotalPrize(combinations);
      },
    });
  }

  public randomizeBalls(length: number): number[] {
    const allNumbers: number[] = [...this.availableNumbers];
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

  public arePlayerCombinationsEmpty(): boolean {
    return this.playerCombinations.every(
      (combination) => combination.length === 0
    );
  }

  public getPlayerCombinationsAmount(): number {
    return this.playerCombinations.filter(
      (combination) => combination.length === 5
    ).length;
  }

  private _countMatchAmount(): Combination[] | null {
    if (this.arePlayerCombinationsEmpty()) return null;

    const winCombination = [...this.winCombination$.value];
    const bonusBall = winCombination.pop();

    const combinations = this.playerCombinations.map((playerCombination) => {
      let matchCount = 0;
      let hasBonus = false;

      for (let ball of playerCombination) {
        if (winCombination.includes(ball)) {
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
