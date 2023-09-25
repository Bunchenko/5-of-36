import { trigger, transition, query, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { BallsService } from 'src/services/balls.service';
import { DrawingService } from 'src/services/drawing.service';
import { PrizeService } from 'src/services/prize.service';
import { ballsCombinationSpin } from '../animations';

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
export class DrawingComponent {
  constructor(
    protected _drawingService: DrawingService,
    protected _ballsService: BallsService,
    protected _prizeService: PrizeService
  ) {}

  protected _stopDrawing(): void {
    this._drawingService.stopDrawing();
  }

  protected _startNewDrawing(): void {
    this._ballsService.startNewDrawing();
  }

  protected _trackByCombinationFn(index: number): number {
    return index;
  }

  protected _trackByBallFn(index: number, ball: number): number {
    return ball;
  }
}
