import { Component } from '@angular/core';
import { BallsService } from 'src/services/balls.service';
import { DrawingService } from 'src/services/drawing.service';
import { PrizeService } from 'src/services/prize.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css'],
})
export class DrawingComponent {
  constructor(
    private _drawingService: DrawingService,
    protected _ballsService: BallsService,
    protected _prizeService: PrizeService
  ) {}

  protected _stopDrawing() {
    this._drawingService.complete$.next(true);
  }

  protected _trackByCombinationFn(
    index: number,
    combination: number[]
  ): number {
    return index;
  }

  protected _trackByBallFn(index: number, ball: number): number {
    return ball;
  }
}
