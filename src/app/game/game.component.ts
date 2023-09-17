import { Component } from '@angular/core';
import { BallsService } from 'src/services/balls.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  protected _showModal = false;
  protected _currentRowIndex: number | null = null;

  constructor(protected _ballsService: BallsService) {}

  protected _onModalOpen(index: number): void {
    this._showModal = true;
    this._currentRowIndex = index;
    this._ballsService.bufferCombination = [
      ...this._ballsService.playerCombinations[index],
    ];
  }

  protected _onModalClose(): void {
    this._showModal = false;
    if (
      this._ballsService.bufferCombination.length === 5 &&
      this._currentRowIndex !== null
    ) {
      this._ballsService.addBalls(
        this._ballsService.bufferCombination,
        this._currentRowIndex
      );
    }
    this._ballsService.bufferCombination = [];
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
}
