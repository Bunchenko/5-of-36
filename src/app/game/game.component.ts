import {
  trigger,
  transition,
  style,
  animate,
  useAnimation,
  query,
} from '@angular/animations';
import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { BallsService } from 'src/services/balls.service';
import { ballsCombinationSpin } from '../animations';
import { ModalComponent } from '../modal/modal.component';

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
  protected _modalRowIndex: number | null = null;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  @ViewChild('modal', { read: ViewContainerRef })
  private viewRef!: ViewContainerRef;
  private componentRef!: ComponentRef<ModalComponent>;

  constructor(protected _ballsService: BallsService) {}

  protected openModal(index: number): void {
    this._modalRowIndex = index;
    this._ballsService.bufferCombination = [
      ...this._ballsService.playerCombinations[index],
    ];

    this.viewRef.clear();
    this.componentRef = this.viewRef.createComponent(ModalComponent);

    const modalInstance = this.componentRef.instance;
    modalInstance.contentTemplate = this.modalContent;
    modalInstance.title = 'Choose 5 numbers';
    modalInstance.closed.subscribe(() => {
      this.closeModal();
    });
  }

  protected closeModal(): void {
    this.viewRef.clear();
    this._ballsService.bufferCombination = [];
    this._modalRowIndex = null;
  }

  protected onClear(): void {
    this._ballsService.bufferCombination = [];
  }

  protected onPlay(): void {
    if (
      this._ballsService.bufferCombination.length === 5 &&
      this._modalRowIndex !== null
    ) {
      this._ballsService.addBalls(
        this._ballsService.bufferCombination,
        this._modalRowIndex
      );
    }
    this.closeModal();
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
