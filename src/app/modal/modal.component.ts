import {
  trigger,
  style,
  state,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('open', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() isOpened: boolean = false;
  @Output()
  closed = new EventEmitter();

  protected _close() {
    this.closed.emit();
  }
}
