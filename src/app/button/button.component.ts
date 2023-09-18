import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() customClass?: 'primary' | 'secondary' | 'danger';
  @Input() customStyles: { [key: string]: string } = {};
  @Input() isDisabled: boolean = false;
  @Output() onClick = new EventEmitter<MouseEvent>();
}
