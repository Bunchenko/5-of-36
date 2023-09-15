import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallComponent {
  @Input() type: 'normal' | 'bonus' = 'normal';
  @Input() isDisabled: boolean = false;
  @Output() ballClick = new EventEmitter<void>();

  protected _handleClick() {
    this.ballClick.emit();
  }

  protected _defineBallClass() {
    return {
      'lotto-ball': true,
      'bonus-ball': this.type === 'bonus',
    };
  }
}
