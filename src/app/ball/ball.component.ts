import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
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
  animations: [
    trigger('spin', [
      state('selected', style({ transform: 'rotate(-360deg)' })),
      state('deselected', style({ transform: 'rotate(360deg)' })),
      transition('void => *', []),
      transition('* <=> *', animate('500ms ease-out')),
    ]),
  ],
})
export class BallComponent {
  @Input() type: 'normal' | 'bonus' = 'normal';
  @Input() isDisabled: boolean = false;
  @Input() isSelected: boolean = false;
  @Output() ballClick = new EventEmitter<void>();

  protected _handleClick() {
    this.isSelected = !this.isSelected;
    this.ballClick.emit();
  }

  protected _defineBallClass() {
    return {
      'lotto-ball': true,
      'bonus-ball': this.type === 'bonus',
    };
  }
}
