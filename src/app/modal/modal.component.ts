import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() isOpened: boolean = false;
  @Output() closed = new EventEmitter();

  protected _close() {
    this.closed.emit();
  }
}
