import {
  trigger,
  transition,
  query,
  useAnimation,
  AnimationEvent,
} from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { BallsService } from 'src/services/balls.service';
import { DrawingService } from 'src/services/drawing.service';
import { PrizeService } from 'src/services/prize.service';
import { ballsCombinationSpin } from '../animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css'],
  animations: [
    trigger('combinationSpin', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            useAnimation(ballsCombinationSpin, {
              params: {
                opacityFrom: 0,
                opacityTo: 1,
                staggerTime: '500',
                animateTime: '500ms',
                rotateAngle: '720deg',
              },
            }),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class DrawingComponent implements OnDestroy {
  protected _showWinAmount = false;
  protected _highlightedBalls: Set<number> = new Set();
  private _drawingStartSubscription: Subscription;

  constructor(
    protected _drawingService: DrawingService,
    protected _ballsService: BallsService,
    protected _prizeService: PrizeService
  ) {
    this._drawingStartSubscription = _drawingService.drawingStarted$.subscribe(
      () => {
        this._highlightedBalls.clear();
        this._showWinAmount = false;
      }
    );
  }

  protected _stopDrawing(): void {
    this._drawingService.stopDrawing();
  }

  protected _startNewDrawing(): void {
    this._ballsService.startNewDrawing();
  }

  protected _onWinCombinationShow(event: AnimationEvent): void {
    if (event.toState !== 'void') {
      this._showWinAmount = true;
      this._highlightPlayerBalls();
    }
  }

  private _highlightPlayerBalls(): void {
    for (const combination of this._ballsService.playerCombinations) {
      for (const ball of combination) {
        if (this._ballsService.isBallInWinCombination(ball)) {
          this._highlightedBalls.add(ball);
        }
      }
    }
  }

  protected _trackByCombinationFn(index: number): number {
    return index;
  }

  protected _trackByBallFn(index: number, ball: number): number {
    return ball;
  }

  public ngOnDestroy(): void {
    this._drawingStartSubscription.unsubscribe();
  }
}
