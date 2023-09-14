import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.css'],
})
export class BallComponent {
  @Input() type: 'normal' | 'bonus' = 'normal';
  @Input() isDisabled: boolean = false;
  @Output() ballClick = new EventEmitter<void>();

  handleClick() {
    this.ballClick.emit();
  }

  defineBallClass() {
    return {
      'lotto-ball': true,
      'bonus-ball': this.type === 'bonus',
    };
  }
}
