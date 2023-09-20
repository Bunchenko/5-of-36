import {
  trigger,
  transition,
  style,
  animate,
  useAnimation,
  query,
} from '@angular/animations';
import { Component } from '@angular/core';
import { BallsService } from 'src/services/balls.service';
import { ballsCombinationSpin } from '../animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('buttonChange', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
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
export class GameComponent {
  protected _showModal = false;
  protected _modalRowIndex: number | null = null;

  constructor(protected _ballsService: BallsService) {}

  protected _onModalOpen(index: number): void {
    this._showModal = true;
    this._modalRowIndex = index;
    this._ballsService.bufferCombination = [
      ...this._ballsService.playerCombinations[index],
    ];
  }

  protected _closeModal(): void {
    this._showModal = false;
    this._ballsService.bufferCombination = [];
    this._modalRowIndex = null;
  }

  protected _onClear(): void {
    this._ballsService.bufferCombination = [];
  }

  protected _onPlay(): void {
    if (
      this._ballsService.bufferCombination.length === 5 &&
      this._modalRowIndex !== null
    ) {
      this._ballsService.addBalls(
        this._ballsService.bufferCombination,
        this._modalRowIndex
      );
    }
    this._closeModal();
  }

  protected _chooseBallType(ball: number): {
    type: 'bonus' | 'normal';
    disabled: boolean;
  } {
    const isBallInBuffer = this._ballsService.bufferCombination.includes(ball);
    const bufferIsFull = this._ballsService.bufferCombination.length === 5;

    return {
      type: isBallInBuffer ? 'bonus' : 'normal',
      disabled: bufferIsFull && !isBallInBuffer,
    };
  }

  protected _onBallClick(ball: number): void {
    const buffer = this._ballsService.bufferCombination;

    if (buffer.includes(ball)) {
      const ballIndex = buffer.indexOf(ball);
      buffer.splice(ballIndex, 1);
    } else {
      if (buffer.length >= 5) return;
      buffer.push(ball);
    }
  }

  protected _autoselect(index: number): void {
    this._ballsService.addBalls(this._ballsService.randomizeBalls(5), index);
  }

  protected _remove(index: number): void {
    this._ballsService.removeBalls(index);
  }
}
