import { Injectable, OnDestroy } from '@angular/core';
import { Combination } from 'src/types/combination';
import { PrizeService } from './prize.service';
import { DrawingService } from './drawing.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BallsService implements OnDestroy {
  public availableNumbers: number[] = Array.from(
    { length: 36 },
    (_, i) => i + 1
  );
  public playerCombinations: number[][] = [[], [], [], [], [], [], [], [], []];
  public winCombination$ = new BehaviorSubject<number[]>([]);
  public bufferCombination: number[] = [];
  private _timerSubscription?: Subscription;
  private _popularBalls: { [key: string]: number } = {};

  constructor(
    private _prizeService: PrizeService,
    private _drawingService: DrawingService
  ) {
    this._timerSubscription = _drawingService.startDrawing(
      this._completeCallback.bind(this)
    );
    _drawingService.drawingStarted$.subscribe(() => {
      this.addBalls(this.getPopularWinBalls(), 8);
    });
  }

  private _completeCallback(): void {
    this.winCombination$.next(this.randomizeBalls(6));

    const combinations = this._countMatchAmount();
    this._prizeService.countTotalPrize(combinations);

    this.winCombination$.value.forEach(ball => {
      this._addBallToPopular(ball);
    });
  }

  public startNewDrawing() {
    this._timerSubscription?.unsubscribe();
    this.winCombination$.next([]);
    this._prizeService.prizes$.next(null);
    this._drawingService.complete$.next(false);
    this._timerSubscription = this._drawingService.startDrawing(
      this._completeCallback.bind(this)
    );
  }

  private _addBallToPopular(ball: number): void {
    if (!(ball in this._popularBalls)) {
      this._popularBalls[ball] = 0;
    }
    this._popularBalls[ball]++;
  }

  public getPopularWinBalls(): number[] {
    return Object.keys(this._popularBalls)
      .map(v => Number(v))
      .sort((a, b) => this._popularBalls[b] - this._popularBalls[a])
      .slice(0, 5);
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
      combination => combination.length === 0
    );
  }

  public getPlayerCombinationsAmount(): number {
    return this.playerCombinations.filter(
      combination => combination.length === 5
    ).length;
  }

  public isBallInWinCombination(ball: number): boolean {
    return this.winCombination$.value.includes(ball);
  }

  private _countMatchAmount(): Combination[] | null {
    if (this.arePlayerCombinationsEmpty()) return null;

    const winCombination = [...this.winCombination$.value];
    const bonusBall = winCombination.pop();

    const combinations = this.playerCombinations.map(playerCombination => {
      let matchCount = 0;
      let hasBonus = false;

      for (const ball of playerCombination) {
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

  public ngOnDestroy(): void {
    this._timerSubscription?.unsubscribe();
    this.winCombination$.complete();
  }
}
